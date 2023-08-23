<template>
    <FormKit type="text" label="รหัสสมาชิก" name="username" placeholder="AM – – – – – – – –" validation="required"
        :validation-messages="{
            required: 'กรุณาใส่รหัสสมาชิก'
        }" autocomplete="off" />

    <!-- <FormKit type="text" label="รหัสสมาชิก" name="username" placeholder="AM – – – – – – – –"
        validation="required|matches:/^[aA][mM][0-9]{8}$/|length:10" :validation-messages="{
            required: 'กรุณาใส่รหัสสมาชิก',
            matches: 'รูปแบบของรหัสสมาชิกไม่ถูกต้อง',
            length: 'รหัสสมาชิกควรมี 10 ตัวอักษร และขึ้นต้นด้วย AM'
        }" autocomplete="off" /> -->
</template>