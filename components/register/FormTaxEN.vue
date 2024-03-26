<template>
    <h3>ชื่อผู้เอาประกันภัย (บุคคลธรรมดา : คนต่างชาติ)</h3>
    <div class="row">
        <div class="col-sm-4 col-lg-4">
            <FormKit type="select" label="Prefix" name="TitlePerson" placeholder="Prefix"
                :options="props.prefixData" v-model="profileData.PrefixID" validation="required" :validation-messages="{ required: 'Can not empty!!!' }"
                 />
        </div>
        <div class="col-md-6">
            <FormKit type="text" label="Firstname" name="FirstName" v-model="profileData.FirstName"
                placeholder="Firstname" validation="required" :validation-messages="{
                    required: 'Can not empty!!!'
                }" autocomplete="off" />
        </div>
        <div class="col-md-6">
            <FormKit type="text" label="Lastname" name="LastName" v-model="profileData.LastName"
                placeholder="Lastname" validation="required" :validation-messages="{
                    required: 'Can not empty!!!'
                }" autocomplete="off" />
        </div>
        <div class="col-md-6">
            <!-- <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" v-model="profileData.PhoneNumber"
                maxlength="10" placeholder="ตัวอย่าง 0987654321"
                validation="required|+length:10|number" :validation-messages="{
                    required: 'กรุณาใส่หมายเลขโทรศัพท์',
                    length: 'หมายเลขโทรศัพท์มีจำนวน 10 หลัก',
                    number: 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
                }" autocomplete="off" /> -->
                
                <ElementsFormPhoneNumber autocomplete="off" label="Tel"  name="PhoneNumber" v-model="profileData.PhoneNumber"
                          ></ElementsFormPhoneNumber>
        </div>
        <div class="col-6">
            <!-- <ElementsFormIdCard label="Passport No." name="TaxID" v-model="profileData.TaxID" /> -->
            <FormKit type="text" label="Passport No." name="TaxID"
            placeholder="เลขประจำตัวผู้เสียภาษี" validation="required|number"
            maxlength="13"
            :validation-messages="{
            required: 'กรุณาใส่ข้อมูล',
            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
            }" autocomplete="off" v-model="profileData.TaxID"
            />
        </div>
        <div class="col-md-12 col-lg-5">
            <FormKit type="select" label="Nationality" name="Nationality" placeholder="Nationality"
                :options="props.nationality" validation="required"
                :validation-messages="{ required: 'Can not empty!!!' }" 
            />
        </div>
        
        <div class="col-6">
            <FormKit type="email" label="Email" name="Email" placeholder="xxxxxx@email.com"
                autocomplete="off" v-model="profileData.Email" />
        </div>

    </div>


</template>

<script setup lang="ts">
const props = defineProps(['profileData', 'prefixData', 'nationality'])

</script>