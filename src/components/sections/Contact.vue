<script setup>
import { Mail, Phone, Github, Linkedin } from "lucide-vue-next";
import { profile } from "../../data/profile";
import SectionTitle from "../ui/SectionTitle.vue";
import Button from "../ui/Button.vue";
import { useReveal } from "../../composables/useReveal";

const { el, visible } = useReveal();
</script>

<template>
  <section
    id="contact"
    ref="el"
    class="mx-auto max-w-2xl px-6 py-24 text-center transition-all duration-700 ease-out"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <SectionTitle title="Get In Touch" subtitle="Open to new opportunities and challenges" />

    <Button :href="`mailto:${profile.email}`" variant="primary">
      <Mail :size="18" /> Say Hello
    </Button>

    <div class="mt-10 flex flex-col items-center gap-3 text-sm text-muted">
      <a :href="`mailto:${profile.email}`" class="inline-flex items-center gap-2 hover:text-text">
        <Mail :size="16" /> {{ profile.email }}
      </a>
      <span class="inline-flex items-center gap-2">
        <Phone :size="16" /> {{ profile.phone }}
      </span>
      <a :href="profile.linkedin" target="_blank" rel="noopener" class="inline-flex items-center gap-2 hover:text-text">
        <Linkedin :size="16" /> LinkedIn
      </a>
      <a :href="profile.github" target="_blank" rel="noopener" class="inline-flex items-center gap-2 hover:text-text">
        <Github :size="16" /> GitHub
      </a>
    </div>
  </section>

</template>
