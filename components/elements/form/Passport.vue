<template>
    <FormKit type="text" label="Passport Number" name="passport" placeholder="Passport Number" validation="required"
        :validation-messages="{
            required: 'กรุณาใส่เลขพาสปอร์ต'
        }" autocomplete="off" />
</template>