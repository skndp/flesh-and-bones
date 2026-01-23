<template>
  <div>
    <PreviewBadge v-if="previewOrigin" />
    <Transition name="loading">
      <Loader v-if="store.loading" />
    </Transition>
    <DevOnly>
      <GridOverlay />
    </DevOnly>
    <Transition name="modal" @after-leave="modalCleanup">
      <Modal v-if="store.modalOpen" />
    </Transition>
    <Header />
    <Menu />
    <SvgFilters />
    <NuxtPage />
    <div id="page-mask" ref="pageMask" inert></div>
    <Transition name="p2p-loading">
      <PageToPageLoader v-if="pageToPageLoader" />
    </Transition>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app';
import { useRouter } from 'vue-router';
import { useSiteStore } from '~/stores/store';

const nuxtApp = useNuxtApp();
const router = useRouter();
const route = useRoute();
const store = useSiteStore();

const previewOrigin = ref(false);
const targetOrigin = 'https://flesh-and-bones-preview.netlify.app';

const pageMask = ref(null);
const pageToPageLoader = ref(false);
let pageToPageLoaderTimeout = null;

router.beforeEach((to, from, next) => {
  pageMask.value.style.visibility = 'visible';
  pageMask.value.style.opacity = 1;
  next();
});

router.beforeResolve((to, from, next) => {
  setTimeout(() => {
    // setTimeout(() => next(), 1000); for testing
    next();
  }, 333); // allow time for fade

  pageToPageLoaderTimeout = setTimeout(() => {
    pageToPageLoader.value = true;
  }, 350); // only show loader if page takes > 350ms
});

nuxtApp.hook('page:finish', () => {
  clearTimeout(pageToPageLoaderTimeout);
  pageToPageLoader.value = false;
  if(store.pageMask !== '') pageMask.value.style.maskImage = `url('${store.getPageMask()}'), linear-gradient(#000 0 0)`;

  setTimeout(() => {
    pageMask.value.style.visibility = 'hidden';
    pageMask.value.style.opacity = 0;
    pageMask.value.style.maskImage = `unset`;
  }, 1000);
});

// Async data
const settingsQuery = groq`*[(_type == "settings")][0]{
  siteName,
  seoSocial {
    description,
    image ${imageProps}
  },
  locations[],
  socials[],
  lightPaper ${imageProps},
  modalPaper ${imageProps}
}`;

const { data } = await useAsyncData('settings', () => useSanity().fetch(settingsQuery));
const settings = data.value;

// Set store settings
store.setSettings(settings);

// Now, set default SEO
useSeoMeta({
  title: store.siteName,
  ogTitle: store.siteName,
  description: store.siteDescription,
  ogDescription: store.siteDescription,
  ogImage: store.ogImage,
  ogUrl: store.ogUrl
})

// Mounted
onMounted(() => {
  console.log(`Made with ☠️ by Seek and Deploy. https://seekanddeploy.com`);

  if (window.location.origin === targetOrigin) {
    previewOrigin.value = true;
  }

  setTimeout(() => {
    // If not home page, go ahead and set loader complete
    // (HomeHeroVideo has it's own video loadeer to trigger it's own setLoaderComplete)
    if (route.name !== 'index') {
      store.setLoaderComplete();
    }
  }, 100);
});

// Methods
function modalCleanup() {
  store.setModalCleanup();
}
</script>
