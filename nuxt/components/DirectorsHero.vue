<template>
  <section class="directors-hero pad-t">
    <div v-if="!isTouchDevice" class="background-videos">
      <div v-for="(item, index) in directors" class="background-video" :class="{ '--active': index === activeIndex }">
        <VideoPlayer
          v-if="item.backgroundVideo && item.backgroundVideo.vimeo"
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
                <span class="rough-edges bg"></span>
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
    players.value[activeIndex.value].pause();
  }

  // set the new active index
  activeIndex.value = index;

  // if null (mouseleave) — we're done
  if (index === null) return;

  // if the new player is ready, play it
  const player = players.value[index];
  if (player) {
    player.play();
  }
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
      opacity: 0;
      visibility: hidden;
      transition: visibility 0ms linear $speed-666, opacity $speed-333 $ease-out;

      &.--active {
        visibility: visible;
        opacity: 1;
        transition: opacity $speed-333 $ease-out;
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
                visibility: hidden;
                opacity: 0;
                transition: visibility 0ms linear $speed-333, opacity $speed-333 $ease-out;
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
                      visibility: visible;
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
