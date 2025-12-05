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
    <Transition name="modal" @after-leave="modalCleanup">
      <Modal v-if="store.modalOpen" />
    </Transition>
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

// Async data
const settingsQuery = groq`*[(_type == "settings")][0]{
  siteName,
  seoSocial {
    description,
    image ${imageProps}
  },
  locations[],
  socials[]
}`;

const { data } = await useAsyncData('settings', () => useSanity().fetch(settingsQuery));
const settings = data.value;

// Set store settings
store.setSettings(settings);

// Now, set default SEO
useSeoMeta({
  title: store.siteName,
  description: store.siteDescription,
  ogTitle: store.siteName,
  ogDescription: store.siteDescription,
  ogImage: store.ogImage,
  ogUrl: store.ogUrl
})

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

function modalCleanup() {
  console.log('Modal: CLEANUP');
  store.setModalCleanup();
}
</script>
