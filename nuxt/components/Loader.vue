<template>
  <div id="loader" ref="loaderRef"></div>
</template>

<script setup>
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const loaderRef = ref(null);

onMounted(() => {
  if (loaderRef.value) {
    disableBodyScroll(loaderRef.value);
  }

  window.scrollTo(0,0);
});

onBeforeUnmount(() => {
  if (loaderRef.value) {
    enableBodyScroll(loaderRef.value);
  }
});
</script>

<style lang='scss'>
#loader {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: $bone;
  overflow: hidden;
  z-index: 666;

  &.loading-enter-active,
  &.loading-leave-active {
    transition: opacity $speed-666 $evil-ease;
  }

  &.loading-enter-from,
  &.loading-leave-to {
    opacity: 0;
  }
}
</style>
