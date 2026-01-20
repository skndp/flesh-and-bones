export default defineNuxtPlugin((nuxtApp) => {
  const previewEnabled = useState('sanityPreviewEnabled', () => false);
  const cfg = useRuntimeConfig();

  if (process.server) {
    const req = nuxtApp.ssrContext?.event?.node?.req;
    const cookieHeader = req?.headers?.cookie || '';
    if (cookieHeader.includes('sanity-preview-id=')) {
      previewEnabled.value = true;
    }
  }

  if (!previewEnabled.value) return;

  const sanity = nuxtApp.$sanity || useSanity();

  if (process.server) {
    const previewClient = sanity.client.withConfig({
      token: cfg.sanityPreviewToken,
      perspective: 'drafts',
      useCdn: false
    });

    sanity.fetch = (query, params, options) => {
      return previewClient.fetch(query, params, options);
    }
    return;
  }

  sanity.fetch = (query, params, options) => {
    return $fetch('/api/sanity/preview-fetch', {
      method: 'POST',
      body: { query, params, options }
    });
  }
})

