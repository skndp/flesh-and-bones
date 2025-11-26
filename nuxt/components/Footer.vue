<template>
  <footer id="footer" class="bg-bone pad-t pad-b">
    <div class="gutter">
      <ul class="locations">
        <li v-for="location in store.locations">
          <p>{{ location }}</p>
        </li>
      </ul>
      <nav class="pages midnight">
        <NuxtLink to="/work" @click.native="onClickNavLink"><span>Work</span></NuxtLink>
        <NuxtLink to="/directors" @click.native="onClickNavLink"><span>Directors</span></NuxtLink>
        <NuxtLink to="/manifesto" @click.native="onClickNavLink"><span>Manifesto</span></NuxtLink>
        <NuxtLink to="/zine" @click.native="onClickNavLink"><span>Zine</span></NuxtLink>
        <NuxtLink to="/contact" @click.native="onClickNavLink"><span>Contact</span></NuxtLink>
      </nav>
      <ul class="socials">
        <li v-for="link in store.socials">
          <NuxtLink :to="link" target="_blank" />
        </li>
      </ul>
      <p>© {{ new Date().getFullYear() }} Flesh and Bones, Inc.</p>
    </div>
  </footer>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';
import { smoothScrollTo } from '~/utils/smooth-scroll-to';

const route = useRoute();
const store = useSiteStore();

// Methods
function onClickNavLink(e) {
  let path = new URL(e.currentTarget.href).pathname;

  if (route.path === path) {
    smoothScrollTo(0);
  }
}
</script>

<style lang='scss'>

#footer {
  position: relative;

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

    nav.pages {
      margin-bottom: $space-64;
      display: inline-flex;
      flex-direction: column;
      justify-content: center;

      a {
        padding: $space-8 0;
        display: inline-flex;
        justify-content: center;
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
            font-weight: 600;
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
      nav.pages {
        flex-direction: row;

        a {
          padding: $space-8 $space-16;
        }
      }
    }
  }
}

</style>
