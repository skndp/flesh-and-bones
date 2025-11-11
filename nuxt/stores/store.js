import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', {
  state: () => ({
    loading: true,
    menuOpen: false,
    siteName: '',
    siteTitle: '',
    siteDescription: '',
    ogImage: '',
    ogUrl: ''
  }),
  actions: {
    setLoaderComplete() {
      this.loading = false;
    },
    setMenu(bool) {
      this.menuOpen = bool;
    },
    setGlobalSeo(settings) {
      this.siteName = settings.siteName,
      this.siteTitle = settings.siteTitle;
      this.siteDescription = settings.seoSocial.description;
      this.ogImage = settings.seoSocial.image.src;
      this.ogUrl = 'https://www.wearefleshandbones.com';
    }
  }
})
