<template>
  <section class="placeholder pad-b">
    <div class="gutter">
      <div class="card">
        <h1 class="h1 flesh">{{ title }}</h1>
        <slot />
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style lang='scss'>
.placeholder {
  position: relative;
  display: flex;
  flex-direction: column;

  .gutter {
    .card {
      position: relative;
      padding: span(4) span(1);
      box-shadow: inset 0px 0px 0px 1px $flesh;
      display: flex;
      text-align: center;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .h1 {
        white-space: pre-line;
      }

      p {
        margin-top: 1em;
      }
    }
  }

  @include respond-to($tablet) {
    .gutter {
      .card {
        padding: span(2) span(1);
      }
    }
  }

  @include respond-to($macbook) {
    .gutter {
      .card {
        padding: span(1.5) span(1);
      }
    }
  }
}

</style>
