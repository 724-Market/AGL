<template>
    <h3>ชื่อผู้เอาประกันภัย (บุคคลธรรมดา : คนต่างชาติ)</h3>
    <div class="row">
        <div class="col-sm-4 col-lg-4">
            <FormKit type="select" label="Prefix" name="TitlePerson" placeholder="คำนำหน้า"
                :options="props.prefixData" v-model="profileData.PrefixID" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                 />
        </div>
        <div class="col-md-6">
            <FormKit type="text" label="Firstname" name="FirstName" v-model="profileData.FirstName"
                placeholder="ระบุชื่อ" validation="required" :validation-messages="{
                    required: 'กรุณาใส่ชื่อ'
                }" autocomplete="off" />
        </div>
        <div class="col-md-6">
            <FormKit type="text" label="Lastname" name="LastName" v-model="profileData.LastName"
                placeholder="ระบุนามสกุล" validation="required" :validation-messages="{
                    required: 'กรุณาใส่นามสกุล'
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
            <ElementsFormIdCard label="Passport No." name="TaxID" v-model="profileData.TaxID" />
        </div>
        
        <div class="col-6">
            <FormKit type="email" label="Email" name="Email" placeholder="xxxxxx@email.com"
                autocomplete="off" v-model="profileData.Email" />
        </div>

    </div>


</template>

<script setup lang="ts">
const props = defineProps(['profileData', 'prefixData'])
</script>