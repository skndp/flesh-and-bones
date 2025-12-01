<template>
  <div id="menu" :class="{'offset': offset}">
    <div id="menu-inner">
      <div id="menu-content" ref="contentRef">
        <nav class="nav">
          <ul class="bg-bone">
            <li><NuxtLink to="/work" @click.native="onClickNavLink"><span>Work</span></NuxtLink></li>
            <li><NuxtLink to="/directors" @click.native="onClickNavLink"><span>Directors</span></NuxtLink></li>
            <li><NuxtLink to="/manifesto" @click.native="onClickNavLink"><span>Manifesto</span></NuxtLink></li>
            <li><NuxtLink to="/zine" @click.native="onClickNavLink"><span>Zine</span></NuxtLink></li>
            <li><NuxtLink to="/contact" @click.native="onClickNavLink"><span>Contact</span></NuxtLink></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { smoothScrollTo } from '~/utils/smooth-scroll-to';

const route = useRoute();
const store = useSiteStore();
const contentRef = ref(null);
const offset = ref(false);

// Mounted
onMounted(() => {
  offset.value = window.pageYOffset > 0;

  if (contentRef.value) {
    disableBodyScroll(contentRef.value);
  }
});

// Before Unmount
onBeforeUnmount(() => {
  if (contentRef.value) {
    enableBodyScroll(contentRef.value);
  }
});

// Methods
function onClickNavLink(e) {
  let path = new URL(e.currentTarget.href).pathname;

  if (route.path === path) {
    smoothScrollTo(0);
  }

  store.setMenu(false);
}
</script>

<style lang='scss'>

#menu {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  z-index: 50;

  &.menu-enter-active,
  &.menu-leave-active {
    transition: opacity $speed-666 $evil-ease;

    #menu-inner {
      &:before {
        transition: opacity $speed-666 $evil-ease;
      }

      #menu-content {
        transition: transform $speed-666 $evil-ease;
      }
    }
  }

  &.menu-enter-from,
  &.menu-leave-to {
    opacity: 0.999;

    #menu-inner {
      &:before {
        opacity: 0;
      }

      #menu-content {
        transform: translateY(-100%);
      }
    }
  }

  &.offset {
    #menu-inner {
      @include header-ht(top);

      #menu-content {
        nav {
          ul {
            padding-top: 0px;
            @include header-ht(padding-bottom);
          }
        }
      }
    }
  }

  #menu-inner {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    overflow: hidden;

    &:before {
      content: "";
      @include abs-fill;
      opacity: 1;
      background-color: rgba($midnight, 0.5);
    }

    #menu-content {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      nav {
        display: flex;

        ul {
          width: 100%;
          @include header-ht(padding-top);
          @include header-ht(padding-bottom);
          display: flex;
          flex-direction: column;

          li {
            width: 100%;
            display: flex;
            justify-content: center;

            a {
              position: relative;
              height: $space-64;
              padding: 0 span(1);
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
  }
}
</style>
