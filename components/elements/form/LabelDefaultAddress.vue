<template>
    <div> 
      บ้านเลขที่ {{ props.labelAddress?.No }} 
      {{ props.labelAddress?.DistrictName }} 
      {{ props.labelAddress?.SubDistrictName }} 
      จังหวัด{{ props.labelAddress?.ProvinceName }}
      {{ props.labelAddress?.ZipCode }}

    </div>
</template>
<script setup lang="ts">

    const props = defineProps({
        labelAddress: Object,
    })

</script>
