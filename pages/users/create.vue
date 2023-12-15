<template>
    <NuxtLayout
      :name="layout"
      :layout-class="layoutClass"
      :page-title="pageTitle"
      :page-category="pageCategory"
      :show-page-header="showPageHeader"
    >
    <div class="row">
        <div class="col-lg-8 col-xl-9">
            <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลผู้ช่วย # # # # # # # # # # # # # # # # # # # # #-->
            <UsersProfileDetail
              @create-user-confirm="handleUserCreate"
              :user-profile="userProfileDetail"
            ></UsersProfileDetail>

         <!--    
            <UsersProfileDetail
              @check-profile-detail="handleCheckProfileDetail"
              :user-profile="userProfileDetail"
            ></UsersProfileDetail>

          <button
            type="button"
            class="formkit-input btn btn-primary form-actions"
            @click="submitOrder"
            label="ไปเลือกวิธีชำระเงิน"
            name="order-submit"
            id="order-submit"
            :loading="isLoading"
          >
            บันทึก
          </button>
           -->
        </div>
    </div>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import {
    UserLimitRes
} from "~/shared/entities/user-entity";

// Import store
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
// using pinia
import { storeToRefs } from "pinia";
import {
  UserProfileReq,
} from "~/shared/entities/user-entity";
import { useStoreUserSave } from "~/stores/user/storePasswordUser";
  
const userProfileDetail: globalThis.Ref<UserProfileReq | undefined> = ref();
const usersLimitRes: globalThis.Ref<UserLimitRes | undefined> = ref();

const userSave = useStoreUserSave();
//define store
const storeAuth = useStoreUserAuth();
// define getter in store
const { AuthenInfo } = storeToRefs(storeAuth);
const isError = ref(false);
const messageError = ref("");
const isLoading = ref(false);

const router = useRouter();

const onLoad = onMounted(async () => {
  userSave.clearUserSave()
  if (AuthenInfo.value) {
    isLoading.value = true;
    await loadUsersLimit();
    
    if (usersLimitRes.value && usersLimitRes.value.CurrentCount >= usersLimitRes.value.MaxCount) {
      console.log("User is max!!!")
      router.push("/users");
    } 
    isLoading.value = false;
  } else {
    router.push("/login");
  }
});

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
    isLoading.value = true;
    console.log(Password, FirstName, LastName, PhoneNumber, Email, LimitMoney, Commission, Branch, IsActive);
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
    };

    //const UserID = "1F54C9B8C1A847A0B8F6ED269A95C653"
    //router.push("/users/profile/"+UserID);
    
 
    const response = await useRepository().user.create(profileReq);
    if (
      response.apiResponse.Status &&
      response.apiResponse.Status == "200" &&
      response.apiResponse.Data
    ) {
      const UserID = response.apiResponse.Data.UserID;

      router.push("/users/profile/"+UserID);
    } else { 
      isError.value = true;
      messageError.value = response.apiResponse.ErrorMessage ?? "";
    }
    isLoading.value = false;
};

const loadUsersLimit = async () => {
  const response = await useRepository().user.createLimit();

  if (
    response.apiResponse.Status &&
    response.apiResponse.Status == "200" &&
    response.apiResponse.Data
  ) {
    // Now TypeScript knows that Data is an array, so accessing [0] is valid
    usersLimitRes.value = response.apiResponse.Data[0];
    return usersLimitRes.value;
  } else {
    isError.value = true;
    messageError.value = response.apiResponse.ErrorMessage ?? "";
  }
};

// Define layout
const layout = "monito";
const layoutClass = "page-monito";
const showPageSteps = true;
const showPageHeader = true;

// Define page meta
const pageTitle = "เพิ่มผู้ใช้งาน";
const pageCategory = "ผู้ช่วย";
const pageDescription = "Users ข้อมูลผู้ช่วย";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-order category-compulsory single-placeholder",
  },
});
</script>