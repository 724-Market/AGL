<template>
    <NuxtLayout
      :name="layout"
      :layout-class="layoutClass"
      :page-title="pageTitle"
      :page-category="pageCategory"
      :show-page-header="showPageHeader"
    >
    <div class="row">
      <div>
        <h1>User Profile Page</h1>
      </div>
        <div class="col-lg-8 col-xl-9">
            <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลผู้ช่วย # # # # # # # # # # # # # # # # # # # # #-->
            <UsersProfileDetail
              @edit-user-confirm="handleUserEdit"
              :user-i-d="userId"
              :load-data="isLoading"
              :get-user-password="newPassUser"
              :user-details="userDetails"
              v-if="userDetails"
            ></UsersProfileDetail>
  
        </div>
    </div>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
  </NuxtLayout>
  </template>
  
  <script lang="ts" setup>
  import {
    UserDataReq,
    UserDataRes,
    UserSaveReq
  } from "~/shared/entities/user-entity";
  
  // Import store
  import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
  // using pinia
  import { storeToRefs } from "pinia";
  import { useStoreUserSave } from "~/stores/user/storePasswordUser";
  
  const userDetails: globalThis.Ref<UserDataRes | undefined> = ref();
  
  const userSave = useStoreUserSave();

  //define store
  const storeAuth = useStoreUserAuth();
  // define getter in store
  const { AuthenInfo } = storeToRefs(storeAuth);
  const isError = ref(false);
  const messageError = ref("");
  const isLoading = ref(false);
  const userId = ref("");

  const saveProfileRes = ref("");
  const newPassUser = ref("");
  
  const route = useRoute()
  const router = useRouter();

  const onLoad = onMounted(async () => {
    console.log("Profile page "+route.params.id)

    if (AuthenInfo.value) {
      isLoading.value = true;

      if (route.params.id) {
        userId.value = Array.isArray(route.params.id)
          ? route.params.id[0] // Use the first element if it's an array
          : route.params.id;
        //### Delete after validate complete ####
        console.log("Before loadUserDetails");
        console.log("userSave.Password "+userSave.Password)
        newPassUser.value = userSave.Password;
        console.log("newPassUser "+newPassUser.value)
        await loadUserDetails(userId.value);
      }

      isLoading.value = false;
    } else {
      router.push("/login");
    }
  });
  
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
      saveProfileRes.value = response.apiResponse.Status;
      newPassUser.value = saveProfileReq.NewPassword;
      console.log("Save Profile Success!!! newPassUser.value"+newPassUser.value);
      router.push("/users/profile/" + saveProfileReq.SubUserID);
    } else {
      isError.value = true;
      messageError.value = response.apiResponse.ErrorMessage ?? "";
    }
    
    isLoading.value = false;
  };
 
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

      if (newStatus && newStatus === "200") {
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
  
  
  // Define layout
  const layout = "monito";  
  const layoutClass = "page-monito";
  const showPageSteps = true;
  const showPageHeader = true;
  
  // Define page meta
  const pageTitle = "แก้ไขข้อมูลผู้ใช้งาน";
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