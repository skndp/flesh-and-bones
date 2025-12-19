<template>
  <NuxtLink :to="item.slug" class="item article flesh" :class="[ layout ]" @mouseenter="onItemHover" @mouseleave="onItemHover">
    <div class="item-image">
      <template v-if="layout === 'square' && item.ctaCardImages.squareImage">
        <ResponsiveImage v-bind="item.ctaCardImages.squareImage.image" />
      </template>
      <template v-else>
        <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" />
      </template>
      <div class="item-hover">
        <Animated :autoplay="false" type="news-flash" :loop="true" background="bg-bone" ref="hoverAnimation" />
      </div>
    </div>
    <div class="item-details">
      <div class="meta">
        <p class="label">{{ item.ctaCardSummary }}</p>
        <p class="brush">{{ item.ctaCardLabel }}<span class="rough-edges-light"></span></p>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const hoverAnimation = ref(null);
let mqMobile;

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

// Mounted
onMounted(() => {
  mqMobile = window.matchMedia('(max-width: 540px) and (hover: none)');
  mqMobile.addEventListener('change', handleMqMobile);

  handleMqMobile(mqMobile);
});

// Before Unmount
onBeforeUnmount(() => {
  if (mqMobile) {
    mqMobile.removeEventListener('change', handleMqMobile);
  }
});

// Functions
function handleMqMobile(e) {
  if (hoverAnimation.value) {
    if (e.matches) hoverAnimation.value.play();
    else hoverAnimation.value.stop();
  }
}

function onItemHover(e) {
  if (hoverAnimation.value) {
    if (e.type === 'mouseenter') hoverAnimation.value.play();
    else hoverAnimation.value.stop();
  }
}
</script>

<style lang='scss'>
.item.article {
  position: relative;
  aspect-ratio: 1/1;
  display: flex;
  flex-direction: column;

  .item-image {
    position: relative;
    width: 83.333%;
    aspect-ratio: 1/1;
    margin: 0 auto;

    .item-hover {
      position: absolute;
      top: 50%;
      left: 0%;
      width: 100px;
      transform: translate(-36%, -50%);
    }
  }

  .item-details {
    width: 83.333%;
    margin: 0 auto;

    .meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 1em;

      p {
        display: flex;
        margin-right: 2em;

        &:nth-child(2) {
          display: none;
        }
      }
    }
  }

  @include respond-to($small-tablet) {
    aspect-ratio: 1/1;

    &:only-child {
      aspect-ratio: 2/1;
    }
  }

  @include respond-to($desktop) {
    .item-image {
      .item-hover {
        width: 132px;
      }
    }

    .item-details {
      .meta {
        p {
          &:nth-child(2) {
            position: relative;
            margin-right: 0px;
            margin-top: -0.4em;
            padding-bottom: 0.1em;
            text-align: right;
            white-space: nowrap;
            display: flex;
            flex-shrink: 0;

            span.rough-edges-light {
              position: absolute;
              bottom: 0px;
              left: 0px;
              width: 100%;
              height: 2.5px;
              background-color: $flesh;
            }
          }
        }
      }
    }
  }

  @include respond-to($macbook) {
    aspect-ratio: 4/3;

    &:only-child {
      aspect-ratio: 8/3;
    }

    .item-image {
      width: 66%;
    }

    .item-details {
      width: 66%;
    }
  }
}
</style>
