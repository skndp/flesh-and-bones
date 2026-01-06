<template>
  <section class="directors-hero pad-t">
    <div v-if="!isTouchDevice" class="background-videos">
      <div v-for="(item, index) in directors" class="background-video" :class="{ '--active': index === activeIndex }" :key="index">
        <VideoPlayer
          v-if="item.backgroundVideo && item.backgroundVideo.vimeo"
          ref="videoRefs"
          :vimeo="item.backgroundVideo.vimeo"
          :cover="true"
        />
      </div>
    </div>
    <div class="gutter">
      <h1 class="title h5 flesh">
        <RichTextSketch :copy="sketchHeading" />
      </h1>
      <div class="directors">
        <div v-if="sketchnoteLeft" class="sketchnote manic md" inert>
          <span>
            <span
              v-if="sketchnoteLeftSketch"
              class="sketch-holder"
              :style="{
                'aspect-ratio': `${sketchnoteLeftSketch.image.width}/${sketchnoteLeftSketch.image.height}`,
                'background-image': `url(${sketchnoteLeftSketch.image.src})`
              }"
            ></span>
            <span>{{ sketchnoteLeft }}</span>
          </span>
        </div>
        <ul>
          <li v-for="(item, index) in directors">
            <NuxtLink
              :to="item.director.slug"
              :key="index"
               @mouseenter="onMouseenter(index, $event)"
               @mouseleave="onMouseleave"
            >
              <p class="h4">
                <span class="rough-edges bg"></span>
                <span class="rough-edges-light">{{ item.director.title }}</span>
              </p>
            </NuxtLink>
          </li>
        </ul>
      </div>
      <div v-if="endMarkSketch" class="end-mark-sketch pad-t h1">
        <div
          class="sketch-holder"
          :style="{
            'aspect-ratio': `${endMarkSketch.image.width}/${endMarkSketch.image.height}`,
            'background-image': `url(${endMarkSketch.image.src})`
          }"
        ></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { primaryInput } from 'detect-it';
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

// Props
const props = defineProps({
  sketchnoteLeft: {
    type: String,
    required: false
  },
  sketchnoteLeftSketch: {
    type: Object,
    required: false
  },
  sketchHeading: {
    type: Array,
    required: true
  },
  directors: {
    type: Array,
    required: false
  },
  endMarkSketch: {
    type: Object,
    required: false
  }
});

const isTouchDevice = ref(false);
const activeIndex = ref(null);
const videoRefs = ref([]);
const emit = defineEmits(['hover-update']);

// Mounted
onMounted(() => {
  isTouchDevice.value =
    primaryInput === 'touch' ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;
});

// Methods
function onMouseenter(index, e) {
  const t = e.currentTarget,
        bg = t.querySelector('.bg');

  onHoverChange(index);
  activeIndex.value = index;

  bg.style.maskComposite = 'unset';
  bg.style.maskImage = `url('${store.getRipMask()}')`;
}

function onMouseleave(e) {
  const t = e.currentTarget,
        bg = t.querySelector('.bg');

  onHoverChange(null);
  activeIndex.value = null;

  bg.style.maskComposite = 'exclude';
  bg.style.maskImage = `url('${store.getRipMask()}'), linear-gradient(#000 0 0)`;
}

function onHoverChange(index) {
  // Pause any/all videos
  pausePlayers();

  // set the new active index
  activeIndex.value = index;

  // if null (mouseleave) — we're done
  if (index === null) return;

  const currentPlayer = videoRefs.value[index];
  if (currentPlayer) {
    currentPlayer.restartPlayer();
  }
}

function pausePlayers() {
  videoRefs.value.forEach((vid) => {
    if (vid) {
      vid.pausePlayer();
    }
  });
}
</script>

<style lang='scss'>
section.directors-hero {
  position: relative;
  padding-bottom: span(2);
  display: flex;
  flex-direction: column;

  .background-videos {
    @include abs-fill;
    overflow: hidden;

    .background-video {
      @include abs-fill;
      overflow: hidden;
      visibility: hidden;
      opacity: 0;
      transition: visibility 0ms linear $speed-666, opacity $speed-666 $ease-out;

      &.--active {
        visibility: visible;
        opacity: 1;
        transition: opacity $speed-666 $ease-out;
      }
    }
  }

  .gutter {
    position: relative;
    text-align: center;

    &:before,
    &:after {
      content: '';
      width: 100%;
      @include header-ht(height);
      display: flex;
    }

    .title {
      .sketch-bold {
        line-height: 1.2em;
        transform: none;
      }
    }

    .directors {
      position: relative;
      padding: 1em 0;

      .sketchnote {
        display: none;
      }

      ul {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        li {
          display: inline-flex;

          a {
            display: inline-flex;

            .h4 {
              position: relative;
              color: $bone;
              margin: 0 0.3em;
              padding: 0.7em 0.3em;
              display: inline-flex;
              transition: color $speed-333 $ease-out;

              span.bg {
                @include abs-fill;
                background-color: $midnight;
                mask-size: cover;
                mask-composite: exclude;
                mask-image: linear-gradient(#000 0 0), linear-gradient(#000 0 0);
                pointer-events: none;
                backface-visibility: hidden;
                transform: translateZ(0);
                will-change: transform, mask-image, mask-composite;
                opacity: 0;
                transition: opacity $speed-333 $ease-out;
              }
            }
          }
        }

        @include can-hover {
          &:has(li:hover) {
            li {
              a {
                .h4 {
                  color: rgba($midnight, 0.5);
                }

                &:hover {
                  .h4 {
                    color: $flesh;

                    span.bg {
                      opacity: 1;
                      transition: opacity $speed-333 $ease-out;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    .end-mark-sketch {
      height: 1.5em;
      margin: -0.5em 0;
      padding-bottom: span(2);
      display: flex;
      justify-content: center;

      .sketch-holder {
        position: relative;
        width: auto;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: 50% 50%;
      }
    }
  }

  @include respond-to($tablet) {
    padding-bottom: $space-48;

    .gutter {
      &:after {
        @include header-ht(padding-top);
      }

      .directors {
        .sketchnote {
          position: absolute;
          top: 0px;
          left: span(-1);
          width: span(1);
          height: 100%;
          display: flex;

          > span {
            position: absolute;
            top: 50%;
            left: 50%;
            white-space: nowrap;
            transform-origin: 0% 0%;
            transform: rotate(-90deg) translateX(-50%) translateY(-50%);

            > span {
              display: inline-flex;
            }

            .sketch-holder {
              position: absolute;
              top: 50%;
              left: 0px;
              width: auto;
              height: 2em;
              background-repeat: no-repeat;
              background-position: 50% 50%;
              background-size: contain;
              transform: rotate(90deg) translateX(-50%) translateY(150%);
            }
          }
        }
      }

      .end-mark-sketch {
        padding-bottom: 0px;
      }
    }
  }
}

</style>
