<template>
  <div class="gutter">
    <div class="rich-text-content bone" v-html="copyHtml"></div>
  </div>
</template>

<script setup>
import { toHTML, uriLooksSafe } from '@portabletext/to-html';

// Props
const props = defineProps({
  richText: {
    type: Array,
    required: false
  }
});

const customCopy = {
  block: {
    h4: ({ children }) => `<h4 class="brush flesh">${children}</h4>`,
    normal: ({ children }) => `<p>${children}</p>`
  },
  marks: {
    link: ({children, value}) => {
      const href = value.href || '';

      if (uriLooksSafe(href)) {
        return `<a href="${href}" rel="noreferrer noopener" target="_blank">${children}</a>`;
      } else {
        return children;
      }
    }
  },
  types: {
    singleImage: ({ value }) => {
      if (!value?.image?.src) return '';

      const { src, alt, width, height } = value.image;

      return `
        <div class="rich-text-image" style="aspect-ratio:${width}/${height}">
          <img src="${src}" alt="${alt || ''}" />
        </div>
      `;
    }
  }
}

const copyHtml = toHTML(props.richText, {components: customCopy});
</script>

<style lang='scss'>
.rich-text-content {
  position: relative;
  width: 100%;
  max-width: 900px;
  margin: 0 auto;

  .h2 {
    padding: span(2) 0 $space-8;
  }

  p + h4,
  ul + h4,
  ol + h4,
  .rich-text-image + h4,
  .rich-text-image + p {
    margin-top: 2em;
  }

  h4 + p {
    margin-top: 0.5em;
  }

  p {
    margin-top: 1em;

    &:empty {
      display: none;
    }
  }

  a {
    padding-bottom: 2px;
    background-image: url('/images/underline.png');
    background-repeat: no-repeat;
    background-position: 50% 100%;
    background-size: 100% 4px;
    display: inline;
  }

  .rich-text-image {
    position: relative;
    width: 100%;
    margin-top: 2em;
    overflow: hidden;

    img {
      @include abs-fill;
      object-fit: cover;
      object-position: 50% 50%;
    }
  }
}

</style>
