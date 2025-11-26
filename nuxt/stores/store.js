import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', {
  state: () => ({
    loading: true,
    menuOpen: false,
    siteName: '',
    siteDescription: '',
    ogImage: '',
    ogUrl: '',
    locations: [],
    socials: []
  }),
  actions: {
    setLoaderComplete() {
      this.loading = false;
    },
    setMenu(bool) {
      this.menuOpen = bool;
    },
    setSettings(settings) {
      this.siteName = settings.siteName,
      this.siteDescription = settings.seoSocial?.description || '';
      this.ogImage = settings.seoSocial?.image?.src || '';
      this.ogUrl = 'https://www.wearefleshandbones.com';
      this.locations = settings.locations;
      this.socials = settings.socials;
    }
  }
});
