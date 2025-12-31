// Site
import settings from './settings/settings';

// Pages
import home from './pages/home';
import work from './pages/work';
import directors from './pages/directors';
import manifesto from './pages/manifesto';
import zine from './pages/zine';
import contact from './pages/contact';

// Collections
import project from './collections/project';
import director from './collections/director';
import article from './collections/article';
import workFilter from './collections/work-filter';
import anatomyTag from './collections/anatomy-tag';

// Shared
import seoSocial from './shared/seo-social';
import singleImage from './shared/single-image';
import videoPlayer from './shared/video-player';
import richTextSketch from './shared/rich-text-sketch';
import sketchImage from './shared/sketch-image';

export const schemaTypes = [
  settings,
  home,
  work,
  directors,
  manifesto,
  zine,
  contact,
  project,
  director,
  article,
  workFilter,
  anatomyTag,
  seoSocial,
  singleImage,
  videoPlayer,
  richTextSketch,
  sketchImage
];
