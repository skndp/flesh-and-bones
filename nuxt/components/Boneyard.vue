<template>
  <section class="boneyard pad-b">
    <div class="cutout">
      <div class="cutout-torn-edge bg-bone" ref="topEdge"></div>
      <div class="cutout-inner flesh" ref="cutout">
        <div class="cutout-content bg-bone">
          <Parallaxy :speed="50" :breakpoints="{768: {speed: 75}}" class="cutout-skeleton">
            <img :src="'/images/rob-test.png'" />
          </Parallaxy>
          <Parallaxy :speed="50" :breakpoints="{768: {speed: 75}}" class="cutout-skeleton">
            <img :src="'/images/tony-test.png'" />
          </Parallaxy>
        </div>
        <p class="flesh manic">{{ tagline }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import Parallaxy from '@lucien144/vue3-parallaxy';

const cutout = ref(null);
const topEdge = ref(null);
let resize_to = 0;

// Props
const props = defineProps({
  tagline: {
    type: String,
    required: true
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
    wobble: 0.85,
    edgeRoughness: 4
  });
  const mask2 = createTornEdge({
    width: b.width,
    height: b.height,
    startY: b.width < 768 ? b.height - 100 : b.height - 150,
    endY: b.width < 768 ? b.height - 100 : b.height - 150,
    wobble: 0.85,
    edgeRoughness: 4
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
          }
        }

        .cutout-skeleton {
          position: absolute;
          bottom: 20px;
          left: 25%;
          width: span(5);
          margin-left: span(-2.5);
          z-index: 1;

          &:nth-child(2) {
            left: 75%;
          }

          img {
            width: 100%;
            height: auto;
          }
        }
      }
    }

    .manic {
      position: absolute;
      top: 150px;
      left: 50%;
      white-space: pre-line;
      transform: translate(-50%, -50%) rotate(-7deg);
    }
  }

  @include respond-to($small-tablet) {
    .cutout {
      .manic {
        top: 50%;
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

          .cutout-skeleton {
            bottom: 0px;
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
