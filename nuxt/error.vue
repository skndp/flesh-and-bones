<template>
  <ErrorPage :error="error" />
</template>

<script setup>
defineProps({
  error: Object
});
</script>