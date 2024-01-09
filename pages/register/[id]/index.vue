<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

        <FormKit type="form" @submit="submitRegister" :actions="false" id="form-register" form-class="form-register form-theme"
            :incomplete-message="false">

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
                                            <FormKit type="text" name="AgentCode"
                                                placeholder="ระบุรหัสผู้แนะนำ" autocomplete="off" />
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

        <ElementsModalLoading :loading="isLoading" />

        <ElementsDialogModal
            :dialogModal="isDialogModal"
            :modal-text="messageText"
            :modal-title="messageTitle"
            :modal-type="messageType"
            @on-close-modal="handleCloseModal" 
        ></ElementsDialogModal>

    </NuxtLayout>
</template>

<script setup lang="ts">

const emit = defineEmits(['onContinue'])
const route = useRoute()

// Modal Loading
const isLoading = ref(false)

// Modal Dialog
const isDialogModal = ref(false)
const messageType = ref('')
const messageTitle = ref('')
const messageText = ref('')
const isAgent = ref(false)

const handleCloseModal = async () => {
    isDialogModal.value = false
};

// Submit form event
const submitRegister = async (formData:any) => {

    isLoading.value = true
    const response  = await useRepository().user.create(formData)

    if(response.apiResponse.Status == "200") {
        isLoading.value = false
        isDialogModal.value = true
        messageType.value = 'success'
        messageTitle.value = 'ลงทะเบียนสำเร็จ'
        messageText.value = ''
        //response.apiResponse.Data.UserID;
    } 
    else {
        isLoading.value = false
        isDialogModal.value = true
        messageType.value = 'danger'
        messageTitle.value = 'ไม่สามารถลงทะเบียนได้'
        messageText.value = response.apiResponse.ErrorMessage || 'string'
    }

};

if(route.params.id!='new') {
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