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
const menuOpen = ref(false);

function onScroll() {
  scrolled.value = window.scrollY > 20;
}

onMounted(() => window.addEventListener("scroll", onScroll));
onUnmounted(() => window.removeEventListener("scroll", onScroll));
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="scrolled ? 'bg-bg/90 backdrop-blur border-b border-white/10' : 'bg-transparent'"
  >
    <nav class="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <a href="#" class="font-heading text-lg font-bold text-text">FS</a>

      <ul class="hidden md:flex items-center gap-8">
        <li v-for="link in links" :key="link.href">
          <a :href="link.href" class="text-sm text-muted hover:text-text transition-colors">
            {{ link.label }}
          </a>
        </li>
      </ul>

      <a
        :href="profile.resumeUrl"
        target="_blank"
        rel="noopener"
        class="hidden md:inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
      >
        Resume
      </a>

      <button class="md:hidden text-text" @click="menuOpen = !menuOpen" aria-label="Toggle menu">
        <X v-if="menuOpen" :size="24" />
        <Menu v-else :size="24" />
      </button>
    </nav>

    <div v-if="menuOpen" class="md:hidden bg-bg border-b border-white/10 px-6 pb-6">
      <ul class="flex flex-col gap-4">
        <li v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            class="block text-muted hover:text-text"
            @click="menuOpen = false"
          >
            {{ link.label }}
          </a>
        </li>
        <li>
          <a :href="profile.resumeUrl" target="_blank" rel="noopener" class="block text-primary">
            Resume
          </a>
        </li>
      </ul>
    </div>
  </header>

</template>
