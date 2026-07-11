<script setup>
defineProps({
  variant: { type: String, default: "primary" }, // "primary" | "ghost"
  href: { type: String, default: "" },
});

const base =
  "inline-flex items-center gap-2 rounded-lg px-6 py-3 font-mono text-sm transition-all duration-300";
const variants = {
  primary:
    "border border-accent/60 text-accent hover:bg-accent/10 hover:shadow-[0_0_25px_-5px_rgba(94,234,212,0.4)]",
  ghost: "border border-line text-text hover:border-muted hover:bg-white/5",
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
