<template>
  <section class="boneyard">
    <div class="cutout" ref="cutout">
      <div class="cutout-top-edge">
        <div
          v-if="store.lightPaper"
          class="cutout-paper"
          :style="{ 'background-image': `url('${store.lightPaper}')` }"
        ></div>
      </div>
      <div class="cutout-inner flesh">
        <div class="cutout-content" ref="content">
          <div
            v-for="(skeleton, index) in skeletons"
            class="cutout-skeleton"
          >
            <ResponsiveImage v-bind="skeleton.profileImage" fit="auto" :priority="true" />
          </div>
        </div>
        <p v-if="tagline" class="cutout-tagline flesh manic" :class="{'single': skeletons.length === 1}">{{ tagline }}</p>
        <h1 v-if="title" class="h1 xs rough-edges-light">
          <span class="bg-midnight">{{ title }}</span>
        </h1>
      </div>
    </div>
  </section>
</template>

<script setup>
import { bgBoogie } from '~/utils/bg-boogie';
import { useSiteStore } from '~/stores/store';
const store = useSiteStore();

// Props
const props = defineProps({
  skeletons: { type: Array, required: true },
  tagline: { type: String, required: false },
  title: { type: String, required: false }
});

const cutout = ref(null);
const content = ref(null);
let resizeTo = 0;
let lastWidth = 0;

bgBoogie(content, -0.0666);

// Lifecycle
onMounted(() => {
  lastWidth = window.innerWidth;
  window.addEventListener('resize', onResize);
  setMask();
});

onBeforeUnmount(() => {
  clearTimeout(resizeTo);
  window.removeEventListener('resize', onResize);
});

// Methods
function onResize() {
  if (window.innerWidth === lastWidth) return;

  clearTimeout(resizeTo);
  resizeTo = setTimeout(() => {
    lastWidth = window.innerWidth;
    setMask();
  }, 250);
}

function setMask() {
  if (!cutout.value) return;

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
    height: Math.ceil(b.height), // Ceil up, pixel rounding issue for Safari
    startY: b.width < 768 ? b.height - 100 : b.height - 150,
    endY: b.width < 768 ? b.height - 100 : b.height - 150,
    wobble: 0.8,
    edgeRoughness: 6
  });

  cutout.value.style.setProperty('--mask-top', `url(${mask1}), linear-gradient(#000 0 0)`);
  cutout.value.style.setProperty('--mask-bottom', `url(${mask2})`);
}
</script>

<style lang='scss'>
.boneyard {
  position: relative;

  .cutout {
    position: relative;
    text-align: center;
    mask-image: var(--mask-bottom);
    mask-size: 101% auto;
    mask-position: bottom center;
    mask-repeat: no-repeat;
    will-change: mask-image;

    .cutout-top-edge {
      @include abs-fill;
      mask-image: var(--mask-top);
      mask-repeat: no-repeat;
      mask-position: top center;
      mask-size: 101% auto;
      mask-composite: exclude;
      pointer-events: none;

      .cutout-paper {
        @include abs-fill;
        background-repeat: no-repeat;
        background-position: 50% 0%;
        background-size: cover;
      }
    }

    .cutout-inner {
      position: relative;
      padding-top: 200px;
      overflow: hidden;

      .cutout-content {
        position: relative;
        aspect-ratio: 15 / 8;

        &:has(.cutout-skeleton:only-child) {
          .cutout-skeleton {
            left: 50%;
            width: span(10);
            margin-left: span(-5);
          }
        }

        .cutout-skeleton {
          position: absolute;
          bottom: 40px;
          left: 25%;
          width: span(9);
          margin-left: span(-4.5);
          will-change: transform;

          &:nth-child(2) {
            left: 75%;
          }

          // NOTE: adjustment for founders being visible longer
          .contact-founders & {
            margin-bottom: -10%;
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
      left: 48%;
      min-width: 180px;
      white-space: pre-line;
      transform: translate(-50%, -50%) rotate(-7deg) scale(0.56);

      &.single {
        top: 180px;
        left: 80%;
      }
    }

    .h1 {
      position: absolute;
      top: 66%;
      left: 50%;
      white-space: nowrap;
      transform: translate(-50%, -50%);
      z-index: 1;

      span {
        padding: 0.125em 0.25em;
      }
    }
  }

  @include respond-to($small-tablet) {
    .cutout {
      .cutout-inner {
        .cutout-content {
          .cutout-skeleton {
            bottom: 0px;

            // NOTE: adjustment for founders being visible longer
            .contact-founders & {
              margin-bottom: -5%;
            }
          }
        }
      }

      .cutout-tagline {
        top: 40%;

        &.single {
          top: 40%;
          left: 85%;
        }
      }
    }
  }

  @include respond-to($tablet) {
    .cutout {
      .cutout-inner {
        .cutout-content {
          &:has(.cutout-skeleton:only-child) {
            .cutout-skeleton {
              width: span(9);
              margin-left: span(-4.5);
            }
          }

          .cutout-skeleton {
            bottom: 0px;
            width: span(7);
            margin-left: span(-3.5);

            // NOTE: adjustment for founders being visible longer
            .contact-founders & {
              margin-bottom: 0%;
            }
          }
        }
      }

      .cutout-tagline {
        top: 48%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-7deg) scale(0.85);

        &.single {
          top: 42%;
          left: 75%;
        }
      }
    }
  }

  @include respond-to($desktop) {
    .cutout {
      .cutout-inner {
        padding-top: 300px;

        .cutout-content {
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
            // NOTE: adjustment for founders being visible longer
            .contact-founders & {
              margin-bottom: -5%;
            }
          }
        }
      }

      .cutout-tagline {
        transform: translate(-50%, -50%) rotate(-7deg);
      }
    }
  }
}
</style>
