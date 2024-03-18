<template>
    <FormKit type="radio" label="ช่องทางการชำระเงิน" name="PledgeMethods" :options="{
        qr: 'สแกน QR',
        // kplus: 'K PLUS'
    }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
        options-class="option-block-inline" />
</template>