<template>
  <FormKit type="mask" mask="###-###-####" placeholder="หมายเลขโทรศัพท์ 10 หลัก"
    validation="required|matches:/^[0-9]{10}$/" :validation-messages="{
      required: 'กรุณาใส่หมายเลขโทรศัพท์',
      matches: 'หมายเลขโทรศัพท์ควรเป็นตัวเลข 10 หลัก'
    }" show-mask="false" unmask-value="true" inputmode="numeric" autocomplete="off" />
</template>