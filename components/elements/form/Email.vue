<template>
  <FormKit type="email" placeholder="abcdef@email.com" validation="required|email" :validation-messages="{
    required: 'กรุณาใส่อีเมล',
    email: 'รูปแบบของอีเมลไม่ถูกต้อง'
  }" autocomplete="off" />
</template>