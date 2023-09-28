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

        <OrderHistoryGridTable
          :filters="filterOptionTable"
          v-if="filterOptionTable.length > 0"
          @change-table="handlerChangeTable"
          @on-resume="resume"
          @on-pay="pay"
          @on-tracking="trackStatus"
          @on-policy="policyDetail"
          @on-download="download"
          @on-help="contactStaff"
          @on-delete="deleteDraft"
        ></OrderHistoryGridTable>
      </div>
    </div>
    <OrderHistoryModalContactStaff
      @close-modal="handleCloasModal"
      :show="showModalStaff"
    ></OrderHistoryModalContactStaff>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
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
import { Filter } from "~/shared/entities/table-option";
import { IInformation } from "~/shared/entities/information-entity";
import {
  IPackageRequest,
  IPackageResponse,
  Paging,
} from "~/shared/entities/packageList-entity";
import { useStoreStateOrder } from "~/stores/order/storeStateOrder";

// Define Variables
// Loading state after form submiting

const isLoading = ref(false);
const table = ref();
let values = reactive({});
const router = useRouter();

const d = new Date();
const getMonth = d.getMonth() + 1;
const EffectiveDate = `${d.getFullYear()}-${getMonth > 9 ? getMonth : "0" + getMonth}-${
  d.getDate() > 9 ? d.getDate() : "0" + d.getDate()
}`;
const ExpireDate = `${d.getFullYear() + 1}-${getMonth > 9 ? getMonth : "0" + getMonth}-${
  d.getDate() > 9 ? d.getDate() : "0" + d.getDate()
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
  await loadOrderSummary(OrderNo);
  // set statte menu to store
  useStateMenu().setStateMenu(4)
  router.push("/order/compulsory/payment");

  isLoading.value = false;
};

const setStoretoStep = async (data: OrderResponse, orderNo: string) => {
  if (data && data.Order) {
    const order = data.Order;

    const req: PlaceOrderRequest = {
      OrderNo: orderNo,
      Package: order.Package,
      CarDetailsExtension: order.CarDetailsExtension,
      Customer: order.Customer,
      DeliveryMethod1: order.DeliveryMethod1,
      DeliveryMethod2: order.DeliveryMethod2,
      IsTaxInvoice: order.IsTaxInvoice,
    };
    console.log(req);
    if (req.Customer && req.Customer.DefaultAddress) {
      req.Customer.DefaultAddress.ZipCode = orderDetail.value?.AssuredDetails.ZipCode;
    }
    if (req.Customer && req.Customer.DeliveryAddress) {
      req.Customer.DeliveryAddress.ZipCode =
        orderDetail.value?.DeliveryPolicyDetails.ZipCode;
    }
    if (req.Customer && req.Customer.TaxInvoiceAddress) {
      req.Customer.TaxInvoiceAddress.ZipCode =
        orderDetail.value?.TaxInvoiceDetails.ZipCode;
    }
    if (req.Customer && req.Customer.TaxInvoiceDeliveryAddress) {
      req.Customer.TaxInvoiceDeliveryAddress.ZipCode =
        orderDetail.value?.DeliveryTaxInvoiceDetails.ZipCode;
    }
    placeorder.setOrder(req);

    const reqInfo: IInformation = {
      CarBrand: order.Package.CarBrandID,
      CarCC: orderDetail.value?.CarDetails.CarCC.toFixed(0) ?? "",
      CarDetail: getCarDetail(),
      CarModel: order.Package.CarModelID,
      CarSize: order.Package.CarCategoryID,
      CarType: order.Package.CarTypeCode,
      CarUse: order.Package.UseCarCode,
      CarYear: order.CarDetails.CarSalesYear.toFixed(0),
      customSubCarModel: "",
      EffectiveDate: order.Package.EffectiveDate,
      EffectiveType: order.Package.EffectiveType,
      ExpireDate: order.Package.ExpireDate,
      SubCarModel: order.Package.CarModelID,
      InsuranceDay: getDayOfYear(order.Package.EffectiveDate, order.Package.ExpireDate),
    };
    infomation.setInformation(reqInfo);

    const store = useStorePackageList();
    const request: IPackageRequest = {
      AgentCode: AuthenInfo.value.userName,
      CarBrandID: reqInfo.CarBrand,
      CarCategoryID: reqInfo.CarSize,
      CarModelID: reqInfo.CarModel,
      CarSalesYear: reqInfo.CarYear,
      CarTypeCode: reqInfo.CarType,
      EffectiveDate: EffectiveDate,
      EffectiveType: reqInfo.EffectiveType,
      ExpireDate: ExpireDate,
      SubCarModelID: reqInfo.SubCarModel.split("|")[0],
      UseCarCode: reqInfo.CarUse,
      Paging: paging.value,
    };
    const packageList = await store.getPackageList(request);
    const packageSelect = packageList.Data?.find(
      (o) => o.CompanyCode == order.Package.CompanyCode
    ) as IPackageResponse;
    packageSelect.Price = order.InsureDetails.Total;
    packageSelect.PackageResult[0].PriceACT = order.InsureDetails.Total;
    packageSelect.PackageResult[0].AgentComDiscount = order.InsureDetails.ComValue;
    // if (order.InsureDetails.PriceACTDiscount)
    //   packageSelect.PackageResult[0].PriceACTDiscount =
    //     order.InsureDetails.PriceACTDiscount;
    storePackage.setPackage(packageSelect);
  }
};

// const loadOrderDetail = async (orderNo: string) => {
//   const req: OrderDetailRequest = {
//     OrderNo: orderNo,
//   };
//   const response = await useRepository().order.details(req);
//   if (response.apiResponse.Status && response.apiResponse.Status == "200") {
//     if (response.apiResponse.Data && response.apiResponse.Data.length > 0) {
//       orderDetail.value = response.apiResponse.Data[0].OrderDetails;
//       paymentDetail.value = response.apiResponse.Data[0].PaymentDetails;
//       optionDetail.value = response.apiResponse.Options as OptionsResponse;
//     } else {
//       // data not found
//     }
//   } else {
//   }
// };

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
      await setStoretoStep(data, orderNo);
    }
  }
};

const getDayOfYear = (EffectiveDate: string, ExpireDate: string): number => {
  let days = 0;

  const startDate = new Date(EffectiveDate);
  const endDate = new Date(ExpireDate);
  const diff = Math.abs(startDate.getTime() - endDate.getTime());
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
  days = diffDays - 1;

  return days;
};

const getCarDetail = (): string => {
  let carDetail = "";
  if (orderDetail.value) {
    carDetail = `${orderDetail.value.CarDetails.CarBrand} ${orderDetail.value.CarDetails.CarModel} ${orderDetail.value.CarDetails.SubCarModel}  ${orderDetail.value.CarDetails.CarYear}`;
  }
  return carDetail;
};

const pay = async (OrderNo: string) => {
  //ชำระเงิน
  // set statte menu to store
  useStateMenu().setStateMenu(5)
  router.push(`/order/compulsory/summary?OrderNo=${OrderNo}`);
};

const trackStatus = async (OrderNo: string) => {
  //ติดตามสถานะ
  alert("trackStatus " + OrderNo);
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
      console.log("statusGroup.value", statusGroup.value);
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

  console.log("handleChangeStatus filterOption", filterOption.value);
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

  console.log("datatable", table.value);
}

const continute = () => {
  alert("ทำรายการต่อ");
  console.log("ทำรายการต่อ");
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
