<template>
  <header id="header" :class="{ '--hidden': !show_header, '--fill --shrink': fill_header, '--menu': store.menuOpen, 'appear': !store.loading }">
    <nav class="nav">
      <NuxtLink class="logo" to="/" @click.native="onClickLogo">Flesh and Bones</NuxtLink>
      <button id="menu-btn" aria-label="Menu" @click="toggleMenu">
        <span />
      </button>
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
let prev_scroll = 0;

// Mounted
onMounted(() => {
  window.addEventListener('resize', onResize);
  window.addEventListener('scroll', onScroll);
  onScroll();
});

// Before Unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
  window.removeEventListener('scroll', onScroll);
});

// Methods
function onClickLogo() {
  if (route.name === 'index') {
    smoothScrollTo(0);
  }

  store.setMenu(false);
}

function toggleMenu() {
  if (store.menuOpen) {
    store.setMenu(false);
  } else {
    store.setMenu(true);
  }
}

function onResize() {
  if (window.innerWidth >= 768 && store.menuOpen) {
    store.setMenu(false);
  }
};

function onScroll() {
  const current_scroll = window.pageYOffset;
  fill_header.value = true;

  if (current_scroll < prev_scroll) {
    show_header.value = true;
  } else if (current_scroll > prev_scroll) {
    show_header.value = false;
  }

  if (current_scroll <= 1) {
    show_header.value = true;
    fill_header.value = false;
  }

  prev_scroll = current_scroll;
};

// Watchers
watch(route, () => {
  store.setMenu(false);
});
</script>

<style lang='scss'>

#header {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: $header-ht;
  box-sizing: border-box;
  z-index: 100;
  transform: translateY(0%);
  transition: transform $speed-666 $ease-out;

  &.--hidden {
    transform: translateY(-100%);
  }

  &.--fill {
    &:before {
      opacity: 1;
    }

    nav {
      .logo {
        background-color: $bone;
      }
    }
  }

  &.--menu {
    nav {
      .logo {
        background-color: $flesh;
      }

      #menu-btn {
        span {
          transform: rotate(45deg);
        }
      }
    }
  }

  &:before {
    content: '';
    @include abs-fill;
    background-color: $midnight;
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
      width: 200px;
      aspect-ratio: 100/27;
      background-color: $midnight;
      mask-image: url('./images/logo.png');
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
      margin-right: -17px;
      background-color: $midnight;
      border-radius: 50%;
      box-shadow: 0px 0px 0px 2px $bone;
      overflow: hidden;
      display: flex;
      flex-shrink: 0;
      cursor: pointer;
      transform: translateY(-50%);

      span {
        @include abs-fill;
        display: flex;
        transform: rotate(0deg);
        transition: transform $speed-666 $ease-out;

        &:before,
        &:after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 12px;
          height: 3px;
          background-color: $bone;
          display: flex;
          transform: translateX(-50%) translateY(-50%);
        }

        &:after {
          width: 3px;
          height: 12px;
        }
      }
    }
  }
}

</style>
