<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

    <FormKit type="form" :actions="false" id="form-user" form-class="form-order form-theme" :incomplete-message="false">

      <div class="row">
        <div class="col col-main">

          <UsersProfileDetail @create-user-confirm="handleUserCreate" :user-profile="userProfileDetail" />

        </div>

        <div class="col col-sidebar">
          <section class="site-sidebar is-sticky">

            <UsersLogStatus />

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
// Define import
import {
  UserDataRes,
  UserCommissionListRes,
  UserGroupListRes,
  delGroupReq,
} from "~/shared/entities/user-entity";
import { UserLimitRes, UserProfileReq } from "~/shared/entities/user-entity"
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth"
import { storeToRefs } from "pinia"
import { useStoreUserSave } from "~/stores/user/storePasswordUser"

// Define variables
const userProfileDetail: globalThis.Ref<UserProfileReq | any> = ref()
const usersLimitRes: globalThis.Ref<UserLimitRes | any> = ref()
const userDetails: globalThis.Ref<UserDataRes | undefined> = ref();
const userGroupList: globalThis.Ref<UserGroupListRes[] | undefined> = ref();

const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile"])

const userSave = useStoreUserSave()
const storeAuth = useStoreUserAuth()
const { AuthenInfo } = storeToRefs(storeAuth)
const isError = ref(false)
const messageError = ref("")
const isLoading = ref(false)
const router = useRouter()

// on Mounted
const onLoad = onMounted(async () => {
  userSave.clearUserSave()
  if (AuthenInfo.value) {
    isLoading.value = true
    await loadUsersLimit()

    if (usersLimitRes.value && usersLimitRes.value.CurrentCount >= usersLimitRes.value.MaxCount) {
      // console.log("User is max!!!")
      router.push("/users")
    }
    isLoading.value = false
  } else {
    router.push("/login")
  }
})

const handleUserCreate = async (
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
  isLoading.value = true
  console.log(Password, FirstName, LastName, PhoneNumber, Email, LimitMoney, Commission, Branch, IsActive)
  const profileReq: UserProfileReq = {
    Password: Password,
    FirstName: FirstName,
    LastName: LastName,
    PhoneNumber: PhoneNumber,
    Email: Email,
    CreditLimit: LimitMoney, // Provide a default value for LimitMoney
    Commission: Commission,
    BranchName: Branch,
    IsActive: IsActive,
  }

  //const UserID = "1F54C9B8C1A847A0B8F6ED269A95C653"
  //router.push("/users/profile/"+UserID)

  const response = await useRepository().user.create(profileReq)
  if (
    response.apiResponse.Status &&
    response.apiResponse.Status == "200" &&
    response.apiResponse.Data
  ) {
    const UserID = response.apiResponse.Data.UserID

    router.push("/users/profile/" + UserID)
  } else {
    isError.value = true
    messageError.value = response.apiResponse.ErrorMessage ?? ""
  }
  isLoading.value = false
}

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
    return usersLimitRes.value
  } else {
    isError.value = true
    messageError.value = response.apiResponse.ErrorMessage ?? ""
  }
}

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