<script setup>
defineProps({
  number: { type: String, default: "" },
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  align: { type: String, default: "left" }, // "left" | "center"
});
</script>

<template>
  <div class="mb-12" :class="align === 'center' ? 'text-center' : ''">
    <div class="flex items-center gap-4" :class="align === 'center' ? 'justify-center' : ''">
      <h2 class="whitespace-nowrap text-2xl font-bold md:text-3xl">
        <span v-if="number" class="mr-2 font-mono text-lg font-normal text-accent md:text-xl">{{ number }}.</span>{{ title }}
      </h2>
      <span v-if="align !== 'center'" class="h-px w-full max-w-xs bg-line" />
    </div>
    <p v-if="subtitle" class="mt-2 text-muted">{{ subtitle }}</p>
  </div>
</template>
