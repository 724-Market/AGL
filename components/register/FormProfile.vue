<template>
    <div class="row">
        <div class="col-md-6">
            <FormKit type="hidden"  name="FirstName" 
                v-model="profileData.FirstName"
                 />
        </div>
        <div class="col-md-6">
            <FormKit type="hidden" name="LastName" 
                v-model="profileData.LastName"
                 />
        </div>
        <div class="col-6">
            <FormKit type="hidden" 
            name="TaxID" v-model="profileData.TaxID"
            
            />
        </div>
        <div class="col-md-6">
            <FormKit type="hidden" name="PhoneNumber" 
                v-model="profileData.PhoneNumber" />
        </div>
        <div class="col-md-6">
            <FormKit type="hidden"  name="Email"
                v-model="profileData.email" />
        </div>

    </div>


</template>

<script setup lang="ts">
const props = defineProps(['profileData'])
</script>