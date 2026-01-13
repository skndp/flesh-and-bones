import { defineStore } from 'pinia';

export const useSiteStore = defineStore('site', {
  state: () => ({
    ripMask: '',
    pageMask: '',
    loading: true,
    menuOpen: false,
    modalOpen: false,
    modalProjects: [],
    modalIndex: 0,
    modalShowDirectors: false,
    modalPaginationLabel: '',
    siteName: '',
    siteDescription: '',
    ogImage: '',
    ogUrl: '',
    locations: [],
    socials: [],
    lightPaper: null,
    modalPaper: null
  }),
  actions: {
    setRipMask(blob) {
      this.ripMask = blob;
    },
    getRipMask() {
      return URL.createObjectURL(this.ripMask);
    },
    setPageMask(blob) {
      this.pageMask = blob;
    },
    getPageMask() {
      return URL.createObjectURL(this.pageMask);
    },
    setLoaderComplete() {
      this.loading = false;
    },
    setMenu(bool) {
      this.menuOpen = bool;
    },
    setModalOpen(projects, index, directors, label) {
      this.modalProjects = projects;
      this.modalIndex = index;
      this.modalShowDirectors = directors;
      this.modalPaginationLabel = label;
      this.modalOpen = true;
    },
    setModalIndex(val) {
      this.modalIndex = val;
    },
    setModalClose() {
      this.modalOpen = false;
    },
    setModalCleanup() {
      this.modalProjects = [];
      this.modalIndex = 0;
      this.modalShowDirectors = false;
      this.modalPaginationLabel = '';
    },
    setSettings(settings) {
      this.siteName = settings.siteName,
      this.siteDescription = settings.seoSocial?.description || '';
      this.ogImage = settings.seoSocial?.image?.src || '';
      // this.ogUrl = 'https://www.wearefleshandbones.com';
      this.ogUrl = 'https://flesh-and-bones.netlify.app';
      this.locations = settings.locations;
      this.socials = settings.socials;
      this.lightPaper = settings.lightPaper?.src || '';
      this.modalPaper = settings.modalPaper?.src || '';
    }
  }
});
