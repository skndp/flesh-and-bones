<template>
  <div id="menu" :class="{'offset': offset}">
    <div id="menu-inner">
      <div id="menu-content" ref="contentRef" @click="closeMenu">
        <nav id="menu-paper" class="bg-bone">
          <ul class="primary h1">
            <li><NuxtLink to="/work" @click.native="onClickNavLink"><span>Work</span></NuxtLink></li>
            <li><NuxtLink to="/directors" @click.native="onClickNavLink"><span>Directors</span></NuxtLink></li>
            <li><NuxtLink to="/manifesto" @click.native="onClickNavLink"><span>Manifesto</span></NuxtLink></li>
            <li><NuxtLink to="/zine" @click.native="onClickNavLink"><span>Zine</span></NuxtLink></li>
            <li><NuxtLink to="/contact" @click.native="onClickNavLink"><span>Contact</span></NuxtLink></li>
          </ul>
          <ul class="socials">
            <li v-for="link in store.socials">
              <NuxtLink :to="link" target="_blank" />
            </li>
          </ul>
          <div class="locations-wrapper">
            <ul class="locations">
              <li v-for="location in store.locations">
                <p>{{ location }}</p>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { smoothScrollTo } from '~/utils/smooth-scroll-to';

const route = useRoute();
const store = useSiteStore();
const contentRef = ref(null);
const offset = ref(false);

// Mounted
onMounted(() => {
  offset.value = window.pageYOffset > 0;

  if (contentRef.value) {
    disableBodyScroll(contentRef.value);
  }
});

// Before Unmount
onBeforeUnmount(() => {
  if (contentRef.value) {
    enableBodyScroll(contentRef.value);
  }
});

// Methods
function onClickNavLink(e) {
  let path = new URL(e.currentTarget.href).pathname;

  if (route.path === path) {
    smoothScrollTo(0);
  }

  store.setMenu(false);
}

function closeMenu(e) {
  if (e.target && e.target.id === 'menu-content') {
    store.setMenu(false);
  }
}
</script>

<style lang='scss'>

#menu {
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  overflow: hidden;
  z-index: 50;

  &.menu-enter-active,
  &.menu-leave-active {
    transition: opacity $speed-666 $evil-ease;

    #menu-inner {
      &:before {
        transition: opacity $speed-666 $evil-ease;
      }

      #menu-content {
        nav#menu-paper {
          transition: transform $speed-666 $evil-ease;
        }
      }
    }
  }

  &.menu-enter-from,
  &.menu-leave-to {
    opacity: 0.999;

    #menu-inner {
      &:before {
        opacity: 0;
      }

      #menu-content {
        nav#menu-paper {
          transform: translateY(-100%);
        }
      }
    }
  }

  &.offset {
    #menu-inner {
      @include header-ht(top);

      #menu-content {
        nav#menu-paper {
          ul.primary {
            padding-top: 0px;
            @include header-ht(padding-bottom);
          }
        }
      }
    }
  }

  #menu-inner {
    position: absolute;
    top: 0px;
    right: 0px;
    bottom: 0px;
    left: 0px;
    overflow: hidden;

    &:before {
      content: "";
      @include abs-fill;
      opacity: 1;
      background-color: rgba($midnight, 0.5);
    }

    #menu-content {
      @include abs-fill;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      nav#menu-paper {
        position: relative;
        width: 100%;
        display: flex;

        ul.primary  {
          margin: 0 auto;
          @include header-ht(padding-top);
          @include header-ht(padding-bottom);
          display: inline-flex;
          flex-direction: column;
          justify-content: center;

          li {
            display: inline-flex;

            a {
              position: relative;
              padding: 0 0.1em;
              display: flex;
              align-items: center;

              &.router-link-exact-active {
                background-color: $midnight;
              }

              @include can-hover {
                &:hover {
                  background-color: $midnight;
                }
              }
            }
          }
        }

        ul.socials {
          position: absolute;
          top: 50%;
          left: span(1);
          display: flex;
          flex-direction: column;
          transform: translateY(-50%);

          li {
            padding: $space-8 0;
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

        .locations-wrapper {
          display: none;
        }
      }
    }
  }

  @include respond-to($tablet) {
    #menu-inner {
      #menu-content {
        nav#menu-paper {
          .locations-wrapper {
            position: absolute;
            left: span(3);
            top: 0px;
            height: 100%;
            width: 2em;
            overflow: hidden;
            display: flex;
            
            ul.locations {
              position: absolute;
              top: 50%;
              left: 50%;
              white-space: nowrap;
              transform-origin: 0% 0%;
              transform: rotate(-90deg) translateX(-50%) translateY(-50%);

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
          }
        }
      }
    }
  }
}
</style>
