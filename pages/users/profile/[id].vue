<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

    <FormKit type="form" @submit="submitEditUser" :actions="false" id="form-user" form-class="form-order form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col col-main">

          <UsersProfileDetail :key="renderKey" :user-i-d="userId" 
            :user-details="userDetails" @on-delete-group="updateProfile"
            :user-commission-list="userCommissionList" v-if="userDetails"/>

        </div>

        <div class="col col-sidebar">
          <section class="site-sidebar is-sticky">

            <UsersLogCommission 
              :user-commission-list="userCommissionList"
            />

            <UsersLogStatus /> 

            <UsersBranch 
            :key="renderKey"
            :user-id="userId"
            v-if="userId" />
            
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
      :modal-title="textUserID" :modal-text="textPassword" 
      @on-close-modal="onCloseConfirm"></ElementsDialogShowpassword>



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
import { ref, watch } from 'vue';

const userDetails: globalThis.Ref<UserDataRes | undefined> = ref();
const userCommissionList: Ref<UserCommissionListRes[]> = ref([]);


const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile"])

//define store
const storeAuth = useStoreUserAuth();
// define getter in store
const { AuthenInfo } = storeToRefs(storeAuth);
const isError = ref(false);
const messageError = ref("");
const isLoading = ref(false);
const userId = ref("");

var isPasswordChanged = ref(false)
var textPassword = ref('')
var textUserID = ref('')

const route = useRoute()
const router = useRouter();

const renderKey = ref(0);
const getStorePassword = useStorePassword();

onMounted(async () => {
  try{
    //This console is for checking the latest code
    console.log("Profile page4 " + route.params.id)
    console.log("storePasswordB"+getStorePassword.value)
    if (AuthenInfo.value) {
      isLoading.value = true;

      if (route.params.id) {
        userId.value = Array.isArray(route.params.id)
          ? route.params.id[0] // Use the first element if it's an array
          : route.params.id;
        await loadUserDetails(userId.value);
        await showPassword(getStorePassword.value);
        await loadUserCommission(userId.value);
      }

      isLoading.value = false;
    } else {
      router.push("/login");
    }
  } catch (error) {
      console.error('An error occurred while fetching user group list:', error);
  }
});

const updateProfile = async () => {
    renderKey.value = renderKey.value + 1
};

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
      responseCom.apiResponse.Status !== undefined &&
      responseCom.apiResponse.Status === 200 && 
      responseCom.apiResponse.Data
    ) {
      console.log("getCommissionList ",responseCom.apiResponse.Data)
      userCommissionList.value = responseCom.apiResponse.Data!;
        
    } else {
      console.log("Load CommissionList fail!!!")
      isError.value = true;
      messageError.value = responseCom.apiResponse.ErrorMessage ?? "";
    }
}

const loadUserDetails = async (userid: string) => {
  const userDetailReq: UserDataReq = {
    SubUserID: userid
  }
  console.log("load User Details ")
  const response = await useRepository().user.getProfile(userDetailReq);
  if (
    response.apiResponse.Status &&
    response.apiResponse.Status == "200" &&
    response.apiResponse.Data
  ) {
    // Now TypeScript knows that Data is an array, so accessing [0] is valid
    userDetails.value = response.apiResponse.Data[0];
  } else {
    isError.value = true;
    messageError.value = response.apiResponse.ErrorMessage ?? "";
  }
};
/*
onBeforeUnmount(() => {
  // Clean up the watch effect when the component is unmounted
  watchResponse();
});
*/
const showPassword = async (getPassword: string) => {
  if(getPassword){
    console.log("Password changed!!!");
    getStorePassword.value = '';
    isPasswordChanged.value = true;
    textUserID.value = userId.value;
    textPassword.value = getPassword;
  } else {
    console.log("Password not update!!!")
  }
}

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
  const isAct = ref(false);
  if (formData.isActiveLog == 'active'){
    isAct.value = true;
  }
  console.log("formData.emailText "+formData.Email)
  const saveProfileReq: UserSaveReq = {
    SubUserID: userId.value,
    NewPassword: formData.password,
    BranchName: formData.Branch,
    Commission: formData.Commission,
    Email: formData.Email,
    FirstName: formData.FirstName,
    LastName: formData.LastName, // Provide a default value for LimitMoney
    CreditLimit: formData.LimitMoney,
    PhoneNumber: formData.PhoneNumber,
    IsActive: isAct.value,
  };
  console.log("saveProfileReq.Email "+saveProfileReq.Email)
  isLoading.value = true;

  const response = await useRepository().user.saveProfile(saveProfileReq);
  if (response.apiResponse.Status &&
    response.apiResponse.Status == "200") {
    await showPassword(formData.password);
    await updateProfile();
    await loadUserCommission(saveProfileReq.SubUserID);
  } else {
    isError.value = true;
    alert(response.apiResponse.ErrorMessage);
    messageError.value = response.apiResponse.ErrorMessage ?? "";
  }

  isLoading.value = false;
};


// Define layout
const layout = "monito";
const layoutClass = "layout-monito";
const showPageSteps = false;
const showPageHeader = true;

// Define page meta
const pageTitle = "แก้ไขข้อมูลผู้ช่วย";
const pageCategory = "ผู้ช่วย";
const pageDescription = "";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-users single-user",
  },
});
</script>