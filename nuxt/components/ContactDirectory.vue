<template>
  <section class="contact-directory">
    <div class="gutter">
      <div v-for="row in directory" class="row">
        <div class="note">
          <p class="flesh manic md-reg"><span>{{ row.sketchnote }}</span></p>
        </div>
        <ul v-for="list in row.lists" class="bone brush">
          <li><p class="flesh brush lg"><span>{{ list.label }}</span></p></li>
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
      position: relative;

      &:not(:last-child) {
        margin-bottom: $space-24;
        padding-bottom: calc(4em + $space-24);

        &:after {
          content: '';
          position: absolute;
          bottom: 0px;
          left: 75%;
          height: 4em;
          aspect-ratio: 203/184;
          background-color: $bone;
          mask-image: url('/images/bolts.png');
          mask-repeat: no-repeat;
          mask-position: 50% 50%;
          mask-size: contain;
          display: flex;
        }
      }

      &:first-child {
        ul:first-of-type {
          li:first-child {
            p {
              &:before {
                content: '';
                position: absolute;
                top: 0px;
                left: 0px;
                height: 2.2em;
                aspect-ratio: 417/209;
                background-color: $bone;
                mask-image: url('/images/double-circle.png');
                mask-repeat: no-repeat;
                mask-position: 50% 50%;
                mask-size: contain;
                transform: translateX(-18%) translateY(-27%);
              }
            }
          }
        }
      }

      &:nth-child(2) {
        .note {
          p {
            span {
              position: relative;
              display: flex;

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
      }

      .note {
        position: relative;
        margin-bottom: 1.5em;
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

          p {
            position: relative;

            span {
              position: relative;
              display: flex;
            }
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

        &:first-child {
          .note {
            p {
              span {
                position: relative;
                display: flex;

                &:after {
                  content: '';
                  position: absolute;
                  top: 100%;
                  right: 0.8em;
                  height: 1.3em;
                  aspect-ratio: 179/81;
                  background-color: $flesh;
                  mask-image: url('/images/right-arrow-biz.png');
                  mask-repeat: no-repeat;
                  mask-position: 50% 50%;
                  mask-size: contain;
                  transform: translateY(-0.4em);
                }
              }
            }
          }
        }

        &:nth-child(2) {
          .note {
            p {
              span {
                &:before {
                  content: '';
                  position: absolute;
                  top: 100%;
                  left: 50%;
                  height: 0.84em;
                  aspect-ratio: 96/31;
                  background-color: $bone;
                  mask-image: url('/images/bolt.png');
                  mask-repeat: no-repeat;
                  mask-position: 50% 50%;
                  mask-size: contain;
                  transform: translateX(-50%) translateY(0.4em) rotate(-3deg);
                }

                &:after {
                  top: 0.7em;
                  height: 1.2em;
                  margin-left: -0.1em;
                }
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
        &:not(:last-child) {
          &:after {
            bottom: 0.4em;
            left: 54%;
          }
        }

        &:nth-child(2) {
          .note {
            p {
              span {
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

  @include respond-to($average-desktop) {
    .gutter {
      .row {
        &:not(:last-child) {
          &:after {
            left: 48%;
          }
        }
      }
    }
  }
}
</style>
