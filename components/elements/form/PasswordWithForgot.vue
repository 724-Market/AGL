<template>
  <FormKit type="password" placeholder="ระบุรหัสผ่าน" :validation="[['required'],
  ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/],
  ['length', 8, 128],
  ]" :validation-messages="{
  required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร'
}" autocomplete="off">
    <template #help="context">
      <div :class="context.classes.help">
        <NuxtLink to="forgot-password" class="forgot-password-link text-end" title="ลืมรหัสผ่าน">ลืมรหัสผ่าน?
        </NuxtLink>
      </div>
    </template>
  </FormKit>
</template>