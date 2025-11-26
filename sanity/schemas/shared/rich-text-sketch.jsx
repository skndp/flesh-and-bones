import React from 'react';
import { defineType } from 'sanity';
import { CustomTextarea } from '../../components/custom-textarea';
import { UnderlineIcon, EditIcon, BoldIcon, ActivityIcon } from '@sanity/icons';
// Sanity Icon Set: https://icons.sanity.build/all

export default defineType({
  name: 'richTextSketch',
  title: 'Rich Text Sketch',
  type: 'array',
  components: {
    input: CustomTextarea,
  },
  of: [{
    type: 'block',
    styles: [],
    lists: [],
    marks: {
      decorators: [
        {
          title: 'Underline',
          value: 'sketch-underline',
          icon: UnderlineIcon,
          component: ({ children }) =>
            <span style={{ borderBottom: '1.5px solid #e26844' }}>{children}</span>
        },
        {
          title: 'Circle',
          value: 'sketch-circle',
          icon: EditIcon,
          component: ({ children }) =>
            <span style={{ border: '1.5px solid #e26844', borderRadius: '50%' }}>{children}</span>
        },
        {
          title: 'Bold',
          value: 'sketch-bold',
          icon: BoldIcon,
          component: ({ children }) =>
            <span style={{ display: 'inline-block', color: '#e26844', fontWeight: 'bold', textTransform: 'uppercase' }}>{children}</span>
        },
        {
          title: 'Sketch',
          value: 'sketch-note',
          icon: ActivityIcon,
          component: ({ children }) =>
            <span style={{ display: 'inline-block', color: '#e26844', fontFamily: 'fantasy, cursive, sans-serif', fontWeight: 'bold' }}>{children}</span>
        }
      ],
      annotations: []
    }
  }]
});
