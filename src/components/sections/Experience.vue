<script setup>
import { experiences } from "../../data/profile";
import SectionTitle from "../ui/SectionTitle.vue";
import ExperienceItem from "./ExperienceItem.vue";
</script>

<template>
  <section id="experience" class="mx-auto max-w-3xl px-6 py-24">
    <SectionTitle title="Experience" />

    <div>
      <ExperienceItem v-for="exp in experiences" :key="exp.company + exp.period" :exp="exp" />
    </div>
  </section>

</template>
