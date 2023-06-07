<template>
    <!-- Modal -->
    <div class="modal fade" id="modal_demo" tabindex="-1" aria-labelledby="modal_demo_label" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalToggleLabel">แจ้งเตือน</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
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
    </div>
</template>

<script setup lang="ts">

import type { Modal } from "bootstrap";
const { $bootstrap } = useNuxtApp();
const props = defineProps({
    loading: Boolean,
});

watch(
    () => props.loading,
    () => {
        console.log('prop value changed', props.loading)
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

    const myModal = document.getElementById("modal_demo") as Element
    modal = new $bootstrap.Modal(myModal);
    if (props.loading) {
        modal.show()
    }

})
function openModal() {
    modal.show()
}

function closeModal() {
    modal.hide()
}


</script>

