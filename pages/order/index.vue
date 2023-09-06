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

        <div class="card">
          <div class="card-body card-table">
            <DataTable
              id="datatables"
              class="table table-transaction nowrap"
              data-order='[[ 2, "asc" ]]'
              :options="datatableOptions"
              ref="table"
            >
              <thead>
                <tr>
                  <th data-orderable="false"></th>
                  <th data-orderable="false"></th>
                  <th>เลขที่คำสั่งซื้อ</th>
                  <th data-orderable="false">รายการ</th>
                  <th>จำนวนเงิน (บาท)</th>
                  <th data-orderable="false">ผู้เอาประกัน</th>
                  <th>สถานะ</th>
                  <th class="meta-head" data-orderable="false">รูปแบบการทำรายการ</th>
                </tr>
              </thead>
            </DataTable>
          </div>
        </div>
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
} from "~/shared/entities/order-entity";

import { storeToRefs } from "pinia";
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
// Define import
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import OrderHistoryGridMenu from "~/components/order/history/grid/menu.vue";
import OrderHistoryGridColumn from "~/components/order/history/grid/column.vue";
import { renderToString } from "@vue/server-renderer";
import { Filter } from "~/shared/entities/table-option";

// Define Variables
// Loading state after form submiting
const table = ref();
let dt;
const isLoading = ref(false);
let values = reactive({});
const router = useRouter();

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

const showModalStaff = ref(false);

const onLoad = onMounted(async () => {
  dt = table.value;
  console.log(dt);
  if (AuthenInfo.value) {
    await loadHistoryStatus();

    const menuEdit = document.querySelector('.icon-edit')
    menuEdit.addEventListener('click',async () => {
      // await onTest(menuEdit.dataset.id)
      await resume(menuEdit.dataset.id)
    })

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

  } else {
    router.push("/login");
  }
});

// const onTest = async (OrderNo: string) => {
//   //ชำระเงิน
//   alert('Test : ' + OrderNo)
// }

const resume = async (OrderNo: string) => {
  //ทำรายการต่อ
  isLoading.value = true;
  let req: OrderDetailRequest = {
    OrderNo: OrderNo,
  };
  let order: PlaceOrderRequest = {};
  var getData = await useRepository().order.summary(req);
  if (
    getData.apiResponse.Status &&
    getData.apiResponse.Status == "200" &&
    getData.apiResponse.Data &&
    getData.apiResponse.Data.length > 0
  ) {
    if (
      order.Customer &&
      order.Customer.LegalPersonProfile &&
      getData.apiResponse.Data[0].Order
    ) {
      order.Customer.LegalPersonProfile.CustomerID =
        getData.apiResponse.Data[0].Order.Customer.LegalPersonProfile.CustomerID;
    }
    if (
      order.Customer &&
      order.Customer.PersonProfile &&
      getData.apiResponse.Data[0].Order
    ) {
      order.Customer.PersonProfile.CustomerID =
        getData.apiResponse.Data[0].Order.Customer.PersonProfile.CustomerID;
    }
    if (
      order.Customer &&
      order.Customer.DefaultAddress &&
      getData.apiResponse.Data[0].Order
    ) {
      order.Customer.DefaultAddress.AddressID =
        getData.apiResponse.Data[0].Order.Customer.DefaultAddress.AddressID;
    }
    if (
      order.Customer &&
      order.Customer.DeliveryAddress &&
      getData.apiResponse.Data[0].Order &&
      getData.apiResponse.Data[0].Order.Customer.DeliveryAddress
    ) {
      order.Customer.DeliveryAddress.AddressID =
        getData.apiResponse.Data[0].Order.Customer.DeliveryAddress.AddressID;
    }
    if (
      order.Customer &&
      order.Customer.TaxInvoiceAddress &&
      getData.apiResponse.Data[0].Order &&
      getData.apiResponse.Data[0].Order.Customer.TaxInvoiceAddress
    ) {
      order.Customer.TaxInvoiceAddress.AddressID =
        getData.apiResponse.Data[0].Order.Customer.TaxInvoiceAddress.AddressID;
    }
    if (
      order.Customer &&
      order.Customer.TaxInvoiceDeliveryAddress &&
      getData.apiResponse.Data[0].Order &&
      getData.apiResponse.Data[0].Order.Customer.TaxInvoiceDeliveryAddress
    ) {
      order.Customer.TaxInvoiceDeliveryAddress.AddressID =
        getData.apiResponse.Data[0].Order.Customer.TaxInvoiceDeliveryAddress.AddressID;
    }

    storeOrder.setOrder(order);
  }
  router.push("/order/compulsory/payment");
  isLoading.value = false;
}

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

  console.log(table.value);
  table.value.dt.draw();
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
// DataTable

table.value = DataTable.use(DataTablesCore);
// Column options in datatable
const columns = [
  {
    targets: 0,
    data: "OrderNo",
    title: "",
    // render:async function (data, type,row) {
    //   console.log('type=',type)
    //   if (type === "display") {
    //     console.log(row)
    //     const html = await renderToString(h(OrderHistorySearch))
    //     console.log(html)
    //     return html
    //   }

    //   return data;
    // },
  },
  { data: "OrderNo", title: "", targets: 1 },
  { data: "OrderNo", title: "เลขที่คำสั่งซื้อ", targets: 2, className: "order" },
  { data: "OrderGroupType", title: "ผลิตภัณฑ์", targets: 3, className: "subject" },
  { data: "GrandAmount", title: "จำนวนเงิน (บาท)", targets: 4, className: "amount" },
  { data: "FirstName", title: "ผู้เอาประกัน", targets: 5, className: "name" },
  { data: "FirstName", title: "สถานะ", targets: 6, className: "status" },
  { data: "CreateType", title: "รูปแบบการทำรายการ", targets: 7 },

  // { data: 'office', title: 'Office' },
  // { data: 'extn', title: 'Extension' },
  // { data: 'start_date', title: 'Start date' },
  // { data: 'salary', title: 'Salary' },
];

// DataTable ajax options
const token = await useUtility().getToken();
const datatableAjax = {
  url: "/api/grid",
  method: "post",
  data: (d: any) => {
    return {
      ...d,
      URL: "/Order/grid/history/list",
      Token: token,
      Filter: filterOptionTable.value, //filterOption.value,
    };
  },
};
// DataTable options
const datatableOptions = {
  columnDefs: columns,

  processing: true,
  serverSide: true,
  ajax: datatableAjax,
  filter: false,
  //searchCols: [{}, {}, { search: "My filter" }, { search: "^[0-9]", regex: true }],
  language: {
    paginate: {
      previous: "ก่อนหน้า",
      next: "ถัดไป",
    },
    info: "แสดง _START_ ถึง _END_ จาก _TOTAL_ รายการ",
    infoEmpty: "ไม่มีรายการ",
    infoFiltered: "(จากทั้งหมด _MAX_ รายการ)",
    lengthMenu: "แสดง _MENU_ รายการ",
    search: "ค้นหา",
    emptyTable: "ไม่มีรายการ",
    zeroRecords: "ไม่มีรายการ",
  },
  initComplete: function (settings, json) {},
  createdRow: async function (row: any, data: any) {
    console.log("createdRow [data]=", data);
    const menu = await renderToString(h(OrderHistoryGridMenu, { row: data }));
    const has_child = await renderToString(
      h(OrderHistoryGridColumn, {
        row: data,
        field: "has-child",
        click:continute
      })
    ); 
    const order = await renderToString(
      h(OrderHistoryGridColumn, {
        row: data,
        field: "order",
      })
    );
    const subject = await renderToString(
      h(OrderHistoryGridColumn, {
        row: data,
        field: "subject",
      })
    );
    const amount = await renderToString(
      h(OrderHistoryGridColumn, {
        row: data,
        field: "amount",
      })
    );
    const name = await renderToString(
      h(OrderHistoryGridColumn, {
        row: data,
        field: "name",
      })
    );
    const status = await renderToString(
      h(OrderHistoryGridColumn, {
        row: data,
        field: "status",
      })
    );
    const meta = await renderToString(
      h(OrderHistoryGridColumn, {
        row: data,
        field: "meta",
      })
    );

    var tds = row.getElementsByTagName("td");
    var TdId1 = tds[0];
    var TdId2 = tds[1]; // has-child
    var TdId3 = tds[2]; // order
    var TdId4 = tds[3]; // subject
    var TdId5 = tds[4]; // amount
    var TdId6 = tds[5]; // name
    var TdId7 = tds[6]; // status
    var TdId8 = tds[7]; // meta
    TdId1.innerHTML = menu;
    TdId2.innerHTML = data.OrderGroupNo != "" ? has_child : "";
    //TdId2.innerHTML = "";
    TdId3.innerHTML = order;
    TdId4.innerHTML = subject;
    TdId5.innerHTML = amount;
    TdId6.innerHTML = name;
    TdId7.innerHTML = status;
    TdId8.innerHTML = meta;

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  },
};
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
