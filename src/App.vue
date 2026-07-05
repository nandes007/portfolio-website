<script setup>
import Navbar from "./components/layout/Navbar.vue";
import Footer from "./components/layout/Footer.vue";
import Hero from "./components/sections/Hero.vue";
import About from "./components/sections/About.vue";
import Skills from "./components/sections/Skills.vue";
import Experience from "./components/sections/Experience.vue";
import Projects from "./components/sections/Projects.vue";
import Contact from "./components/sections/Contact.vue";
</script>

<template>
  <Navbar />
  <main>
    <Hero />
    <About />
    <Skills />
    <Experience />
    <Projects />
    <Contact />
  </main>
  <Footer />

</template>
