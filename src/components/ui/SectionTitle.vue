<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
});
</script>

<template>
  <div class="mb-10 text-center">
    <h2 class="text-3xl md:text-4xl font-bold text-text">{{ title }}</h2>
    <p v-if="subtitle" class="mt-2 text-muted">{{ subtitle }}</p>
  </div>
</template>
