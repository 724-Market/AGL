<template>
  <div class="dialog-card loading-card no-icon no-shadow">
    <div class="loading-icon">
      <div class="logo"></div>
    </div>
    <div class="loading-loader">
      <span class="loading-bar">
        <span class="loading-progress"></span>
      </span>
    </div>
    <div class="loading-text">{{ waitingText ? waitingText : 'กรุณารอสักครู่' }}</div>
  </div>
</template>

<script setup>
// Define props for the component
const props = defineProps(['waitingText'])
</script>