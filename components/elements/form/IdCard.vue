<template>
  <FormKit
    type="number"
    mask="#-####-#####-##-#"
    v-model="idCard"
    placeholder="เลขบัตรประชาชน 13 หลัก"
    :validation-rules="{ isValidThaiID }"
    validation="isValidThaiID|required|matches:/^[0-9]{13}$/"
    :validation-messages="{
      required: 'กรุณาใส่เลขบัตรประชาชน',
      matches: 'เลขบัตรประชาชนควรเป็นตัวเลข 13 หลัก',
      isValidThaiID: 'เลขที่บัตรประชาชนไม่ถูกต้อง',
    }"
    show-mask="false"
    unmask-value="true"
    inputmode="numeric"
    autocomplete="off"
    :readonly="props.isReadOnly"
  />
</template>

<script setup>
// Define props for the component
const props = defineProps({
  formIdCard: String,
  isReadOnly: Boolean,
});

const idCard = props.formIdCard;

const special_characters = function ({ value }) {
  return new Promise((resolve) => {
    const reg = new RegExp(/^(?!.*[!@#$%^&*()_+=\[\]{};':\"\\|,.<>\/?`~])[\w\W]*$/g);
    const validate = reg.test(value);
    resolve(validate);
  });
};

const isValidThaiID = function ({ value }) {
  return new Promise((resolve) => {
    let validate = true;
    if (value.length !== 13 || !value.match(/^[0-9]+$/)) {
      validate = false; // Invalid format
    }

    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(value.charAt(i)) * (13 - i);
    }

    // Calculate checksum
    let checksum = (11 - (sum % 11)) % 10;

    // Compare checksum
    validate = checksum === parseInt(value.charAt(12));
    resolve(validate);
  });
};
</script>
