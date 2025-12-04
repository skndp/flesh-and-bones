<template>
  <div class="item project flesh" :class="[ layout ]">
    <h3 class="h3">{{ item.title }}</h3>
    <div class="meta">
      <p class="fs-sm"><strong>Director - {{ item.director.title }}</strong></p>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  layout: {
    type: String,
    required: true
  }
});
</script>

<style lang='scss'>
.item.project {
  position: relative;
  aspect-ratio: 16/9;
  box-shadow: inset 0px 0px 0px 1px $bone;
  padding: $space-16;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &:nth-child(2) {
    margin-top: span(1);
  }

  .meta {
    width: calc(100% - span(0.5));
    max-width: 400px;
    margin: 1em auto 0;

    p {
      &:nth-child(2) {
        margin-top: 1em;
      }
    }
  }

  @include respond-to($small-tablet) {
    aspect-ratio: 1/1;

    &:only-child {
      aspect-ratio: 2/1;
    }

    &:nth-child(2) {
      margin-top: 0px;
    }
  }

  @include respond-to($tablet) {
    .meta {
      text-align: left;
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      &:has(p:only-child) {
        text-align: center;
        justify-content: center;
      }

      p {
        display: inline-flex;

        &:nth-child(2) {
          margin-top: 0px;
          margin-left: 1em;
          flex-shrink: 0;
        }
      }
    }
  }

  @include respond-to($macbook) {
    aspect-ratio: 4/3;

    &:only-child {
      aspect-ratio: 8/3;
    }
  }
}
</style>
