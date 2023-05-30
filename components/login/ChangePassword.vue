<template>
  <div class="card-login">

    <header class="form-header">
      <h1 class="title">เปลี่ยนรหัสผ่าน</h1>
      <h2 class="subtitle">ควรสร้างรหัสผ่านที่ปลอดภัย</h2>
      <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>
    </header>

    <FormKit type="form" @submit="submitChangepassword" :actions="false" id="form-changepassword"
      form-class="form-login form-theme" #default="{ value }" v-model="values" :incomplete-message="false">

      <FormKit type="text" label="รหัสผ่านเดิม" name="oldpassword" placeholder="รหัสผ่านเดิม" :validation="[['required'],
      ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
      ],
      ['length', 8, 128],
      ]" :validation-messages="{
  required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร'
}" autocomplete="off" />

      <ElementsFormPasswordWithConfirm />

      <div class="form-meta">
        <ElementsFormPasswordRequirements />
      </div>

      <FormKit type="submit" label="ยืนยันใช้รหัสผ่านนี้" name="changepassword-submit" id="changepassword-submit"
        :classes="{
          input: 'btn-primary',
          outer: 'form-actions'
        }" :disabled="isLoading" :loading="isLoading" />

    </FormKit>

  </div>
</template>

<script setup>

//// Variables

// Loading state after form submiting
const isLoading = ref(false)
// Submitted state after submit
const submitted = ref(false)
// Completed state if form was submitted successful
const completed = ref(false)
// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

// Submit form event
const submitChangepassword = async (formData) => {

  // Add waiting time for debug
  // await new Promise((r) => setTimeout(r, 1000))

  try {

    // For Test server error 500
    // const { data, error } = await useFetch('http://httpbin.org/status/500', {

    const { data, error } = await useFetch('/api/aglove', {
      method: "POST",

      // Field [name] mapping
      body: {
        URL: '/Agent/password/change',
        OldPassword: formData.password,
        NewPassword: formData.password
      },

      // Response from API
      onResponse({ request, response }) {
        console.log('%csubmitChangepassword%cline:76%crequest', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px', request)
        console.log('%csubmitChangepassword%cline:76%cresponse', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(1, 77, 103);padding:3px;border-radius:2px', response)
        console.log('%csubmitChangepassword%cline:80%cresponse.status', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px', response.status)

        // Server error 500
        if (response.status === 500) {

          statusMessage.value = response.statusText
          statusMessageType.value = 'notice-danger'
          console.log('%csubmitChangepassword%cline:83%cresponse.statusText', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(252, 157, 154);padding:3px;border-radius:2px', response.statusText)

          // API not found
        } else if (response.status === 404) {

          statusMessage.value = response.statusText
          statusMessageType.value = 'notice-danger'
          console.log('%csubmitChangepassword%cline:89%cstatusMessage.value = response.statusText', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(114, 83, 52);padding:3px;border-radius:2px', statusMessage.value = response.statusText)

        } else {

          // Connect API Successful
          if (response.status === 200) {
            const responseData = JSON.parse(response._data)

            // Error case
            switch (responseData.Status) {
              case 200:
                statusMessage.value = responseData.Message ? 'เข้าสู่ระบบสำเร็จ' : 'ไม่มีข้อความส่งมา'
                statusMessageType.value = 'notice-success'

                // Form completed
                completed.value = true

                break;

              case 400:
                statusMessage.value = responseData.ErrorMessage ? 'เออเร่อคร้าบบบ' : 'ไม่มีข้อความ error ส่งมา'
                statusMessageType.value = 'notice-warning'

              default:
                break;
            }

            console.log('%csubmitChangepassword%cline:110%cresponseData.Status', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(3, 101, 100);padding:3px;border-radius:2px', responseData.Status)
            console.log('%csubmitChangepassword%cline:115%cresponseData.Message', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(130, 57, 53);padding:3px;border-radius:2px', responseData.Message)
            console.log('%csubmitChangepassword%cline:113%cresponseData.ErrorCode', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(251, 178, 23);padding:3px;border-radius:2px', responseData.ErrorCode)
            console.log('%csubmitChangepassword%cline:114%cresponseData.ErrorMessage', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(39, 72, 98);padding:3px;border-radius:2px', responseData.ErrorMessage)
            console.log('%csubmitChangepassword%cline:116%cresponseData.Options', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(237, 222, 139);padding:3px;border-radius:2px', responseData.Options)
            console.log('%csubmitChangepassword%cline:117%cresponseData.Data', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(20, 68, 106);padding:3px;border-radius:2px', responseData.Data)

          }
        }
      }
    })

    // Form submitted
    submitted.value = true

  } catch (error) {

    // Form not submitted
    submitted.value = false

    if (error.response) {

      console.log('HTTP response error')
      console.log(error.response)

    } else if (error.request) {

      console.log('HTTP request error')
      console.log(error.request)

    } else {

      console.log(error.message)

    }

    console.log(error.config)

  }
}

</script>