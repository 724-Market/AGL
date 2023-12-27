<template>
    <aside class="card">
        <div class="card-body">
            <div class="status-list">
                <figure class="status-icon" v-if="props.userDetails && props.userDetails.IsActive === true">
                    <div class="icon user success"></div>
                </figure>
                <figure class="status-icon" v-if="props.userDetails && props.userDetails.IsActive === false">
                    <div class="icon user warning"></div>
                </figure>
                <h4 class="title">บันทึกรายการผู้ช่วย</h4>
                <div class="status-item" v-if="props.userDetails && props.userDetails.UserName">
                    <h5 class="topic">ชื่อผู้ใช้งาน</h5>
                    <p>{{ props.userDetails.UserName }}</p>
                </div>
                <div class="status-item" v-if="props.userDetails && props.userDetails.CreateDate">
                    <h5 class="topic">วันที่สร้าง</h5>
                    <p>{{ useUtility().formatDate(props.userDetails.CreateDate, "DD MMM BBBB HH:mm") }}</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">สร้างโดย</h5>
                    <p>{ParentID}</p>
                </div>
                <div class="status-item" v-if="props.userDetails && props.userDetails.UpdateDate">
                    <h5 class="topic">อัปเดตข้อมูลเมื่อ</h5>
                    <p>{{ useUtility().formatDate(props.userDetails.UpdateDate, "DD MMM BBBB HH:mm") }}</p>
                </div>
                <div class="status-item" v-if="props.userDetails && props.userDetails.CreditLimitAmount">
                    <h5 class="topic">วงเงินต่อวัน</h5>
                    <p>{{ useUtility().getCurrency(parseInt(props.userDetails.CreditLimitAmount, 10), 0) }} บาท</p>
                </div>
                <div class="status-item" v-if="props.userDetails && props.userDetails.Commission">
                    <h5 class="topic">ผลตอบแทน</h5>
                    <p>{{ props.userDetails.Commission }}%</p>
                </div>
                <div class="status-item text-success" v-if="props.userDetails && props.userDetails.IsActive === true">
                    <h5 class="topic">สถานะ</h5>
                    <p>{{ isUserActive ? "เปิดการใช้งาน" : "ปิดการใช้งาน" }}</p>
                </div>
                <div class="status-item text-warning" v-if="props.userDetails && props.userDetails.IsActive === false">
                    <h5 class="topic">สถานะ</h5>
                    <p>{{ !isUserActive ? "เปิดการใช้งาน" : "ปิดการใช้งาน" }}</p>
                </div>
            </div>
        </div>
        <div class="card-footer" v-if="props.userDetails">
            <div class="user-toggle-status">
                <FormKit type="toggle" on-value="active" off-value="inactive" off-value-label="ปิดการใช้งาน"
                    on-value-label="เปิดการใช้งาน" :value="isUserActive" @change="toggleUserActive" />
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
// Define import
import { UserDataRes } from "~/shared/entities/user-entity"

// Define props
const props = defineProps({
    userDetails: {
        type: Object as () => UserDataRes | null
    }
})

// Computed value from true/false to active/inactive
const isUserActive = computed(() => {
    if (props.userDetails) {
        return props.userDetails.IsActive ? 'active' : 'inactive'
    }
    return 'inactive' // Default value if userDetails is null or undefined
})

// onChange user active toggle
const toggleUserActive = () => {
    if (props.userDetails) {
        props.userDetails.IsActive = !props.userDetails.IsActive
    }
}
</script>