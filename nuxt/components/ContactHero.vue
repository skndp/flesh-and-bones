<template>
  <section class="contact-hero pad-t pad-b">
    <div class="gutter pad-b">
      <ul class="locations flesh manic">
        <li v-for="location in store.locations">
          <p>{{ location }}</p>
        </li>
      </ul>
      <h1 class="h1 flesh rough-edges">{{ title }}</h1>
    </div>
  </section>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';

const store = useSiteStore();

// Props
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  copy: {
    type: String,
    required: false
  }
});
</script>

<style lang='scss'>
section.contact-hero {
  position: relative;
  display: flex;
  flex-direction: column;

  .gutter {
    position: relative;
    display: flex;
    text-align: center;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    ul.locations {
      margin-bottom: $space-8;
      display: inline-flex;
      justify-content: center;

      li {
        display: inline-flex;

        &:not(:first-child) {
          p {
            margin-left: $space-24;
          }

          &:before {
            content: 'X';
            margin-left: $space-24;
            display: inline-flex;
          }
        }

        p {
          text-decoration: line-through;
          display: inline-flex;
          align-items: center;
        }
      }
    }

    .h1 {
      white-space: pre-line;
    }
  }
}

</style>
