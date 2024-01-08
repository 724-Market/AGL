<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

        <FormKit type="form" @submit="submitRegister" :actions="false" id="form-register"
            form-class="form-register form-theme" :incomplete-message="false">

            <div class="row">
                <div class="col col-main">

                    <RegisterFormRegister />

                </div>

                <div class="col col-sidebar">
                    <section class="site-sidebar is-sticky">

                        <aside class="card">
                            <div class="card-body">
                                <div class="status-list">
                                    <figure class="status-icon">
                                        <div class="icon user"></div>
                                    </figure>
                                    <h4 class="title">ผู้แนะนำ</h4>

                                    <div class="status-item" v-if="isAgent">
                                        <h5 class="topic">ชื่อผู้แนะนำ</h5>
                                        <p>{{ route.params.id }}</p>
                                    </div>

                                    <div class="status-item" v-else>
                                        <h5 class="topic">ระบุผู้แนะนำ</h5>
                                        <p>
                                            <FormKit type="text" name="AgentCode" placeholder="ระบุรหัสผู้แนะนำ"
                                                autocomplete="off" />
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <FormKit type="submit" label="บันทึก" name="register-submit" :classes="{
                            input: 'btn-primary',
                            outer: 'form-actions',
                        }" :disabled="isLoading" :loading="isLoading" />

                    </section>
                </div>
            </div>

        </FormKit>

        <ElementsDialogLoading :isShowLoading="isShowLoading" :loadingLogo="loadingLogo" :loadingText="loadingText" />

        <ElementsDialogModal :isShowModal="isShowModal" :modal-type="modalType" :modal-title="modalTitle"
            :modal-text="modalText" :modal-button="modalButton" @on-close-modal="handleCloseModal" />

        <ElementsDialogConfirms :isShowConfirm="isShowConfirm" :confirm-type="confirmType" :confirm-title="confirmTitle"
            :confirm-text="confirmText" :confirm-button="confirmButton" :confirm-cancel-button="confirmCancelButton" @on-accept-confirm="handleAcceptConfirm" @on-close-confirm="handleCloseConfirm" />

    </NuxtLayout>
</template>

<script setup lang="ts">
const route = useRoute()

// Button Loading
const isLoading = ref(false)

/////////////////////////////////////////
// Modal Loading
const isShowLoading = ref(false)
const loadingLogo = ref(false)
const loadingText = ref(true)

/////////////////////////////////////////
// Modal Dialog
const isShowModal = ref(false)
const modalType = ref('')
const modalTitle = ref('')
const modalText = ref('')
const modalButton = ref('')

// Function to handle close modal events
const handleCloseModal = async () => {
    isShowModal.value = false
}

/////////////////////////////////////////
// Confirm Dialog
const isShowConfirm = ref(false)
const confirmType = ref('')
const confirmTitle = ref('')
const confirmText = ref('')
const confirmButton = ref('')
const confirmCancelButton = ref('')

// Function to handle close confirm events
const handleCloseConfirm = async () => {
    isShowConfirm.value = false
}

// Function to handle accept confirm events
const handleAcceptConfirm = async () => {
    isShowConfirm.value = false
    await new Promise((r) => setTimeout(r, 1000))
    isShowModal.value = true
}

/////////////////////////////////////////
// Define emit function to emit events on all dialog
const emit = defineEmits(['onCloseModal', 'onCloseConfirm', 'onAcceptConfirm'])

/////////////////////////////////////////

const isAgent = ref(false)

// Submit form event
const submitRegister = async (formData: any) => {

    isShowLoading.value = true

    await new Promise((r) => setTimeout(r, 3000))

    const response = await useRepository().user.create(formData)

    if (response.apiResponse.Status == "200") {
        isShowLoading.value = false
        isShowModal.value = true
        modalType.value = 'success'
        modalTitle.value = 'ลงทะเบียนสำเร็จ'
        modalText.value = ''
        //response.apiResponse.Data.UserID;
    }
    else {
        isShowLoading.value = false

        isShowConfirm.value = true
        confirmType.value = 'danger'
        confirmTitle.value = 'แน่ใจ?'
        confirmText.value = 'It is advised to wrap your plugins as in the future this may enable enhancements.'
        confirmButton.value = 'ไปโลดดดด'
        confirmCancelButton.value = 'อุ่ยยยย'

        // isShowModal.value = true
        modalType.value = 'warning'
        modalTitle.value = 'ไม่สามารถลงทะเบียนได้'
        modalButton.value = 'รับทราบ'
        
        modalText.value = response.apiResponse.ErrorMessage || 'string'
    }

};

if (route.params.id != 'new') {
    // Call Check Agent Info API
    isAgent.value = true
}
else {
    isAgent.value = false
}






// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "ลงทะเบียน"
const pageCategory = "ลงทะเบียนสมาชิกใหม่"
const pageDescription = ""

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: "description", content: pageDescription }],
    bodyAttrs: {
        class: "page-users single-history template-datatable"
    }
})
</script>