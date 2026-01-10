export const bgBoogie = function(el, speed) {
  let ticking = false;

  onMounted(() => {
    window.addEventListener('scroll', onScroll, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
  });

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY * speed;
        el.value.style.transform = `translate3d(0px, ${y}px, 0)`;
        ticking = false;
      })
      ticking = true;
    }
  }
}
