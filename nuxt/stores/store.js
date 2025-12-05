import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', {
  state: () => ({
    loading: true,
    menuOpen: false,
    modalOpen: false,
    modalProjects: [],
    modalIndex: 0,
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
    setModalOpen(projects, index) {
      this.modalProjects = projects;
      this.modalIndex = index;
      this.modalOpen = true;
    },
    setModalClose() {
      this.modalOpen = false;
    },
    setModalCleanup() {
      this.modalProjects = [];
      this.modalIndex = 0;
    },
    setModalIndex(index) {
      this.modalIndex = index;
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
