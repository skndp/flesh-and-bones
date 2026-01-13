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
    <Menu />
    <SvgFilters />
    <NuxtPage :class="{ 'fade-out': isFading }" />
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
