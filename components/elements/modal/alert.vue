<template>
  <div class="notice-warning"><i class="fa-thin fa-triangle-exclamation"></i>{{ message }}</div>
</template>
<script setup>
const props = defineProps({
  message: String,
});
</script>
