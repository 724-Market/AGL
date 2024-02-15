<template>
    <div id="transaction-stats" class="card-stat-stack">

        <div class="card-stat" :class="{ 'is-active': isActive[0] }">
            <a href="#" @click="onChangeFilter('Draft', $event)" title="แบบร่าง">
                <div class="stat-wrapper">
                    <div class="stat-header">
                        <h5 class="topic">แบบร่าง</h5>
                        <span class="value">{{ $props.statusGroup?.Draft }}</span>
                    </div>
                    <div class="stat-action">
                        <figure class="figure">
                            <i class="fa-duotone fa-file-pen fa-swap-opacity"></i>
                        </figure>
                    </div>
                </div>
            </a>
        </div>

        <div class="card-stat" :class="{ 'is-active': isActive[1] }">
            <a href="#" @click="onChangeFilter('Pending', $event)" title="รอชำระเงิน">
                <div class="stat-wrapper">
                    <div class="stat-header">
                        <h5 class="topic">รอชำระเงิน</h5>
                        <span class="value">{{ $props.statusGroup?.Pending }}</span>
                    </div>
                    <div class="stat-action">
                        <figure class="figure">
                            <i class="fa-duotone fa-hourglass-clock fa-swap-opacity"></i>
                        </figure>
                    </div>
                </div>
            </a>
        </div>

        <div class="card-stat" :class="{ 'is-active': isActive[2] }">
            <a href="#" @click="onChangeFilter('Process', $event)" title="รับแจ้งงาน">
                <div class="stat-wrapper">
                    <div class="stat-header">
                        <h5 class="topic">รับแจ้งงาน</h5>
                        <span class="value">{{ $props.statusGroup?.Process }}</span>
                    </div>
                    <div class="stat-action">
                        <figure class="figure">
                            <i class="fa-duotone fa-memo-circle-info fa-swap-opacity"></i>
                        </figure>
                    </div>
                </div>
            </a>
        </div>

        <div class="card-stat" :class="{ 'is-active': isActive[3] }">
            <a href="#" @click="onChangeFilter('Delivery', $event)" title="กำลังจัดส่ง">
                <div class="stat-wrapper">
                    <div class="stat-header">
                        <h5 class="topic">กำลังจัดส่ง</h5>
                        <span class="value">{{ $props.statusGroup?.Delivery }}</span>
                    </div>
                    <div class="stat-action">
                        <figure class="figure">
                            <i class="fa-duotone fa-truck-fast"></i>
                        </figure>
                    </div>
                </div>
            </a>
        </div>

        <div class="card-stat is-success" :class="{ 'is-active': isActive[4] }">
            <a href="#" @click="onChangeFilter('Success', $event)" title="สำเร็จ">
                <div class="stat-wrapper">
                    <div class="stat-header">
                        <h5 class="topic">สำเร็จ</h5>
                        <span class="value">{{ $props.statusGroup?.Success }}</span>
                    </div>
                    <div class="stat-action">
                        <figure class="figure">
                            <i class="fa-solid fa-check fa-lg"></i>
                        </figure>
                    </div>
                </div>
            </a>
        </div>

        <div class="card-stat is-danger" :class="{ 'is-active': isActive[5] }">
            <a href="#" @click="onChangeFilter('Cancel', $event)" title="ไม่สำเร็จ">
                <div class="stat-wrapper">
                    <div class="stat-header">
                        <h5 class="topic">ไม่สำเร็จ<span class="badge-navy" data-bs-toggle="tooltip"
                                data-bs-custom-class="meta-tooltip"
                                data-bs-title="A/B<br>A คือ งานที่ไม่สมบูรณ์ สามารถทำการคืนเงินได้<br>B คือ งานที่ไม่สำเร็จ"
                                data-bs-html="true"><i class="fa-solid fa-circle-question"></i></span></h5>
                        <span class="value">{{ $props.statusGroup?.CancelComplete }}<small>/{{
                            $props.statusGroup?.CancelPending }}</small></span>
                    </div>
                    <div class="stat-action">
                        <figure class="figure">
                            <i class="fa-solid fa-xmark-large"></i>
                        </figure>
                    </div>
                </div>
            </a>
        </div>

    </div>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
</template>

<script setup lang="ts">
import type {
    StatusGroupResponse
} from "~/shared/entities/order-entity";

const emit = defineEmits(['changeStatus'])

const props = defineProps({
    statusGroup: {
        type: Object as () => StatusGroupResponse,
    },
    statusSearch: String
})

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
    (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
)

const statusGroup: globalThis.Ref<StatusGroupResponse | undefined> = ref()
var statusSearch = ref('')
var isActive = ref([false, true, false, false, false, false])
const isLoading = ref(false);

const onLoad = onMounted(async () => {
    isLoading.value = true;
    if (props.statusGroup) {
        statusGroup.value = props.statusGroup
    }
    if (props.statusSearch) {
        statusSearch.value = props.statusSearch
        if (statusSearch.value == 'clear') isActive.value = [false, false, false, false, false, false]
    }
    isLoading.value = false;
})

const onChangeFilter = async (status: string, event: any) => {

    event.preventDefault()

    statusSearch.value = ''

    switch (status) {
        case 'Draft':
            isActive.value = [true, false, false, false, false, false]
            break;
        case 'Pending':
            isActive.value = [false, true, false, false, false, false]
            break;
        case 'Process':
            isActive.value = [false, false, true, false, false, false]
            break;
        case 'Delivery':
            isActive.value = [false, false, false, true, false, false]
            break;
        case 'Success':
            isActive.value = [false, false, false, false, true, false]
            break;
        case 'Cancel':
            isActive.value = [false, false, false, false, false, true]
            break;
    }
    emit('changeStatus', status)
};

watch(
    () => props.statusGroup,
    async () => {
        if (props.statusGroup) {
            statusGroup.value = props.statusGroup
        }
    }
)

watch(
    () => props.statusSearch,
    async () => {
        if (props.statusSearch) {
            statusSearch.value = props.statusSearch
            if (statusSearch.value == 'clear') isActive.value = [false, false, false, false, false, false]
            //emit('changeStatus', 'clear')
        }
    }
)
</script>