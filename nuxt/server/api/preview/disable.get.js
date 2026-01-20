import { deleteCookie, sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {
  deleteCookie(event, 'sanity-preview-id', { path: '/' })
  return sendRedirect(event, '/', 307)
})