import { createClient } from '@sanity/client';
import { validatePreviewUrl } from '@sanity/preview-url-secret';

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig();

  const clientWithToken = createClient({
    projectId: cfg.public.sanityProjectId,
    dataset: cfg.public.sanityDataset,
    apiVersion: cfg.public.sanityApiVersion,
    token: cfg.sanityPreviewToken,
    useCdn: false,
  });

  const url = getRequestURL(event).toString();
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(clientWithToken, url);

  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid preview secret' });
  }

  setCookie(event, 'sanity-preview-id', '1', {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60 * 8
  });

  return sendRedirect(event, redirectTo, 307);
});