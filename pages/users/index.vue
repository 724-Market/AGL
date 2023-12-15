<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">
        <div class="row">
            <div class="col">

                <div id="transaction-stats" class="card-stat-stack">
                    <OrderHistoryCardsUsers 
                      v-if="usersLimitRes"
                      :user-limit="usersLimitRes"
                    ></OrderHistoryCardsUsers>
                </div>

                <UsersGridTable 
                  :filters="filterOptionTable" 
                  v-if="filterOptionTable.length >= 0"
                  @change-table="handlerChangeTable" 
                  @on-delete="deleteUsers"
                  @on-profile="loadProfileUser"
                ></UsersGridTable>
                
            </div>
        </div>

    </NuxtLayout>
</template>

<script lang="ts" setup>

import {
    UserDataReq,
    UserLimitRes,
    delUserReq,
} from "~/shared/entities/user-entity";

import { storeToRefs } from "pinia";
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { Filter } from "~/shared/entities/table-option";
import { useStoreStateOrder } from "~/stores/order/storeStateOrder";

// Define Variables
// Loading state after form submiting

const isLoading = ref(false);
const table = ref();
let values = reactive({});
const router = useRouter();
const usersLimitRes: globalThis.Ref<UserLimitRes | undefined> = ref();

const d = new Date();
const getMonth = d.getMonth() + 1;

const filterOption: globalThis.Ref<Filter[]> = ref([]);
const filterOptionTable: globalThis.Ref<Filter[]> = ref([
  { field: "IsActive", type: "LIKE", value: "" },
]);

const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);
const storeState = useStoreStateOrder();


const isError = ref(false);
const messageError = ref("");

const onLoad = onMounted(async () => {
  storeState.clearState();
  if (AuthenInfo.value) {
    await loadUsersLimit();
  } else {
    router.push("/login");
  }
});

const loadProfileUser = async (UserID: string) => {
  //ทำรายการต่อ
  isLoading.value = true;

  router.push("/users/profile/"+UserID);

  isLoading.value = false;
};

const deleteUsers = async (UserID: string) => {
  console.log("deleteUsers"+UserID)
  //ลบแบบร่างนี้
  let confirmAction = confirm("ต้องการลบรายการหรือไม่?");
  if (confirmAction) {
    isLoading.value = true;
    let req: delUserReq = {
        SubUserID: UserID,
    };
    var response = await useRepository().user.deleteUser(req);
    if (response.apiResponse.Status && response.apiResponse.Status == "200") {
      const refreshPage = () => {
        window.location.reload(); // Reloads the current page
      };
    } else {
      alert(response.apiResponse.ErrorMessage);
    }
    isLoading.value = false;
  }
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

const handlerChangeTable = async (datatable: any) => {
  table.value = datatable;

  console.log("datatable", table.value);
}

const continute = () => {
  alert("ทำรายการต่อ");
  console.log("ทำรายการต่อ");
};
// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true
// Define page meta
const pageTitle = "ผู้ช่วย"
const pageCategory = "รายชื่อผู้ช่วย"
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