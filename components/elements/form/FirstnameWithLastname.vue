<template>
  <div class="row-firstname-with-lastname">
    <div class="col-firstname">
      <FormKit type="text" label="ชื่อ" name="firstname" placeholder="ชื่อ" validation="required" :validation-messages="{
        required: 'กรุณาใส่ชื่อ'
      }" autocomplete="off" />
    </div>
    <div class="col-lastname">
      <FormKit type="text" label="นามสกุล" name="lastname" placeholder="นามสกุล" validation="required"
        :validation-messages="{
          required: 'กรุณาใส่นามสกุล'
        }" autocomplete="off" />
    </div>
  </div>
</template>