export default defineNuxtPlugin((nuxtApp) => {
  const sanity = useSanity()
  const config = useRuntimeConfig()
  const preview = useSanityPreview()

  // SERVER: first request only
  if (process.server) {
    const req = nuxtApp.ssrContext?.event?.node?.req
    const cookies = req?.headers?.cookie || ''
    preview.value = cookies.includes('sanity-preview-id=')
  }

  // CLIENT: hydration + navigation
  if (process.client) {
    preview.value = document.cookie.includes('sanity-preview-id=')
  }

  if (!preview.value) return

  const previewClient = sanity.client.withConfig({
    token: config.sanityPreviewToken,
    perspective: 'drafts',
    useCdn: false
  })

  // Override fetch globally
  sanity.fetch = (query, params) => {
    return previewClient.fetch(query, params)
  }
})