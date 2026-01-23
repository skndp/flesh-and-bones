import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './schemas';
import { presentationTool } from 'sanity/presentation';
import { netlifyTool } from 'sanity-plugin-netlify';

import { media } from 'sanity-plugin-media';
import { simplerColorInput } from 'sanity-plugin-simpler-color-input';
import { vimeoField } from 'sanity-plugin-vimeo-field';

import "./styles/custom.css";
import { CompanyLogo } from './components/company-logo';

// Singletons...
const singletonTypes = new Set(schemaTypes.reduce((filtered, schemaType) => {
  if (schemaType.singleton) {
    filtered.push(schemaType.name);
  }
  return filtered;
}, []));

const singletonListItem = (S, typeName, title) => {
  return S.listItem()
    .title(title || typeName)
    .id(typeName)
    .child(S.document().schemaType(typeName).documentId(typeName))
};

const defaultDocumentNode = (S, { schemaType }) => {
  return S.document()
};

const enablePresentation = process.env.SANITY_STUDIO_ENABLE_PRESENTATION === 'true';

export default defineConfig({
  name: 'default',
  title: 'Flesh and Bones',
  icon: CompanyLogo,
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: 'production',
  document: {
    comments: {
      enabled: false
    },
    newDocumentOptions: (prev, { currentUser, creationContext }) => {
      if (creationContext.type === 'global' || creationContext.type === 'document') {
        return [];
      }
      return prev;
    }
  },
  plugins: [
    structureTool({
      defaultDocumentNode,
      structure: (S) => {
        // Build the singleton list items first
        const singletonListItems = Array.from(singletonTypes).map((singletonType) => {
          const schemaType = schemaTypes.find(st => st.name === singletonType);
          if (schemaType) {
            return singletonListItem(S, schemaType.name, schemaType.title).icon(schemaType.icon);
          }
          return null;
        }).filter(Boolean);

        // Add divider after the first item (if there's more than 1)
        if (singletonListItems.length > 1) {
          singletonListItems.splice(1, 0, S.divider().title('PAGES'));
        }

        return S.list()
          .title('GLOBAL')
          .items([
            ...singletonListItems,
            S.divider().title('ENTRIES'),
            ...S.documentTypeListItems().filter(
              listItem => ![...singletonTypes, 'media.tag'].includes(listItem.getId())
            )
          ]);
      }
    }),
    ...(enablePresentation ? [
      presentationTool({
        previewUrl: {
          origin: process.env.SANITY_STUDIO_PREVIEW_ORIGIN,
          previewMode: {
            enable: '/api/preview/enable',
            disable: '/api/preview/disable'
          }
        }
      })
    ] : []),
    media(),
    netlifyTool(),
    simplerColorInput(),
    vimeoField({
      accessToken: process.env.SANITY_STUDIO_VIMEO_ACCESS_TOKEN
    })
  ],
  schema: {
    types: schemaTypes,
    // Filter out types from the global “New document” menu options
    templates: (templates) => {
      return templates.filter(({ schemaType }) => ![...singletonTypes].includes(schemaType))
    }
  }
});
