<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { Menu, X } from "lucide-vue-next";
import { profile } from "../../data/profile";

const links = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const scrolled = ref(false);
const hidden = ref(false);
const progress = ref(0);
const menuOpen = ref(false);
const active = ref("");

let lastY = 0;
let spy;

function onScroll() {
  const y = window.scrollY;
  scrolled.value = y > 20;
  hidden.value = y > 120 && y > lastY && !menuOpen.value;
  lastY = y;

  const max = document.documentElement.scrollHeight - window.innerHeight;
  progress.value = max > 0 ? (y / max) * 100 : 0;
}

onMounted(() => {
  window.addEventListener("scroll", onScroll, { passive: true });

  spy = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) active.value = `#${entry.target.id}`;
      }
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  links.forEach((l) => {
    const el = document.querySelector(l.href);
    if (el) spy.observe(el);
  });
});

onUnmounted(() => {
  window.removeEventListener("scroll", onScroll);
  spy?.disconnect();
});
</script>

<template>
  <header
    class="fade-down fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="[
      scrolled ? 'border-b border-line bg-bg/80 shadow-lg shadow-black/20 backdrop-blur-md' : 'bg-transparent',
      hidden ? '-translate-y-full' : 'translate-y-0',
    ]"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#" class="font-mono text-lg font-medium text-heading">
        <span class="text-accent">&lt;</span>FS<span class="text-accent">/&gt;</span>
      </a>

      <ul class="hidden items-center gap-7 md:flex">
        <li v-for="(link, i) in links" :key="link.href">
          <a
            :href="link.href"
            class="font-mono text-xs transition-colors duration-200 hover:text-accent"
            :class="active === link.href ? 'text-accent' : 'text-muted'"
          >
            <span class="text-accent">0{{ i + 1 }}.</span> {{ link.label }}
          </a>
        </li>
      </ul>

      <a
        :href="profile.resumeUrl"
        target="_blank"
        rel="noopener"
        class="hidden rounded-lg border border-accent/60 px-4 py-2 font-mono text-xs text-accent transition-all duration-300 hover:bg-accent/10 md:inline-block"
      >
        Resume
      </a>

      <button class="text-heading md:hidden" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <X v-if="menuOpen" :size="24" />
        <Menu v-else :size="24" />
      </button>
    </nav>

    <div
      class="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-accent to-accent-2 transition-[width] duration-150"
      :style="{ width: `${progress}%` }"
    />

    <div v-if="menuOpen" class="border-b border-line bg-bg/95 px-6 pb-6 backdrop-blur-md md:hidden">
      <ul class="flex flex-col gap-4">
        <li v-for="(link, i) in links" :key="link.href">
          <a
            :href="link.href"
            class="block font-mono text-sm text-muted hover:text-accent"
            @click="menuOpen = false"
          >
            <span class="text-accent">0{{ i + 1 }}.</span> {{ link.label }}
          </a>
        </li>
        <li>
          <a :href="profile.resumeUrl" target="_blank" rel="noopener" class="block font-mono text-sm text-accent">
            Resume ↗
          </a>
        </li>
      </ul>
    </div>
  </header>
</template>
