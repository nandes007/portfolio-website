<script setup>
defineProps({
  label: { type: String, required: true },
});
</script>

<template>
  <span
    class="inline-block rounded-full border border-white/10 bg-surface px-4 py-1.5 text-sm text-text"
  >
    {{ label }}
  </span>
</template>
