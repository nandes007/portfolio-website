# Portfolio Website Modernization — Implementation Plan

**Goal:** Rebuild the current static site (HTML + vanilla JS + plain CSS) into a modern, responsive, animated portfolio using **Vue 3 + Vite + Tailwind CSS**, with scroll-triggered fade-in animations.

**Audience for this doc:** a junior dev or a cheaper AI model. Each task is small and checkable. Do them top to bottom.

---

## 0. Stack decision (read first)

- **Framework:** Vue 3 (Composition API, `<script setup>`) + Vite.
- **Styling:** Tailwind CSS. No Bootstrap, no custom CSS files except one small `main.css` for Tailwind directives + a few globals.
- **Scroll animations:** use the native **Intersection Observer API** via one small composable. Do NOT add GSAP or AOS — it's ~10 lines of code and one dependency saved.
- **Icons:** `lucide-vue-next` (tree-shakeable, one dependency).
- **Fonts:** Google Fonts — `Inter` for body, `Sora` (or `Space Grotesk`) for headings.

> Note: a portfolio is content, not an app. Vue is optional — plain HTML+Tailwind or Astro would be lighter. But since Vue was requested, this plan uses it. If you'd rather stay dependency-light, skip Vue and just use Vite + Tailwind + one JS file; the section/content structure below still applies.

---

## 1. Project setup

- [ ] Move the current site into a `legacy/` folder (keep it as reference, don't delete yet).
- [ ] Scaffold new app at repo root:
  ```bash
  npm create vite@latest . -- --template vue
  npm install
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  npm install lucide-vue-next
  ```
- [ ] Configure Tailwind `content: ["./index.html", "./src/**/*.{vue,js}"]`.
- [ ] Add Google Fonts `<link>` in `index.html` and map them in `tailwind.config.js` under `theme.extend.fontFamily`.
- [ ] Copy assets from `legacy/images/` into `public/` (profile.png, favicon.png, portfolio images, resume.pdf).

### Folder structure
```
src/
  assets/            # css, static imports
    main.css         # @tailwind directives + globals
  components/
    ui/              # small reusable bits (Button, SectionTitle, Card, Tag)
    layout/          # Navbar.vue, Footer.vue
    sections/        # Hero, About, Skills, Experience, Projects, Contact
  composables/
    useReveal.js     # Intersection Observer scroll animation
  data/
    profile.js       # all CV content lives here (single source of truth)
  App.vue
  main.js
```

---

## 2. Content data file (`src/data/profile.js`)

Put ALL content here as plain objects so content edits never touch components. Fill with the CV below.

```js
export const profile = {
  name: "Fernandes Ariadi Simanjuntak",
  role: "Software Engineer — Full Stack",
  location: "West Jakarta, DKI Jakarta",
  email: "nandessimanjuntak1803@gmail.com",
  linkedin: "https://www.linkedin.com/in/fernandessimanjuntak/",
  github: "https://github.com/nandes007",
  resumeUrl: "/resume.pdf",
  summary:
    "I am a software engineer focused on full stack development. I'm not limited to my current stack and am open to learning new technologies and taking on new challenges.",
};

export const skills = [
  "PHP", "Laravel", "Java", "JavaScript", "Node.js", "Golang",
  "PostgreSQL", "Redis", "Elasticsearch", "Apache Kafka",
  "Apache Flink", "Protocol Buffer", "gRPC",
];

export const experiences = [
  {
    role: "Software Engineer",
    company: "PT. Tiki Jalur Nugraha Ekakurir (JNE)",
    location: "West Jakarta, Jakarta",
    period: "08/2024 – Present",
    bullets: [
      "Upgraded Laravel framework from v6.x to v12.x.",
      "Designed and developed robust, scalable RESTful APIs using Laravel.",
      "Engineered an event-driven architecture using Apache Kafka and Protocol Buffers for real-time event processing.",
      "Built an ETL pipeline with Java, Apache Kafka, and Apache Flink, storing processed data into an OLAP database for real-time analytics.",
      "Developed middleware for seamless data integration between legacy and new systems during migration.",
      "Implemented comprehensive unit and integration testing.",
    ],
  },
  {
    role: "Software Engineer (Freelance)",
    company: "PT. Vixpro Digital Teknologi",
    location: "South Jakarta, Jakarta",
    period: "04/2025 – 11/2025",
    bullets: [
      "Architected a multi-tier backoffice payment gateway with automated fee distribution and cascading commission logic.",
      "Integrated a blockchain payment gateway (CAMP Investment Technologies) with webhook-driven reconciliation.",
      "Built an automated monthly reconciliation engine and pooled balance management with idempotent, fault-tolerant processing.",
    ],
  },
  {
    role: "Software Engineer (Freelance)",
    company: "PT. Klik Digital Sinergi",
    location: "South Jakarta, Jakarta",
    period: "09/2024 – 01/2025",
    bullets: [
      "Built a Points Management API ecosystem for Telkomsel agents with a multi-level referral architecture and automated commission distribution.",
      "Integrated a LinkAja e-wallet pipeline for point-to-fiat conversion with a 99.8% redemption success rate via exponential backoff retries.",
      "Optimized DB schema and indexing for audit logging with fault-tolerant transaction handling.",
    ],
  },
  {
    role: "Software Engineer",
    company: "PT. Global Putera Asia",
    location: "South Jakarta, Jakarta",
    period: "10/2022 – 08/2024",
    bullets: [
      "Designed and built a comprehensive Inventory Management System with master data, real-time stock tracking, and cycle count workflows.",
      "Developed an HHT mobile app for warehouse stock opname via barcode scanning with offline/online sync.",
      "Engineered a high-throughput POS system with offline resilience.",
      "Implemented a Finance Module: fixed asset depreciation, automated journal entries, GL ledger reporting.",
      "Optimized complex SQL queries and indexing for large datasets.",
      "Mentored junior engineers via code review, architecture discussions, and pairing.",
    ],
  },
  {
    role: "Information Technology",
    company: "PT. Gelael Supermarket",
    location: "South Jakarta, Jakarta",
    period: "06/2019 – 09/2022",
    bullets: [
      "Designed and developed a membership web application for customer registration and account management.",
      "Built member portal features: real-time points tracking, transaction history, personalized dashboards.",
      "Acted as technical liaison between the development vendor and management.",
      "Led multi-branch rollout and staff training.",
      "Established documentation for feedback, bug reports, and feature requests.",
    ],
  },
];

// TODO: replace demo/description with real content later
export const projects = [
  {
    name: "Meeting Room Booking",
    description: "PLACEHOLDER — add real description.",
    tags: ["PLACEHOLDER"],
    github: "https://github.com/nandes007/meeting-room-booking",
    demo: "", // add when deployed
  },
  {
    name: "Chinese Translator",
    description: "PLACEHOLDER — add real description.",
    tags: ["PLACEHOLDER"],
    github: "https://github.com/nandes007/chinese-translator",
    demo: "", // add when deployed
  },
];

export const education = [
  {
    school: "STMIK Jakarta STI&K",
    degree: "Sistem Informasi",
    detail: "GPA 3.12",
    period: "",
  },
];

export const languages = ["Indonesia", "English"];
```

---

## 3. Scroll-reveal composable (`src/composables/useReveal.js`)

One reusable directive-like hook using Intersection Observer. Every section uses it for fade-in-on-scroll.

```js
import { onMounted, onUnmounted, ref } from "vue";

export function useReveal(options = { threshold: 0.15 }) {
  const el = ref(null);
  const visible = ref(false);
  let observer;

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true;
        observer.disconnect(); // reveal once, then stop
      }
    }, options);
    if (el.value) observer.observe(el.value);
  });

  onUnmounted(() => observer?.disconnect());
  return { el, visible };
}
```

Usage in any section:
```html
<script setup>
import { useReveal } from "@/composables/useReveal";
const { el, visible } = useReveal();
</script>

<template>
  <section ref="el"
    :class="['transition-all duration-700 ease-out',
             visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8']">
    ...
  </section>
</template>
```

> For staggered lists (e.g. skill tags appearing one by one), add `:style="{ transitionDelay: i * 60 + 'ms' }"` on each item.

---

## 4. Design system (Tailwind config)

- [ ] Define a color palette in `tailwind.config.js` `theme.extend.colors`:
  - Dark, modern theme (recommended for "impressive" first impression).
  - Suggested: background `#0B1120` (slate-950-ish), surface `#111827`, primary accent `#6366F1` (indigo) or `#22D3EE` (cyan), text `#E5E7EB`, muted `#94A3B8`.
  - Pick a real palette from coolors.co if you want; keep it to ~5 colors.
- [ ] Support both light and dark via `darkMode: 'class'` **only if time allows** — otherwise ship dark-only first.
- [ ] Global styles in `main.css`: smooth scroll (`html { scroll-behavior: smooth; }`), base font, selection color.

---

## 5. Sections to build (in order)

Each is a component in `src/components/sections/`. All read from `profile.js`. All wrapped in `useReveal`.

1. **Navbar** (`layout/Navbar.vue`)
   - Sticky, transparent → solid on scroll.
   - Logo/name on left, anchor links (About, Skills, Experience, Projects, Contact) on right.
   - Mobile: hamburger toggling a full-screen menu.
   - "Resume" button linking to `/resume.pdf`.

2. **Hero** (`sections/Hero.vue`)
   - Big heading: name + animated role.
   - Short tagline from `summary`.
   - Two CTAs: "View Work" (scroll to projects) + "Download Resume".
   - Social icons (GitHub, LinkedIn, Email).
   - Subtle background gradient/blur blobs. Profile image optional (rounded, with a glow ring).

3. **About** (`sections/About.vue`)
   - Full summary + location. Keep it short and confident.

4. **Skills** (`sections/Skills.vue`)
   - Grid/flex of skill tags/pills, staggered reveal.
   - Optional: group into Backend / Data & Messaging / Databases.

5. **Experience** (`sections/Experience.vue`)
   - Vertical timeline. Each entry: role, company, location, period, bullet list.
   - Reveal each card as it scrolls in.

6. **Projects** (`sections/Projects.vue`)
   - Card grid. Each card: name, description, tags, GitHub link, Demo link.
   - **Hide the Demo button when `demo === ""`** (so empty links don't show).
   - Hover: lift + subtle border glow.

7. **Contact / Footer** (`sections/Contact.vue` + `layout/Footer.vue`)
   - Email, phone, LinkedIn, GitHub as clickable links.
   - Simple mailto CTA button. (Skip a real form + backend for now — it needs a server/service. Add later with Formspree if wanted.)
   - Footer: copyright + built-with note.

> Education & Languages: put as a small strip inside About or Footer. Not worth a full section.

---

## 6. Reusable UI components (`src/components/ui/`)

Build these once, reuse everywhere. Keep them tiny.
- `SectionTitle.vue` — heading + optional subtitle, consistent spacing.
- `Tag.vue` — pill for skills/tech.
- `Button.vue` — primary/ghost variants via a `variant` prop.
- `Card.vue` — surface container with hover effect.

---

## 7. Responsiveness checklist

- [ ] Mobile-first: everything works at 375px width.
- [ ] Navbar collapses to hamburger below `md`.
- [ ] Grids: `grid-cols-1` mobile → `md:grid-cols-2` / `lg:grid-cols-3`.
- [ ] Hero text scales down on mobile (`text-4xl md:text-6xl`).
- [ ] Test at 375 / 768 / 1440px.

---

## 8. SEO & meta (in `index.html`)

- [ ] `<title>Fernandes Simanjuntak — Software Engineer</title>`
- [ ] `<meta name="description">` with a keyword-rich summary.
- [ ] Open Graph tags (`og:title`, `og:description`, `og:image`) for nice link previews.
- [ ] Favicon (reuse existing `favicon.png`).
- [ ] `alt` text on every image.
- [ ] One `<h1>` (hero name), logical `<h2>` per section.
- [ ] `lang="en"` on `<html>`.

---

## 9. Build & deploy

- [ ] `npm run build` → outputs `dist/`.
- [ ] Deploy free on **Vercel**, **Netlify**, or **GitHub Pages**. (Vercel = easiest for Vite.)
- [ ] After deploy, add live demo URLs into `projects[].demo` in `profile.js`.
- [ ] Once verified, delete the `legacy/` folder.

---

## 10. Definition of done

- [ ] All sections render from `profile.js` with no hardcoded content in components.
- [ ] Every section fades in on scroll.
- [ ] Fully responsive at 375 / 768 / 1440.
- [ ] Lighthouse: Performance & Accessibility ≥ 90.
- [ ] Deployed and reachable via a public URL.

---

## Content still TODO (ask owner later)
- Real descriptions + tech tags for the two projects.
- Any additional projects.
- Testimonials (skipped for now — no content yet; add a section when real quotes exist).
- Professional photo for hero (optional).
