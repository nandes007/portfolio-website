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
    class="relative pl-8 pb-12 last:pb-0 border-l border-white/10 transition-all duration-700 ease-out"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <span class="absolute -left-[7px] top-1 h-3.5 w-3.5 rounded-full bg-primary" />

    <p class="text-sm text-muted">{{ exp.period }}</p>
    <h3 class="mt-1 text-lg font-semibold text-text">{{ exp.role }}</h3>
    <p class="text-primary text-sm">{{ exp.company }} &middot; {{ exp.location }}</p>

    <ul class="mt-3 space-y-2 text-sm text-muted list-disc list-inside">
      <li v-for="bullet in exp.bullets" :key="bullet">{{ bullet }}</li>
    </ul>
  </div>

</template>
