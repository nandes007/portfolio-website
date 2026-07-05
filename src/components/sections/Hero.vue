<script setup>
import { Github, Linkedin, Mail } from "lucide-vue-next";
import { profile } from "../../data/profile";
import Button from "../ui/Button.vue";
import { useReveal } from "../../composables/useReveal";

const { el, visible } = useReveal();
</script>

<template>
  <section
    id="hero"
    ref="el"
    class="relative flex min-h-screen items-center overflow-hidden px-6 pt-24"
  >
    <div
      class="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
    />

    <div
      class="relative mx-auto max-w-4xl text-center transition-all duration-700 ease-out"
      :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
    >
      <h1 class="text-4xl md:text-6xl font-bold text-text">{{ profile.name }}</h1>
      <p class="mt-4 text-lg md:text-xl text-primary font-medium">{{ profile.role }}</p>
      <p class="mt-6 max-w-2xl mx-auto text-muted">{{ profile.summary }}</p>

      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button href="#projects" variant="primary">View Work</Button>
        <Button :href="profile.resumeUrl" variant="ghost">Download Resume</Button>
      </div>

      <div class="mt-10 flex items-center justify-center gap-6">
        <a :href="profile.github" target="_blank" rel="noopener" aria-label="GitHub" class="text-muted hover:text-text">
          <Github :size="22" />
        </a>
        <a :href="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn" class="text-muted hover:text-text">
          <Linkedin :size="22" />
        </a>
        <a :href="`mailto:${profile.email}`" aria-label="Email" class="text-muted hover:text-text">
          <Mail :size="22" />
        </a>
      </div>
    </div>
  </section>

</template>
