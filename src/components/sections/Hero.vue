<script setup>
import { Github, Linkedin, Mail } from "lucide-vue-next";
import { profile } from "../../data/profile";
import Button from "../ui/Button.vue";
import { useReveal } from "../../composables/useReveal";
import { useTypewriter } from "../../composables/useTypewriter";

const { el, visible } = useReveal();
const { text: typed } = useTypewriter([
  "scalable backends.",
  "event-driven systems.",
  "APIs teams rely on.",
  "real-time data pipelines.",
]);
</script>

<template>
  <section id="hero" ref="el" class="relative flex min-h-screen items-center overflow-hidden px-6 pt-24">
    <div
      class="pointer-events-none absolute -top-32 right-[10%] h-96 w-96 rounded-full bg-accent/10 blur-3xl"
      style="animation: drift 14s ease-in-out infinite"
    />
    <div
      class="pointer-events-none absolute bottom-[10%] left-[5%] h-80 w-80 rounded-full bg-accent-2/10 blur-3xl"
      style="animation: drift 18s ease-in-out infinite reverse"
    />

    <div class="relative mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
      <div
        class="transition-all duration-700 ease-out"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <p class="font-mono text-sm text-accent">Hi, my name is</p>

        <h1
          class="mt-4 bg-linear-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-4xl font-bold text-transparent md:text-6xl"
        >
          Fernandes Simanjuntak.
        </h1>

        <h2 class="mt-3 text-2xl font-semibold text-muted md:text-4xl">
          I build
          <span class="text-heading">{{ typed }}</span><span
            class="ml-0.5 inline-block h-[0.9em] w-0.75 translate-y-1 bg-accent"
            style="animation: blink 1.1s step-end infinite"
          />
        </h2>

        <p class="mt-6 max-w-xl leading-relaxed text-muted">
          Software engineer with {{ profile.experienceYears }} years of experience turning ambiguous
          problems into resilient, well-tested systems — from event-driven architectures on Kafka to
          APIs that teams depend on every day.
        </p>

        <div class="mt-10 flex flex-wrap items-center gap-4">
          <Button href="#projects" variant="primary">View my work</Button>
          <Button :href="profile.resumeUrl" variant="ghost">Download resume</Button>
        </div>

        <div class="mt-10 flex items-center gap-6 lg:hidden">
          <a :href="profile.github" target="_blank" rel="noopener" aria-label="GitHub" class="text-muted hover:text-accent">
            <Github :size="22" />
          </a>
          <a :href="profile.linkedin" target="_blank" rel="noopener" aria-label="LinkedIn" class="text-muted hover:text-accent">
            <Linkedin :size="22" />
          </a>
          <a :href="`mailto:${profile.email}`" aria-label="Email" class="text-muted hover:text-accent">
            <Mail :size="22" />
          </a>
        </div>
      </div>

      <div
        class="hidden transition-all delay-200 duration-700 ease-out lg:block"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
      >
        <div class="overflow-hidden rounded-xl border border-line bg-surface shadow-2xl shadow-black/40">
          <div class="flex items-center gap-2 border-b border-line px-4 py-3">
            <span class="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span class="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span class="h-3 w-3 rounded-full bg-[#28c840]" />
            <span class="ml-3 font-mono text-xs text-muted">fernandes@dev ~ zsh</span>
          </div>
          <pre class="overflow-x-auto p-5 font-mono text-[13px] leading-relaxed"><code><span class="text-accent">$</span> <span class="text-heading">whoami</span>
<span class="text-accent-2">{</span>
  <span class="text-accent">"role"</span>:     <span class="text-text">"Software Engineer"</span>,
  <span class="text-accent">"focus"</span>:    [<span class="text-text">"backend"</span>, <span class="text-text">"distributed systems"</span>],
  <span class="text-accent">"stack"</span>:    [<span class="text-text">"Laravel"</span>, <span class="text-text">"Go"</span>, <span class="text-text">"Java"</span>, <span class="text-text">"Kafka"</span>],
  <span class="text-accent">"location"</span>: <span class="text-text">"Jakarta, Indonesia"</span>,
  <span class="text-accent">"status"</span>:   <span class="text-text">"open to opportunities"</span>
<span class="text-accent-2">}</span>
<span class="text-accent">$</span> <span class="inline-block h-3.5 w-2 translate-y-0.5 bg-accent" style="animation: blink 1.1s step-end infinite" /></code></pre>
        </div>
      </div>
    </div>

    <a
      href="#about"
      aria-label="Scroll to about"
      class="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-muted transition-colors hover:text-accent md:block"
    >
      <svg width="20" height="30" viewBox="0 0 20 30" fill="none" class="animate-bounce">
        <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" stroke-width="1.5" />
        <circle cx="10" cy="9" r="2.5" fill="currentColor" />
      </svg>
    </a>
  </section>
</template>
