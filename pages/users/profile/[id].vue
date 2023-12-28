<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

    <FormKit type="form" @submit="submitEditUser" :actions="false" id="form-user" form-class="form-order form-theme"
      :incomplete-message="false">

      <div class="row">
        <div class="col col-main">

          <UsersProfileDetail :key="renderKey" :user-details="userDetails" @on-delete-group="updateProfile"
            v-if="userDetails" />

        </div>

        <div class="col col-sidebar">
          <section class="site-sidebar is-sticky">

            <UsersLogCommission :user-commission-list="userCommissionList" />

            <UsersLogStatus :user-details="userDetails" v-if="userDetails" />

            <!-- <UsersBranch :key="renderKey" :user-id="userId" v-if="userId" /> -->

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

    <ElementsDialogShowpassword v-if="isPasswordChanged" :modal-show="isPasswordChanged" :modal-type="ModalType.Warning"
      :modal-title="textUserID" :modal-text="textPassword" @on-close-modal="onCloseConfirm"></ElementsDialogShowpassword>

  </NuxtLayout>
</template>
  
<script lang="ts" setup>
import { ModalType } from "~/shared/entities/enum-entity";
import {
  UserDataReq,
  UserDataRes,
  UserSaveReq,
  UserProfileReq,
  UserCommissionListRes,
  UserCommissionListReq,
} from "~/shared/entities/user-entity";
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { storeToRefs } from "pinia";
import { useStoreUserSave } from "~/stores/user/storePasswordUser";
// import { ref, watch } from 'vue';

const userDetails: globalThis.Ref<UserDataRes | undefined> = ref();
const userCommissionList: Ref<UserCommissionListRes[]> = ref([]);


const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile"])

// Update the boolean value in the parent component
// const updateIsActive = (value: any) => {
//   IsActive.value = value === 'active' ? 'false' : 'true'
// }

//define store
const storeAuth = useStoreUserAuth();
// define getter in store
const { AuthenInfo } = storeToRefs(storeAuth);
const isError = ref(false);
const messageError = ref("");
const isLoading = ref(false);
const router = useRouter();

var isPasswordChanged = ref(false)
var textPassword = ref()
var textUserID = ref()

const route = useRoute()
const userId = ref<null | string>(null)

const renderKey = ref(0);
const getStorePassword = useStorePassword();

onMounted(async () => {
  // try {
  //   //This console is for checking the latest code
  //   console.log("Profile page4 " + route.params.id)
  //   console.log("storePasswordB" + getStorePassword.value)
  //   if (AuthenInfo.value) {
  //     isLoading.value = true;



  //     isLoading.value = false;
  //   } else {
  //     router.push("/login");
  //   }
  // } catch (error) {
  //   console.error('An error occurred while fetching user group list:', error);
  // }

  if (typeof route.params.id === 'string') {
    userId.value = route.params.id

    await showPassword(getStorePassword.value)

    await loadUserDetails(userId.value)

    await loadUserCommission(userId.value)
  }
})

// Open modal in case change password
const showPassword = async (getPassword: string) => {
  if (!getPassword) {
    return false
  }
  getStorePassword.value = '' // Clear getStorePassword
  isPasswordChanged.value = true // Open modal
  textUserID.value = userId.value
  textPassword.value = getPassword
}

// Update profile after save
const updateProfile = async () => {
  renderKey.value = renderKey.value + 1
}

const loadUserCommission = async (userid: string) => {
  const useCommisionReq: UserCommissionListReq = {
    SubUserID: userid,
    Paging: {
      Page: 0,
      Length: 10,
      TotalRecord: 0,
    }
  }
  console.log("load User Commisstion")
  const responseCom = await useRepository().user.getCommionList(useCommisionReq);
  if (
    typeof responseCom.apiResponse.Status === 'number' &&
    responseCom.apiResponse.Status === 200 &&
    responseCom.apiResponse.Data
  ) {
    console.log("getCommissionList ", responseCom.apiResponse.Data)
    userCommissionList.value = responseCom.apiResponse.Data!;

  } else {
    console.log("Load CommissionList fail!!!")
    isError.value = true;
    messageError.value = responseCom.apiResponse.ErrorMessage ?? "";
  }
}

const loadUserDetails = async (userid: string) => {

  isLoading.value = true

  const userDetailReq: UserDataReq = {
    SubUserID: userid
  }
  console.log("load User Details ")
  const response = await useRepository().user.getProfile(userDetailReq);
  if (
    response.apiResponse.Status &&
    response.apiResponse.Status == "200" &&
    response.apiResponse.Data &&
    Array.isArray(response.apiResponse.Data) &&
    response.apiResponse.Data.length > 0
  ) {
    // Now TypeScript knows that Data is an array, so accessing [0] is valid
    userDetails.value = response.apiResponse.Data[0];
  } else {
    isError.value = true;
    messageError.value = response.apiResponse.ErrorMessage ?? "";
  }

  isLoading.value = false
};
/*
onBeforeUnmount(() => {
  // Clean up the watch effect when the component is unmounted
  watchResponse();
});
*/

const onCloseConfirm = async () => {
  isPasswordChanged.value = false
}

const props = defineProps({
  userDetails: {
    type: Object as () => UserDataRes,
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
});

// Submit form event
const submitEditUser = async (formData: any) => {

  // const isAct = ref(false);
  // if (formData.IsActive == 'active') {
  //   IsActive.value = true
  // }
  // console.log("formData.emailText " + formData.Email)

  // Update to boolean value
  // IsActive.value = formData.IsActive === 'active' ? 'true' : 'false'

  // console.log("Page " + formData.IsActive)
  // console.log("Page " + IsActive.value)

  // const saveProfileReq: UserSaveReq = {
  //   SubUserID: userId.value,
  //   NewPassword: formData.password,
  //   BranchName: formData.Branch,
  //   Commission: formData.Commission,
  //   Email: formData.Email,
  //   FirstName: formData.FirstName,
  //   LastName: formData.LastName,
  //   CreditLimit: formData.LimitMoney,
  //   PhoneNumber: formData.PhoneNumber,
  //   IsActive: formData.IsActive
  // }

  // console.log("saveProfileReq.Email " + saveProfileReq.Email)

  isLoading.value = true

  const response = await useRepository().user.saveProfile(formData)

  if (response.apiResponse.Status && response.apiResponse.Status === "200" && userId.value !== null) {
    await showPassword(formData.Password)

    await loadUserDetails(userId.value)

    await updateProfile()

    await loadUserCommission(userId.value)

  } else {
    isError.value = true
    //TODO ทำ modal infomation แทน alert
    alert(response.apiResponse.ErrorMessage)
    messageError.value = response.apiResponse.ErrorMessage ?? ""
  }

  isLoading.value = false
}


// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "แก้ไขข้อมูลผู้ช่วย"
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