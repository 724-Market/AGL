<template>
    <FormKit type="radio" label="ช่องทางการชำระเงิน" name="PledgeMethods" :options="{
        qr: 'สแกน QR',
        // kplus: 'K PLUS'
    }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
        options-class="option-block-inline" />
</template>

<style scoped>
.formkit-inner:has(.formkit-input[value="qr" i])::before {
    font: var(--fa-font-solid);
    content: "\f029";
}

.formkit-inner:has(.formkit-input[value="kplus" i])::before {
    font: var(--fa-font-solid);
    content: "\f19c";
}
</style>