export default defineNuxtPlugin((nuxtApp) => {
  const previewEnabled = useState('sanityPreviewEnabled', () => false);

  if (process.server) {
    const req = nuxtApp.ssrContext?.event?.node?.req;
    const cookieHeader = req?.headers?.cookie || '';
    if (cookieHeader.includes('sanity-preview-id=')) {
      previewEnabled.value = true;
    }
  }

  if (!previewEnabled.value) return;

  if(process.server) {
    const sanity = useSanity();
    const previewClient = sanity.client.withConfig({
      token: cfg.sanityPreviewToken,
      perspective: 'drafts',
      useCdn: false
    });

    sanity.fetch = (query, params) => {
      return previewClient.fetch(query, params);
    }
  }

  if (process.client) {
    const sanity = useSanity();
    sanity.fetch = (query, params, options) => {
      return $fetch('/api/sanity/preview-fetch', {
        method: 'POST',
        body: { query, params, options }
      });
    };
  }
});
