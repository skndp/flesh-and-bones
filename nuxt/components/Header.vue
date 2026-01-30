<template>
  <header id="header" :class="{ '--hidden': !show_header, '--fill --shrink': fill_header, '--menu': store.menuOpen, '--stage2': stage2, 'appear': !store.loading }">
    <nav class="nav">
      <NuxtLink class="logo" to="/" @click="onClickLogo">Flesh and Bones</NuxtLink>
      <button id="menu-btn" aria-label="Menu" @click="toggleMenu">
        <span v-if="store.menuSticker" class="menu-btn__bg" :style="{ 'background-image': `url('${store.menuSticker}')` }"></span>
        <span v-else class="menu-btn__bg bg-flesh rough-edges-light"></span>
        <span class="menu-btn__close"></span>
        <span class="menu-btn__open">
          <span @transitionend="onMenuOpenEnd"></span>
        </span>
      </button>
      <div class="circle-the-button">
        <Animated :autoplay="false" type="circle" :loop="false" background="bg-flesh" ref="circleTheButton" />
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';
import { smoothScrollTo } from '~/utils/smooth-scroll-to';

const route = useRoute();
const store = useSiteStore();

const show_header = ref(true);
const fill_header = ref(false);
const stage2 = ref(false);
const circleTheButton = ref(null);
let prev_scroll = 0;
let circle_to = 0;
let isClosing = false;

// Mounted
onMounted(() => {
  window.addEventListener('scroll', onScroll);
  onScroll();
});

// Before Unmount
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll);
});

// Methods
function onClickLogo() {
  if (route.name === 'index') {
    smoothScrollTo(0);
  }

  closeMenu();
}

function closeMenu() {
  if (!store.menuOpen) return;
  store.setMenu(false);
}

function handleMenuCloseEffects() {
  if (isClosing) return;
  isClosing = true;

  clearTimeout(circle_to);
  if (circleTheButton.value) {
    circleTheButton.value.stop();
  }

  nextTick(() => {
    isClosing = false;
  });
}

function toggleMenu() {
  if (store.menuOpen) {
    closeMenu();
  } else {
    store.setMenu(true);

    circle_to = setTimeout(() => {
      circleTheButton.value.play();
    }, 333);
  }
}

function onScroll() {
  const current_scroll = window.pageYOffset;
  //fill_header.value = true;

  if (current_scroll < prev_scroll) {
    show_header.value = true;
  } else if (current_scroll > prev_scroll) {
    show_header.value = false;
  }

  if (current_scroll <= 1) {
    show_header.value = true;
    //fill_header.value = false;
  }

  prev_scroll = current_scroll;
};

function onMenuOpenEnd(e) {
  stage2.value = store.menuOpen;
}

// Watchers
watch(() => store.menuOpen, (isOpen, wasOpen) => {
  if (!isOpen && wasOpen) {
    handleMenuCloseEffects()
  }
});

watch(() => route.fullPath, () => {
  if (store.menuOpen) {
    store.setMenu(false)
  }
});
</script>

<style lang='scss'>
#header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  @include header-ht(height);
  box-sizing: border-box;
  z-index: 85;
  transform: translateY(0%);
  transition: transform $speed-666 $ease-out;

  &.--hidden {
    transform: translateY(-100%);
  }

  &.--fill {
    &:before {
      transition: opacity $speed-666 $ease-out $speed-666;
      opacity: 1;
    }

    nav {
      .logo {
        transition: background-color $speed-666 $ease-out $speed-666;
        background-color: $midnight;
      }
    }
  }

  &.--menu {
    &.--stage2 {
      nav {
        #menu-btn {
          .menu-btn__open {
            span {
              transition: transform 0ms linear;
              transform: translate(-50%, -900%);
              visibility: hidden;
            }

            &:before {
              transition: transform 0ms linear;
              transform: translate(-50%, -750%) rotate(180deg);
              visibility: hidden;
            }

            &:after {
              transition: transform 0ms linear;
              transform: translate(-50%, -600%);
              visibility: hidden;
            }
          }
        }
      }
    }

    nav {
      .logo {
        background-color: $midnight;
      }

      #menu-btn {
        .menu-btn__bg {
          opacity: 0;
        }

        .menu-btn__open {
          span, &:before, &:after {
            visibility: hidden;
          }

          span {
            transition: transform $speed-333 cubic-bezier(0.600, 0.040, 0.980, 0.335) 200ms, visibility 0ms linear $speed-333 + 200ms;
            transform: translate(-50%, 500%);
          }

          &:before {
            transition: transform $speed-333 cubic-bezier(0.600, 0.040, 0.980, 0.335) 100ms, visibility 0ms linear $speed-333 + 100ms;
            transform: translate(-50%, 650%) rotate(180deg);
          }

          &:after {
            transition: transform $speed-333 cubic-bezier(0.600, 0.040, 0.980, 0.335), visibility 0ms linear $speed-333;
            transform: translate(-50%, 800%);
          }
        }

        .menu-btn__close {
          &:before {
            transition: transform $speed-333 $ease-out $speed-333, visibility 0ms linear;
            transform: translate(-50%, -50%) rotate(45deg);
            visibility: visible;
          }

          &:after {
            transition: transform $speed-333 $ease-out $speed-333 + 66ms, visibility 0ms linear;
            transform: translate(-50%, -50%) rotate(-45deg);
            visibility: visible;
          }
        }
      }
    }
  }

  &:not(.--menu).--stage2 {
    nav {
      #menu-btn {
        .menu-btn__close {
          &:before {
            transition: transform $speed-333 cubic-bezier(0.600, 0.040, 0.980, 0.335) 66ms, visibility 0ms linear $speed-333 + 66ms;
            transform: translateY(-50%) rotate(45deg) translateX(200%);
            visibility: hidden;
          }

          &:after {
            transition: transform $speed-333 cubic-bezier(0.600, 0.040, 0.980, 0.335), visibility 0ms linear $speed-333;
            transform: translateY(-50%) rotate(-45deg) translateX(-200%);
            visibility: hidden;
          }
        }
      }
    }
  }

  &:before {
    content: '';
    @include abs-fill;
    background-color: $bone;
    opacity: 0;
    transition: opacity $speed-666 $ease-out;
  }

  nav {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .logo {
      position: relative;
      color: transparent;
      width: 180px;
      aspect-ratio: 100/27;
      background-color: $bone;
      mask-image: url('/images/logo.png');
      mask-size: contain;
      mask-repeat: no-repeat;
      transition: background-color $speed-666 $ease-out;
    }

    #menu-btn {
      position: absolute;
      top: 50%;
      right: span(1);
      width: $space-48;
      height: $space-48;
      border-radius: 50%;
      margin-right: -6px;
      overflow: hidden;
      flex-shrink: 0;
      cursor: pointer;
      transform: translateY(-50%);

      .menu-btn__bg {
        @include abs-fill;
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: contain;
        transition: opacity $speed-666 $ease-out;

        &.bg-flesh {
          border-radius: 50%;
        }
      }

      .menu-btn__open, .menu-btn__close {
        display: block;
        @include abs-fill;

        &:before,
        &:after,
        span {
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50%;
          aspect-ratio: 47/10;
          background-color: $bone;
          mask-image: url('/images/bone.png');
          mask-size: contain;
          mask-repeat: no-repeat;
        }

        &:before,
        &:after {
          content: "";
        }
      }

      .menu-btn__open {
        span, &:before, &:after {
          visibility: visible;
        }

        span {
          transition: transform $speed-333 $ease-out $speed-333 + 200ms, visibility 0ms linear;
          transform: translate(-50%, -200%);
        }

        &:before {
          transition: transform $speed-333 $ease-out $speed-333 + 100ms, visibility 0ms linear;
          transform: translate(-50%, -50%) rotate(180deg);
        }

        &:after {
          transition: transform $speed-333 $ease-out $speed-333, visibility 0ms linear;
          transform: translate(-50%, 100%);
        }
      }

      .menu-btn__close {
        &:before, &:after {
          width: 66%;
          transition: transform 0ms linear;
          visibility: hidden;
          background-color: $midnight;
        }

        &:before {
          transform: translateY(-50%) rotate(45deg) translateX(-200%);
        }

        &:after {
          transform: translateY(-50%) rotate(-45deg) translateX(200%);
        }
      }
    }

    .circle-the-button {
      position: absolute;
      top: 10px;
      right: span(1);
      width: 60px;
      margin-right: -15px;
      pointer-events: none;
    }
  }

  @include respond-to($tablet) {
    nav {
      .logo {
        width: 200px;
      }

      .circle-the-button {
        top: 15px;
        width: 80px;
        margin-right: -25px;
      }
    }
  }

  @include respond-to($average-desktop) {
    nav {
      .logo {
        width: 240px;
      }

      #menu-btn {
        width: $space-56;
        height: $space-56;
        margin-right: -12px;
      }

      .circle-the-button {
        top: 15px;
        width: 100px;
        margin-right: -30px;
      }
    }
  }
}
</style>
