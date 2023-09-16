<template>
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
      <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
    </div>
  </div>
</template>
<script lang="ts" setup>

// Define import
import DataTable from "datatables.net-vue3";
import DataTablesCore from "datatables.net-bs5";
import OrderHistoryGridMenu from "~/components/order/history/grid/menu.vue";
import OrderHistoryGridColumn from "~/components/order/history/grid/column.vue";
import OrderHistoryGridSub from "~/components/order/history/grid/sub.vue";
import { renderToString } from "@vue/server-renderer";
import { Filter } from "~/shared/entities/table-option";
import { SubHistoryRequest } from "~/shared/entities/order-entity";

const props = defineProps({
    filters: {
    type: Array<Filter>,
    default: Array<Filter>,
  },
});

const emit = defineEmits(["changeTable", "onResume", "onPay", "onTracking", "onPolicy", "onDownload", "onHelp", "onDelete"])
const table = ref();
let dt;
const isLoading = ref(false)
const onLoad = onMounted(async () => {
  dt = table.value;
  console.log(dt);
  emit('changeTable',table.value)

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
    isLoading.value = true
    return {
      ...d,
      URL: "/Order/grid/history/list",
      Token: token,
      Filter: props.filters, //filterOption.value,
    };
  },
  dataSrc: function ( json ) {
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
    //console.log("createdRow [data]=", data);
    const menu = await renderToString(h(OrderHistoryGridMenu, { row: data }));
    // const has_child = await renderToString(
    //   h(OrderHistoryGridColumn, {
    //     row: data,
    //     field: "has-child",
    //     //click: continute,
    //   })
    // );
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
    //TdId2.innerHTML = data.OrderGroupNo != "" ? has_child : "";
    TdId2.className = data.OrderGroupNo != "" ? "has-child" : "";
    //TdId2.className="has-child"
    TdId2.innerHTML = "";
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

    if(data.Status == 'Draft') {
      const menuEdit = TdId1.querySelector('.icon-edit');
      menuEdit.addEventListener('click', async () => {
        emit('onResume', menuEdit.dataset.id)
      })

      const menuDelete = TdId1.querySelector('.icon-trash')
      menuDelete.addEventListener('click',async () => {
        emit('onDelete', menuDelete.dataset.id)
      })
    }
    if(data.Status == 'Pending') {
      const menuPayment = TdId1.querySelector('.icon-payment');
      menuPayment.addEventListener('click', async () => {
        emit('onPay', menuPayment.dataset.id)
      })
    }
    if(data.Status == 'Delivery' || data.Status == 'Process') {
      const menuTracking = TdId1.querySelector('.icon-tracking')
      menuTracking.addEventListener('click',async () => {
        emit('onTracking', menuTracking.dataset.id)
      })
    }
    if(data.Status == 'Success') {
      const menuPolicy = TdId1.querySelector('.icon-policy')
      menuPolicy.addEventListener('click',async () => {
        emit('onPolicy', menuPolicy.dataset.id)
      })

      const menuDownload = TdId1.querySelector('.icon-download-file')
      menuDownload.addEventListener('click',async () => {
        emit('onDownload', menuDownload.dataset.url)
      })
    }
    if(data.Status == 'Cancel' && data.IsCancel && data.IsCancelComplete) {
      const menuTracking = TdId1.querySelector('.icon-tracking')
      menuTracking.addEventListener('click', async () => {
        emit('onTracking', menuTracking.dataset.id)
      })

      const menuStaff = TdId1.querySelector('.icon-help')
      menuStaff.addEventListener('click', async () => {
        emit('onHelp')
      })
    }

    // TdId1.addEventListener('click', async function() {
    //   // Get the parent tr element
    //   var tr = this.parentNode
    //   // console.log(tr)
    //   // const menuEdit = tr.querySelector('.icon-edit')
    //   // menuEdit.addEventListener('click',async () => {
    //   //   console.log('menuEdit', menuEdit.dataset.id)
    //   // })

    //   // const menuPayment = tr.querySelector('.icon-payment');
    //   // menuPayment.addEventListener('click',async () => {
    //   //   console.log('menuPayment', menuPayment.dataset.id)
    //   // })
    // })

    TdId2.addEventListener('click',async function() {
        if(data.OrderGroupNo!='')
        {
            const req: SubHistoryRequest = {
            OrderGroupNo:data.OrderGroupNo
        }

            // Get the parent tr element
            var tr = this.parentNode

            // Toggle the class "is-open" on the parent tr element
            tr.classList.toggle('is-open')
            // Check if the class "is-open" is present after toggling
            if (tr.classList.contains('is-open')) {
                const subdata = await useRepository().order.getSubHistoryList(req)

                let sub_group = await renderToString(
                    h(OrderHistoryGridSub, {
                        row: subdata.apiResponse.Data,
                    })
                    );
                console.log(sub_group)
                // Create the HTML content for the new tr element
                //var newTrHtml = '<tr><td colspan="8" style="background-color: #faefce"><strong>New HTML Here</strong></td></tr>'
                var newTrHtml = sub_group;
                // Insert the new tr element after the current tr
                tr.insertAdjacentHTML('afterend', newTrHtml)
            } else {
              const sub_group = document.querySelectorAll(`tr[group-data="${data.OrderGroupNo}"]`);
                console.log(sub_group)
                sub_group.forEach(function(value,key){
                  tr.parentNode.removeChild(value)
                })
                // // Check if the next sibling is a tr element
                // if (tr.nextSibling.tagName === 'TR') {
                //     // Remove the next sibling tr element
                //     tr.parentNode.removeChild(tr.nextSibling)
                // }
            }
        }

        })
  },
};



watch(()=>props.filters,()=>{
console.log('filter in table ',props.filters)
table.value.dt.draw();
})
</script>
