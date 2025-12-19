<template>
  <section class="contact-directory pad-b">
    <div class="gutter">
      <div v-for="row in directory" class="row">
        <div class="note">
          <p class="flesh manic xs-reg">{{ row.sketchnote }}</p>
        </div>
        <ul v-for="list in row.lists" class="bone brush">
          <li><p class="flesh brush lg">{{ list.label }}</p></li>
          <li v-for="item in list.items">
            <template v-if="item.link">
              <NuxtLink :to="item.link" target="_blank">{{ item.label }}</NuxtLink>
            </template>
            <template v-else>
              <p>{{ item.label }}</p>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  directory: {
    type: Array,
    required: true
  }
});
</script>

<style lang='scss'>
section.contact-directory {
  position: relative;

  .gutter {
    .row {
      &:not(:last-child) {
        margin-bottom: $space-48;
      }

      .note {
        margin-bottom: 1em;
      }

      ul {
        &:not(:last-child) {
          margin-bottom: $space-32;
        }

        li {
          &:not(:last-child) {
            margin-bottom: $space-8;
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    .gutter {
      .row {
        display: flex;
        flex-wrap: nowrap;

        .note {
          width: 33.333%;
          margin-top: 1em;
          margin-bottom: 0px;

          p {
            max-width: 350px;
            margin-right: span(0.5);
          }
        }

        ul {
          &:not(:last-child) {
            margin-bottom: 0px;
            margin-right: span(1);
          }
        }
      }
    }
  }
}
</style>
