import { createClient } from '@sanity/client'
import { validatePreviewUrl } from '@sanity/preview-url-secret'
import { setCookie, sendRedirect } from 'h3'

export default defineEventHandler(async (event) => {
  const cfg = useRuntimeConfig()

  const client = createClient({
    projectId: cfg.sanityProjectId,
    dataset: cfg.sanityDataset,
    apiVersion: cfg.sanityApiVersion,
    useCdn: false,
    token: cfg.sanityPreviewToken
  })

  const url = getRequestURL(event).toString()
  const { isValid, redirectTo = '/' } = await validatePreviewUrl(client, url)

  if (!isValid) {
    throw createError({ statusCode: 401, statusMessage: 'Invalid preview secret' })
  }

  setCookie(event, '__sanity_preview', 'true', {
    httpOnly: true,
    sameSite: 'none',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 30
  })

  return sendRedirect(event, redirectTo, 307)
});