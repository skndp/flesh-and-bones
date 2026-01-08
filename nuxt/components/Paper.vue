<template>
  <div class="paper" :class="{ 'offset': offset }">
    <div v-if="edges" class="edge left">
      <span class="distress"></span>
      <span class="tear"></span>
    </div>
    <div v-if="edges" class="edge right">
      <span class="tear"></span>
    </div>
  </div>
</template>

<script setup>
// Props
const props = defineProps({
  offset: {
    type: Boolean,
    required: false
  },
  edges: {
    type: Boolean,
    required: false,
    default: true
  }
});
</script>

<style lang="scss">
.paper {
  @include abs-fill;
  overflow: hidden;
  pointer-events: none;

  &:before,
  &:after {
    content: '';
    @include abs-fill;
    background-image: url('/images/noise.png');
    background-repeat: repeat;
    background-position: 50% 0%;
    background-size: 100% auto;
    mix-blend-mode: screen;
    opacity: 0.13;
  }

  &:after {
    background-image: url('/images/specks.png');
    opacity: 0.18;
  }

  .edge {
    position: absolute;
    top: 0px;
    width: span(0.5);
    max-width: 32px;
    height: 100%;

    span {
      position: absolute;
      left: 0px;
      width: 100%;
      background-color: $bone;
      mask-repeat: no-repeat;
      mask-size: cover;
      mix-blend-mode: screen;
    }

    &.left {
      left: 0px;

      span.distress {
        top: 0px;
        max-width: 16px;
        height: 100%;
        mask-image: url('/images/left-edge-distress.png');
        mask-size: 100% auto;
      }

      span.tear {
        top: 15%;
        aspect-ratio: 73/1688;
        mask-image: url('/images/left-edge-tear.png');
      }
    }

    &.right {
      right: 0px;

      span.tear {
        bottom: 20%;
        aspect-ratio: 49/874;
        mask-image: url('/images/right-edge-tear.png');
      }
    }
  }

  &.offset {
    .edge {
      &.left {
        span.distress {
          top: 100svh;
        }

        span.tear {
          top: calc(100svh + 15%);
        }
      }

      &.right {
        span.tear {
          bottom: calc(100svh + 20%);
        }
      }
    }
  }

  @include respond-to($tablet) {
    .edge {
      &.left {
        span.tear {
          top: 66%;
        }
      }
    }

    &.offset {
      .edge {
        &.left {
          span.tear {
            top: calc(100svh + 66%);
          }
        }
      }
    }
  }
}
</style>
