<template>
    <FormKit type="radio" label="การใช้ส่วนลด" name="DiscountMethods" :options="[
        { label: 'หักส่วนลดเต็มจำนวน', value: 'fulldiscount', help: 'ลดได้ 180 บาท' },
        { label: 'หักส่วนลดบางส่วน', value: 'partialdiscount', help: 'ลดได้สูงสุด 160 บาท' },
        { label: 'ชำระเบี้ยเต็มจำนวน', value: 'fullpay', help: 'ไม่ใช้ส่วนลด' }]" validation="required"
        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block" />
</template>

<style scoped>
.formkit-inner:has(.formkit-input[value="fulldiscount" i])::before {
    font: var(--fa-font-solid);
    content: "\f51e";
}

.formkit-inner:has(.formkit-input[value="partialdiscount" i])::before {
    font: var(--fa-font-duotone);
    content: "\f51e";
}

.formkit-inner:has(.formkit-input[value="fullpay" i])::before {
    font: var(--fa-font-solid);
    content: "\e41c";
}
</style>