<template>
    <FormKit type="text" label="เลขบัตรประชาชน" name="idcard" placeholder="เลขบัตรประชาชน"
        validation="required|matches:/^[0-9]{13}$/" :validation-messages="{
            required: 'กรุณาใส่เลขบัตรประชาชน',
            matches: 'เลขบัตรประชาชนควรเป็นตัวเลข 13 หลัก'
        }" autocomplete="off" />
</template>