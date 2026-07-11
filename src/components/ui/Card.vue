<script setup>
import { ref } from "vue";

const card = ref(null);
const off = { x: -999, y: -999 };
const pos = ref(off);

function onMove(e) {
  const r = card.value.getBoundingClientRect();
  pos.value = { x: e.clientX - r.left, y: e.clientY - r.top };
}
</script>

<template>
  <div
    ref="card"
    class="group relative flex flex-col overflow-hidden rounded-xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[0_20px_50px_-20px_rgba(94,234,212,0.15)]"
    @mousemove="onMove"
    @mouseleave="pos = off"
  >
    <div
      class="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
      :style="{
        background: `radial-gradient(340px circle at ${pos.x}px ${pos.y}px, rgba(94,234,212,0.07), transparent 70%)`,
      }"
    />
    <div class="relative flex flex-1 flex-col">
      <slot />
    </div>
  </div>
</template>
