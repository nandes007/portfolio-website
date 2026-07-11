<script setup>
import { Github, ExternalLink, Folder } from "lucide-vue-next";
import { projects } from "../../data/profile";
import SectionTitle from "../ui/SectionTitle.vue";
import Card from "../ui/Card.vue";
import Tag from "../ui/Tag.vue";
import { useReveal } from "../../composables/useReveal";

const { el, visible } = useReveal();
</script>

<template>
  <section
    id="projects"
    ref="el"
    class="mx-auto max-w-5xl px-6 py-24 transition-all duration-700 ease-out"
    :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'"
  >
    <SectionTitle number="04" title="Projects" subtitle="Things I've built on my own time" />

    <div class="grid gap-6 sm:grid-cols-2">
      <Card
        v-for="(project, i) in projects"
        :key="project.name"
        class="transition-all duration-700 ease-out"
        :class="visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'"
        :style="{ transitionDelay: visible ? `${i * 120}ms` : '0ms' }"
      >
        <div class="flex items-start justify-between">
          <Folder :size="36" class="text-accent" :stroke-width="1.25" />
          <div class="flex items-center gap-4">
            <a
              :href="project.github"
              target="_blank"
              rel="noopener"
              aria-label="Source code on GitHub"
              class="text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-accent"
            >
              <Github :size="20" />
            </a>
            <a
              v-if="project.demo"
              :href="project.demo"
              target="_blank"
              rel="noopener"
              aria-label="Live demo"
              class="text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-accent"
            >
              <ExternalLink :size="20" />
            </a>
          </div>
        </div>

        <h3 class="mt-5 text-lg font-semibold transition-colors duration-300 group-hover:text-accent">
          <a :href="project.github" target="_blank" rel="noopener">{{ project.name }}</a>
        </h3>
        <p class="mt-2 flex-1 text-sm leading-relaxed text-muted">{{ project.description }}</p>

        <div class="mt-5 flex flex-wrap gap-2">
          <Tag v-for="tag in project.tags" :key="tag" :label="tag" />
        </div>
      </Card>
    </div>

    <p class="mt-10 text-center">
      <a
        :href="`https://github.com/nandes007?tab=repositories`"
        target="_blank"
        rel="noopener"
        class="font-mono text-sm text-accent transition-opacity hover:opacity-80"
      >
        more on github →
      </a>
    </p>
  </section>
</template>
