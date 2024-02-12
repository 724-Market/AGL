<template>
  <div class="row">
    <div class="col-6">
      <FormKit type="text" label="บ้านเลขที่" name="No" placeholder="บ้านเลขที่" validation="required|address_characters"
        :validation-messages="{
          required: 'กรุณาใส่ข้อมูล',
          address_characters: 'กรุณากรอกรูปแบบบ้านเลขที่ให้ถูกต้อง',
        }" autocomplete="false" />
    </div>
    <div class="col-6">
      <FormKit type="text" label="หมู่ที่" name="Moo" placeholder="หมู่ที่" />
    </div>
    <div class="col-xs-12 col-md-6">
      <FormKit type="text" label="หมู่บ้าน/อาคาร" name="Building" placeholder="หมู่บ้าน/อาคาร" />
    </div>
    <div class="col-6">
      <FormKit type="text" label="ซอย/ตรอก/แยก" name="Alley" placeholder="ซอย/ตรอก/แยก" />
    </div>
    <div class="col-6">
      <FormKit type="text" label="ถนน" name="Road" placeholder="ถนน" />
    </div>
    <div class="col-6">
      <FormKit type="select" label="จังหวัด" name="ProvinceID" placeholder="จังหวัด" />
    </div>
    <div class="col-6">
      <FormKit type="select" label="เขต/อำเภอ" name="DistrictID" placeholder="เขต/อำเภอ" />
    </div>
    <div class="col-6">
      <FormKit type="select" label="แขวง/ตำบล" name="SubDistrictID" placeholder="แขวง/ตำบล" />
    </div>
    <div class="col-6">
      <FormKit type="text" label="รหัสไปรษณีย์" readonly name="ZipCode" />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>