<template>
  <FormKit type="text" mask="M##########" placeholder="M__________"
    validation="required|matches:/^[mM][0-9]{10}$/|length:11" :validation-messages="{
      required: 'กรุณาใส่ชื่อผู้ใช้งาน',
      matches: 'รูปแบบของชื่อผู้ใช้งานไม่ถูกต้อง',
      length: 'ชื่อผู้ใช้งานควรมี 11 ตัวอักษร และขึ้นต้นด้วย M'
    }" inputmode="numeric" autocomplete="off" />
</template>