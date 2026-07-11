<script setup>
import { Github, Linkedin, Mail } from "lucide-vue-next";
import { profile } from "../../data/profile";
</script>

<template>
  <div class="fixed bottom-0 left-8 z-40 hidden flex-col items-center gap-5 lg:flex">
    <a
      :href="profile.github"
      target="_blank"
      rel="noopener"
      aria-label="GitHub"
      class="text-muted transition-all duration-200 hover:-translate-y-1 hover:text-accent"
    >
      <Github :size="20" />
    </a>
    <a
      :href="profile.linkedin"
      target="_blank"
      rel="noopener"
      aria-label="LinkedIn"
      class="text-muted transition-all duration-200 hover:-translate-y-1 hover:text-accent"
    >
      <Linkedin :size="20" />
    </a>
    <a
      :href="`mailto:${profile.email}`"
      aria-label="Email"
      class="text-muted transition-all duration-200 hover:-translate-y-1 hover:text-accent"
    >
      <Mail :size="20" />
    </a>
    <span class="h-24 w-px bg-line" />
  </div>

  <div class="fixed bottom-0 right-8 z-40 hidden flex-col items-center gap-6 lg:flex">
    <a
      :href="`mailto:${profile.email}`"
      class="font-mono text-xs tracking-widest text-muted transition-all duration-200 hover:-translate-y-1 hover:text-accent"
      style="writing-mode: vertical-rl"
    >
      {{ profile.email }}
    </a>
    <span class="h-24 w-px bg-line" />
  </div>
</template>
