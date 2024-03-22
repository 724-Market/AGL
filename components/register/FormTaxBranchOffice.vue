<template>
    <h3>ชื่อผู้เอาประกันภัย (นิติบุคคล : สาขา)</h3>
    <p>{{ profileData.Email }}</p>
    <div class="row">
        <!-- <div class="col-sm-4 col-lg-3">
            <FormKit type="select" label="ประเภทกิจการ" name="BranchCompanyType" placeholder="ประเภทกิจการ"
                :options="Prefix" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                v-model="profileData.PrefixID" />
        </div> -->
        <div class="col-sm-8 col-lg-5">
            <FormKit type="select" label="ประเภทกิจการ" name="CompanyType" placeholder="ประเภทกิจการ"
                :options="props.prefixData" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                v-model="profileData.PrefixID" />
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
            <FormKit type="text" label="รหัสสาขา" name="BranchCode" placeholder="รหัสสาขา"
                validation="required|+length:5|number" :validation-messages="{
                required: 'กรุณาใส่ข้อมูล',
                length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 5 ตัว',
                number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                }" autocomplete="off" v-model="profileData.BranchCode"
                />
        </div>
        <div class="col-6">
            <FormKit type="text" label="ชื่อสาขา" name="BranchName" placeholder="ชื่อสาขา"
                :validation-rules="{ special_characters }" validation="required|special_characters"
                :validation-messages="{
                required: 'กรุณาใส่ข้อมูล',
                special_characters: 'ไม่ให้กรอกอักขระพิเศษ',
                }" autocomplete="off" v-model="profileData.BranchName"
                />
        </div>
        <div class="col-6">
            <ElementsFormPhoneNumber autocomplete="off" label="เบอร์มือถือ"  name="CompanyPhoneNumber" v-model="profileData.PhoneNumber"
            ></ElementsFormPhoneNumber>
        
        </div>
        <div class="col-6">
            <FormKit type="email" label="อีเมล" name="BranchEmail" placeholder="xxxxxx@email.com"
                autocomplete="off" v-model="profileData.Email"
                />
        </div>

    </div>
</template>

<script setup lang="ts">
const props = defineProps(['profileData', 'prefixData'])
</script>