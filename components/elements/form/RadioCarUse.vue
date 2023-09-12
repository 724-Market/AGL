<template>
  <FormKit type="radio" label="ประเภทการใช้งาน" name="CarUse" :options="{
    PERSONAL: 'ส่วนบุคคล',
    HIRE: 'รับจ้าง',
    RENT: 'ให้เช่า',
  }" options-class="option-block" />
</template>

<style scoped>
.formkit-inner:has(.formkit-input[value="personal" i])::before {
  font: var(--fa-font-solid);
  content: "\f1b9";
}

.formkit-inner:has(.formkit-input[value="hire" i])::before {
  font: var(--fa-font-solid);
  content: "\f1ba";
}

.formkit-inner:has(.formkit-input[value="rent" i])::before {
  font: var(--fa-font-solid);
  content: "\e342";
}
</style>