<template>
  <FormKit type="mask" mask="EM##########" placeholder="ขึ้นต้นด้วย EM"
    validation="required|matches:/^[eE][mM][0-9]{10}$/|length:12" :validation-messages="{
      required: 'กรุณาใส่ชื่อผู้ใช้งาน',
      matches: 'รูปแบบของชื่อผู้ใช้งานไม่ถูกต้อง',
      length: 'ชื่อผู้ใช้งานควรมี 12 ตัวอักษร และขึ้นต้นด้วย EM'
    }" show-mask="false" autocomplete="off" />
</template>