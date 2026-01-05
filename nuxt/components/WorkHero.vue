<template>
  <section class="work-hero pad-t pad-b">
    <div class="gutter">
      <HeroTitle
        :title="title"
        :sketches="sketches"
      />
      <p v-if="copy" class="manic">{{ copy }}</p>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  sketches: {
    type: Object,
    required: false
  },
  copy: {
    type: String,
    required: false
  }
});
</script>

<style lang='scss'>
section.work-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .gutter {
    position: relative;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .hero-title {
      .sketch1-holder {
        top: auto;
        left: 0px;
        bottom: 0.1em;
        height: 0.44em;
        transform: translateX(-130%);
      }

      .sketch2-holder {
        height: 1.5em;
        bottom: 0px;
        transform: translateX(47%);
      }
    }

    p {
      position: relative;
      width: 100%;
      margin: 0 auto 2em;
      transform: rotate(-1.8deg);
    }
  }

  @include respond-to($tablet) {
    .gutter {
      .hero-title {
        .sketch1-holder {
          top: auto;
          bottom: 0.05em;
          transform: translateX(-180%);
        }
      }
    }
  }
}

</style>
