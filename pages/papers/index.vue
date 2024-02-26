<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">
        <div class="row">
            <div class="col">

                <PapersHistorySearch v-if="statusGroup" @search-history="handleSearch"></PapersHistorySearch>

                <PapersHistoryStatus v-if="statusGroup" @change-status="handleChangeStatus" :status-group="statusGroup"
                    :status-search="statusSearch"></PapersHistoryStatus>

                <div id="transaction-stats" class="card-stat-stack">
                    <OrderHistoryCardsPledge v-if="statusPaperbalance" :paper-balance="loadPBalance" />
                    <OrderHistoryCardsPaperUsage v-if="statusPaperbalance" :paper-balance="loadPBalance" />
                </div>

                <PapersHistoryGridTable :filters="filterGridTable" v-if="filterGridTable.length > 0"
                    @change-table="handlerChangeTable" @cancel-order="handleDelete">
                </PapersHistoryGridTable>

            </div>
        </div>

        <ElementsDialogConfirm v-if="isDeleteConfirm" :modal-show="isDeleteConfirm" :modal-type="ModalType.Warning"
            :modal-title="'ยืนยันการลบรายการ'" :modal-text="textDeleteConfirm" @on-confirm-modal="onDeleteConfirm"
            @on-close-modal="onCloseConfirm"></ElementsDialogConfirm>

    </NuxtLayout>
</template>

<script lang="ts" setup>
import { ModalType } from "~/shared/entities/enum-entity";
import type {
    HistorySearch
} from "~/shared/entities/order-entity"
import type {
    BalanceRes,
    RemarkListReq,
    RemarkListRes,
    StatusGroupResponse
} from "~/shared/entities/paper-entity";
import type { Filter } from "~/shared/entities/table-option";
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
    { field: "OrderStatus", type: "MATCH", value: "Receive" },
]);
const historySearch: globalThis.Ref<HistorySearch | undefined> = ref();
const loadPBalance: globalThis.Ref<BalanceRes | undefined> = ref();
const cancelRemarkList: globalThis.Ref<RemarkListRes[] | undefined> = ref([]);
const statusPaperbalance = ref('')
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
        }
    }
    statusPaperbalance.value = balanceRes.apiResponse.Status;

    isLoading.value = false;
};

const handleChangeStatus = async (status: string) => {
    loadHistoryStatus();
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
    console.log("DeleteOrder")
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
const showLogoHeader = false

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