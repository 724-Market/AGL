<template>
   <div id="dialogModalAlert" class="dialog-modal-alert" v-if="_loading">
        <div class="dialog-content-alert modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalToggleLabel">แจ้งเตือน</h1>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body" style="height:150px">
              <div class="notice-warning"><i class="fa-thin fa-triangle-exclamation"></i>{{ message }}</div>
            </div>
            <button class="btn-primary" type="button" @click="closeModal">ตกลง</button>
        </div>
    </div>
  
</template>
<script setup>
const emit = defineEmits(['closeModal'])
const props = defineProps({
  message: String,
  isError:Boolean,
  reload:Boolean
});
const _loading = ref(false)
watch(
    () => props.isError,
    () => {
        console.log('prop value changed', props.isError)
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
    console.log('prop value changed', props.isError)
    if (props.isError) {
        openModal()
    }

})
function openModal() {
    //modal.show()
    _loading.value =true
//     const dialogLoading = document.getElementById("dialogModalAlert");
//     console.log(dialogLoading)
//   if (dialogLoading) dialogLoading.showModal();
}

function closeModal() {
    if(props.reload)
    {
        window.location.reload();
    }
    emit('closeModal', false)
    _loading.value = false
//     const dialogLoading = document.getElementById("dialogModalAlert");
//   if (dialogLoading) dialogLoading.close();
}

</script>
<style scoped>
.dialog-modal-alert {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
}

.dialog-content-alert {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    max-width: 400px;
    text-align: center;
}

.dialog-actions-alert {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.dialog-button-alert {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}

.dialog-button-alert:hover {
    background-color: #0056b3;
}
</style>