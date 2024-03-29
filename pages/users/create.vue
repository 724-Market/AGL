<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitCreateUser" :actions="false" id="form-user" form-class="form-order form-theme"
      :incomplete-message="false">

      <div class="row">
        <div class="col col-main">
          <div class="has-sticky">
            <UsersProfileDetail v-if="usersLimitRes" />
          </div>
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

const setUsername = useState('setUsername')
const setPassword = useState('setPassword')

// on Mounted
onMounted(async () => {
  if (AuthenInfo.value) {
    isLoading.value = true
    await loadUsersLimit()
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
    if (usersLimitRes.value && usersLimitRes.value.CurrentCount >= usersLimitRes.value.MaxCount) {
      router.push("/users")
    }
  } else {
    isError.value = true
    messageError.value = response.apiResponse.ErrorMessage ?? ""
  }
}

// Submit form event
const submitCreateUser = async (formData: any) => {
  isLoading.value = true

  const resCreate = await useRepository().user.create(formData)
  if (
    resCreate.apiResponse.Status &&
    resCreate.apiResponse.Status == "200" &&
    resCreate.apiResponse.Data
  ) {
    const UserID = resCreate.apiResponse.Data.UserID;
    setUsername.value = resCreate.apiResponse.Data.UserName;
    setPassword.value = formData.Password;
    router.push("/users/profile/" + UserID)
  } else {
    isError.value = true
    alert(resCreate.apiResponse.ErrorMessage);
    messageError.value = resCreate.apiResponse.ErrorMessage ?? ""
    isLoading.value = false
  }
};

// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true
const showLogoHeader = false

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