import { createClient } from '@sanity/client';

export default defineEventHandler(async (event) => {
  const cookieHeader = getHeader(event, 'cookie') || '';
  const isPreview = cookieHeader.includes('sanity-preview-id=');

  if (!isPreview) {
    throw createError({ statusCode: 401, statusMessage: 'Preview not enabled' });
  }

  const { query, params, options } = await readBody(event);

  if (!query || typeof query !== 'string') {
    throw createError({ statusCode: 400, statusMessage: 'Missing query' });
  }

  const cfg = useRuntimeConfig()

  const client = createClient({
    projectId: cfg.public.sanityProjectId,
    dataset: cfg.public.sanityDataset,
    apiVersion: cfg.public.sanityApiVersion,
    token: cfg.sanityPreviewToken,
    perspective: 'drafts',
    useCdn: false
  })

  return client.fetch(query, params || {}, options);
});