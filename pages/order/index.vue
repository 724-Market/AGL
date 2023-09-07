<template>
  <NuxtLayout
    :name="layout"
    :layout-class="layoutClass"
    :page-title="pageTitle"
    :page-category="pageCategory"
    :show-page-steps="showPageSteps"
    :show-page-header="showPageHeader"
  >
    <div class="row">
      <div class="col">
        <OrderHistorySearch
          @search-history="handleSearch"
          @clear-search-history="handleClearSearch"
        ></OrderHistorySearch>

        <OrderHistoryStatus
          v-if="statusGroup"
          @change-status="handleChangeStatus"
          :status-group="statusGroup"
          :status-search="statusSearch"
        ></OrderHistoryStatus>

        <OrderHistoryGridTable :filters="filterOptionTable" v-if="filterOptionTable.length>0" @change-table="handlerChangeTable"></OrderHistoryGridTable>
      </div>
    </div>
    <ElementsModalLoading :loading="isLoading" ></ElementsModalLoading>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";
import {
  OrderDetailRequest,
  StatusGroupResponse,
  SubHistoryRequest,
  HistoryResponse,
  HistorySearch,
} from "~/shared/entities/order-entity";

import { storeToRefs } from "pinia";
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { Filter } from "~/shared/entities/table-option";


// Define Variables
// Loading state after form submiting

const isLoading = ref(false);
const table = ref();
let values = reactive({});

const historySearch: globalThis.Ref<HistorySearch | undefined> = ref();
const statusGroup: globalThis.Ref<StatusGroupResponse | undefined> = ref();
const filterOption: globalThis.Ref<Filter[]> = ref([
]);
const filterOptionTable: globalThis.Ref<Filter[]> = ref([
  { field: "Status", type: "MATCH", value: "Pending" },
]);
var statusSearch = ref("");
var statusSelect = ref("");

const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);

const storeOrder = useStorePlaceorder();

const router = useRouter();

const onLoad = onMounted(async () => {
  
  if (AuthenInfo.value) {
    await loadHistoryStatus();
    const openDialogModal = document.querySelector(".icon-edit");
  openDialogModal.addEventListener("click", function () {
    alert("Test");
  });
  } else {
    router.push("/login");
  }
});
const loadHistoryStatus = async (filter?: Filter[]) => {
  var statusRes = await useRepository().order.statusGroup(filter);
  if (statusRes.apiResponse.Status && statusRes.apiResponse.Status == "200") {
    if (statusRes.apiResponse.Data) {
      statusGroup.value = statusRes.apiResponse.Data;
      console.log("statusGroup.value", statusGroup.value);
    }
  }
};

const onSearch = async () => {
  let search = {
    status: statusSelect.value,
    SearchCategory: historySearch.value?.SearchCategory,
    SearchText: historySearch.value?.SearchText,
    orderType: historySearch.value?.orderType,
  };

  //console.log(table.value);
  //table.value.dt.draw();
  // console.log("search", search);
};

const handleChangeStatus = async (status: string) => {
  // console.log('handleChangeStatus', status)
  filterOptionTable.value = [];
  statusSearch.value = "";
  statusSelect.value = status;
  const filter = useMapData().getFilterSearchHistory("Status", status);
  if (filter.length > 0) {
    filterOptionTable.value[0] = filter[0];
    filterOption.value.forEach((value, index) => {
      filterOptionTable.value = [...filterOptionTable.value, value];
    });
    // let arrFilter =  filterOptionTable.value;
    // arrFilter.concat(filterOption.value);
    // filterOptionTable.value = arrFilter
  }
  console.log("handleChangeStatus filterOption", filterOption.value);
  await onSearch();
};

const handleSearch = async (searchValue: HistorySearch) => {
  filterOption.value = [];
  console.log("handleSearch", searchValue);
  statusSearch.value = "clear";
  historySearch.value = searchValue;
  // ค้นหาทั่วไป
  if (searchValue.SearchCategory) {
    const filter = useMapData().getFilterSearchHistory(
      searchValue.SearchCategory.value,
      searchValue.SearchText
    );
    if (filter.length > 0) {
      filterOption.value = [...filterOption.value, filter[0]];
    }
  }
  // ค้นหาขั้นสูงผลิตภัณฑ์
  if (searchValue.orderType) {
    const filter = useMapData().getFilterSearchHistory(
      searchValue.orderType.option ?? "",
      searchValue.orderType.value
    );
    if (filter.length > 0) {
      filterOption.value = [...filterOption.value, filter[0]];
    }
  }
  //await loadHistoryStatus(filterOption.value);

  console.log("handleSearch filterOption", filterOption.value);
};
const handleClearSearch = async (status: boolean) => {
  //filterOption.value = [{ field: "Status", type: "MATCH", value: "Pending" }];
  //await onSearch();
};
const handlerChangeTable = async(datatable:any)=>{
  table.value = datatable

  console.log('datatable',table.value)
}



const continute = () => {
  alert("ทำรายการต่อ");
  console.log('ทำรายการต่อ')
};
// Define layout
const layout = "monito";
const layoutClass = "page-monito";
const showPageSteps = false;
const showPageHeader = true;

// Define page meta
const pageTitle = "ประวัติการทำรายการ";
const pageCategory = "ข้อมูลประวัติ";
const pageDescription = "";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-history category-datatable single-transaction",
  },
});
</script>
