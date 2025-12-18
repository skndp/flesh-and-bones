<template>
  <footer id="footer" class="bg-bone pad-b" ref="foot">
    <div class="gutter">
      <ul class="locations manic md">
        <li v-for="location in store.locations">
          <p>{{ location }}</p>
        </li>
      </ul>
      <ul class="pages midnight brush">
        <li><NuxtLink to="/work" @click.native="onClickNavLink">
          <span class="rough-edges-light"></span>
          <span>Work</span></NuxtLink>
        </li>
        <li><NuxtLink to="/directors" @click.native="onClickNavLink">
          <span class="rough-edges-light"></span>
          <span>Directors</span></NuxtLink>
        </li>
        <li><NuxtLink to="/manifesto" @click.native="onClickNavLink">
          <span class="rough-edges-light"></span>
          <span>Manifesto</span></NuxtLink>
        </li>
        <li><NuxtLink to="/zine" @click.native="onClickNavLink">
          <span class="rough-edges-light"></span>
          <span>Zine</span></NuxtLink>
        </li>
        <li><NuxtLink to="/contact" @click.native="onClickNavLink">
          <span class="rough-edges-light"></span>
          <span>Contact</span></NuxtLink>
        </li>
      </ul>
      <ul class="socials">
        <li v-for="link in store.socials">
          <NuxtLink :to="link" target="_blank" />
        </li>
      </ul>
      <p class="manic sm">© {{ new Date().getFullYear() }} Flesh and Bones, Inc.</p>
    </div>
  </footer>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';
import { smoothScrollTo } from '~/utils/smooth-scroll-to';

const route = useRoute();
const store = useSiteStore();
const foot = ref(null);
let resize_to = 0;

// Lifecycle
onMounted(() => {
  window.addEventListener('resize', onResize);
  setMask();
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
});

// Methods
function onClickNavLink(e) {
  let path = new URL(e.currentTarget.href).pathname;

  if (route.path === path) {
    smoothScrollTo(0);
  }
}

function onResize(e) {
  clearTimeout(resize_to);
  resize_to = setTimeout(() => {
    setMask();
  }, 250);
}

function setMask() {
  const w = window.innerWidth;
  const mask = createTornEdge({
    width: w,
    height: 200,
    startY: 100,
    endY: 100,
    wobble: 0.85,
    edgeRoughness: 4
  });

  foot.value.style.maskImage = `url(${mask}), linear-gradient(#000 0 0)`;
}
</script>

<style lang='scss'>
#footer {
  position: relative;
  padding-top: calc(span(0.5) + 200px);
  mask-size: 101% auto;
  mask-composite: exclude;
  mask-repeat: no-repeat;

  .gutter {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    ul.locations {
      margin-bottom: $space-24;
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

    ul.pages {
      margin-bottom: $space-48;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;

      li {
        display: inline-flex;
        justify-content: center;

        a {
          position: relative;
          margin: 0 0.5em;
          padding: 0.1em 0.2em 0.2em;
          display: inline-flex;
          justify-content: center;

          span.rough-edges-light {
            @include abs-fill;
            background-color: $flesh;
            visibility: hidden;
          }

          span:not(.rough-edges-light) {
            position: relative;
          }

          &.router-link-exact-active {
            span.rough-edges-light {
              visibility: visible;
            }
          }

          @include can-hover {
            &:hover {
              span.rough-edges-light {
                visibility: visible;
              }
            }
          }
        }
      }
    }

    ul.socials {
      margin-bottom: $space-24;
      display: inline-flex;
      align-items: center;

      li {
        padding: 0 $space-8;
        display: inline-flex;

        a {
          width: $space-32;
          height: $space-32;
          border-radius: 50%;
          background-color: $flesh;
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;

          &:after {
            color: $bone;
            font-size: 12px;
            display: inline-flex;
          }

          &[href*='instagram'] {
            &:after {
              content: 'IG';
            }
          }

          &[href*='vimeo'] {
            &:after {
              content: 'VI';
            }
          }

          &[href*='facebook'] {
            &:after {
              content: 'FB';
            }
          }

          &[href*='linkedin'] {
            &:after {
              content: 'LI';
            }
          }
        }
      }
    }
  }

  @include respond-to($tablet) {
    .gutter {
      ul.pages {
        flex-direction: row;
      }
    }
  }
}

</style>
