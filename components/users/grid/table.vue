<template>
  <div class="card">
    <div class="card-body card-table">
      <DataTable
        id="datatables"
        class="table table-transaction nowrap"
        data-order='[[ 2, "desc" ]]'
        :options="datatableOptions"
        ref="table"
      >
        <thead>
          <tr>
            <th data-orderable="false"></th>
            <th>วันที่สร้าง</th>
            <th>ชื่อผู้ใช้งาน</th>
            <th>ชื่อผู้ช่วย</th>
            <th>สาขา</th>
            <th class="limit">วงเงินต่อวัน (บาท)</th>
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
import UsersGridMenu from "~/components/users/grid/menu.vue";
import UsersGridColumn from "~/components/users/grid/column.vue";
import { renderToString } from "@vue/server-renderer";
import { Filter } from "~/shared/entities/table-option";

const props = defineProps({
    filters: {
    type: Array<Filter>,
    default: Array<Filter>,
  },
});

const emit = defineEmits(["changeTable", "onDelete", "onProfile"])
const table = ref();
let dt;
const isLoading = ref(false)
const onLoad = onMounted(async () => {
  console.log("Table onmound")
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
    data: "CreateDate",
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
    { data: "CreateDate", title: "วันที่สร้าง", targets: 1, className: "createdate" },
    { data: "UserName", title: "ชื่อผู้ใช้งาน", targets: 2, className: "username" },
    { data: "FirstName", title: "ชื่อผู้ช่วย", targets: 3, className: "firstname" },
    { data: "UserGroupName", title: "สาขา", targets: 4, className: "usergroupname" },
    { data: "CreditLimitAmount", title: "วงเงินต่อวัน (บาท)", targets: 5, className: "creditlimitamount" },
    { data: "IsActive", title: "สถานะ", targets: 6, className: "isactive" },

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
    isLoading.value = true;
    return {
      ...d,
      URL: "/UserLevel/grid/full/list",
      Token: token,
      Filter: props.filters,
      order: [{ column: 2, dir: "desc" }], // Assuming "createdate" is the 6th column (0-indexed)
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
    const menu = await renderToString(h(UsersGridMenu, { row: data }));
    // const has_child = await renderToString(
    //   h(OrderHistoryGridColumn, {
    //     row: data,
    //     field: "has-child",
    //     //click: continute,
    //   })
    // );
    const createdate = await renderToString(
      h(UsersGridColumn, {
        row: data,
        field: "createdate",
      })
    );
    const username = await renderToString(
      h(UsersGridColumn, {
        row: data,
        field: "username",
      })
    );
    const firstname = await renderToString(
      h(UsersGridColumn, {
        row: data,
        field: "firstname",
      })
    );
    const usergroupname = await renderToString(
      h(UsersGridColumn, {
        row: data,
        field: "usergroupname",
      })
    );
    const creditlimitamount = await renderToString(
      h(UsersGridColumn, {
        row: data,
        field: "creditlimitamount",
      })
    );
    const isactive = await renderToString(
      h(UsersGridColumn, {
        row: data,
        field: "isactive",
      })
    );

    var tds = row.getElementsByTagName("td");
    var TdId1 = tds[0];
    var TdId2 = tds[1]; // createdate
    var TdId3 = tds[2]; // username
    var TdId4 = tds[3]; // firstname
    var TdId5 = tds[4]; // usergroupname
    var TdId6 = tds[5]; // creditlimitamount
    var TdId7 = tds[6]; // isactive
    TdId1.innerHTML = menu;
    TdId2.innerHTML = createdate;
    TdId3.innerHTML = username;
    TdId4.innerHTML = firstname;
    TdId5.innerHTML = usergroupname;
    TdId6.innerHTML = creditlimitamount;
    TdId7.innerHTML = isactive;

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList = [...tooltipTriggerList].map(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
    /*
      const userProfile = document.getElementById('getProfile');
      userProfile?.addEventListener('click', async () => {
        emit('onProfile', userProfile.dataset.id);
      });
      let isUserProfileClickHandled = false;
      const menuProfile = document.getElementById('profile');
      menuProfile?.addEventListener('click', async () => {
        if (!isUserProfileClickHandled) {
          isUserProfileClickHandled = true;
          emit('onProfile', menuProfile.dataset.id);
        }
      });
      */
     //Emit onProfile got bug when we use id to control it.
      const menuProfile = TdId1.querySelector('.emit-profile');
      menuProfile?.addEventListener('click', async () => {
        emit('onProfile', menuProfile.dataset.id)
      })

    if(data.IsActive == false) {
      const menuDelete = TdId1.querySelector('.emit-trash');
      menuDelete?.addEventListener('click', async () => {
        emit('onDelete', menuDelete.dataset.id)
      })
    }
  },
};

watch(()=>props.filters,()=>{
  console.log('filter in table ',props.filters)
  table.value.dt.draw();
})
</script>