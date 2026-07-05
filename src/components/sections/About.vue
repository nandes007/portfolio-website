<script setup>
import { MapPin } from "lucide-vue-next";
import { profile, experiences, skills } from "../../data/profile";
import SectionTitle from "../ui/SectionTitle.vue";
import { useReveal } from "../../composables/useReveal";

const { el, visible } = useReveal();

const companyCount = new Set(experiences.map((e) => e.company)).size;

const stats = [
  { label: "Years Experience", value: profile.experienceYears },
  { label: "Companies", value: `${companyCount}` },
  { label: "Technologies", value: `${skills.length}+` },
];
</script>

<template>
  <section
    id="about"
    ref="el"
    class="mx-auto max-w-4xl px-6 py-24 transition-all duration-700 ease-out"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <SectionTitle title="About Me" />

    <p class="text-center text-lg text-muted leading-relaxed">{{ profile.summary }}</p>

    <div class="mt-6 flex items-center justify-center gap-2 text-muted">
      <MapPin :size="18" />
      <span>{{ profile.location }}</span>
    </div>

    <div class="mt-12 grid grid-cols-3 gap-6 text-center">
      <div v-for="stat in stats" :key="stat.label">
        <p class="text-3xl md:text-4xl font-bold text-primary">{{ stat.value }}</p>
        <p class="mt-1 text-sm text-muted">{{ stat.label }}</p>
      </div>
    </div>
  </section>
</template>
