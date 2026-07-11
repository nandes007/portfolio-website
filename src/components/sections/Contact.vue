<script setup>
import { Mail, Phone, Github, Linkedin } from "lucide-vue-next";
import { profile } from "../../data/profile";
import Button from "../ui/Button.vue";
import { useReveal } from "../../composables/useReveal";

const { el, visible } = useReveal();
</script>

<template>
  <section
    id="contact"
    ref="el"
    class="mx-auto max-w-2xl px-6 py-32 text-center transition-all duration-700 ease-out"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
  >
    <p class="font-mono text-sm text-accent">05. What's next?</p>
    <h2 class="mt-4 text-4xl font-bold md:text-5xl">Get In Touch</h2>
    <p class="mx-auto mt-5 max-w-md leading-relaxed text-muted">
      I'm currently open to new opportunities and interesting problems. Whether you have a role in
      mind or just want to talk systems design, my inbox is always open.
    </p>

    <div class="mt-10">
      <Button :href="`mailto:${profile.email}`" variant="primary">
        <Mail :size="18" /> Say hello
      </Button>
    </div>

    <div class="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 font-mono text-xs text-muted">
      <a :href="`mailto:${profile.email}`" class="inline-flex items-center gap-2 transition-colors hover:text-accent">
        <Mail :size="14" /> {{ profile.email }}
      </a>
      <span class="inline-flex items-center gap-2">
        <Phone :size="14" /> {{ profile.phone }}
      </span>
      <a :href="profile.linkedin" target="_blank" rel="noopener" class="inline-flex items-center gap-2 transition-colors hover:text-accent">
        <Linkedin :size="14" /> LinkedIn
      </a>
      <a :href="profile.github" target="_blank" rel="noopener" class="inline-flex items-center gap-2 transition-colors hover:text-accent">
        <Github :size="14" /> GitHub
      </a>
    </div>
  </section>
</template>
