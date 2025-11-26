<template>
  <section class="placeholder" :class="{ 'pad-b': !noPad}">
    <div class="gutter">
      <div class="card">
        <p>{{ title }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  noPad: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: false
  }
});
</script>

<style lang='scss'>
.placeholder {
  position: relative;
  display: flex;
  flex-direction: column;

  &:first-of-type {
    &:before {
      content: '';
      height: $header-ht;
      margin-top: span(1);
      display: flex;
    }
  }

  .card {
    position: relative;
    padding: span(4) 0;
    box-shadow: inset 0px 0px 0px 1px $flesh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @include respond-to($tablet) {
    &:first-of-type {
      &:before {
        margin-top: span(0.5);
      }
    }

    .card {
      padding: span(2) 0;
    }
  }
}

</style>
