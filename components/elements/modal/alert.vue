<template>
   <div id="dialogModal" class="dialog-modal" v-show="isError">
        <div class="dialog-content modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalToggleLabel">แจ้งเตือน</h1>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body" style="height:150px">
              <div class="notice-warning"><i class="fa-thin fa-triangle-exclamation"></i>{{ message }}</div>
            </div>
        </div>
    </div>
  
</template>
<script setup>
const props = defineProps({
  message: String,
  isError:Boolean
});
const _loading = ref(false)
watch(
    () => props.isError,
    () => {
        //console.log('prop value changed', props.loading)
        if (props.isError) {
            openModal()
        }
        else {
            closeModal()
        }
    }
)

const onLoad = onMounted((
) => {
    // const myModal = document.getElementById("modal_demo") as Element
    // modal = new $bootstrap.Modal(myModal);
    if (props.isError) {
        openModal()
    }

})
function openModal() {
    //modal.show()
    _loading.value = props.isError
}

function closeModal() {
    //modal.hide()
    _loading.value = false
}

</script>
