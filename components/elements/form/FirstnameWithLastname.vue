<template>
  <div class="row-firstname-with-lastname">
    <div class="col-firstname">
      <FormKit type="text" label="ชื่อ" name="firstname" v-model="firstName" placeholder="ชื่อ" validation="required"
        :validation-messages="{
          required: 'กรุณาใส่ชื่อ'
        }" autocomplete="off" :readonly="props.isReadOnly" />
    </div>
    <div class="col-lastname">
      <FormKit type="text" label="นามสกุล" name="lastname" v-model="lastName" placeholder="นามสกุล" validation="required"
        :validation-messages="{
          required: 'กรุณาใส่นามสกุล'
        }" autocomplete="off" :readonly="props.isReadOnly" />
    </div>
  </div>
</template>

<script setup>
// Define props for the component
const props = defineProps({
  formFirstName: String,
  formLastName: String,
  isReadOnly: Boolean
})

const firstName = props.formFirstName
const lastName = props.formLastName
</script>