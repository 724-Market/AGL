<template>
  <div class="row-firstname-with-lastname">
    <div class="col-firstname">
      <FormKit type="text" label="ชื่อ" name="firstname" placeholder="ชื่อ" validation="required" :validation-messages="{
        required: 'กรุณาใส่ชื่อ'
      }" autocomplete="off" v-model="firstName" :readonly="props.isReadOnly" />
    </div>
    <div class="col-lastname">
      <FormKit type="text" label="นามสกุล" name="lastname" placeholder="นามสกุล" validation="required"
        :validation-messages="{
          required: 'กรุณาใส่นามสกุล'
        }" autocomplete="off" v-model="lastName" :readonly="props.isReadOnly" />
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