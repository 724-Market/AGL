<template>
    <div> 
      บ้านเลขที่ {{ props.taxInvoiceAddress?.No }} 
      หมู่ที่ {{ props.taxInvoiceAddress?.Moo }} 
      {{ props.taxInvoiceAddress?.ProvinceName }}
      {{ props.taxInvoiceAddress?.DistrictName }} 
      {{ props.taxInvoiceAddress?.SubDistrictName }} 
      {{ props.taxInvoiceAddress?.ZipCode }}

    </div>
</template>
<script setup lang="ts">

    const props = defineProps({
        taxInvoiceAddress: Object,
    })

</script>
