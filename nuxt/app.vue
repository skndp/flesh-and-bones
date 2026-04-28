<template>
  <div>
    <PreviewBadge v-if="previewOrigin" />
    <Transition name="loading" :duration="2100">
      <Loader v-if="store.loading" />
    </Transition>
    <DevOnly>
      <GridOverlay />
    </DevOnly>
    <Transition name="modal" @after-leave="modalCleanup" :duration="1000">
      <Modal v-if="store.modalOpen" />
    </Transition>
    <Header />
    <Menu />
    <SvgFilters />
    <NuxtPage />
    <div id="page-mask-wrapper" ref="pageMaskWrapper" inert>
      <div id="page-mask" ref="pageMask"></div>
    </div>    
    <Transition name="p2p-loading">
      <PageToPageLoader v-if="pageToPageLoader" />
    </Transition>
  </div>
</template>

<script setup>
import { useNuxtApp } from '#app';
import { useRouter } from 'vue-router';
import { useSiteStore } from '~/stores/store';
import { buildGlobalSchema } from '~/utils/schema';

const nuxtApp = useNuxtApp();
const router = useRouter();
const route = useRoute();
const store = useSiteStore();
const siteUrl = 'https://www.wearefleshandbones.com';

const previewOrigin = ref(false);
const targetOrigin = 'https://flesh-and-bones-preview.netlify.app';

const pageMaskWrapper = ref(null);
const pageMask = ref(null);
const pageToPageLoader = ref(false);

let pageToPageLoaderTimeout = null;

router.beforeEach((to, from, next) => {
  if (pageMaskWrapper.value && pageMask.value) {
    pageMaskWrapper.value.style.backgroundColor = '#1a1a1a';
    pageMaskWrapper.value.style.visibility = 'visible';
    pageMaskWrapper.value.style.opacity = 1;
    pageMask.value.style.maskImage = 'none';

    // force layout
    pageMask.value.getBoundingClientRect();

    // wait double frame so Frame 1, styles applied and Frame 2, mask is ACTUALLY painted
    requestAnimationFrame(() => {
      next();
    });
  } else {
    next();
  }
});

router.beforeResolve((to, from, next) => {
  setTimeout(() => {
    next();
  }, 333);

  pageToPageLoaderTimeout = setTimeout(() => {
    pageToPageLoader.value = true;
  }, 500); // only show p2p spinner if page takes > 500ms

  store.initialRoute = false;
});

nuxtApp.hook('page:finish', () => {
  clearTimeout(pageToPageLoaderTimeout);
  pageToPageLoader.value = false;

  if (pageMaskWrapper.value && pageMask.value && store.pageMask !== '') {
    pageMask.value.style.maskImage = `url('${store.getPageMask()}'), linear-gradient(#000 0 0)`;

    // force layout
    pageMask.value.getBoundingClientRect();
    pageMaskWrapper.value.style.backgroundColor = 'transparent';
  }

  setTimeout(() => {
    if (pageMaskWrapper.value && pageMask.value) {
      pageMaskWrapper.value.style.visibility = 'hidden';
      pageMaskWrapper.value.style.opacity = 0;
      pageMask.value.style.maskImage = 'none';
    }
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
  backgroundTexture ${imageProps},
  leftEdgeDistress ${imageProps},
  rightEdgeDistress ${imageProps},
  lightPaper ${imageProps},
  modalPaper ${imageProps},
  playButton ${imageProps},
  menuSticker ${imageProps}
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

useHead(() => ({
  link: [
    {
      rel: 'canonical',
      href: `${siteUrl}${normalizeCanonicalPath(route.fullPath)}`
    }
  ],
  script: [
    {
      key: 'global-jsonld',
      type: 'application/ld+json',
      children: JSON.stringify(buildGlobalSchema({
        name: store.siteName,
        description: store.siteDescription,
        image: store.ogImage,
        socials: store.socials,
        locations: store.locations
      }))
    }
  ]
}))

// Mounted
onMounted(() => {
  console.log(`☠️ Seek and Deploy was here. https://seekanddeploy.com`);

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

function normalizeCanonicalPath(path = '/') {
  const cleanPath = path.split('#')[0].split('?')[0] || '/';

  if (cleanPath === '/') return cleanPath;

  return cleanPath.replace(/\/+$/, '') || '/';
}
</script>
