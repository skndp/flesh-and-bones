export default defineNuxtPlugin((nuxtApp) => {
  const sanity = useSanity();
  const cfg = useRuntimeConfig();

  const req = nuxtApp.ssrContext?.event?.node?.req;
  const cookieHeader = req?.headers?.cookie || '';
  const isPreview = cookieHeader.includes('sanity-preview-id=');

  if (!isPreview) return;

  // Create a drafts-capable client
  const previewClient = sanity.client.withConfig({
    token: cfg.sanityPreviewToken,
    perspective: 'drafts',
    useCdn: false
  });

  // Override fetch to use the preview client while preview cookie exists
  sanity.fetch = (query, params) => {
    return previewClient.fetch(query, params);
  }
});