import { onMounted, onUnmounted, ref } from "vue";

export function useReveal(options = { threshold: 0.15 }) {
  const el = ref(null);
  const visible = ref(false);
  let observer;

  onMounted(() => {
    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        visible.value = true;
        observer.disconnect();
      }
    }, options);
    if (el.value) observer.observe(el.value);
  });

  onUnmounted(() => observer?.disconnect());
  return { el, visible };
}
