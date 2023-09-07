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
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import { Filter } from "~/shared/entities/table-option";
import { IInformation } from "~/shared/entities/information-entity";


// Define Variables
// Loading state after form submiting

const isLoading = ref(false);
const table = ref();
let values = reactive({});
const router = useRouter();

const orderDetail: globalThis.Ref<OrderDetails | undefined> = ref();
const paymentDetail: globalThis.Ref<PaymentDetails | undefined> = ref();
const optionDetail: globalThis.Ref<OptionsResponse | undefined> = ref();

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

const infomation = useStoreInformation();
const placeorder = useStorePlaceorder();
const storeSummary = useStoreOrderSummary();

const showModalStaff = ref(false);

const onLoad = onMounted(async () => {
  
  if (AuthenInfo.value) {
    await loadHistoryStatus()
    await triggerEvent()
  } else {
    router.push("/login");
  }
});

const triggerEvent = async () => {
  const menuEdit = document.querySelector('.icon-edit')
  if(menuEdit){
    menuEdit.addEventListener('click',async () => {
      await resume(menuEdit.dataset.id)
    })
  }
 
  const menuPayment = document.querySelector('.icon-payment')
  menuPayment.addEventListener('click',async () => {
    await pay(menuPayment.dataset.id)
  })

  const menuTracking = document.querySelector('.icon-tracking')
  menuTracking.addEventListener('click',async () => {
    await trackStatus(menuTracking.dataset.id)
  })

  const menuPolicy = document.querySelector('.icon-policy')
  menuPolicy.addEventListener('click',async () => {
    await policyDetail(menuPolicy.dataset.id)
  })

  const menuDownload = document.querySelector('.icon-policy')
  menuDownload.addEventListener('click',async () => {
    await download(menuDownload.dataset.PolicyURL)
  })

  const menuStaff = document.querySelector('.icon-help')
  menuStaff.addEventListener('click',async () => {
    await contactStaff(true)
  })

  const menuDelete = document.querySelector('.icon-trash')
  menuDelete.addEventListener('click',async () => {
    await deleteDraft(menuDelete.dataset.id)
  })
};

const resume = async (OrderNo: string) => {
  //ทำรายการต่อ
  isLoading.value = true;

  await loadOrderDetail(OrderNo); 
  await loadOrderSummary(OrderNo);
  router.push("/order/compulsory/payment");

  isLoading.value = false;
}

const setStoretoStep = (data: OrderResponse, orderNo: string) => {
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
  }
};

const loadOrderDetail = async (orderNo: string) => {
  const req: OrderDetailRequest = {
    OrderNo: orderNo,
  };

  const response = await useRepository().order.details(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data && response.apiResponse.Data.length > 0) {
      orderDetail.value = response.apiResponse.Data[0].OrderDetails;
      paymentDetail.value = response.apiResponse.Data[0].PaymentDetails;
      optionDetail.value = response.apiResponse.Options as OptionsResponse;
    } else {
      // data not found
    }
  } else {
  }
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
      setStoretoStep(data, orderNo);
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
  router.push(`/order/compulsory/summary?OrderNo=${OrderNo}`);
}

const trackStatus = async (OrderNo: string) => {
  //ติดตามสถานะ
  alert("trackStatus " + OrderNo);
}

const policyDetail = async (OrderNo: string) => {
  //รายละเอียดกรมธรรม์
  alert("policyDetail : " + OrderNo);
}

const download = async (url: string) => {
  //ดาวโหลดกรมธรรม์
  if(url != '') window.open(url, "_blank");
}

const contactStaff = async () => {
  //ติดต่อเจ้าหน้าที่
  showModalStaff.value = false;
  showModalStaff.value = true;
}

const deleteDraft = async (OrderNo: string) => {
  //ลบแบบร่างนี้
  isLoading.value = true;
  let req: OrderDetailRequest = {
    OrderNo: OrderNo,
  };
  var response = await useRepository().order.delete(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      await onSearch()
    }
  }
  isLoading.value = false;
}

const handleCloasModal = async (refresh: Boolean) => {
  showModalStaff.value = false;
}

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
  await triggerEvent()
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
