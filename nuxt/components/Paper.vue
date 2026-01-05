<template>
  <div class="paper">
    <div class="edge left">
      <span class="distress"></span>
      <span class="tear"></span>
    </div>
    <div class="edge right">
      <span class="tear"></span>
    </div>
  </div>
</template>

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

  @include respond-to($tablet) {
    .edge {
      &.left {
        span.tear {
          top: 66%;
        }
      }
    }
  }
}
</style>
