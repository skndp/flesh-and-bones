import React from 'react';
import { defineField, defineType } from 'sanity';
import { PlayIcon } from '@sanity/icons';

export default defineType({
  name: 'videoPlayer',
  title: 'Video Player w/ Controls',
  type: 'object',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'vimeo',
      title: 'Vimeo Player',
      type: 'vimeo',
      description: 'This is the numerical ID at the end of the URL (i.e. for https://vimeo.com/123456789 your ID is 123456789).',
      validation: [
        Rule => Rule.required()
      ]
    })
  ],
  preview: {
    select: {
      title: 'vimeo.name',
      thumb: 'vimeo.pictures.sizes.[1].link'
    },
    prepare: ({ title, thumb }) => {
      return {
        title: title ? title : 'Please enter a valid Vimeo ID',
        subtitle: 'Video Player w/ Controls',
        media: thumb ? <img src={thumb} alt={title || ''} /> : PlayIcon
      }
    }
  }
});
