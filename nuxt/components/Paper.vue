<template>
  <div class="paper" :class="{ 'light': light }">
    <span class="smudge"></span>
    <span class="specks"></span>
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
  background-color: $midnight;
  overflow: hidden;

  &.light {
    background-color: $bone;

    .specks {
      background-color: #000000;
      filter: url(#specks) invert(1);
      opacity: 0.13;
      mix-blend-mode: multiply;
    }

    .smudge {
      filter: url(#chalkSmudge) invert(1);
      transform: scale(2);
    }
  }

  .specks {
    @include abs-fill;
    background-color: #ffffff;
    filter: url(#specks);
    opacity: 0.11;
    mix-blend-mode: screen;
  }

  .smudge {
    @include abs-fill;
    background: #ffffff;
    filter: url(#chalkSmudge);
    opacity: 0.13;
    mix-blend-mode: soft-light;
    transform: scale(2);
  }
}
</style>