const SITE_URL = 'https://www.wearefleshandbones.com';

function isAbsoluteUrl(value) {
  return typeof value === 'string' && /^https?:\/\//i.test(value);
}

export function toAbsoluteUrl(value) {
  if (!value || typeof value !== 'string') return '';

  if (isAbsoluteUrl(value)) return value;

  if (value.startsWith('/')) {
    return `${SITE_URL}${value}`;
  }

  return `${SITE_URL}/${value.replace(/^\/+/, '')}`;
}

export function normalizeSameAs(links = []) {
  return links.filter(isAbsoluteUrl);
}

export function mapLocationsToPlaces(locations = []) {
  return locations
    .filter(Boolean)
    .map((name) => ({
      '@type': 'Place',
      name
    }));
}

export function buildGlobalSchema({
  name,
  description,
  image,
  socials = [],
  locations = []
}) {
  const sameAs = normalizeSameAs(socials);
  const areaServed = mapLocationsToPlaces(locations);
  const primaryImage = toAbsoluteUrl(image || '/images/logo.png');

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'AdvertisingAgency',
      '@id': `${SITE_URL}/#organization`,
      name,
      url: SITE_URL,
      description,
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/images/logo.png')
      },
      image: {
        '@type': 'ImageObject',
        url: primaryImage
      },
      sameAs: sameAs.length ? sameAs : undefined,
      areaServed: areaServed.length ? areaServed : undefined
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name,
      description,
      publisher: {
        '@id': `${SITE_URL}/#organization`
      },
      inLanguage: 'en-US'
    }
  ];
}

export function buildContactPageSchema({
  title,
  description,
  image,
  founders = []
}) {
  const founderEntities = founders
    .filter((founder) => founder?.name)
    .map((founder, index) => ({
      '@type': 'Person',
      '@id': `${SITE_URL}/contact#founder-${index + 1}`,
      name: founder.name,
      jobTitle: founder.role || undefined,
      email: founder.email ? `mailto:${founder.email}` : undefined,
      homeLocation: founder.location
        ? {
            '@type': 'Place',
            name: founder.location
          }
        : undefined,
      description: founder.bio || undefined,
      image: founder.profileImage?.src
        ? {
            '@type': 'ImageObject',
            url: toAbsoluteUrl(founder.profileImage.src)
          }
        : undefined,
      worksFor: {
        '@id': `${SITE_URL}/#organization`
      }
    }));

  const contactPoints = founderEntities
    .filter((founder) => founder.email)
    .map((founder) => ({
      '@type': 'ContactPoint',
      contactType: founder.jobTitle || 'founder',
      email: founder.email
    }));

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#webpage`,
      url: `${SITE_URL}/contact`,
      name: title,
      description,
      isPartOf: {
        '@id': `${SITE_URL}/#website`
      },
      about: {
        '@id': `${SITE_URL}/#organization`
      },
      primaryImageOfPage: image
        ? {
            '@type': 'ImageObject',
            url: toAbsoluteUrl(image)
          }
        : undefined,
      mainEntity: {
        '@id': `${SITE_URL}/#organization`
      }
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/contact#breadcrumb`,
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: `${SITE_URL}/contact`
        }
      ]
    },
    {
      '@context': 'https://schema.org',
      '@type': 'AdvertisingAgency',
      '@id': `${SITE_URL}/#organization`,
      founder: founderEntities.length ? founderEntities : undefined,
      contactPoint: contactPoints.length ? contactPoints : undefined
    },
    ...founderEntities.map((founder) => ({
      '@context': 'https://schema.org',
      ...founder
    }))
  ];
}
