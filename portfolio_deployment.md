# Portfolio Deployment Guide

Deploy this Vue 3 + Vite static site to a fresh VPS (8labs.id) with a GoDaddy domain.

**The plan:** clone the repo on the VPS → build it there → Nginx serves the `dist/` output → point your domain → enable HTTPS. Deploy manually for now; a GitHub Actions section at the end covers auto-deploy on push to `main` later.

> **Best-practice note:** both approaches are common. Building on the server (what we do here) keeps deploys simple: `git pull && npm run build`. The alternative — building in CI and copying only `dist/` to the server — keeps the server free of Node/Git. Since you want CI later anyway, the server-build flow works for both phases.

---

## Requirements

- VPS IP address and root/SSH access (from 8labs.id panel)
- Your domain (from GoDaddy)
- Ubuntu/Debian on the VPS (assumed below; adjust package commands if different)

---

## Step 1 — First login & basic VPS setup

From your laptop (WSL terminal):

```bash
ssh root@YOUR_VPS_IP
```

On the VPS, update packages and create a non-root user:

```bash
apt update && apt upgrade -y
adduser nandes
usermod -aG sudo nandes
```

Copy your SSH key so you can log in without a password:

```bash
# run on your LAPTOP (creates a key if you don't have one: ssh-keygen -t ed25519)
ssh-copy-id nandes@YOUR_VPS_IP
```

## Step 2 — Firewall

On the VPS:

```bash
sudo apt install -y ufw
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

Only SSH, HTTP, and HTTPS are open. That's all a static site needs.

## Step 3 — Install Nginx, Git, and Node.js

```bash
sudo apt install -y nginx git
```

Install Node.js (LTS) from NodeSource — the Ubuntu default repo version is too old:

```bash
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
node -v   # should print v22.x
```

Verify Nginx: open `http://YOUR_VPS_IP` in a browser — you should see the welcome page.

## Step 4 — Point your domain (GoDaddy DNS)

In GoDaddy → My Products → your domain → **DNS / Manage DNS**, add:

| Type | Name | Value        | TTL     |
|------|------|--------------|---------|
| A    | @    | YOUR_VPS_IP  | default |
| A    | www  | YOUR_VPS_IP  | default |

Delete any conflicting A/CNAME records for `@` and `www` (GoDaddy often has a "Parked" A record).

Wait for DNS to propagate (minutes to ~1 hour). Check with:

```bash
dig +short yourdomain.com
```

It should print your VPS IP. **Don't do Step 7 (HTTPS) until this works.**

## Step 5 — Clone & build on the VPS

Two ways to clone: plain HTTPS (works instantly for a public repo, no setup) or SSH with a deploy key (works for private repos too, and is what you'll want anyway once GitHub Actions needs to push commands to the VPS). SSH steps below.

### 5a. Generate an SSH key on the VPS

```bash
ssh-keygen -t ed25519 -C "vps-portfolio-deploy" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
```

Copy the printed public key.

### 5b. Add it to GitHub as a Deploy key

GitHub repo → **Settings → Deploy keys → Add deploy key**. Paste the public key, give it a name like "VPS", leave "Allow write access" unchecked (read-only is enough to clone/pull).

### 5c. Trust GitHub's host key and clone

Back on the VPS:

```bash
ssh-keyscan github.com >> ~/.ssh/known_hosts
cd ~
git clone git@github.com:nandes007/portfolio-website.git
cd portfolio-website
npm ci
npm run build
```

This produces `~/portfolio-website/dist` — the entire deployable site.

> One deploy key = one repo. If you later deploy other projects from this VPS with the same key, generate separate keys per repo instead of reusing this one.

Copy the build output to the web root (kept separate from the repo so a broken build never takes down the live site):

```bash
sudo mkdir -p /var/www/portfolio
sudo chown nandes:nandes /var/www/portfolio
rsync -a --delete ~/portfolio-website/dist/ /var/www/portfolio/
```

## Step 6 — Configure Nginx

On the VPS, create the site config:

```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Paste (replace `yourdomain.com`):

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    root /var/www/portfolio;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

Enable it and reload:

```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo rm /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx
```

Verify: `http://yourdomain.com` should show your portfolio.

## Step 7 — HTTPS with Let's Encrypt (free)

On the VPS:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

Certbot edits the Nginx config for you and sets up auto-renewal. Choose "redirect HTTP to HTTPS" when asked.

Verify: `https://yourdomain.com` shows the padlock.

## Step 8 — Redeploying updates (manual, for now)

Push your changes to `main`, then on the VPS:

```bash
cd ~/portfolio-website
git pull
npm ci
npm run build
rsync -a --delete dist/ /var/www/portfolio/
```

No server restart needed. Tip: save those four commands as `~/deploy.sh` so a redeploy is just `./deploy.sh` — the GitHub Actions setup below will reuse it.

```bash
#!/usr/bin/env bash
set -e
cd ~/portfolio-website
git pull
npm ci
npm run build
rsync -a --delete dist/ /var/www/portfolio/
```

```bash
chmod +x ~/deploy.sh
```

---

## Next phase — Auto-deploy with GitHub Actions

When you're ready to deploy automatically on every push to `main`, the workflow simply SSHes into the VPS and runs the same `deploy.sh`.

> This is a different key from the one in Step 5 — that one lets the **VPS pull from GitHub** (read-only deploy key). This one lets **GitHub Actions log into the VPS** (needs shell access to run `deploy.sh`), so it's a regular user SSH key, not a repo deploy key.

### 1. Create a deploy SSH key

On your laptop:

```bash
ssh-keygen -t ed25519 -f ~/.ssh/portfolio_deploy -N ""
ssh-copy-id -i ~/.ssh/portfolio_deploy.pub nandes@YOUR_VPS_IP
```

### 2. Add GitHub repository secrets

In the repo → Settings → Secrets and variables → Actions, add:

| Secret     | Value                                        |
|------------|----------------------------------------------|
| `VPS_HOST` | your VPS IP                                  |
| `VPS_USER` | `nandes`                                     |
| `VPS_KEY`  | contents of `~/.ssh/portfolio_deploy` (the **private** key) |

### 3. Add the workflow file

Create `.github/workflows/deploy.yml` in the repo:

```yaml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ${{ secrets.VPS_USER }}
          key: ${{ secrets.VPS_KEY }}
          script: ~/deploy.sh
```

Push to `main` → GitHub Actions runs → VPS pulls, builds, and publishes. Manual deploys via `./deploy.sh` still work anytime.

---

## Quick checklist

- [ ] SSH into VPS, create user, add SSH key
- [ ] Firewall: allow SSH, 80, 443
- [ ] Install Nginx, Git, Node.js (LTS)
- [ ] GoDaddy A records for `@` and `www` → VPS IP
- [ ] Generate VPS SSH key, add as GitHub deploy key
- [ ] Clone repo on VPS via SSH, `npm ci && npm run build`
- [ ] rsync `dist/` to `/var/www/portfolio`
- [ ] Nginx site config + reload
- [ ] Certbot for HTTPS
- [ ] Create `~/deploy.sh` for one-command redeploys
- [ ] (Later) GitHub Actions workflow + secrets for auto-deploy
