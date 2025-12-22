<template>
  <div ref="wrapperRef" class="video-player-wrapper" :class="{'--no-controls': !controls}">
    <div class="video-holder" :aria-label="poster ? poster.alt : ''" :class="{'--show': playingMode, '--cover': cover}" :style="[cover && {'width': `${playerWidth}px`, 'height': `${playerHeight}px`}]">
      <ClientOnly>
        <vueVimeoPlayer
          v-if="hasVideo"
          ref="player"
          :video-id="vimeo.id"
          :options="playerOptions"
          :player-width="playerWidth"
          :player-height="playerHeight"
          @loaded="onLoaded"
          @playing="isPlaying"
          @ended="onEnded"
        />
      </ClientOnly>
    </div>
    <div v-if="controls" class="video-poster" :class="{ '--show': !playingMode }" @click="clickToPlay">
      <ResponsiveImage v-if="poster" v-bind="poster" />
      <span class="play-btn"><span class="rough-edges-light"></span></span>
    </div>
  </div>
</template>

<script setup>
import { vueVimeoPlayer } from 'vue-vimeo-player';

const props = defineProps({
  vimeo: {
    type: Object,
    required: true
  },
  poster: {
    type: Object,
    required: false
  },
  controls: {
    type: Boolean,
    required: false,
    default: false
  },
  cover: {
    type: Boolean,
    default: false,
    required: false
  },
  manualPlay: {
    type: Boolean,
    default: false,
    required: false
  }
});

defineExpose({
  playPlayer,
  pausePlayer,
  resetPlayer
});

const emit = defineEmits(['ready']);
const wrapperRef = ref(null);
const player = ref(null);
const playerWidth = ref(0);
const playerHeight = ref(0);
const playingMode = ref(false);
const playerReady = ref(false);
const playerOptions = {
  controls: props.controls,
  loop: !props.controls,
  muted: !props.controls,
  autoplay: false,
  playsinline: true,
  autopause: false
};

// Computed
const hasVideo = computed(() => {
  return props.vimeo && props.vimeo.id;
});

// Mounted
onMounted(() => {
  window.addEventListener('resize', onResize);

  nextTick(() => {
    onResize();
  });
});

// Before Unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

// Methods
function onResize() {
  if (wrapperRef.value && playerReady.value) {
    const wrapper_width = wrapperRef.value.clientWidth;
    const wrapper_height = wrapperRef.value.clientHeight;
    const video_w = props.vimeo ? props.vimeo.play.progressive[0].width : 16;
    const video_h = props.vimeo ? props.vimeo.play.progressive[0].height : 9;
    const video_ratio = video_w / video_h;

    let new_width = wrapper_width;
    let new_height = wrapper_height;

    if (wrapper_width / wrapper_height > video_ratio) {
      new_height = wrapper_width / video_ratio;
    } else {
      new_width = wrapper_height * video_ratio;
    }

    playerWidth.value = new_width + 6;
    playerHeight.value = new_height + 6;
  }
}

function onLoaded() {
  if (player.value) {
    playerReady.value = true;
    // Now that the video is loaded, call resize again to be safe
    onResize();

    // Pause video by default
    pausePlayer();

    // Call ready in parent component
    emit('ready');

    // Now 'autoplay' for looping autoplay videos...
    if (!props.controls && !props.manualPlay) {
      playPlayer();
    }
  }
}

function isPlaying() {
  if (player.value) {
    playingMode.value = true;
  }
}

function onEnded() {
  if (player.value) {
    player.value.pause();
    playingMode.value = false;
  }
}

function clickToPlay() {
  if (player.value) {
    player.value.play().catch(() => {});
    playingMode.value = true;
  }
}

function playPlayer() {
  if (player.value) {
    player.value.play().catch(() => {});
  }
}

function pausePlayer() {
  if (player.value) {
    player.value.pause().catch(() => {})
  }
}

async function resetPlayer() {
  playingMode.value = false;
  
  if (player.value) {
    player.value.update(props.vimeo.id);
  }
}
</script>

<style lang='scss'>
.video-player-wrapper {
  @include abs-fill;
  overflow: hidden;

  &.--no-controls {
    pointer-events: none;
  }

  .video-holder {
    @include abs-fill;
    overflow: hidden;
    opacity: 0;

    &.--cover {
      top: 50%;
      left: 50%;
      width: 0px;
      height: 0px;
      transform: translateX(-50%) translateY(-50%);
    }

    &.--show {
      opacity: 1;
    }

    img,
    iframe {
      @include abs-fill;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }

  .video-poster {
    @include abs-fill;
    background-color: $midnight;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0;
    pointer-events: none;
    transition: opacity $speed-666 $ease-out;

    &.--show {
      pointer-events: auto;
      opacity: 1;
    }

    .play-btn {
      position: relative;
      width: 100px;
      height: 100px;
      background-image: url('/images/play-sticker.png');
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: contain;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      span {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 0px;
        height: 0px;
        border-left: 30px solid $bone;
        border-top: 18px solid transparent;
        border-bottom: 18px solid transparent;
        transform: translateX(-34%) translateY(-50%);
      }
    }
  }

  @include respond-to($tablet) {
    .video-poster {
      .play-btn {
        width: 150px;
        height: 150px;

        span {
          border-left: 50px solid $bone;
          border-top: 30px solid transparent;
          border-bottom: 30px solid transparent;
          transform: translateX(-34%) translateY(-50%);
        }
      }
    }
  }

  @include respond-to($desktop) {
    .video-poster {
      .play-btn {
        width: 200px;
        height: 200px;

        span {
          border-left: 50px solid $bone;
          border-top: 30px solid transparent;
          border-bottom: 30px solid transparent;
          transform: translateX(-34%) translateY(-50%);
        }
      }
    }
  }
}
</style>
