<template>
    <div id="transaction-stats-admin" class="card-stat-stack">

        <div class="card-stat" :class="{ 'is-active' : isActive[0]}">
            <a @click="onChangeFilter('Receive')" title="แจ้งงาน">
                <div class="stat-wrapper">
                    <div class="stat-header">
                        <h5 class="topic">แจ้งงาน</h5>
                        <span class="value">{{ $props.statusGroup?.Receive }}</span>
                    </div>
                    <div class="stat-action">
                        <figure class="figure">
                            <i class="fa-duotone fa-hourglass-clock fa-swap-opacity"></i>
                        </figure>
                    </div>
                </div>
            </a>
        </div>

        <div class="card-stat" :class="{ 'is-active' : isActive[1]}">
            <a @click="onChangeFilter('Delivery')" title="จัดส่งแล้ว">
                <div class="stat-wrapper">
                    <div class="stat-header">
                        <h5 class="topic">จัดส่งแล้ว</h5>
                        <span class="value">{{ $props.statusGroup?.Delivery }}</span>
                    </div>
                    <div class="stat-action">
                        <figure class="figure">
                            <i class="fa-duotone fa-truck-arrow-right"></i>
                        </figure>
                    </div>
                </div>
            </a>
        </div>

        <div class="card-stat is-success" :class="{ 'is-active' : isActive[2]}">
            <a @click="onChangeFilter('Success')" title="สำเร็จ">
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

        <div class="card-stat is-danger" :class="{ 'is-active' : isActive[3]}">
            <a @click="onChangeFilter('Cancel')" title="ยกเลิกรายการ">
                <div class="stat-wrapper">
                    <div class="stat-header">
                        <h5 class="topic">ยกเลิกรายการ</h5>
                        <span class="value">{{ $props.statusGroup?.Cancel }}</span>
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
</template>

<script lang="ts" setup>

import type {
    StatusGroupResponse
} from "~/shared/entities/paper-entity";

const emit = defineEmits(['changeStatus'])

const props = defineProps({ 
  statusGroup : {
    type: Object as () => StatusGroupResponse,
  },
  statusSearch : String    
})

const statusGroup: globalThis.Ref<StatusGroupResponse | undefined> = ref()
var statusSearch = ref('')

var isActive = ref([true, false, false, false])

const onChangeFilter = async (status: string) => {
    // console.log('filter', filter)
    statusSearch.value = ''
    switch(status) {
        case 'Receive':
            isActive.value = [true, false, false, false]
            break;
        case 'Delivery':
            isActive.value = [false, true, false, false]
            break;
        case 'Success':
            isActive.value = [false, false, true, false]
            break;
        case 'Cancel':
            isActive.value = [false, false, false, true]
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
      if(statusSearch.value == 'clear') isActive.value = [false, false, false, false, false]
      //emit('changeStatus', 'clear')
    }
  }
)
</script>