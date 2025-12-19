<template>
  <section class="boneyard pad-b">
    <div class="cutout">
      <div class="cutout-torn-edge bg-bone" ref="topEdge">
        <Paper :light="true" />
      </div>
      <div class="cutout-inner flesh" ref="cutout">
        <div class="cutout-content bg-bone">
          <Paper :light="true" />
          <div v-scroll-container>
            <div
              v-for="(skeleton, index) in skeletons"
              data-scroll="parallax"
              data-fx='[{"prop":"y","from":0,"to":-100},{"prop":"s","from":0.9,"to":1}]'
              class="cutout-skeleton"
            >
              <ResponsiveImage v-bind="skeleton.profileImage" fit="contain" :priority="true" />
            </div>
          </div>
        </div>
        <p class="cutout-tagline flesh manic" :class="{'single': skeletons.length === 1}">{{ tagline }}</p>
        <h1 v-if="title" class="h1 xs rough-edges-light">
          <span class="bg-midnight">{{ title }}</span>
        </h1>
      </div>
    </div>
  </section>
</template>

<script setup>
const cutout = ref(null);
const topEdge = ref(null);
let resize_to = 0;

// Props
const props = defineProps({
  skeletons: {
    type: Array,
    required: true
  },
  tagline: {
    type: String,
    required: true
  },
  title: {
    type: String
  }
});

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', onResize);
  setMask();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

// Methods
function onResize(e) {
  clearTimeout(resize_to);
  resize_to = setTimeout(() => {
    setMask();
  }, 250);
}

function setMask() {
  const b = cutout.value.getBoundingClientRect();
  const mask1 = createTornEdge({
    width: b.width,
    height: b.width < 768 ? 200 : 300,
    startY: b.width < 768 ? 100 : 150,
    endY: b.width < 768 ? 100 : 150,
    wobble: 0.8,
    edgeRoughness: 6
  });
  const mask2 = createTornEdge({
    width: b.width,
    height: b.height,
    startY: b.width < 768 ? b.height - 100 : b.height - 150,
    endY: b.width < 768 ? b.height - 100 : b.height - 150,
    wobble: 0.8,
    edgeRoughness: 6
  });

  topEdge.value.style.maskImage = `url(${mask1}), linear-gradient(#000 0 0)`;
  cutout.value.style.maskImage = `url(${mask2})`;
}
</script>

<style lang='scss'>
.boneyard {
  .cutout {
    position: relative;
    text-align: center;

    .cutout-torn-edge {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 200px;
      mask-size: 101% auto;
      mask-composite: exclude;
      mask-repeat: no-repeat;
    }

    .cutout-inner {
      padding-top: 200px;
      mask-size: 101% auto;
      mask-position: bottom center;
      mask-repeat: no-repeat;

      .cutout-content {
        position: relative;
        height: 200px;

        &:has(.cutout-skeleton:only-child) {
          .cutout-skeleton {
            left: 50%;
            width: span(10);
            margin-left: span(-5);
          }
        }

        .cutout-skeleton {
          position: absolute;
          bottom: -20px;
          left: 25%;
          width: span(9);
          margin-left: span(-4.5);
          z-index: 1;
          will-change: transform;

          &:nth-child(2) {
            left: 75%;
          }

          img {
            width: 100%;
            aspect-ratio: 1 / 1;
          }
        }
      }
    }

    .cutout-tagline {
      position: absolute;
      top: 150px;
      left: 50%;
      white-space: pre-line;
      transform: translate(-50%, -50%) rotate(-7deg);
    }

    .h1 {
      position: absolute;
      top: 66%;
      left: 50%;
      white-space: nowrap;
      transform: translate(-50%, -50%);
      z-index: 2;

      span {
        padding: 0.125em 0.25em;
      }
    }
  }

  @include respond-to($small-tablet) {
    .cutout {
      .cutout-tagline {
        top: 50%;

        &.single {
          top: 40%;
          left: 75%;
        }
      }
    }
  }

  @include respond-to($tablet) {
    .cutout {
      .cutout-torn-edge {
        height: 300px;
      }

      .cutout-inner {
        padding-top: 300px;

        .cutout-content {
          height: unset;
          aspect-ratio: 3 / 1;

          &:has(.cutout-skeleton:only-child) {
            .cutout-skeleton {
              width: span(6.5);
              margin-left: span(-3.25);
            }
          }

          .cutout-skeleton {
            bottom: 0px;
            width: span(6.5);
            margin-left: span(-3.25);
          }
        }
      }
    }
  }

  @include respond-to($average-desktop) {
    .cutout {
      .cutout-inner {
        .cutout-content {
          .cutout-skeleton {
            bottom: -20px;
          }
        }
      }
    }
  }

  @include respond-to($macbook) {
    .cutout {
      .cutout-inner {
        .cutout-content {
          .cutout-skeleton {
            bottom: -40px;
          }
        }
      }
    }
  }
}
</style>
