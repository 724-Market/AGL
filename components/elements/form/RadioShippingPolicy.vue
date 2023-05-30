<template>
    <FormKit type="radio" label="วิธีการรับกรมธรรม์" name="ShippingPolicy" :options="{
        pdf: 'รับเป็นไฟล์ PDF',
        print: 'พิมพ์ลงกระดาษมัดจำ',
        postal: 'จัดส่งตัวจริง',
    }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block" />
</template>

<style scoped>
.formkit-inner:has(.formkit-input[value="pdf" i])::before {
    font: var(--fa-font-solid);
    content: "\f1c1";
}

.formkit-inner:has(.formkit-input[value="print" i])::before {
    font: var(--fa-font-solid);
    content: "\f02f";
}

.formkit-inner:has(.formkit-input[value="postal" i])::before {
    font: var(--fa-font-solid);
    content: "\f674";
}
</style>