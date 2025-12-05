<template>
  <div id="modal">
    <div id="modal-inner">
      <button id="close-modal-btn" @click="store.setModalClose()"></button>
      <div id="modal-content" ref="contentRef">
        <div class="gutter">
          <div class="title-block">
            <template v-for="(item, index) in store.modalProjects" :key="index">
              <h3 v-if="index === store.modalIndex" class="h3">{{ item.title }}</h3>
              <!-- <NuxtLink v-if="index === store.modalIndex">{{ item.title }}</NuxtLink> -->
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useSiteStore } from '~/stores/store';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

const route = useRoute();
const store = useSiteStore();

const contentRef = ref(null);

// Mounted
onMounted(() => {
  if (contentRef.value) {
    disableBodyScroll(contentRef.value);
  }

  console.log(store.modalProjects);
  console.log(route);
});

// Before Unmount
onBeforeUnmount(() => {
  if (contentRef.value) {
    enableBodyScroll(contentRef.value);
  }
});

function close() {
  store.setModalClose(false);
}

// Watchers
watch(route, () => {
  close();
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

    #close-modal-btn {
      position: absolute;
      top: $space-48;
      right: span(1);
      width: $space-48;
      height: $space-48;
      box-shadow: inset 0px 0px 0px 2px $bone;
      z-index: 1;
    }

    #modal-content {
      @include abs-fill;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;

      .gutter {
        min-height: 150%;
        background-color: #333;
        display: flex;
        flex-direction: column;
      }
    }
  }
}
</style>