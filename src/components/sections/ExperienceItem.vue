<script setup>
defineProps({
  exp: { type: Object, required: true },
});
import { useReveal } from "../../composables/useReveal";

const { el, visible } = useReveal();
</script>

<template>
  <div
    ref="el"
    class="group relative border-l border-line pb-12 pl-8 transition-all duration-700 ease-out last:pb-0 hover:border-accent/40"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
  >
    <span
      class="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-accent bg-bg transition-all duration-300 group-hover:bg-accent group-hover:shadow-[0_0_12px_rgba(94,234,212,0.6)]"
    />

    <p class="font-mono text-xs uppercase tracking-wider text-muted">{{ exp.period }}</p>
    <h3 class="mt-1.5 text-lg font-semibold transition-colors duration-300 group-hover:text-accent">
      {{ exp.role }}
    </h3>
    <p class="mt-0.5 font-mono text-sm text-accent/80">{{ exp.company }} · {{ exp.location }}</p>

    <ul class="mt-4 space-y-2.5 text-sm text-muted">
      <li v-for="bullet in exp.bullets" :key="bullet" class="flex gap-3">
        <span class="mt-0.5 shrink-0 text-accent">▹</span>
        <span>{{ bullet }}</span>
      </li>
    </ul>
  </div>
</template>
