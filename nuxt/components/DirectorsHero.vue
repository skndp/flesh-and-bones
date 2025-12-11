<template>
  <section class="directors-hero pad-t pad-b">
    <div class="gutter pad-b">
      <h1 class="title h5 midnight">
        <RichTextSketch :copy="sketchHeading" />
      </h1>
      <div class="directors">
        <span v-if="sketchnoteLeft" class="sketchnote manic md" inert :data-label="sketchnoteLeft"></span>
        <ul>
          <li v-for="director in directors">
            <NuxtLink :to="director.slug">
              <p class="h4">
                <span class="rough-edges-light bg"></span>
                <span class="rough-edges-light">{{ director.title }}</span>
              </p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
// Props
const props = defineProps({
  sketchnoteLeft: {
    type: String,
    required: false
  },
  sketchHeading: {
    type: Array,
    required: true
  },
  directors: {
    type: Array,
    required: false
  }
});
</script>

<style lang='scss'>
section.directors-hero {
  position: relative;
  background-color: goldenrod;
  display: flex;
  flex-direction: column;

  .gutter {
    text-align: center;

    .title {
      .sketch-note {
        color: $midnight;
      }

      .sketch-bold {
        line-height: 1.2em;
        transform: none;

        .sketch-underline {
          border-bottom-color: $midnight;
        }
      }
    }

    .directors {
      position: relative;
      padding: 1em 0;

      .sketchnote {
        position: absolute;
        top: 0px;
        left: span(-1);
        width: span(1);
        height: 100%;
        display: flex;

        &:after {
          content: attr(data-label);
          position: absolute;
          top: 50%;
          left: 50%;
          white-space: nowrap;
          transform-origin: 0% 0%;
          transform: rotate(-90deg) translateX(-50%) translateY(-50%);
        }
      }

      ul {
        width: 100%;
        max-width: 1000px;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        li {
          display: inline-flex;

          a {
            display: inline-flex;

            .h4 {
              position: relative;
              color: $bone;
              margin: 0 0.3em;
              padding: 0.7em 0.3em;
              display: inline-flex;

              span.bg {
                @include abs-fill;
                background-color: $flesh;
                visibility: hidden;
              }
            }

            @include can-hover {
              &:hover {
                .h4 {
                  color: $midnight;

                  span.bg {
                    visibility: visible;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

</style>
