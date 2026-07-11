<script setup>
import { MapPin } from "lucide-vue-next";
import { profile, experiences, skills } from "../../data/profile";
import SectionTitle from "../ui/SectionTitle.vue";
import { useReveal } from "../../composables/useReveal";

const { el, visible } = useReveal();

const companyCount = new Set(experiences.map((e) => e.company)).size;

const stats = [
  { label: "Years of experience", value: profile.experienceYears },
  { label: "Companies", value: `${companyCount}` },
  { label: "Technologies", value: `${skills.length}+` },
];
</script>

<template>
  <section
    id="about"
    ref="el"
    class="mx-auto max-w-5xl px-6 py-24 transition-all duration-700 ease-out"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
  >
    <SectionTitle number="01" title="About Me" />

    <div class="grid gap-12 md:grid-cols-[1.5fr_1fr]">
      <div>
        <p class="text-lg leading-relaxed text-muted">{{ profile.summary }}</p>
        <p class="mt-6 inline-flex items-center gap-2 font-mono text-sm text-muted">
          <MapPin :size="16" class="text-accent" />
          {{ profile.location }}
        </p>
      </div>

      <div class="flex flex-col gap-6 border-l border-line pl-8">
        <div v-for="(stat, i) in stats" :key="stat.label" class="relative">
          <span class="absolute -left-9.25 top-2 h-2 w-2 rounded-full bg-accent" />
          <p class="font-heading text-3xl font-bold text-accent md:text-4xl">{{ stat.value }}</p>
          <p class="mt-1 font-mono text-xs uppercase tracking-wider text-muted">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
