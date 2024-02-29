<template>
    <div class="selected-item">
        <figure class="brand">
            <i class="fa-duotone fa-car"></i>
        </figure>

        <div class="detail">
            <h4 class="topic">{{ props.carDetail ?? 'TOYOTA Yaris 1.2 Smart Auto 2019' }}</h4>
            <div class="info">
                <p class="description">คุ้มครอง {{ insuranceDay ?? 365 }} วัน
                    <span>{{ useUtility().formatDate(props.effectiveDate, 'FullDate') }} – {{
                        useUtility().formatDate(props.expireDate, 'FullDate') }} • 16:30</span>
                </p>
            </div>
        </div>

        <div class="meta">
            <div class="tags">
                <span class="badge"><i :class="getIconCarUse(props.carUse ?? '')"></i>{{ getCarUseText(props.carUse ??
                    '') }}</span>
                <span class="badge-bg-danger" v-if="props.isCarRed"><i class="fa-solid fa-sparkles"></i>ป้ายแดง</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const props = defineProps({
    carDetail: String,
    insuranceDay: Number,
    effectiveDate: String,
    expireDate: String,
    carUse: String,
    isCarRed: Boolean
});

const getIconCarUse = (carUse: string): string => {
    let className = ''
    if (carUse.toUpperCase() == 'PERSONAL') {
        className = 'fa-solid fa-car';
    }
    else if (carUse.toUpperCase() == 'HIRE') {
        className = 'fa-solid fa-taxi';
    }
    else if (carUse.toUpperCase() == 'RENT') {
        className = 'fa-solid fa-car-circle-bolt';
    }

    return className
}

const getCarUseText = (carUse: string): string => {
    let text = ''
    if (carUse.toUpperCase() == 'PERSONAL') {
        text = 'ส่วนบุคคล';
    }
    else if (carUse.toUpperCase() == 'HIRE') {
        text = 'รับจ้าง';
    }
    else if (carUse.toUpperCase() == 'RENT') {
        text = 'รถให้เช่า';
    }

    return text
}
</script>
