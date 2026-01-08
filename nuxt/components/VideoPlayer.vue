<template>
  <div ref="wrapperRef" class="video-player-wrapper" :class="{'--no-controls': !controls}">
    <div
      class="video-holder"
      :aria-label="poster ? poster.alt : ''"
      :class="{'--show': playingMode, '--cover': cover}"
      :style="[cover && {'width': `${playerWidth}px`, 'height': `${playerHeight}px`}]"
    >
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
  resetPlayer,
  restartPlayer
});

const emit = defineEmits(['ready']);
const wrapperRef = ref(null);
const sdkPlayer = shallowRef(null);

const playerWidth = ref(0);
const playerHeight = ref(0);
const originalVideoWidth = ref(16);
const originalVideoHeight = ref(9);

const playingMode = ref(false);
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
onMounted(async () => {
  await nextTick();
  window.addEventListener('resize', onResize);
});

// Before Unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

// Methods
function onResize() {
  if (!wrapperRef.value) return;

  const wrapperWidth = wrapperRef.value.clientWidth;
  const wrapperHeight = wrapperRef.value.clientHeight;
  const videoRatio = originalVideoWidth.value / originalVideoHeight.value;

  let newWidth = wrapperWidth;
  let newHeight = wrapperHeight;

  if (wrapperWidth / wrapperHeight > videoRatio) {
    newHeight = wrapperWidth / videoRatio;
  } else {
    newWidth = wrapperHeight * videoRatio;
  }

  playerWidth.value = Math.ceil(newWidth);
  playerHeight.value = Math.ceil(newHeight);
}

async function onLoaded(evt, vimeoPlayer) {
  sdkPlayer.value = vimeoPlayer;

  try {
    const [w, h] = await Promise.all([
      vimeoPlayer.getVideoWidth(),
      vimeoPlayer.getVideoHeight()
    ]);

    originalVideoWidth.value = w;
    originalVideoHeight.value = h;
  } catch (e) {
    console.warn('Failed to get video dimensions (loaded)', e);
  }

  onResize();

  // Call ready in parent component
  emit('ready');

  // Now 'autoplay' for looping autoplay videos...
  if (!props.controls && !props.manualPlay) {
    playPlayer();
  }
}

function clickToPlay() {
  if (sdkPlayer.value) {
    sdkPlayer.value.play().catch(() => {});
    playingMode.value = true;
  }
}

function isPlaying() {
  if (sdkPlayer.value) {
    playingMode.value = true;
  }
}

function onEnded() {
  if (props.controls && sdkPlayer.value) {
    sdkPlayer.value.pause().catch(() => {});
    playingMode.value = false;
  }
}

function playPlayer() {
  if (sdkPlayer.value) {
    sdkPlayer.value.play().catch(() => {});
  }
}

function pausePlayer() {
  if (sdkPlayer.value) {
    sdkPlayer.value.pause().catch(() => {});
  }
}

async function resetPlayer() {
  if (!sdkPlayer.value) return;

  playingMode.value = false;
  
  try {
    await sdkPlayer.value.pause();
    await sdkPlayer.value.setCurrentTime(0);
  } catch (e) {
    console.warn('Failed to reset Vimeo player', e);
  }
}

async function restartPlayer(index) {
  if (!sdkPlayer.value) return;

  try {
    await sdkPlayer.value.pause();
    await sdkPlayer.value.setCurrentTime(0);
    await sdkPlayer.value.play();
    playingMode.value = true;
  } catch (e) {
    console.warn('Failed to restart Vimeo player', e);
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
