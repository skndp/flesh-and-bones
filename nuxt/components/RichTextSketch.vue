<template>
  <div class="rich-text" v-html="copyHtml"></div>
</template>

<script setup>
import { toHTML } from '@portabletext/to-html';

// Props
const props = defineProps({
  copy: {
    type: Array,
    required: false
  }
});

const customCopy = {
  marks: {
    'sketch-underline': ({ children }) => {
      return `<span class='sketch-underline'>${children}</span>`
    },
    'sketch-circle': ({ children }) => {
      return `<span class='sketch-circle'>${children}</span>`;
    },
    'sketch-bold': ({ children }) => `<strong class='sketch-bold'>${children}</strong>`,
    'sketch-note': ({ children }) => `<span class='sketch-note'>${children}</span>`
  },
  list: {
    bullet: ({ children }) => `<ul>${children}</ul>`,
    number: ({ children }) => `<ol>${children}</ol>`,
  }
}
const copyHtml = toHTML(props.copy, {components: customCopy});
</script>

<style lang="scss">
.rich-text {
  line-height: 2em;

  .sketch-underline {
    border-bottom: 1.5px solid $flesh;
  }

  .sketch-circle {
    border: 1.5px solid $flesh;
    border-radius: 50%;
  }

  .sketch-bold {
    color: $flesh;
  }

  .sketch-note {
    color: $flesh;
    text-transform: none;
    font-family: fantasy, cursive, sans-serif;
  }
}
</style>
