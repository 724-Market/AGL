<template>
  <FormKit type="number" placeholder="กรอกรหัส OTP 6 หลัก" validation="required|matches:/^[0-9]{6}$/|number|length"
    :validation-messages="{
      required: 'กรุณาใส่รหัส OTP',
      matches: 'รหัสต้องมี 6 หลัก',
      number: 'รหัสต้องเป็นตัวเลข',
      length: 'รหัสต้องมี 6 หลัก'
    }" inputmode="numeric" autocomplete="off" :readonly="countdown <= 0">
    <template #help="context">
      <div :class="context.classes.help">
        <button type="button" class="send-otp-link text-end" title="ส่งรหัส OTP อีกครั้ง" @click="resendOTP"
          :disabled="countdown > 0">{{
            countdown > 0 ? `กรอกรหัสภายใน (${countdown})` : 'ส่งรหัส OTP อีกครั้ง' }}</button>
      </div>
    </template>
    <template #label="context">
      <div :class="context.classes.label">
        <label class="text-center">รหัสอ้างอิง REFCODE: ({{ props.propsOTP.refCode }})</label>
      </div>
    </template>
  </FormKit>
</template>

<script setup lang="ts">
// Define emit function to emit events on modal
const emit = defineEmits(['onResendOTP'])

/////////////////////////////////////////
// Define props
const props = defineProps(['propsOTP'])

/////////////////////////////////////////
// Define variables
const countdown = ref(0)

/////////////////////////////////////////
// Function to emit the 'resendOTP' event
const resendOTP = () => {
  emit('onResendOTP')

  // Start the countdown timer
  startCountdown(10) // Set the countdown duration (in seconds)
}

/////////////////////////////////////////
// Countdown function
const startCountdown = (duration: number) => {
  countdown.value = duration

  const intervalId = setInterval(() => {
    countdown.value--

    if (countdown.value === 0) {
      clearInterval(intervalId)
    }
  }, 1000)
}

/////////////////////////////////////////
// on Mounted
onMounted(() => {
  // Optionally, start the countdown automatically when the component is mounted
  startCountdown(10) // Set the countdown duration (in seconds)
})
</script>