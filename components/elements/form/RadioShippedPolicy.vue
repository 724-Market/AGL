<template>
    <FormKit type="radio" label="วิธีจัดส่งกรมธรรม์" name="ShippedPolicy" :options="{
        together: 'จัดส่งพร้อมกรมธรรม์',
        separately: 'จัดส่งแยก',
    }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
        options-class="option-block-inline" />
</template>