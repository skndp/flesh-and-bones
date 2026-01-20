export default defineNuxtPlugin((nuxtApp) => {
  const sanity = useSanity();
  const cfg = useRuntimeConfig();

  const hasPreviewCookie = () => {
    // SSR
    if (process.server) {
      const req = nuxtApp.ssrContext?.event?.node?.req;
      const cookieHeader = req?.headers?.cookie || '';
      return cookieHeader.includes('sanity-preview-id=');
    }

    // Client
    return document.cookie.includes('sanity-preview-id=');
  }

  // Only enable preview once
  if (!hasPreviewCookie()) return;

  const previewClient = sanity.client.withConfig({
    token: cfg.sanityPreviewToken,
    perspective: 'previewDrafts',
    useCdn: false
  })

  // Permanently override fetch for this app lifecycle
  sanity.fetch = (query, params, options) => {
    return previewClient.fetch(query, params, options)
  }
});