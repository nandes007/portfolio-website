import { ref, onMounted, onUnmounted } from "vue";

export function useTypewriter(words, { typeSpeed = 70, deleteSpeed = 35, pause = 1800 } = {}) {
  const text = ref("");
  let wordIndex = 0;
  let deleting = false;
  let timer;

  function tick() {
    const word = words[wordIndex % words.length];
    if (!deleting) {
      text.value = word.slice(0, text.value.length + 1);
      if (text.value === word) {
        deleting = true;
        timer = setTimeout(tick, pause);
        return;
      }
      timer = setTimeout(tick, typeSpeed);
    } else {
      text.value = word.slice(0, text.value.length - 1);
      if (!text.value) {
        deleting = false;
        wordIndex++;
      }
      timer = setTimeout(tick, deleteSpeed);
    }
  }

  onMounted(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      text.value = words[0];
      return;
    }
    timer = setTimeout(tick, 500);
  });
  onUnmounted(() => clearTimeout(timer));

  return { text };
}
