<template>
  <FormKit type="text" mask="AM########" placeholder="ขึ้นต้นด้วย AM"
    validation="required|matches:/^[aA][mM][0-9]{8}$/|length:10" :validation-messages="{
      required: 'กรุณาใส่รหัสสมาชิก',
      matches: 'รูปแบบของรหัสสมาชิกไม่ถูกต้อง',
      length: 'รหัสสมาชิกควรมี 10 ตัวอักษร และขึ้นต้นด้วย AM'
    }" show-mask="false" autocomplete="off" />
</template>