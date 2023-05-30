<template>
    <FormKit type="text" label="OTP" name="otp" placeholder="กรอกรหัส OTP 6 หลัก" validation="required|matches:/^[0-9]{6}$/"
        :validation-messages="{
            required: 'กรุณาใส่รหัส OTP',
            matches: 'รหัส OTP ควรเป็นตัวเลขและมี 6 หลัก'
        }" autocomplete="off">
        <template #help="context">
            <div :class="context.classes.help">
                <a href="#" class="send-otp-link help-text-right" title="ส่งอีกครั้ง">ส่งอีกครั้ง</a>
            </div>
        </template>
    </FormKit>
    <!-- TODO Countdown timer -->
    <!-- TODO Re-send OTP button and function API -->
</template>