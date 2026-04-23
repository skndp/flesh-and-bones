import type { H3Event } from 'h3';

const SITE_URL = 'https://www.wearefleshandbones.com';
const PREVIEW_HOST = 'flesh-and-bones-preview.netlify.app';

function getRequestHost(event: H3Event) {
  const forwardedHost = event.node.req.headers['x-forwarded-host'];
  const hostHeader = Array.isArray(forwardedHost)
    ? forwardedHost[0]
    : forwardedHost || event.node.req.headers.host || '';

  return hostHeader.toLowerCase();
}

export default defineEventHandler((event) => {
  const isPreviewHost = getRequestHost(event).includes(PREVIEW_HOST);
  const lines = isPreviewHost
    ? [
        'User-agent: *',
        'Disallow: /'
      ]
    : [
        'User-agent: *',
        'Allow: /',
        'Disallow: /api/preview/',
        'Disallow: /api/sanity/',
        `Sitemap: ${SITE_URL}/sitemap.xml`
      ];

  event.node.res.setHeader('content-type', 'text/plain; charset=utf-8');

  return `${lines.join('\n')}\n`;
});
