<template>
  <div class="paper" :class="{ 'light': light }">
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  light: {
    type: Boolean,
    required: false,
    default: false
  }
});
</script>

<style lang="scss">
.paper {
  @include abs-fill;
  overflow: hidden;
  
  &:not(.light) {
    background-color: $midnight;
  }
}
</style>