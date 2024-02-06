<template>

    <div class="notice">
        {{ addressData.No ?? '' }}
        {{ addressData.Moo ?? '' }}
        {{ addressData.Place ?? '' }}
        {{ addressData.Building ?? '' }}
        {{ addressData.Floor ?? '' }}
        {{ addressData.Alley ?? '' }}
        {{ addressData.Road ?? '' }}
        {{ addressData.SubDistrictLabel ?? '' }}
        {{ addressData.DistrictLabel ?? '' }}
        {{ addressData.ProvinceLabel ?? '' }}
        {{ addressData.postalCode ?? '' }}
    </div>

</template>

<script setup lang="ts">

const props = defineProps(['addressData'])

</script>