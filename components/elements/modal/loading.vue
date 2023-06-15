<template>
    <div id="dialogModal" class="dialog-modal" v-show="_loading">
        <div class="dialog-content modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" id="exampleModalToggleLabel">แจ้งเตือน</h1>
                <button type="button" class="btn-close" @click="closeModal"></button>
            </div>
            <div class="modal-body" style="height:150px">
                <div class="d-flex justify-content-center mb-3">
                    <div class="spinner-border text-success" style="width: 4rem; height: 4rem;" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <h3 class="text-center">Loading...</h3>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import type { Modal } from "bootstrap";
const { $bootstrap } = useNuxtApp();
const props = defineProps({
    loading: Boolean,
});

const _loading = ref(false)
watch(
    () => props.loading,
    () => {
        //console.log('prop value changed', props.loading)
        if (props.loading) {
            openModal()
        }
        else {
            closeModal()
        }
    }
)
let modal: Modal;
const onLoad = onMounted((
) => {
    // const myModal = document.getElementById("modal_demo") as Element
    // modal = new $bootstrap.Modal(myModal);
    if (props.loading) {
        openModal()
    }

})
function openModal() {
    //modal.show()
    _loading.value = props.loading
}

function closeModal() {
    //modal.hide()
    _loading.value = false
}


</script>

<style scoped>
.dialog-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.dialog-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 4px;
    max-width: 400px;
    text-align: center;
}

.dialog-actions {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.dialog-button {
    padding: 10px 20px;
    margin: 0 10px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
}

.dialog-button:hover {
    background-color: #0056b3;
}
</style>