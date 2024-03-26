<template>
    <h3>ชื่อผู้เอาประกันภัย (นิติบุคคล : สำนักงานใหญ่)</h3>
    <div class="row">
        <div class="col-sm-8 col-lg-5">
            <FormKit type="select" label="ประเภทกิจการ" name="CompanyType" placeholder="ประเภทกิจการ"
                :options="props.prefixData" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                v-model="profileData.PrefixID"  />
        </div>
        <div class="col-sm-8 col-lg-5">
            <FormKit type="text" label="ชื่อกิจการ" name="CompanyName" placeholder="ชื่อกิจการ"
                :validation-rules="{ special_characters }" validation="required|special_characters"
                :validation-messages="{
                required: 'กรุณาใส่ข้อมูล',
                special_characters: 'ไม่ให้กรอกอักขระพิเศษ',
                }" autocomplete="off" v-model="profileData.FirstName"
                />
        </div>
        <div class="col-6">
            <ElementsFormIdCard label="เลขประจำตัวผู้เสียภาษี" name="CompanyTaxId" v-model="profileData.TaxID" 
            />
        </div>
        <div class="col-6">
            <ElementsFormPhoneNumber autocomplete="off" label="เบอร์มือถือ"  name="CompanyPhoneNumber" v-model="profileData.PhoneNumber"
            ></ElementsFormPhoneNumber>
        </div>
        <div class="col-6">
            <FormKit type="email" label="อีเมล" name="CompanyEmail" placeholder="xxxxxx@email.com"
                autocomplete="off" v-model="profileData.Email"
                />
        </div>

    </div>


</template>

<script setup lang="ts">
const props = defineProps(['profileData', 'prefixData'])
</script>