<template>
  <section class="directors-hero pad-t">
    <div v-if="!isTouchDevice" class="background-videos">
      <div v-for="(item, index) in directors" class="background-video" :class="{ '--active': index === activeIndex }">
        <VideoPlayer
          v-if="item.backgroundVideo && item.backgroundVideo.vimeo"
          :vimeo="item.backgroundVideo.vimeo"
          :cover="true"
          @ready="onPlayerReady(index)"
        />
      </div>
    </div>
    <div class="gutter">
      <h1 class="title h5 midnight">
        <RichTextSketch :copy="sketchHeading" />
      </h1>
      <div class="directors">
        <span v-if="sketchnoteLeft" class="sketchnote manic md" inert :data-label="sketchnoteLeft"></span>
        <ul>
          <li v-for="(item, index) in directors">
            <NuxtLink
              :to="item.director.slug"
              :key="index"
               @mouseenter="onMouseenter(index)"
               @mouseleave="onMouseleave"
            >
              <p class="h4">
                <span class="rough-edges-light bg"></span>
                <span class="rough-edges-light">{{ item.director.title }}</span>
              </p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { primaryInput } from 'detect-it';

// Props
const props = defineProps({
  sketchnoteLeft: {
    type: String,
    required: false
  },
  sketchHeading: {
    type: Array,
    required: true
  },
  directors: {
    type: Array,
    required: false
  }
});

const isTouchDevice = ref(false);
const activeIndex = ref(null);
const players = ref([]);
const emit = defineEmits(['hover-update']);

// Mounted
onMounted(() => {
  isTouchDevice.value =
    primaryInput === 'touch' ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0;
  
  console.log(isTouchDevice.value);
  
});

// Methods
function onMouseenter(index) {
  onHoverChange(index);
  activeIndex.value = index;
}

function onMouseleave() {
  onHoverChange(null);
  activeIndex.value = null;
}

function onHoverChange(index) {
  // pause previous player (if any)
  if (activeIndex.value !== null && players.value[activeIndex.value]) {
    players.value[activeIndex.value].pause?.().catch(() => {});
  }

  // set the new active index
  activeIndex.value = index;

  // if null (mouseleave) — we're done
  if (index === null) return;

  // if the new player is ready, play it
  const player = players.value[index];
  if (player) {
    player.play?.().catch(() => {});
  }
}

function onPlayerReady(index) {
  return (playerInstance) => {
    players.value[index] = playerInstance;

    // if this video is currently active, play it
    if (activeIndex.value === index) {
      playerInstance.play?.().catch(() => {});
    }
  };
}
</script>

<style lang='scss'>
section.directors-hero {
  position: relative;
  padding-bottom: span(2);
  display: flex;
  flex-direction: column;

  &:not(:has(.background-videos)) {
    .gutter {
      .title {
        .sketch-note {
          color: $bone;
        }

        .sketch-bold {
          .sketch-underline {
            border-bottom-color: $bone;
          }
        }
      }
    }
  }
  
  .background-videos {
    @include abs-fill;
    background-color: goldenrod;
    overflow: hidden;

    .background-video {
      @include abs-fill;
      overflow: hidden;
      opacity: 0;
      visibility: hidden;
      transition: visibility 0ms linear $speed-666, opacity $speed-666 $evil-ease;

      &.--active {
        visibility: visible;
        opacity: 1;
        transition: opacity $speed-666 $evil-ease;
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
      .sketch-note {
        color: $midnight;
      }

      .sketch-bold {
        line-height: 1.2em;
        transform: none;

        .sketch-underline {
          border-bottom-color: $midnight;
        }
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

              span.bg {
                @include abs-fill;
                background-color: $flesh;
                visibility: hidden;
              }
            }

            @include can-hover {
              &:hover {
                .h4 {
                  color: $midnight;

                  span.bg {
                    visibility: visible;
                  }
                }
              }
            }
          }
        }
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

          &:after {
            content: attr(data-label);
            position: absolute;
            top: 50%;
            left: 50%;
            white-space: nowrap;
            transform-origin: 0% 0%;
            transform: rotate(-90deg) translateX(-50%) translateY(-50%);
          }
        }
      }
    }
  }
}

</style>
