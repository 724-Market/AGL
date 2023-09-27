<template>
    <FormKit type="radio" label="วิธีการรับกระดาษ" name="ShippingPaper" :options="{
        postal: 'รับทางไปรษณีย์',
        branch: 'รับที่สาขา',
    }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block" />
</template>

<style scoped>
.formkit-inner:has(.formkit-input[value="branch" i])::before {
    font: var(--fa-font-solid);
    content: "\f1ad";
}

.formkit-inner:has(.formkit-input[value="postal" i])::before {
    font: var(--fa-font-solid);
    content: "\f674";
}
</style>