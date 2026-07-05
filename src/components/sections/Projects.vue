<script setup>
import { Github, ExternalLink } from "lucide-vue-next";
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
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <SectionTitle title="Projects" />

    <div class="grid gap-6 sm:grid-cols-2">
      <Card v-for="project in projects" :key="project.name">
        <h3 class="text-lg font-semibold text-text">{{ project.name }}</h3>
        <p class="mt-2 text-sm text-muted">{{ project.description }}</p>

        <div class="mt-4 flex flex-wrap gap-2">
          <Tag v-for="tag in project.tags" :key="tag" :label="tag" />
        </div>

        <div class="mt-6 flex gap-4">
          <a
            :href="project.github"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1.5 text-sm text-muted hover:text-text"
          >
            <Github :size="16" /> Code
          </a>
          <a
            v-if="project.demo"
            :href="project.demo"
            target="_blank"
            rel="noopener"
            class="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80"
          >
            <ExternalLink :size="16" /> Demo
          </a>
        </div>
      </Card>
    </div>
  </section>

</template>
