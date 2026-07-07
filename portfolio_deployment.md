# Portfolio Deployment Guide

Deploy this Vue 3 + Vite static site to a fresh VPS (8labs.id) with a GoDaddy domain.

**The plan:** clone the repo on the VPS → build it there → Nginx serves the `dist/` output → put Cloudflare in front → point your domain → enable HTTPS at Cloudflare. Deploy manually for now; a GitHub Actions section at the end covers auto-deploy on push to `main` later.

> **Why Cloudflare?** 8labs virtual labs only get a **public IPv6** address — the IPv4 you see (`10.x.x.x`) is private, behind a shared NAT, and unreachable from the internet. Cloudflare (free plan) fixes this: visitors connect to Cloudflare over IPv4 or IPv6, and Cloudflare forwards to your VPS over IPv6. It also replaces certbot — Cloudflare terminates HTTPS at its edge.

> **Best-practice note:** both approaches are common. Building on the server (what we do here) keeps deploys simple: `git pull && npm run build`. The alternative — building in CI and copying only `dist/` to the server — keeps the server free of Node/Git. Since you want CI later anyway, the server-build flow works for both phases.

---

## Requirements

- VPS IP address and root/SSH access (from 8labs.id panel)
- Your domain (from GoDaddy)
- A free Cloudflare account (created in Step 4)
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

## Step 4 — Point your domain (Cloudflare + GoDaddy)

Plain GoDaddy A records won't work here — the VPS has no public IPv4 (see the note at the top). Instead, Cloudflare fronts the site.

### 4a. Get the VPS's public IPv6

On the VPS:

```bash
curl -6 ifconfig.me
```

Copy the printed IPv6 address (looks like `2407:6ac0:...`). If this times out, IPv6 is broken on the VPS — fix that first (8labs support).

### 4b. Add the domain to Cloudflare

1. Sign up at https://dash.cloudflare.com (free).
2. **Add a domain** → `nandes.tech` → pick the **Free** plan (scroll down).
3. Cloudflare imports existing GoDaddy records and then shows **two nameservers** (e.g. `ada.ns.cloudflare.com`, `bob.ns.cloudflare.com`). Note them.

### 4c. Switch GoDaddy to Cloudflare's nameservers

GoDaddy → My Products → your domain → **DNS → Nameservers → Change Nameservers** → "I'll use my own" → enter Cloudflare's two, save. GoDaddy will warn its DNS features stop working — that's expected; Cloudflare owns DNS from now on. Activation takes minutes to a few hours (Cloudflare emails you when Active).

### 4d. Set the DNS records in Cloudflare

Cloudflare → your domain → **DNS → Records**:

- **Delete** any imported `A` records (they point at unusable IPs).
- **Add:**

| Type | Name | Content         | Proxy status |
|------|------|-----------------|--------------|
| AAAA | @    | YOUR_VPS_IPV6   | **Proxied** (orange cloud) |
| AAAA | www  | YOUR_VPS_IPV6   | **Proxied** (orange cloud) |

The orange cloud is what gives IPv4 visitors access — grey ("DNS only") would leave the site IPv6-only. **Don't do Step 7 until Cloudflare shows the domain as Active.**

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
    listen [::]:80;   # IPv6 — required: Cloudflare reaches this VPS over IPv6 only
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

Verify locally on the VPS (the domain won't resolve here until Step 4 is Active):

```bash
curl -I http://localhost/      # expect 200 OK
curl -6 -I http://localhost/   # expect 200 OK — confirms the IPv6 listener
```

## Step 7 — HTTPS via Cloudflare (free, no certbot)

HTTPS is terminated at Cloudflare's edge, so there's nothing to install on the VPS.

In Cloudflare → your domain → **SSL/TLS**:

1. **Overview** → set encryption mode to **Flexible** (visitor→Cloudflare is HTTPS; Cloudflare→VPS is plain HTTP on port 80).
2. **Edge Certificates** → enable **Always Use HTTPS** (redirects `http://` visitors).

Verify from your laptop: `https://yourdomain.com` shows the padlock (response headers will say `server: cloudflare` — normal, it's proxying).

> **Later upgrade (optional):** switch to **Full (strict)** — generate a free 15-year Origin Certificate under SSL/TLS → Origin Server, install it in Nginx with a `listen [::]:443 ssl;` block. Encrypts the Cloudflare→VPS leg too. Flexible is fine to launch.

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
| `VPS_HOST` | the same host/IP/port you use for `ssh` from your laptop |
| `VPS_USER` | `nandes`                                     |
| `VPS_KEY`  | contents of `~/.ssh/portfolio_deploy` (the **private** key) |

> **Gotcha:** GitHub-hosted runners have **no IPv6**. If your SSH access is via the VPS's IPv6 address, the workflow can't connect — test with a manual run first. Workarounds: 8labs' NAT'd SSH port on the shared IPv4 (if your plan has one), or a Cloudflare Tunnel.

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
- [ ] Cloudflare account, domain added, GoDaddy nameservers switched
- [ ] Cloudflare AAAA records (`@`, `www`) → VPS IPv6, proxied (orange cloud)
- [ ] Generate VPS SSH key, add as GitHub deploy key
- [ ] Clone repo on VPS via SSH, `npm ci && npm run build`
- [ ] rsync `dist/` to `/var/www/portfolio`
- [ ] Nginx site config (with `listen [::]:80`) + reload
- [ ] Cloudflare SSL: Flexible mode + Always Use HTTPS
- [ ] Create `~/deploy.sh` for one-command redeploys
- [ ] (Later) GitHub Actions workflow + secrets for auto-deploy
