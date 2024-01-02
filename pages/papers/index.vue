<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">
        <div class="row">
            <div class="col">
                <!-- 
                <div id="transaction-stats-admin" class="card-stat-stack">

                    <div class="card-stat is-active">
                        <a href="#" title="รอดำเนินการ">
                            <div class="stat-wrapper">
                                <div class="stat-header">
                                    <h5 class="topic">รอดำเนินการ</h5>
                                    <span class="value">521</span>
                                </div>
                                <div class="stat-action">
                                    <figure class="figure">
                                        <i class="fa-duotone fa-hourglass-clock fa-swap-opacity"></i>
                                    </figure>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="card-stat">
                        <a href="#" title="จัดส่งแล้ว">
                            <div class="stat-wrapper">
                                <div class="stat-header">
                                    <h5 class="topic">จัดส่งแล้ว</h5>
                                    <span class="value">87</span>
                                </div>
                                <div class="stat-action">
                                    <figure class="figure">
                                        <i class="fa-duotone fa-truck-arrow-right"></i>
                                    </figure>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="card-stat is-success">
                        <a href="#" title="สำเร็จ">
                            <div class="stat-wrapper">
                                <div class="stat-header">
                                    <h5 class="topic">สำเร็จ</h5>
                                    <span class="value">128,439</span>
                                </div>
                                <div class="stat-action">
                                    <figure class="figure">
                                        <i class="fa-solid fa-check fa-lg"></i>
                                    </figure>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="card-stat is-danger">
                        <a href="#" title="ยกเลิกรายการ">
                            <div class="stat-wrapper">
                                <div class="stat-header">
                                    <h5 class="topic">ยกเลิกรายการ</h5>
                                    <span class="value">45</span>
                                </div>
                                <div class="stat-action">
                                    <figure class="figure">
                                        <i class="fa-solid fa-xmark-large"></i>
                                    </figure>
                                </div>
                            </div>
                        </a>
                    </div>

                </div> -->
                <PapersHistorySearch v-if="statusGroup" @search-history="handleSearch"></PapersHistorySearch>

                <PapersHistoryStatus v-if="statusGroup" @change-status="handleChangeStatus" :status-group="statusGroup"
                    :status-search="statusSearch"></PapersHistoryStatus>

                <div id="transaction-stats" class="card-stat-stack">
                    <OrderHistoryCardsPledge v-if="loadPBalance" :paper-balance="loadPBalance" />
                    <OrderHistoryCardsPaperUsage v-if="loadPBalance" :paper-balance="loadPBalance" />
                </div>

                <PapersHistoryGridTable :filters="filterGridTable" v-if="filterGridTable.length > 0"
                    @change-table="handlerChangeTable" @cancel-order="handleDelete">
                </PapersHistoryGridTable>

                <!-- 
                <div class="card">
                    <div class="card-body card-table">

                        <table id="datatables" class="table table-transaction nowrap" data-order='[[ 1, "asc" ]]'>
                            <thead>
                                <tr>
                                    <th data-orderable="false"></th>
                                    <th>เลขที่ทำรายการ</th>
                                    <th>รหัสนายหน้า</th>
                                    <th>ช่องทางการรับกระดาษ</th>
                                    <th class="amount">ราคามัดจำ (บาท)</th>
                                    <th>สถานะ</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        <NuxtLink class="btn btn-actions" to="/papers/status" title="ดูรายละเอียด">
                                            <i class="fa-regular fa-eye"></i>
                                        </Nuxtlink>
                                    </td>
                                    <td class="order">#7WP309765724<time datetime="2023-05-05 08:08">2023-05-05 08:08</time>
                                    </td>
                                    <td class="agentcode">AM00125633</td>
                                    <td class="subject">จัดส่ง DHL</td>
                                    <td class="amount">2,000</td>
                                    <td class="status">
                                        <div class="badge-dot badge-warning">รอดำเนินการ</div><span><a class="cancel"
                                                href="#" title="ยกเลิก">ยกเลิก</a></span>
                                        <div class="badge-dot badge-info">จัดส่งแล้ว</div>
                                        <div class="badge-dot badge-success">สำเร็จ
                                        </div>
                                        <div class="badge-dot badge-danger">ยกเลิกรายการ</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <NuxtLink class="btn btn-actions" to="/papers/status" title="ดูรายละเอียด">
                                            <i class="fa-regular fa-eye"></i>
                                        </Nuxtlink>
                                    </td>
                                    <td class="order">#7WP309765725<time datetime="2022-02-05 02:08">2022-02-05 02:08</time>
                                    </td>
                                    <td class="agentcode">AM00125633</td>
                                    <td class="subject">จัดส่ง DHL</td>
                                    <td class="amount">900</td>
                                    <td class="status">
                                        <div class="badge-dot badge-success">สำเร็จ</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <NuxtLink class="btn btn-actions" to="/papers/status" title="ดูรายละเอียด">
                                            <i class="fa-regular fa-eye"></i>
                                        </Nuxtlink>
                                    </td>
                                    <td class="order">#7WP309765726<time datetime="2022-11-11 10:10">2022-11-11 10:10</time>
                                    </td>
                                    <td class="agentcode">AM00167451</td>
                                    <td class="subject">จัดส่ง DHL</td>
                                    <td class="amount">1,500</td>
                                    <td class="status">
                                        <div class="badge-dot badge-danger">ยกเลิกรายการ</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <NuxtLink class="btn btn-actions" to="/papers/status" title="ดูรายละเอียด">
                                            <i class="fa-regular fa-eye"></i>
                                        </Nuxtlink>
                                    </td>
                                    <td class="order">#7WP309765750<time datetime="2023-03-15 03:08">2023-03-15 03:08</time>
                                    </td>
                                    <td class="agentcode">AM00845366</td>
                                    <td class="subject">สาขาพระรามเก้า</td>
                                    <td class="amount">10,000</td>
                                    <td class="status">
                                        <div class="badge-dot badge-warning">รอดำเนินการ</div><span><a class="cancel"
                                                href="#" title="ยกเลิก">ยกเลิก</a></span>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <NuxtLink class="btn btn-actions" to="/papers/status" title="ดูรายละเอียด">
                                            <i class="fa-regular fa-eye"></i>
                                        </Nuxtlink>
                                    </td>
                                    <td class="order">#7WP309765760<time datetime="2023-03-15 03:08">2023-03-15 03:08</time>
                                    </td>
                                    <td class="agentcode">AM00125633</td>
                                    <td class="subject">สาขาเชียงใหม่</td>
                                    <td class="amount">220,000</td>
                                    <td class="status">
                                        <div class="badge-dot badge-success">สำเร็จ</div>
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <NuxtLink class="btn btn-actions" to="/papers/status" title="ดูรายละเอียด">
                                            <i class="fa-regular fa-eye"></i>
                                        </Nuxtlink>
                                    </td>
                                    <td class="order">#7WP309765911<time datetime="2022-02-05 02:08">2022-02-05 02:08</time>
                                    </td>
                                    <td class="agentcode">AM00003421</td>
                                    <td class="subject">จัดส่ง DHL</td>
                                    <td class="amount">72,500</td>
                                    <td class="status">
                                        <div class="badge-dot badge-info">จัดส่งแล้ว</div>
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div> -->

            </div>
        </div>

        <ElementsDialogConfirm v-if="isDeleteConfirm" :modal-show="isDeleteConfirm" :modal-type="ModalType.Warning"
            :modal-title="'ยืนยันการลบรายการ'" :modal-text="textDeleteConfirm" @on-confirm-modal="onDeleteConfirm"
            @on-close-modal="onCloseConfirm"></ElementsDialogConfirm>

    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ModalType } from "~/shared/entities/enum-entity";
import {
    HistorySearch
} from "~/shared/entities/order-entity"
import {
    BalanceRes,
    RemarkListReq,
    RemarkListRes,
    StatusGroupResponse
} from "~/shared/entities/paper-entity";
import { Filter } from "~/shared/entities/table-option";
import { useStoreUserAuth } from "~/stores/user/storeUserAuth";
import { storeToRefs } from "pinia";

const isLoading = ref(false);
const table = ref();
var isDeleteConfirm = ref(false)
var textDeleteConfirm = ref('')
var textPaperCancelOrder = ref('')
const statusGroup: globalThis.Ref<StatusGroupResponse | undefined> = ref();
const filterOption: globalThis.Ref<Filter[]> = ref([]);
const filterGridTable: globalThis.Ref<Filter[]> = ref([
    { field: "OrderStatus", type: "MATCH", value: "Prepare" },
]);
const historySearch: globalThis.Ref<HistorySearch | undefined> = ref();
const loadPBalance: globalThis.Ref<BalanceRes | undefined> = ref();
const cancelRemarkList: globalThis.Ref<RemarkListRes[] | undefined> = ref([]);
var statusSearch = ref("");
const router = useRouter();
const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);

const onLoad = onMounted(async () => {

    if (AuthenInfo.value) {
        await loadHistoryStatus()
        await loadPaperBalance()
        // await triggerEvent()
    } else {
        router.push("/login");
    }
});

const loadPaperBalance = async () => {
    isLoading.value = true;
    const balanceRes = await useRepository().paper.getPaperBalance();
    if (balanceRes.apiResponse.Status && balanceRes.apiResponse.Status == "200") {
        if (balanceRes.apiResponse.Data) {
            loadPBalance.value = balanceRes.apiResponse.Data[0];
            console.log("loadPBalance.value", loadPBalance.value);
        }
    }

    isLoading.value = false;
};

const handleChangeStatus = async (status: string) => {
    // console.log('handleChangeStatus', status)
    filterGridTable.value = [];

    const filter = useMapData().getFilterSearchHistory("OrderStatus", status);
    if (filter.length > 0) {
        filterGridTable.value[0] = filter[0];
    }
    filterGridTable.value.forEach((value, index) => {
        filterGridTable.value = [...filterGridTable.value, value];
    });

    console.log("handleChangeStatus filterGridTable", filterOption.value);
};

const handleSearch = async (searchValue: HistorySearch) => {
    // console.log('handleSearch', searchValue)
    filterGridTable.value = [];
    statusSearch.value = "clear";
    historySearch.value = searchValue;
    // ค้นหาทั่วไป
    if (searchValue.SearchCategory) {
        const filter = useMapData().getFilterSearchHistory(
            searchValue.SearchCategory.value,
            searchValue.SearchText
        );
        if (filter.length > 0) {
            filterGridTable.value = [...filterGridTable.value, filter[0]];
        }
    }
    // ค้นหาขั้นสูงผลิตภัณฑ์
    if (searchValue.orderType) {
        const filter = useMapData().getFilterSearchHistory(
            searchValue.orderType.option ?? "",
            searchValue.orderType.value
        );
        if (filter.length > 0) {
            filterGridTable.value = [...filterGridTable.value, filter[0]];
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
            filterGridTable.value = [...filterGridTable.value, filterStart[0]];
        }
        const filterStop = useMapData().getFilterSearchHistory(
            "CreateDate",
            useUtility().formatDate(searchValue.ExpireDate, "YYYY-MM-DD"),
            "DATE_LTE"
        );
        if (filterStop.length > 0) {
            filterGridTable.value = [...filterGridTable.value, filterStop[0]];
        }
    }
    filterGridTable.value = filterGridTable.value;
    await loadHistoryStatus(filterGridTable.value);

    console.log("handleSearch filterOptionTable", filterGridTable.value);
}

const loadHistoryStatus = async (filter?: Filter[]) => {
    isLoading.value = true;
    var statusRes = await useRepository().paper.statusGroup(filter);
    if (statusRes.apiResponse.Status && statusRes.apiResponse.Status == "200") {
        if (statusRes.apiResponse.Data) {
            statusGroup.value = statusRes.apiResponse.Data;
            console.log("statusGroup.value", statusGroup.value);
        }
    }
    isLoading.value = false;
};

const handlerChangeTable = async (datatable: any) => {
    table.value = datatable;

    console.log("datatable", table.value);
}

const trackStatus = async (OrderNo: string) => {
    //ทำรายการต่อ
    isLoading.value = true;

    router.push("/papers/status/" + OrderNo);

    isLoading.value = false;
};

const handleDelete = async (OrderNo: string) => {
    isDeleteConfirm.value = true
    textDeleteConfirm.value = `คุณต้องการยกเลิกรายการหรือไม่ ?` + OrderNo
    textPaperCancelOrder.value = OrderNo
}

const onDeleteConfirm = async () => {
    isLoading.value = true;
    //ลบแบบร่างนี้
    let req: RemarkListReq = {
        Type: "PAPER_ORDER_USER",
    };
    var response = await useRepository().paper.remark(req);
    if (response.apiResponse.Status && response.apiResponse.Status == "200") {
        cancelRemarkList.value = response.apiResponse.Data;
        await loadHistoryStatus();
        //await handlePaperOrderDelete()
    } else {
        alert(response.apiResponse.ErrorMessage);
    }

    isLoading.value = false;
}

const onCloseConfirm = async () => {
    isDeleteConfirm.value = false
}

// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "ประวัติการแลกกระดาษ"
const pageCategory = "แลกกระดาษ"
const pageDescription = ""

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: "description", content: pageDescription }],
    bodyAttrs: {
        class: "page-papers single-history template-datatable"
    }
})
</script>