<template>
  <FormKit
    type="mask"
    mask="###-###-####"
    placeholder="หมายเลขโทรศัพท์ 10 หลัก"
    :validation-rules="{isValidThaiPhoneNumber}"
    validation="isValidThaiPhoneNumber|required|matches:/^[0-9]{10}$/"
    :validation-messages="{
      required: 'กรุณาใส่หมายเลขโทรศัพท์',
      matches: 'หมายเลขโทรศัพท์ควรเป็นตัวเลข 10 หลัก',
      isValidThaiPhoneNumber:'กรุณากรอกรูปแบบหมายเลขโทรศัพท์ให้ถูกต้อง'
    }"
    show-mask="false"
    unmask-value="true"
    inputmode="numeric"
    autocomplete="off"
  />
</template>
<script setup>
function isValidThaiPhoneNumber({ value }) {
  return new Promise((resolve) => {
    let validate = true;
    // Remove any formatting characters
    const cleaned = value.replace(/[\s\-()]/g, "");

    // Check if the phone number follows the pattern
    // Mobile numbers can start with 06, 08, 09 and followed by 8 digits.
    // Landline numbers start with 0 followed by 1 or 2 digits for the area code, and then 6 or 7 digits.
    const mobilePattern = /^0[689][0-9]{8}$/;
    const landlinePattern = /^0[2-9][0-9]{7,8}$/;

    validate = mobilePattern.test(cleaned) || landlinePattern.test(cleaned);
    resolve(validate);
  });
}
</script>
