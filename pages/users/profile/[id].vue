<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

    <FormKit type="form" :actions="false" id="form-user" form-class="form-order form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col col-main">

          <UsersProfileDetail :key="renderKey" @edit-user-confirm="handleUserEdit" :user-i-d="userId" :load-data="isLoading"
            :get-user-password="newPassUser" :user-details="userDetails" @on-delete-group="deleteGroup"
            :user-commission-list="userCommissionList" v-if="userDetails"/>

        </div>

        <div class="col col-sidebar">
          <section class="site-sidebar is-sticky">

            <UsersLogCommission 
              :user-commission-list="userCommissionList"
              v-if="userCommissionList"/>

            <UsersLogStatus /> 

            <UsersBranch 
            :key="renderKey"
            :user-id="userId"
            v-if="userId" />

            <button type="submit" class="formkit-input btn btn-primary form-actions" @click="submitCreateUser"
              label="ไปเลือกวิธีชำระเงิน" name="user-submit" id="user-submit" :loading="isLoading">
              บันทึก
            </button>

            <NuxtLink class="btn-back btn-gray" to="/users">ย้อนกลับ</NuxtLink>

          </section>
        </div>
      </div>

    </FormKit>

    <ElementsModalLoading :loading="isLoading" />

  </NuxtLayout>
</template>
  
<script lang="ts" setup>
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

const userSave = useStoreUserSave();

const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile"])

//define store
const storeAuth = useStoreUserAuth();
// define getter in store
const { AuthenInfo } = storeToRefs(storeAuth);
const isError = ref(false);
const messageError = ref("");
const isLoading = ref(false);
const userId = ref("");

const newPassUser = ref("");

const route = useRoute()
const router = useRouter();

const renderKey = ref(0);

onMounted(async () => {
  try{
    //This console is for checking the latest code
    console.log("Profile page4 " + route.params.id)
    if (AuthenInfo.value) {
      isLoading.value = true;

      if (route.params.id) {
        userId.value = Array.isArray(route.params.id)
          ? route.params.id[0] // Use the first element if it's an array
          : route.params.id;
        //### Delete after validate complete ####
        newPassUser.value = userSave.Password;
        await loadUserDetails(userId.value);
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

const deleteGroup = async () => {
    renderKey.value = renderKey.value + 1
};

const handleUserEdit = async (
  subUserID: string,
  Password: string,
  FirstName: string,
  LastName: string,
  PhoneNumber: string,
  Email: string,
  LimitMoney: number,
  Commission: number,
  Branch: string,
  IsActive: boolean
) => {
  isLoading.value = true;
  console.log(subUserID, Password, FirstName, LastName, PhoneNumber, Email, LimitMoney, Commission, Branch, IsActive);
  const saveProfileReq: UserSaveReq = {
    SubUserID: subUserID,
    NewPassword: Password,
    FirstName: FirstName,
    LastName: LastName,
    PhoneNumber: PhoneNumber,
    Email: Email,
    CreditLimit: LimitMoney, // Provide a default value for LimitMoney
    Commission: Commission,
    BranchName: Branch,
    IsActive: IsActive,
  };


  const response = await useRepository().user.saveProfile(saveProfileReq);
  if (response.apiResponse.Status &&
    response.apiResponse.Status == "200") {
    newPassUser.value = saveProfileReq.NewPassword;
    console.log("Save Profile Success!!! newPassUser.value" + newPassUser.value);
    await loadUserCommission(saveProfileReq.SubUserID);
  } else {
    isError.value = true;
    messageError.value = response.apiResponse.ErrorMessage ?? "";
  }

  isLoading.value = false;
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

const oldStatus = ref("");

const watchResponse = watch(
  () => newPassUser.value,
  (newStatus) => {
    console.log("New Status:", newStatus);
    console.log("Old Status:", oldStatus.value);

    // Convert newStatus to a number
    const numericStatus = parseInt(newStatus, 10);

    if (!isNaN(numericStatus) && numericStatus === 200) {
      loadUserDetails(userId.value);
      // Assuming you want to clear the saveProfileRes value after using it
    }

    // Update oldStatus after processing the newStatus
    oldStatus.value = newStatus;
  },
  { immediate: false }
);

onBeforeUnmount(() => {
  // Clean up the watch effect when the component is unmounted
  watchResponse();
});

var userIDRes = ref("");
var passwordNumberText = ref("");
var confirmPasswordText = ref("");
var firstNameText = ref("");
var lastNameText = ref("");
var phoneNumberText = ref("");
var emailText = ref("");
const limitMoney = ref(0);
const commission = ref(0);
var branchText = ref("");
const isActive = ref(false);

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
  if (props.userID == null && passwordNumberText.value != null) {
    const req: UserProfileReq = {
      Password: passwordNumberText.value,
      FirstName: firstNameText.value,
      LastName: lastNameText.value,
      PhoneNumber: phoneNumberText.value,
      Email: emailText.value,
      CreditLimit: limitMoney.value,
      Commission: commission.value,
      BranchName: branchText.value,
      IsActive: isActive.value,

    }
    console.log("submitCreateUser setUser store" + passwordNumberText.value);
    userSave.setUserSave(req);
  }
  if (props.userID == null) {
    // Add waiting time for debug
    emit("createUserConfirm",
      passwordNumberText.value,
      firstNameText.value,
      lastNameText.value,
      phoneNumberText.value,
      emailText.value,
      limitMoney.value,
      commission.value,
      branchText.value,
      isActive.value
    );
  } else {
    if (passwordNumberText.value == null) {
      userSave.clearUserSave()
    }
    emit("editUserConfirm",
      props.userDetails?.UserID,
      passwordNumberText.value,
      firstNameText.value,
      lastNameText.value,
      phoneNumberText.value,
      emailText.value,
      limitMoney.value,
      commission.value,
      branchText.value,
      isActive.value
    );
    passwordNumberText.value = "";
    confirmPasswordText.value = "";
  }
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