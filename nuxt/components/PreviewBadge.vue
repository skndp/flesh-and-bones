<template>
  <div id="preview-badge">
    <div class="bg-flesh rough-edges-light"></div>
    <span>YOU'RE IN PREVIEW MODE</span>
  </div>
</template>

<style lang='scss'>
#preview-badge {
  position: fixed;
  bottom: span(0.5);
  right: span(0.5);
  color: $midnight;
  font-size: 12px;
  line-height: 1em;
  padding: 0.666em 1em;
  white-space: nowrap;
  z-index: 1000000;
  
  .bg-flesh {
    @include abs-fill;
    border-radius: 4px;
  }

  span {
    position: relative;
    transform: rotate(-0.666deg);
    display: flex;
  }
}
</style>