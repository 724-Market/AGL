<template>
  <FormKit type="number" mask="#-####-#####-##-#" placeholder="เลขบัตรประชาชน 13 หลัก"
    validation="required|matches:/^[0-9]{13}$/" :validation-messages="{
      required: 'กรุณาใส่เลขบัตรประชาชน',
      matches: 'เลขบัตรประชาชนควรเป็นตัวเลข 13 หลัก'
    }" show-mask="false" unmask-value="true" inputmode="numeric" autocomplete="off" />
</template>