<template>
  <Teleport to="body">
    <dialog id="password-dialog" v-if="isShowPassword">
      <div class="dialog-card is-success">
        <div class="card-header" v-if="!isHidden">
          <button type="button" class="btn btn-close btn-close-modal" @click="hideModal">ปิด</button>
        </div>
        <div class="card-body">
          <figure class="dialog-icon">
            <div class="icon check"></div>
          </figure>
          <h5>บันทึกข้อมูลผู้ช่วยสำเร็จ</h5>
          <div class="notice-warning">ข้อมูลผู้ช่วยจะแสดงเพียง<u>แค่ครั้งเดียว</u><br />กรุณาคัดลอกข้อมูลก่อนปิด
          </div>
          <div class="callout">ชื่อผู้ใช้งาน: {{ textUsername }}<br />รหัสผ่าน: {{ textPassword }}<div
              class="badge-success copied" v-if="copied">คัดลอกข้อมูลแล้ว</div>
          </div>
        </div>
        <div class="card-footer">
          <button class="btn-primary" type="button" @click="copy(clipboard)">คัดลอกข้อมูลผู้ช่วย</button>
          <button class="btn-white btn-cancel-modal" type="button" @click="hideModal">ปิด</button>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup>
// Hidden close button
const isHidden = ref(true)

/////////////////////////////////////////
// Clipboard
const clipboard = ref('')
const { text, copy, copied, isSupported } = useClipboard({ clipboard })

/////////////////////////////////////////
const emit = defineEmits(['onClosePassword'])

/////////////////////////////////////////
const props = defineProps({
  isShowPassword: Boolean,
  textUsername: String,
  textPassword: String,
})

/////////////////////////////////////////
onMounted(() => {
  const closeDialogPassword = document.querySelector(".btn-close-modal")
  const cancelDialogPassword = document.querySelector(".btn-cancel-modal")

  if (closeDialogPassword) closeDialogPassword.addEventListener("click", hiddenDialogPassword)
  if (cancelDialogPassword) cancelDialogPassword.addEventListener("click", hiddenDialogPassword)

  if (props.isShowPassword) {
    showDialogPassword()
  }
})

/////////////////////////////////////////
// Function to emit the 'onClosePassword' event
const hideModal = () => emit('onClosePassword')

/////////////////////////////////////////
function showDialogPassword() {
  const dialogPassword = document.getElementById("password-dialog")
  if (dialogPassword) dialogPassword.showModal()
}

/////////////////////////////////////////
function hiddenDialogPassword() {
  const dialogPassword = document.getElementById("password-dialog")
  if (dialogPassword) dialogPassword.close()
}

/////////////////////////////////////////
watch(
  () => props.isShowPassword,
  () => {
    if (props.isShowPassword) {
      showDialogPassword()
    } else {
      hiddenDialogPassword()
    }
  }
)

/////////////////////////////////////////
watchEffect(() => {
  clipboard.value = `🙂  ชื่อผู้ใช้งาน: ${props.textUsername}   🔑  รหัสผ่าน: ${props.textPassword}`
})
</script>