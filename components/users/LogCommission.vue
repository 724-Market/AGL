<template>
    <aside class="card">
        <div class="card-body">
            <div class="status-list is-commission">
                <figure class="status-icon">
                    <i class="fa-solid fa-percent fa-xl"></i>
                </figure>
                <h4 class="title">บันทึกรายการผลตอบแทน</h4>
                <div class="status-item" v-for="(item, j) in props.userCommissionList" :key="j">
                    <h5 class="topic"><span class="badge-bg-dark">{{ item.Commission }}%</span></h5>
                    <p>เมื่อ {{ useUtility().formatDate(item.CreateDate) }}</p>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
// Define import
import type { UserCommissionListRes } from "~/shared/entities/user-entity"

// Define props
const props = defineProps({
    userCommissionList: {
        type: Object as () => UserCommissionListRes[] | null
    }
})
</script>