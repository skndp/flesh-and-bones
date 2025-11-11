<template>
  <div id="menu">
    <div id="menu-inner">
      <div id="menu-mask">
        <div id="menu-content" ref="contentRef">
          <nav class="nav --mobile">
            <ul class="bg-midnight">
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
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { smoothScrollTo } from '~/utils/smooth-scroll-to';

const route = useRoute();
const store = useSiteStore();
const contentRef = ref(null);

// Mounted
onMounted(() => {
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

    #menu-inner,
    #menu-mask {
      transition: transform $speed-666 $evil-ease;
    }
  }

  &.menu-enter-from,
  &.menu-leave-to {
    opacity: 0.999;

    #menu-inner {
      transform: translateY(-100%);
    }

    #menu-mask {
      transform: translateY(100%);
    }
  }

  #menu-inner {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba($bone, 0.5);
    overflow: hidden;
  }

  #menu-mask {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #menu-content {
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;

    nav {
      display: flex;

      ul {
        padding: $header-ht 0;
        width: 100%;
        display: flex;
        flex-direction: column;

        li {
          width: 100%;
          display: flex;

          a {
            position: relative;
            height: $header-ht;
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
</style>
