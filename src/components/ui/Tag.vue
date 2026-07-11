<script setup>
import { techIcons } from "../../data/techIcons";

const props = defineProps({
  label: { type: String, required: true },
});

const icon = techIcons[props.label];
</script>

<template>
  <span
    class="inline-flex items-center gap-1.5 rounded-full border border-accent/15 bg-accent/5 px-3 py-1 font-mono text-xs text-accent"
  >
    <span v-if="icon" class="h-3.5 w-3.5 [&>svg]:h-full [&>svg]:w-full [&>svg]:fill-current" v-html="icon" />
    {{ label }}
  </span>
</template>
