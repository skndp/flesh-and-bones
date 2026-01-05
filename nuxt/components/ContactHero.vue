<template>
  <section class="contact-hero pad-t pad-b">
    <div class="gutter pad-b">
      <ul class="locations flesh manic">
        <li v-for="location in store.locations">
          <p>{{ location }}</p>
        </li>
      </ul>
      <HeroTitle
        :title="title"
        :sketches="sketches"
        :subSketch="subSketch"
      />
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
  sketches: {
    type: Object,
    required: false
  },
  subSketch: {
    type: Object,
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
          position: relative;
          display: inline-flex;
          align-items: center;

          &:after {
            content: '';
            position: absolute;
            top: 0px;
            left: -0.5em;
            right: -0.5em;
            bottom: 0px;
            background-image: url('/images/underline.png');
            background-repeat: no-repeat;
            background-position: 50% 50%;
            background-size: 100% 5px;
          }
        }

        &:first-child {
          p {
            &:after {
              background-image: url('/images/underline-2.png');
            }
          }
        }
      }
    }

    .hero-title {
      .sketch1-holder {
        top: 50%;
        left: 66%;
        transform: translateX(-50%) translateY(-48%);
      }
    }
  }
}

</style>
