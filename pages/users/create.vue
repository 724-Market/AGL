<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

    <FormKit type="form" @submit="submitCreateUser" :actions="false" id="form-user" form-class="form-order form-theme" :incomplete-message="false"> 

      <div class="row">
        <div class="col col-main">

          <UsersProfileDetail v-if="usersLimitRes"/>

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
import {
  UserDataRes,
  UserCommissionListRes,
} from "~/shared/entities/user-entity";
import { UserLimitRes, UserProfileReq } from "~/shared/entities/user-entity"
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth"
import { storeToRefs } from "pinia"
import { useStoreUserSave } from "~/stores/user/storePasswordUser"

// Define variables
const usersLimitRes: globalThis.Ref<UserLimitRes | any> = ref()

const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile"])

const userSave = useStoreUserSave();
const storeAuth = useStoreUserAuth()
const { AuthenInfo } = storeToRefs(storeAuth)
const isError = ref(false)
const messageError = ref("")
const isLoading = ref(false)
const router = useRouter()
const setPassword = useStorePassword();

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
    //return usersLimitRes.value
  } else {
    isError.value = true
    messageError.value = response.apiResponse.ErrorMessage ?? ""
  }
}


const props = defineProps({
  userProfile: {
    type: Object as () => UserProfileReq,
  },
  userDetails: {
    type: Object as () => UserDataRes,
  },
  userCommissionList: {
    type: Object as () => UserCommissionListRes[],
  },
  loadData: Boolean,
  getUserPassword: String,
  getStatus: {
    type: [Number, String],
    default: 0,
    validator: (value) => {
      return typeof value === 'number' || (typeof value === 'string' && value.trim() === '') || value === null;
    },
  },
  userID: String,
});

// Submit form event
const submitCreateUser = async (formData: any) => {
  const isAct = ref(false);
  if (formData.isActiveLog == 'active'){
    isAct.value = true;
  }
  const req: UserProfileReq = {
    Password: formData.password,
    BranchName: formData.Branch,
    Commission: formData.Commission,
    Email: formData.Email,
    FirstName: formData.FirstName,
    LastName: formData.LastName,
    CreditLimit: formData.LimitMoney,
    PhoneNumber: formData.PhoneNumber,
    IsActive: isAct.value
  }
  
    const resCreate = await useRepository().user.create(req)
    if (
      resCreate.apiResponse.Status &&
      resCreate.apiResponse.Status == "200" &&
      resCreate.apiResponse.Data
    ) {
      const UserID = resCreate.apiResponse.Data.UserID;
      setPassword.value = req.Password;

      router.push("/users/profile/" + UserID)
    } else {
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