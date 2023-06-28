<template>
    <FormKit type="radio" label="ช่องทางการชำระเงิน" name="PaymentMethods" :options="[
        { label: 'สแกน QR', value: 'qr', help: 'สะดวก เร็ว ค่าธรรมเนียม 5 บาท' },
        { label: 'บัตรเครดิต/บัตรเดบิต', value: 'card', help: 'ขั้นต่ำ 500 บาท ค่าธรรมเนียม 12%' },
        { label: 'วงเงินมัดจำ', value: 'pledge', help: 'คงเหลือ 654.00 บาท' }]" validation="required"
        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block" />
</template>

<style scoped>
.formkit-inner:has(.formkit-input[value="qr" i])::before {
    font: var(--fa-font-solid);
    content: "\f029";
}

.formkit-inner:has(.formkit-input[value="card" i])::before {
    font: var(--fa-font-solid);
    content: "\f38a";
}

.formkit-inner:has(.formkit-input[value="transfer" i])::before {
    font: var(--fa-font-solid);
    content: "\e528";
}

.formkit-inner:has(.formkit-input[value="pledge" i])::before {
    font: var(--fa-font-solid);
    content: "\f555";
}
</style>