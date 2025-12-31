<template>
  <div v-if="copyHtml" :class="[ 'rich-text', appearance ]" v-html="copyHtml"></div>
</template>

<script setup>
import { toHTML } from '@portabletext/to-html';

// Props
const props = defineProps({
  copy: {
    type: Array,
    required: false
  },
  appearance: {
    type: String,
    required: false
  }
});

const customCopy = {
  marks: {
    'sketch-underline': ({ children }) => {
      const size = children.length <= 12 ? ' --short' : '';
      return `<span class='sketch-underline${size}'>${children}</span>`
    },
    'sketch-circle': ({ children }) => {
      return `<span class='sketch-circle'>${children}</span>`
    },
    'sketch-bold': ({ children }) => `<strong class='sketch-bold flesh rough-edges-light'>${children}</strong>`,
    'sketch-note': ({ children }) => `<span class='sketch-note flesh manic'>${children}</span>`
  },
  list: {
    bullet: ({ children }) => `<ul>${children}</ul>`,
    number: ({ children }) => `<ol>${children}</ol>`,
  }
}
const customCopyHtml = toHTML(props.copy, {components: customCopy});
const copyHtml = customCopyHtml.replace(/<br\/>/gi, '<br\/> ');
</script>

<style lang="scss">
.rich-text {
  position: relative;
  line-height: 2em;

  br {
    display: none;
  }

  .sketch-underline {
    position: relative;
    padding-bottom: 0.2em;
    text-decoration: none;
    box-decoration-break: clone;
    background-image: url('/images/rich-text-underline.png');
    background-repeat: no-repeat;
    background-position: 50% 100%;
    background-size: 100% 0.4em;
    display: inline;

    &.--short {
      background-image: url('/images/rich-text-underline-short.png');
    }
  }

  .sketch-circle {
    position: relative;
    padding: 0.3em 1ch;
    margin: 0 -0.4ch;
    box-decoration-break: clone;
    background-image: url('/images/rich-text-circle.png');
    background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: 100% 100%;
    display: inline;
  }

  .sketch-bold {
    position: relative;
    font-family: $graphic-black;
    transform: rotate(-1.3deg);
    display: inline-flex;
  }

  .sketch-note {
    padding: 0 0.5em;
  }

  @include respond-to($large-tablet) {
    br {
      display: inline;
    }
  }
}
</style>
