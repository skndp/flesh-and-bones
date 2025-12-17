<template>
  <section class="contact-founders pad-b">
    <div class="cutout">
      <div class="cutout-torn-edge bg-bone" ref="topEdge"></div>
      <div class="cutout-inner flesh" ref="cutout">
        <div class="cutout-content bg-bone">
          <Parallaxy :speed="80" class="contact-founder-skeleton">
            <img src="/images/rob-test.png" />
          </Parallaxy>
          <p class="flesh manic">{{ cutoutTitle }}</p>
        </div>
      </div>
    </div>
    <div class="gutter cols pad-b">
      <div v-for="founder in founders" class="col">
        <p class="flesh brush">{{ founder.name }}</p>
        <p class="manic sm">{{ founder.role }}</p>
        <p class="manic sm">
          <NuxtLink :to="`mailto:${founder.email}`" target="_blank">{{ founder.email }}</NuxtLink>
        </p>
        <p class="manic sm">{{ founder.location }}</p>
        <p class="bio">{{ founder.bio }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import Parallaxy from '@lucien144/vue3-parallaxy';

const cutout = ref(null);
const topEdge = ref(null);

// Props
const props = defineProps({
  cutoutTitle: {
    type: String,
    required: true
  },
  founders: {
    type: Array,
    required: true
  }
});

// Lifecycle
onMounted(() => {
  setMask();
});

// Methods
function setMask() {
  const b = cutout.value.getBoundingClientRect();
  const mask1 = createTornEdge({
    width: window.innerWidth,
    height: 300,
    startY: 150,
    endY: 150,
    wobble: 0.85,
    edgeRoughness: 4
  });
  const mask2 = createTornEdge({
    width: b.width,
    height: b.height,
    startY: b.height - 150,
    endY: b.height - 150,
    wobble: 0.85,
    edgeRoughness: 4
  });

  topEdge.value.style.maskImage = `url(${mask1}), linear-gradient(#000 0 0)`;
  cutout.value.style.maskImage = `url(${mask2})`;
}
</script>

<style lang='scss'>
section.contact-founders {
  .cutout {
    position: relative;
    text-align: center;

    .cutout-torn-edge {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 300px;
      mask-size: 101% auto;
      mask-composite: exclude;
      mask-repeat: no-repeat;
    }

    .cutout-inner {
      padding-top: 300px;
      mask-size: 101% auto;
      mask-position: bottom center;
      mask-repeat: no-repeat;

      .cutout-content {
        position: relative;
        aspect-ratio: 3 / 1;

        .contact-founder-skeleton {
          position: absolute;
          bottom: -80px;
          left: span(1);
          width: span(5);
          aspect-ratio: 480 / 613;
          z-index: 1;

          img {
            width: 100%;
            height: 100%;
          }
        }

        .manic {
          white-space: pre-line;
        }
      }
    }
  }

  .cols {
    padding-top: span(1);

    .col {
      &:not(:last-child) {
        margin-bottom: $space-48;
      }

      p {
        margin-bottom: 0.25em;

        &.bio {
          max-width: 666px;
          line-height: 1.666em;
          margin-bottom: 0px;
          padding-top: 2em;
          white-space: pre-line;
        }
      }
    }
  }

  @include respond-to($tablet) {
    .cols {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: span(1);

      .col {
        &:not(:last-child) {
          margin-bottom: 0px;
        }
      }
    }
  }
}
</style>
