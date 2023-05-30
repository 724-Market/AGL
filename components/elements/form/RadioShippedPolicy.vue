<template>
    <FormKit type="radio" label="วิธีจัดส่งกรมธรรม์" name="ShippedPolicy" :options="{
        together: 'จัดส่งพร้อมกรมธรรม์',
        separately: 'จัดส่งแยก',
    }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
        options-class="option-block-inline" />
</template>

<style scoped>
.formkit-inner:has(.formkit-input[value="together" i])::before {
    font: var(--fa-font-solid);
    content: "\e58b";
}

.formkit-inner:has(.formkit-input[value="separately" i])::before {
    font: var(--fa-font-solid);
    content: "\f4de";
}
</style>