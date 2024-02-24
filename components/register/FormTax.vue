<template>
    <div class="row">
        <div class="col-md-6">
            <FormKit type="text" label="ชื่อ" name="FirstName" v-model="profileData.FirstName"
                placeholder="ระบุชื่อ" validation="required" :validation-messages="{
                    required: 'กรุณาใส่ชื่อ'
                }" autocomplete="off" />
        </div>
        <div class="col-md-6">
            <FormKit type="text" label="นามสกุล" name="LastName" v-model="profileData.LastName"
                placeholder="ระบุนามสกุล" validation="required" :validation-messages="{
                    required: 'กรุณาใส่นามสกุล'
                }" autocomplete="off" />
        </div>
        <div class="col-md-6">
            <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" v-model="profileData.PhoneNumber"
                maxlength="10" placeholder="ตัวอย่าง 0987654321"
                validation="required|+length:10|number" :validation-messages="{
                    required: 'กรุณาใส่หมายเลขโทรศัพท์',
                    length: 'หมายเลขโทรศัพท์มีจำนวน 10 หลัก',
                    number: 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
                }" autocomplete="off" />
        </div>
        <div class="col-6">
            <FormKit type="text" label="เลขประจำตัวผู้เสียภาษี" name="TaxID"
                placeholder="เลขประจำตัวผู้เสียภาษี" validation="required|length:13|number"
                :validation-messages="{
                required: 'กรุณาใส่ข้อมูล',
                length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 13 ตัว',
                number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                }" autocomplete="off" v-model="profileData.TaxID"
            />
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