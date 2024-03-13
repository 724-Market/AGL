<template>
  <div class="row">
    <div class="col-12">
      <FormKit type="mask" mask="##########" label="เลขที่ใบอนุญาต" name="NonLifeLicenseNo"
        placeholder="เลขที่ใบอนุญาต 10 หลัก" validation="required" :validation-messages="{
          required: 'กรุณาใส่เลขที่ใบอนุญาต'
        }" autocomplete="off" show-mask="false" unmask-value="true" inputmode="numeric" />
    </div>
    <div class="col-12">
      <FormKit type="mask" mask="## / ## / 25##" label="วันออกใบอนุญาต" name="NonLifeLicenseBegin"
        placeholder="วัน/เดือน/ปี พ.ศ." validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
        autocomplete="off" show-mask="false" unmask-value="false" inputmode="numeric" />
    </div>
    <div class="col-12">
      <FormKit type="mask" mask="## / ## / 25##" label="วันใบอนุญาตหมดอายุ" name="NonLifeLicenseExpire"
        placeholder="วัน/เดือน/ปี พ.ศ." validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
        autocomplete="off" show-mask="false" unmask-value="false" inputmode="numeric" />
    </div>
    <div class="col-12">
      <FormKit type="file" label="รูปถ่ายหน้าบัตรใบอนุญาตฯ" name="NonLifeLicenseFile" accept=".jpg,.png"
        help="รองรับไฟล์นามสกุล jpg, png เท่านั้น" validation="required"
        :validation-messages="{ required: 'กรุณาอัปโหลดรูปหน้าบัตร' }" />
    </div>
    <div class="col-12">
      <FormKitSummary />
    </div>
  </div>
</template>