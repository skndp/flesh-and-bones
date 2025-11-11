<template>
  <div>
    <Transition name="loading">
      <Loader v-if="store.loading" />
    </Transition>
    <Transition name="p2p-loading">
      <PageToPageLoader v-if="pageToPageLoader" />
    </Transition>
    <DevOnly>
      <GridOverlay />
    </DevOnly>
    <Header />
    <transition name="menu">
      <Menu v-if="store.menuOpen" />
    </transition>
    <NuxtPage :class="{ 'fade-out': isFading }" />
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app';
import { useRouter } from 'vue-router';
import { useSiteStore } from '~/stores/store';

const nuxtApp = useNuxtApp();
const router = useRouter();
const store = useSiteStore();

const isFading = ref(false);
const pageToPageLoader = ref(false);
let pageToPageLoaderTimeout = null;

router.beforeEach((to, from, next) => {
  isFading.value = true;
  next();
});

router.beforeResolve((to, from, next) => {
  pageToPageLoaderTimeout = setTimeout(() => {
    pageToPageLoader.value = true;
  }, 333); // only show loader if page takes > 333ms
  next();
});

nuxtApp.hook('page:finish', () => {
  clearTimeout(pageToPageLoaderTimeout);
  pageToPageLoader.value = false;
  isFading.value = false;
});

// const settingsQuery = groq`*[(_type == "settings")][0]{
//   siteName,
//   siteTitle,
//   seoSocial {
//     description,
//     image ${imageProps}
//   }
// }`

// Async data
// const uniqKey = 'appSettings';
// const { data } = await useAsyncData(uniqKey, () => useSanity().fetch(settingsQuery));
// const settings = data.value;

// store.setGlobalSeo(settings);

// Mounted
onMounted(() => {
  window.addEventListener('resize', onResize);
  onResize();

  setTimeout(() => {
    store.setLoaderComplete();
  }, 1000);
});

// Before Unmount
onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

// Methods
function onResize() {
  updateScrollbarWidth();
};

function updateScrollbarWidth() {
  // NOTE: Store scrollbar width in css custom property to calculate grid spans properly
  const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
  document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
};
</script>
