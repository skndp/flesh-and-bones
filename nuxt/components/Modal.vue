<template>
  <div id="modal" ref="modalRef">
    <div id="modal-inner">
      <div id="btn-container">
        <button id="close-modal-btn" @click="closeModal">
          <span class="x"></span>
        </button>
      </div>
      <div class="modal-content">
        <div class="title-block">
          <div class="title-row">
            <ClientOnly>
              <Swiper
                class="titles-swiper"
                ref="titlesSwiperRef"
                :modules="[Controller]"
                slides-per-view="1"
                loop
                grab-cursor
                @swiper="onTitlesSwiperReady"
              >
                <SwiperSlide v-for="(item, index) in store.modalProjects" class="swiper-slide" :key="index">
                  <h2 v-if="index === store.modalIndex" class="title h2 sm rough-edges-light">{{ item.title }}</h2>
                </SwiperSlide>
              </Swiper>
            </ClientOnly>
          </div>
          <div v-if="store.modalShowDirectors" class="directors-row">
            <div v-for="(item, index) in store.modalProjects" class="directors-slider" :key="index">
              <p v-if="index === store.modalIndex" class="director-label brush sm">
                <span>Director</span>
                <NuxtLink :to="`/directors/${item.director.slug.current}`" class="flesh">{{ item.director.title }}<span class="bg-flesh rough-edges-light"></span></NuxtLink>
              </p>
            </div>
          </div>
        </div>
        <div class="carousel-block">
          <ClientOnly>
            <Swiper
              class="main-swiper"
              ref="mainSwiperRef"
              :modules="[Controller]"
              slides-per-view="1"
              loop
              grab-cursor
              @swiper="onMainSwiperReady"
            >
              <SwiperSlide v-for="(item, index) in store.modalProjects" class="swiper-slide" :key="index">
                <div class="inner">
                  <div v-if="item.ctaCardImages && item.ctaCardImages.landscapeImage" class="video-holder rough-edges">
                    <ResponsiveImage v-bind="item.ctaCardImages.landscapeImage.image" />
                  </div>
                  <div v-else class="video-holder bg-flesh rough-edges">
                    <p class="manic bone">{{ store.modalIndex + 1 }}</p>
                  </div>
                </div>
              </SwiperSlide>
            </Swiper>
          </ClientOnly>
        </div>
        <div class="controls-block">
          <button class="arrow prev" aria-label="Previous Slide" @click="onClickPrev"></button>
          <div class="counter">
            <p class="brush sm">
              <span v-if="store.modalPaginationLabel">{{ store.modalPaginationLabel }}</span>
              <span v-else>{{ store.modalProjects[0].director.title }}</span>
              <span class="flesh">{{ store.modalIndex + 1 }} / {{ store.modalProjects.length }}</span>
            </p>
          </div>
          <button class="arrow" aria-label="Next Slide" @click="onClickNext"></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import { Controller } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/controller';

import { useSiteStore } from '~/stores/store';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const route = useRoute();
const store = useSiteStore();

const modalRef = ref(null);
const mainSwiperRef = ref(null);
const titlesSwiperRef = ref(null);
let mainSwiper = null;
let titlesSwiper = null;

// Mounted
onMounted(() => {
  if (modalRef.value) {
    disableBodyScroll(modalRef.value);
  }

  console.log(store.modalProjects);
  console.log(store.modalIndex);
  console.log(store.modalShowDirectors);
  console.log(store.modalPaginationLabel);
});

// Before Unmount
onBeforeUnmount(() => {
  if (modalRef.value) {
    enableBodyScroll(modalRef.value);
  }
});

// Methods
function onMainSwiperReady(swiper) {
  mainSwiper = swiper;
  trySync();

  mainSwiper.on('slideChange', () => {
    store.setModalIndex(mainSwiper.realIndex);
  })
}

function onTitlesSwiperReady(swiper) {
  titlesSwiper = swiper;
  trySync();
}

function trySync() {
  if (mainSwiper && titlesSwiper) {
    mainSwiper.controller.control = titlesSwiper;
    titlesSwiper.controller.control = mainSwiper;
  }
}

function onClickPrev() {
  if (mainSwiper) {
    mainSwiper.slidePrev();
  }
}

function onClickNext() {
  if (mainSwiper) {
    mainSwiper.slideNext();
  }
}

function closeModal() {
  store.setModalClose(false);
}

// Watchers
watch(route, () => {
  closeModal();
});
</script>

<style lang='scss'>
#modal {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 237;

  &.modal-enter-active,
  &.modal-leave-active {
    transition: opacity $speed-666 $evil-ease;
  }

  &.modal-enter-from,
  &.modal-leave-to {
    opacity: 0;
  }

  #modal-inner {
    @include abs-fill;
    background-color: $midnight;
    overflow: hidden;

    #btn-container {
      position: absolute;
      top: 0px;
      @include header-ht(height);
      right: span(1);
      display: flex;
      align-items: center;
      z-index: 2;

      #close-modal-btn {
        position: relative;
        width: $space-48;
        height: $space-48;
        margin-right: -6px;
        border-radius: 50%;
        background-color: $flesh;
        cursor: pointer;

        span.x {
          @include abs-fill;

          &:before,
          &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 66.666%;
            aspect-ratio: 47/10;
            background-color: $bone;
            mask-image: url('/images/bone.png');
            mask-size: contain;
            mask-repeat: no-repeat;
          }

          &:before {
            transform: translate(-50%, -50%) rotate(45deg);
          }
          &:after {
            transform: translate(-50%, -50%) rotate(-45deg);
          }
        }
      }
    }

    .modal-content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;

      .title-block {
        text-align: center;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        flex: 0 0 auto;

        &:has(.directors-row) {
          padding-bottom: $space-24;
        }

        .title-row {
          position: relative;
          @include header-ht(height);
          display: flex;
          flex-grow: 1;
          align-items: center;
          justify-content: center;

          .titles-swiper {
            @include abs-fill;
            cursor: grab;
            z-index: auto;

            .swiper-slide {
              position: relative;
              width: 100%;
              height: 100%;
              display: flex;
              align-items: center;
              justify-content: center;

              .title {
                white-space: nowrap;
                display: flex;
                align-items: center;
                justify-content: center;
                text-align: center;
              }
            }
          }
        }

        .directors-row {
          width: 100%;
          margin-top: -1em;
          display: flex;
          align-items: center;
          justify-content: center;

          .directors-slider {
            display: inline-flex;
            justify-content: center;

            .director-label {
              line-height: 1.5em;
              display: flex;
              align-items: center;
              justify-content: center;

              span {
                display: inline-flex;

                &:after {
                  content: '';
                  margin-right: 0.5em;
                  display: inline-flex;
                }
              }

              a {
                position: relative;
                display: inline-flex;

                span {
                  position: absolute;
                  bottom: 0px;
                  width: 100%;
                  height: 2px;
                  background-color: $flesh;
                }
              }
            }
          }
        }
      }

      .carousel-block {
        position: relative;
        display: flex;
        flex: 1 1 auto;
        align-items: center;
        justify-content: center;

        .main-swiper {
          @include abs-fill;
          cursor: grab;
          z-index: auto;
          overflow: visible;

          .swiper-slide {
            position: relative;
            width: 100%;
            height: 100%;

            .inner {
              margin: 0 span(1);
              height: 100%;
            }

            .video-holder {
              position: relative;
              aspect-ratio: 16/9;
              width: auto;
              height: 100%;
              max-width: 100%;
              max-height: 100%;
              overflow: hidden;

              .manic {
                position: absolute;
                top: 50%;
                left: 50%;
                white-space: nowrap;
                transform: translate(-50%, -50%);
              }
            }
          }
        }
      }

      .controls-block {
        @include header-ht(height);
        display: flex;
        flex: 0 0 auto;
        align-items: center;
        justify-content: center;

        .arrow {
          position: relative;
          width: $space-32;
          aspect-ratio: 55/21;
          background-color: $flesh;
          mask-image: url('/images/right-arrow.png');
          mask-size: contain;
          mask-repeat: no-repeat;
          display: inline-flex;

          &.prev {
            transform: scaleX(-1);
          }
        }

        .counter {
          margin: -0.3em 1em 0;
          display: inline-flex;
          align-items: center;

          span {
            display: inline-flex;
          }

          span.flesh {
            margin-left: 0.5em;
            letter-spacing: -0.04em;
            word-spacing: -0.04em;
          }
        }
      }
    }
  }

  @include respond-to($portrait) {
    #modal-inner {
      .modal-content {
        justify-content: center;

        .title-block {
          padding-bottom: $space-24;

          .title-row {
            height: auto;
          }

          .directors-row {
            margin-top: 0.5em;
          }
        }

        .carousel-block {
          flex: 0 0 auto;

          .video-holder {
            width: 100%;
            height: auto;
          }
        }

        .controls-block {
          height: auto;
          padding-top: $space-24;
        }
      }
    }
  }

  @include respond-to($tablet) {
    #modal-inner {
      .modal-content {
        .controls-block {
          .arrow {
            width: $space-40;
          }
        }
      }
    }
  }

  @include respond-to($desktop) {
    #modal-inner {
      .modal-content {
        .controls-block {
          .arrow {
            width: $space-48;
          }
        }
      }
    }
  }

  @include respond-to($average-desktop) {
    #modal-inner {
      #btn-container {
        #close-modal-btn {
          width: $space-56;
          height: $space-56;
          margin-right: -12px;
        }
      }
    }
  }
}
</style>
