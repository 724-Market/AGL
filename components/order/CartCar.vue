<template>
    <div class="selected-item">
        <figure class="brand">
            <i class="fa-duotone fa-car"></i>
        </figure>

        <div class="detail">
            <h4 class="topic">{{props.carDetail ?? 'TOYOTA Yaris 1.2 Smart Auto 2019'}}</h4>
            <div class="info">
                <p class="description">คุ้มครอง {{insuranceDay ?? 365}} วัน
                    <span>{{props.effectiveDate ?? '04/05/2566'}}–{{props.expireDate ?? '05/08/2567'}}</span>
                </p>
            </div>
        </div>

        <div class="meta">
            <div class="tags">
                <span class="badge"><i class="fa-solid fa-car-circle-bolt"></i>{{props.carUse ?? 'รถให้เช่า'}}</span>
                <span class="badge-bg-danger"><i class="fa-solid fa-sparkles"></i>{{props.carLabel ?? 'ป้ายแดง'}}</span>
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
    carLabel: String
});

</script>