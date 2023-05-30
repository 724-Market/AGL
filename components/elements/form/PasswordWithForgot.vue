<template>
    <FormKit type="text" label="รหัสผ่าน" name="password" placeholder="รหัสผ่าน" :validation="[['required'],
    ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
    ],
    ['length', 8, 128],
    ]" :validation-messages="{
    required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร'
}" autocomplete="off">
        <template #help="context">
            <div :class="context.classes.help">
                <!-- TODO Implement NuxtLink to forgot password link -->
                <a href="/forgot-password" class="forgot-password-link help-text-right"
                    title="ลืมรหัสผ่าน">ลืมรหัสผ่าน ?</a>
            </div>
        </template>
    </FormKit>
</template>