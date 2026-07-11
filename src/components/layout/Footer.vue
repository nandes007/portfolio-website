<script setup>
const year = new Date().getFullYear();
</script>

<template>
  <footer class="border-t border-line py-8 text-center">
    <p class="font-mono text-xs text-muted">
      <span class="text-accent">$</span> designed &amp; built by Fernandes Simanjuntak — © {{ year }}
    </p>
    <p class="mt-1 font-mono text-[11px] text-muted/60">Vue · Tailwind CSS · deployed on Cloudflare</p>
  </footer>
</template>
