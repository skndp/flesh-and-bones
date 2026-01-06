<template>
  <section class="contact-directory pad-b">
    <div class="gutter">
      <div v-for="row in directory" class="row">
        <div class="note">
          <p class="flesh manic md-reg">{{ row.sketchnote }}</p>
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

      &:nth-child(2) {
        .note {
          p {
            &:after {
              content: '';
              position: absolute;
              top: 0.1em;
              left: 100%;
              margin-left: 1em;
              height: 1.6em;
              aspect-ratio: 73/87;
              background-color: $bone;
              mask-image: url('/images/smile.png');
              mask-repeat: no-repeat;
              mask-position: 50% 50%;
              mask-size: contain;
            }
          }
        }
      }

      .note {
        position: relative;
        margin-bottom: 1em;
        display: inline-flex;

        p {
          position: relative;
        }
      }

      ul {
        &:not(:last-child) {
          margin-bottom: $space-32;
        }

        li {
          &:not(:last-child) {
            margin-bottom: $space-8;
          }

          a:not([href^="tel:"]) {
            position: relative;
            padding-bottom: 5px;
            background-image: url('/images/underline.png');
            background-repeat: no-repeat;
            background-position: 50% 100%;
            background-size: 100% 5px;
            display: inline-flex;
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

        &:nth-child(2) {
          .note {
            p {
              &:after {
                top: 0.7em;
                height: 1.2em;
                margin-left: -0.1em;
              }
            }
          }
        }

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

  @include respond-to($large-tablet) {
    .gutter {
      .row {
        &:nth-child(2) {
          .note {
            p {
              &:after {
                top: 0.2em;
                height: 1.3em;
                margin-left: span(0.25);
              }
            }
          }
        }
      }
    }
  }
}
</style>
