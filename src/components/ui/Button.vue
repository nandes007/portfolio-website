<script setup>
defineProps({
  variant: { type: String, default: "primary" }, // "primary" | "ghost"
  href: { type: String, default: "" },
});

const base =
  "inline-flex items-center gap-2 rounded-lg px-6 py-3 font-medium transition-colors duration-200";
const variants = {
  primary: "bg-primary text-white hover:bg-primary/90",
  ghost: "border border-white/15 text-text hover:bg-white/5",
};
</script>

<template>
  <a
    v-if="href"
    :href="href"
    :class="[base, variants[variant]]"
    :target="href.startsWith('http') ? '_blank' : undefined"
    :rel="href.startsWith('http') ? 'noopener' : undefined"
  >
    <slot />
  </a>
  <button v-else :class="[base, variants[variant]]">
    <slot />
  </button>
</template>
