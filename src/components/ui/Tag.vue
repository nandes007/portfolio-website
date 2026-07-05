<script setup>
import { techIcons } from "../../data/techIcons";

const props = defineProps({
  label: { type: String, required: true },
});

const icon = techIcons[props.label];
</script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-surface px-4 py-1.5 text-sm text-text"
  >
    <span v-if="icon" class="h-4 w-4 [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current" v-html="icon" />
    {{ label }}
  </span>
</template>
