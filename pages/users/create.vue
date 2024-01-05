<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

    <FormKit type="form" @submit="submitCreateUser" :actions="false" id="form-user" form-class="form-order form-theme"
      :incomplete-message="false">

      <div class="row">
        <div class="col col-main">

          <UsersProfileDetail v-if="usersLimitRes" />

        </div>

        <div class="col col-sidebar">
          <section class="site-sidebar is-sticky">

            <UsersLogStatus />

            <FormKit type="submit" label="บันทึก" name="user-submit" id="user-submit" :classes="{
              input: 'btn-primary',
              outer: 'form-actions',
            }" :disabled="isLoading" :loading="isLoading" />

            <NuxtLink class="btn-back btn-gray" to="/users">ย้อนกลับ</NuxtLink>

          </section>
        </div>
      </div>

    </FormKit>

    <ElementsModalLoading :loading="isLoading" />

  </NuxtLayout>
</template>

<script lang="ts" setup>
// Define import
import type { UserLimitRes } from "~/shared/entities/user-entity"
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth"
import { storeToRefs } from "pinia"

// Define variables
const usersLimitRes: globalThis.Ref<UserLimitRes | any> = ref()

const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile"])

const storeAuth = useStoreUserAuth()
const { AuthenInfo } = storeToRefs(storeAuth)
const isError = ref(false)
const messageError = ref("")
const isLoading = ref(false)
const router = useRouter()
const setPassword = useStorePassword()
const renderKey = ref(0);

// on Mounted
onMounted(async () => {
  if (AuthenInfo.value) {
    isLoading.value = true
    await loadUsersLimit()

    if (usersLimitRes.value && usersLimitRes.value.CurrentCount >= usersLimitRes.value.MaxCount) {
      console.log("User is max!!!")
      router.push("/users")
    }
    isLoading.value = false
  } else {
    router.push("/login")
  }
})

const loadUsersLimit = async () => {
  const response = await useRepository().user.createLimit()

  if (
    response.apiResponse.Status &&
    response.apiResponse.Status == "200" &&
    response.apiResponse.Data &&
    Array.isArray(response.apiResponse.Data) &&
    response.apiResponse.Data.length > 0
  ) {
    usersLimitRes.value = response.apiResponse.Data[0] as UserLimitRes
  } else {
    isError.value = true
    messageError.value = response.apiResponse.ErrorMessage ?? ""
  }
}


const props = defineProps({
})

// Submit form event
const submitCreateUser = async (formData: any) => {
  const resCreate = await useRepository().user.create(formData)
  if (
    resCreate.apiResponse.Status &&
    resCreate.apiResponse.Status == "200" &&
    resCreate.apiResponse.Data
  ) {
    const UserID = resCreate.apiResponse.Data.UserID;
    setPassword.value = formData.Password;
    router.push("/users/profile/" + UserID)
  } else {
    console.log("formData.BranchName"+formData.BranchName)
    isError.value = true
    alert(resCreate.apiResponse.ErrorMessage);
    messageError.value = resCreate.apiResponse.ErrorMessage ?? ""
  } 
  
};

// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "เพิ่มผู้ช่วย"
const pageCategory = "ผู้ช่วย"
const pageDescription = ""

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-users single-user",
  },
})
</script>