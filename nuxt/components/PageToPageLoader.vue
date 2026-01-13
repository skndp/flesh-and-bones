<template>
  <div id="page-to-page-loader">
    <div id="spinner" class="rough-edges"></div>
  </div>
</template>

<style lang='scss'>
#page-to-page-loader {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;

  #spinner {
    position: relative;
    width: $space-56;
    height: $space-56;
    border-radius: 50%;
    display: flex;
    animation: spinner 1.3s linear infinite;

    &:before {
      content: '';
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      border: 8px solid $flesh;
      border-top: 8px solid transparent;
      border-radius: 50%;
    }
  }

  &.p2p-loading-enter-active,
  &.p2p-loading-leave-active {
    transition: opacity $speed-666 $evil-ease;
  }

  &.p2p-loading-enter-from,
  &.p2p-loading-leave-to {
    opacity: 0;
  }
}
</style>
