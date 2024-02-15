
<template>
  <div class="card">
    <div class="card-body card-table">
      <DataTable id="datatables" class="table table-transaction nowrap" data-order='[[ 1, "desc" ]]'
        :options="datatableOptions" ref="table">
        <!--data-page-length='2' //inside <DataTable>-->
        <thead>
          <tr>
            <th data-orderable="false"></th>
            <th>เลขที่ทำรายการ</th>
            <th data-orderable="false">รหัสนายหน้า</th>
            <th data-orderable="false">ช่องทางการรับกระดาษ</th>
            <th>จำนวนเงิน (บาท)</th>
            <th>สถานะ</th>
          </tr>
        </thead>
      </DataTable>
      <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
    </div>
  </div>
</template>
<script lang="ts" setup>
// Define import
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import PapersHistoryGridActions from "~/components/papers/history/grid/Actions.vue";
import PapersHistoryGridColumn from "~/components/papers/history/grid/Column.vue";
import { renderToString } from "@vue/server-renderer";
import type { Filter } from "~/shared/entities/table-option";
//import { SubHistoryRequest } from "~/shared/entities/order-entity";

const props = defineProps({
  filters: {
    type: Array<Filter>,
    default: Array<Filter>,
  },
});

const emit = defineEmits(["changeTable", "cancelOrder", "onTracking"])
const table = ref();
let dt;
const isLoading = ref(false)
const onLoad = onMounted(async () => {
  dt = table.value;
  // console.log(dt);
  emit('changeTable', table.value)

});
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
  { data: "OrderNo", title: "เลขที่ทำรายการ", targets: 1, className: "order" },
  { data: "AgentCode", title: "รหัสนายหน้า", targets: 2, className: "agent" },
  { data: "DeliveryChannelType", title: "ช่องทางการรับกระดาษ", targets: 3, className: "delivery" },
  { data: "TotalPrice", title: "จำนวนเงิน (บาท)", targets: 4, className: "amount" },
  { data: "OrderStatus", title: "สถานะ", targets: 5, className: "status" },
  //{ data: "CreateType", title: "รูปแบบการทำรายการ", targets: 7 },

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
    isLoading.value = true
    return {
      ...d,
      URL: "/Paper/grid/order/list",
      Token: token,
      Filter: props.filters, //filterOption.value,
    };
  },
  dataSrc: function (json: { data: any; }) {
    //Make your callback here.
    isLoading.value = false
    return json.data;
  }
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
  // initComplete: function (settings, json) {

  // },
  createdRow: async function (row: any, data: any) {
    // console.log("createdRow [data]=", data);
    const menu = await renderToString(
      h(PapersHistoryGridActions, {
        row: data
      })
    );
    // const has_child = await renderToString(

    //   h(OrderHistoryGridColumn, {
    //     row: data,
    //     field: "has-child",
    //     //click: continute,
    //   })
    // );
    const order = await renderToString(
      h(PapersHistoryGridColumn, {
        row: data,
        field: "order",
      })
    );
    const agent = await renderToString(
      h(PapersHistoryGridColumn, {
        row: data,
        field: "agent",
      })
    );
    const delivery = await renderToString(
      h(PapersHistoryGridColumn, {
        row: data,
        field: "delivery",
      })
    );
    const amount = await renderToString(
      h(PapersHistoryGridColumn, {
        row: data,
        field: "amount",
      })
    );
    const status = await renderToString(
      h(PapersHistoryGridColumn, {
        row: data,
        field: "status",
      })
    );

    var tds = row.getElementsByTagName("td");
    var TdId1 = tds[0]; // menu
    var TdId2 = tds[1]; // order
    var TdId3 = tds[2]; // agen
    var TdId4 = tds[3]; // delivery
    var TdId5 = tds[4]; // amount
    var TdId6 = tds[5]; // status
    TdId1.innerHTML = menu;
    TdId2.innerHTML = order;
    TdId3.innerHTML = agent;
    TdId4.innerHTML = delivery;
    TdId5.innerHTML = amount;
    TdId6.innerHTML = status;

    if (data.OrderStatus == 'Prepare') {
      // Using nextTick to ensure the DOM has been updated
      nextTick(() => {
        console.log("nexttrick")
        const statusCancel = TdId6.querySelector('.event-cancel-paper');
        if (statusCancel) {
          statusCancel.addEventListener('click', async () => {
            emit('cancelOrder', statusCancel.dataset.id);
          });
        }
      });
    }

  },

};

watch(() => props.filters, () => {
  console.log('filter in table ', props.filters)
  table.value.dt.draw();
})
</script>
  