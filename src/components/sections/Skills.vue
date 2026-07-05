<script setup>
import { skills } from "../../data/profile";
import SectionTitle from "../ui/SectionTitle.vue";
import Tag from "../ui/Tag.vue";
import { useReveal } from "../../composables/useReveal";

const { el, visible } = useReveal();
</script>

<template>
  <section
    id="skills"
    ref="el"
    class="mx-auto max-w-4xl px-6 py-24 transition-all duration-700 ease-out"
    :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'"
  >
    <SectionTitle title="Skills" subtitle="Technologies I work with" />

    <div class="flex flex-wrap justify-center gap-3">
      <Tag
        v-for="(skill, i) in skills"
        :key="skill"
        :label="skill"
        class="transition-all duration-500 ease-out"
        :class="visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        :style="{ transitionDelay: visible ? `${i * 60}ms` : '0ms' }"
      />
    </div>
  </section>

</template>
