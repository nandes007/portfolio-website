<script setup>
import { skills } from "../../data/profile";
import { techIcons } from "../../data/techIcons";
import SectionTitle from "../ui/SectionTitle.vue";
import { useReveal } from "../../composables/useReveal";

const { el, visible } = useReveal();
</script>

<template>
  <section
    id="skills"
    ref="el"
    class="mx-auto max-w-5xl px-6 py-24 transition-all duration-700 ease-out"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
  >
    <SectionTitle number="02" title="Skills" subtitle="Technologies I work with every day" />

    <div class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7">
      <div
        v-for="(skill, i) in skills"
        :key="skill"
        class="group flex flex-col items-center gap-2.5 rounded-lg border border-line bg-surface px-3 py-5 transition-all duration-300 ease-out hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-[0_12px_30px_-12px_rgba(94,234,212,0.25)]"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'"
        :style="{ transitionDelay: visible ? `${i * 45}ms` : '0ms' }"
      >
        <span
          v-if="techIcons[skill]"
          class="h-8 w-8 text-muted transition-colors duration-300 group-hover:text-accent [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current"
          v-html="techIcons[skill]"
        />
        <span
          v-else
          class="flex h-8 w-8 items-center justify-center font-mono text-lg text-muted transition-colors duration-300 group-hover:text-accent"
        >{{ skill.slice(0, 2) }}</span>
        <span class="text-center font-mono text-[11px] text-muted transition-colors duration-300 group-hover:text-text">
          {{ skill }}
        </span>
      </div>
    </div>
  </section>
</template>
