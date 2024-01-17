<template>
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
    xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx<br>
</template>

<script setup>

// Define props for the component
const props = defineProps({
  resp: []
})

// Watcher to detect changes in isShowModal prop
watch(() => props.resp.status, () => {
  alert(props.resp.status)
  alert(props.resp.modalTitle)
  alert(props.resp.modalText)
  alert(props.resp.modalButton)
})
</script>