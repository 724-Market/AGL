<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">
    <div class="row">
      <div class="col">

        <OrderHistorySearch v-if="statusGroup" @search-history="handleSearch" @clear-search-history="handleClearSearch">
        </OrderHistorySearch>

        <OrderHistoryStatus v-if="statusGroup" @change-status="handleChangeStatus" :status-group="statusGroup"
          :status-search="statusSearch"></OrderHistoryStatus>

        <OrderHistoryGridTable :filters="filterOptionTable" v-if="filterOptionTable.length > 0"
          @change-table="handlerChangeTable" @on-resume="resume" @on-pay="pay" @on-tracking="trackStatus"
          @on-policy="policyDetail" @on-download="download" @on-help="contactStaff" @on-delete="deleteDraft">
        </OrderHistoryGridTable>
      </div>
    </div>
    <OrderHistoryModalContactStaff @close-modal="handleCloasModal" :show="showModalStaff"></OrderHistoryModalContactStaff>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";
import type {
  OrderDetailRequest,
  StatusGroupResponse,
  SubHistoryRequest,
  HistoryResponse,
  HistorySearch,
  OrderResponse,
  OrderDetails,
  OptionsResponse,
  PaymentDetails,
} from "~/shared/entities/order-entity";

import { storeToRefs } from "pinia";
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStorePackageList } from "~/stores/order/storePackageList";
import { useStorePackage } from "~/stores/order/storePackage";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import type { Filter } from "~/shared/entities/table-option";
import type { IInformation } from "~/shared/entities/information-entity";
import type {
  IPackageRequest,
  IPackageResponse,
  Paging,
} from "~/shared/entities/packageList-entity";
import { useStoreStateOrder } from "~/stores/order/storeStateOrder";
import { useStorePaymentGateway } from "~/stores/order/storePaymentGateway";

// Define Variables
// Loading state after form submiting

const isLoading = ref(false);
const table = ref();
let values = reactive({});
const router = useRouter();

const d = new Date();
const getMonth = d.getMonth() + 1;
const EffectiveDate = `${d.getFullYear()}-${getMonth > 9 ? getMonth : "0" + getMonth}-${d.getDate() > 9 ? d.getDate() : "0" + d.getDate()
  }`;
const ExpireDate = `${d.getFullYear() + 1}-${getMonth > 9 ? getMonth : "0" + getMonth}-${d.getDate() > 9 ? d.getDate() : "0" + d.getDate()
  }`;

const paging: globalThis.Ref<Paging> = ref({
  Length: 100,
  Page: 1,
  TotalRecord: 0,
  RedirectUrl: "/order/compulsory/packages",
});

const orderDetail: globalThis.Ref<OrderDetails | undefined> = ref();
const paymentDetail: globalThis.Ref<PaymentDetails | undefined> = ref();
const optionDetail: globalThis.Ref<OptionsResponse | undefined> = ref();

const historySearch: globalThis.Ref<HistorySearch | undefined> = ref();
const statusGroup: globalThis.Ref<StatusGroupResponse | undefined> = ref();
const filterOption: globalThis.Ref<Filter[]> = ref([]);
const filterOptionTable: globalThis.Ref<Filter[]> = ref([
  { field: "Status", type: "MATCH", value: "Pending" },
]);
var statusSearch = ref("");
var statusSelect = ref("");

const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);

const infomation = useStoreInformation();
const storePackage = useStorePackage();
const placeorder = useStorePlaceorder();
const storeSummary = useStoreOrderSummary();
const storeState = useStoreStateOrder();
const setOrderNo = useStoreOrderNo();

const paymentGateway = useStorePaymentGateway();
const { PaymenGatewaytInfo } = storeToRefs(paymentGateway);

const showModalStaff = ref(false);

const onLoad = onMounted(async () => {
  storeState.clearState();
  if (AuthenInfo.value) {
    await loadHistoryStatus();
    // await triggerEvent()
  } else {
    router.push("/login");
  }
});

const resume = async (OrderNo: string) => {
  //ทำรายการต่อ
  isLoading.value = true;

  // await loadOrderDetail(OrderNo);
  await paymentGateway.clearPaymenGateway();
  await loadOrderSummary(OrderNo);
  // set statte menu to store
  useStateMenu().setStateMenu(3);
  router.push("/order/compulsory/placeorder");

  isLoading.value = false;
};

const loadOrderSummary = async (orderNo: string) => {
  const req: OrderDetailRequest = {
    OrderNo: orderNo,
  };
  const response = await useRepository().order.summary(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data && response.apiResponse.Data.length > 0) {
      // save to store
      const data = response.apiResponse.Data[0];
      if (data.Order != undefined) {
        data.Order.OrderNo = orderNo;
      }
      storeSummary.setOrderSummary(data);
      await useUtility().setStoretoStep(data, orderNo, orderDetail.value as OrderDetails)
      // await setStoretoStep(data, orderNo);
    }
  }
};

const pay = async (OrderNo: string) => {
  //ชำระเงิน
  // set statte menu to store
  await paymentGateway.clearPaymenGateway()
  useStateMenu().setStateMenu(5)
  setOrderNo.value = OrderNo;
  router.push(`/order/compulsory/summary`);
};

const policyDetail = async (OrderNo: string) => {
  //รายละเอียดกรมธรรม์
  alert("policyDetail : " + OrderNo);
};

const download = async (url: string) => {
  //ดาวโหลดกรมธรรม์
  if (url != "") window.open(url, "_blank");
};

const contactStaff = async () => {
  console.log("staff");
  //ติดต่อเจ้าหน้าที่
  showModalStaff.value = false;
  showModalStaff.value = true;
};

const deleteDraft = async (OrderNo: string) => {
  //ลบแบบร่างนี้
  let confirmAction = confirm("ต้องการลบรายการหรือไม่?");
  if (confirmAction) {
    isLoading.value = true;
    let req: OrderDetailRequest = {
      OrderNo: OrderNo,
    };
    var response = await useRepository().order.delete(req);
    if (response.apiResponse.Status && response.apiResponse.Status == "200") {
      await loadHistoryStatus();
    } else {
      alert(response.apiResponse.ErrorMessage);
    }
    isLoading.value = false;
  }
};

const handleCloasModal = async (refresh: Boolean) => {
  showModalStaff.value = false;
};

const loadHistoryStatus = async (filter?: Filter[]) => {
  isLoading.value = true;
  var statusRes = await useRepository().order.statusGroup(filter);
  if (statusRes.apiResponse.Status && statusRes.apiResponse.Status == "200") {
    if (statusRes.apiResponse.Data) {
      statusGroup.value = statusRes.apiResponse.Data;
      // console.log("statusGroup.value", statusGroup.value);
    }
  }
  isLoading.value = false;
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
  if (status == "Delivery") {
    let filter = useMapData().getFilterSearchHistory("Status", "Success", "LIKE");
    if (filter.length > 0) {
      console.log(filter)
      filterOptionTable.value = [...filterOptionTable.value, filter[0]];

    }
    filter = useMapData().getFilterSearchHistory("IsDelivery", "1", "LIKE");
    if (filter.length > 0) {
      filterOptionTable.value = [...filterOptionTable.value, filter[0]];
    }
  } else {
    const filter = useMapData().getFilterSearchHistory("Status", status);
    if (filter.length > 0) {
      filterOptionTable.value[0] = filter[0];
    }
  }
  filterOption.value.forEach((value, index) => {
    filterOptionTable.value = [...filterOptionTable.value, value];
  });

  // console.log("handleChangeStatus filterOption", filterOption.value);
};

const handleSearch = async (searchValue: HistorySearch) => {
  // console.log('handleSearch', searchValue)
  filterOption.value = [];
  filterOptionTable.value = [];
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
  // ค้นหาขั้นสูง ช่วงวันที่
  if (searchValue.EffectiveDate && searchValue.ExpireDate) {
    const filterStart = useMapData().getFilterSearchHistory(
      "CreateDate",
      useUtility().formatDate(searchValue.EffectiveDate, "YYYY-MM-DD"),
      "DATE_GTE"
    );
    if (filterStart.length > 0) {
      filterOption.value = [...filterOption.value, filterStart[0]];
    }
    const filterStop = useMapData().getFilterSearchHistory(
      "CreateDate",
      useUtility().formatDate(searchValue.ExpireDate, "YYYY-MM-DD"),
      "DATE_LTE"
    );
    if (filterStop.length > 0) {
      filterOption.value = [...filterOption.value, filterStop[0]];
    }
  }
  filterOptionTable.value = filterOption.value;
  await loadHistoryStatus(filterOption.value);

  console.log("handleSearch filterOption", filterOption.value);
}

const handleClearSearch = async (status: boolean) => {
  //filterOption.value = [{ field: "Status", type: "MATCH", value: "Pending" }];
  // var clear: HistorySearch = {
  //   SearchCategory: undefined,
  //   SearchText: '',
  //   orderType: undefined
  // }
  // await handleSearch(clear)
}

const handlerChangeTable = async (datatable: any) => {
  table.value = datatable;

  // console.log("datatable", table.value);
}

// const continute = () => {
//   alert("ทำรายการต่อ");
//   console.log("ทำรายการต่อ");
// };

// Define layout
const layout = "monito"
const layoutClass = "page-monito"
const showPageSteps = false
const showPageHeader = true
const showLogoHeader = false

// Define page meta
const pageTitle = "ประวัติการทำรายการ"
const pageCategory = "ข้อมูลประวัติ"
const pageDescription = ""

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-history single-history template-datatable",
  },
})
</script>
