// Site
import settings from './settings/settings';

// Pages
import home from './pages/home';

// Collections
import caseStudy from './collections/case-study';
import director from './collections/director';
import post from './collections/post';

// Shared
import footer from './shared/footer';
import seoSocial from './shared/seo-social';

export const schemaTypes = [
  settings,
  footer,
  home,
  caseStudy,
  director,
  post,
  seoSocial
];
