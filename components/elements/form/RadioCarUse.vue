<template>
  <FormKit type="radio" label="ประเภทการใช้งาน" name="CarUse" :options="{
    PERSONAL: 'ส่วนบุคคล',
    HIRE: 'รับจ้าง',
    RENT: 'ให้เช่า',
  }" options-class="option-block" />
</template>