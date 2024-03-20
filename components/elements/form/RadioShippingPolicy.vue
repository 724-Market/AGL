<template>
    <FormKit type="radio" label="วิธีการรับกรมธรรม์" name="ShippingPolicy" :options="{
        pdf: 'รับเป็นไฟล์ PDF',
        print: 'พิมพ์ลงกระดาษมัดจำ',
        postal: 'จัดส่งตัวจริง',
    }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block" />
</template>