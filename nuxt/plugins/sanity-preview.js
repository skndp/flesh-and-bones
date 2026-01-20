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

  const injected = nuxtApp.$sanity || useSanity();

  if (process.client) {
    injected.fetch = (query, params, options) => {
      return $fetch('/api/sanity/preview-fetch', {
        method: 'POST',
        body: { query, params, options }
      });
    };
  }
});
