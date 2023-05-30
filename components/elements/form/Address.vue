<template>
    <div class="col-6">
        <FormKit type="text" label="บ้านเลขที่" name="AddressHouseNumber" placeholder="บ้านเลขที่" validation="required"
            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
    </div>
    <div class="col-6">
        <FormKit type="text" label="หมู่ที่" name="AddressMoo" placeholder="หมู่ที่" autocomplete="false" />
    </div>
    <div class="col-xs-12 col-md-6">
        <FormKit type="text" label="หมู่บ้าน/อาคาร" name="AddressVillage" placeholder="หมู่บ้าน/อาคาร"
            autocomplete="false" />
    </div>
    <div class="col-6">
        <FormKit type="text" label="ซอย/ตรอก/แยก" name="AddressSoi" placeholder="ซอย/ตรอก/แยก" autocomplete="false" />
    </div>
    <div class="col-6">
        <FormKit type="text" label="ถนน" name="AddressRoad" placeholder="ถนน" autocomplete="false" />
    </div>
    <div class="col-6">
        <FormKit type="text" label="รหัสไปรษณีย์" name="AddressPostalCode" placeholder="รหัสไปรษณีย์" validation="required"
            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
    </div>
    <div class="col-6">
        <FormKit type="select" label="จังหวัด" name="AddressProvince" placeholder="จังหวัด" :options="{
            1: 'กทม',
            2: 'กรุงเทพ',
            3: 'กรุงเทพฯ',
            4: 'กรุงเทพมหานคร',
            5: 'นครพนมเปญ',
        }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
    </div>
    <div class="col-6">
        <FormKit type="select" label="เขต/อำเภอ" name="AddressDistrict" placeholder="เขต/อำเภอ" :options="{
            1: 'กทม',
            2: 'กรุงเทพ',
            3: 'กรุงเทพฯ',
            4: 'กรุงเทพมหานคร',
            5: 'นครพนมเปญ',
        }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
    </div>
    <div class="col-6">
        <FormKit type="select" label="แขวง/ตำบล" name="AddressSubdistrict" placeholder="แขวง/ตำบล" :options="{
            1: 'กทม',
            2: 'กรุงเทพ',
            3: 'กรุงเทพฯ',
            4: 'กรุงเทพมหานคร',
            5: 'นครพนมเปญ',
        }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
    </div>
    <div class="col-xs-12 col-md-6">
        <FormKit type="text" label="ระบุที่อยู่เอง กรณีไม่มีข้อมูลให้เลือก" name="AddressCustom" autocomplete="false" />
    </div>
</template>