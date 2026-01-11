export const bgBoogie = function (el, speed = 0.3) {
  let ticking = false;
  let lastTop = null;
  let offsetY = 0;

  function measureAndApply() {
    if (!el?.value) return;

    const rect = el.value.getBoundingClientRect();

    if (lastTop === null) lastTop = rect.top;

    const deltaTop = rect.top - lastTop;
    const deltaScroll = -deltaTop;
    const vh = window.innerHeight;
    const isNearViewport = rect.bottom > -200 && rect.top < vh + 200;

    if (isNearViewport) {
      offsetY += deltaScroll * speed;
      el.value.style.transform = `translate3d(0px, ${offsetY}px, 0px)`;
    }

    lastTop = rect.top;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;

    requestAnimationFrame(() => {
      measureAndApply();
      ticking = false;
    });
  }

  function onResize() {
    if (!el?.value) return;
    lastTop = el.value.getBoundingClientRect().top;
  }

  onMounted(() => {
    if (el?.value) lastTop = el.value.getBoundingClientRect().top;

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
  });

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  });
};

