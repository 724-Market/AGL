<template>

  <div class="card-checkpoint">
    <div class="checkpoint-wrapper">
      <div class="checkpoint-icon">
        <figure class="figure">
          <i v-if="!isHidden" class="fa-duotone fa-hourglass-clock"></i>
          <i class="fa-duotone fa-plug-circle-plus"></i>
        </figure>
      </div>
      <div class="checkpoint-info">
        <h5 class="topic">เพิ่มเลขบัญชีธนาคาร</h5>
        <span v-if="!isHidden" class="badge-warning">อยู่ระหว่างตรวจสอบ</span>
        <span class="badge">เร็วๆ นี้</span>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">
const isHidden = ref(true)
</script>