<template>
  <div class="card">
    <div class="card-body">

      <div class="accordion" id="accordion-user-secret">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapse-user-secret" aria-expanded="true"
              aria-controls="collapse-user-secret">ชื่อผู้ใช้งานและรหัสผ่าน</button>
          </h2>
          <div id="collapse-user-secret" class="accordion-collapse collapse show"
            data-bs-parent="#accordion-user-secret">
            <div class="accordion-body">

              <div class="form-placeorder">

                <div class="row" v-if="props.userDetails && props.userDetails.UserID">
                  <div class="col">
                    <div class="user-detail">
                      <h4 class="title">ชื่อผู้ใช้งาน</h4>
                      <p>{{ props.userDetails.UserName }}</p>
                      <FormKit name="SubUserID" type="hidden" :value="props.userDetails.UserID" />
                      <FormKit name="UserName" type="hidden" :value="props.userDetails.UserName" />
                    </div>
                  </div>
                </div>

                <div class="row" v-if="!props.userDetails?.UserID">
                  <div class="col-md-6">
                    <FormKit type="password" label="กำหนดรหัสผ่าน" name="Password" placeholder="กรุณาใส่รหัสผ่าน"
                      :validation="[['required'],
                ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:,./|`'_+-]).*$/
                ],
                ['length', 8, 128],
                ]"
                      :validation-messages="{ required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร' }"
                      autocomplete="off" />
                  </div>
                  <div class="col-md-6">
                    <FormKit type="password" label="ทวนรหัสผ่านอีกครั้ง" name="Password_confirm"
                      placeholder="กรุณาทวนรหัสผ่าน" :validation="[['required'],
                ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:,./|`'_+-]).*$/
                ],
                ['length', 8, 128],
                ['confirm'],
                ]"
                      :validation-messages="{ required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร', confirm: 'รหัสผ่านไม่ตรงกัน' }"
                      autocomplete="off" />
                  </div>
                </div>
                <div class="row" v-else>
                  <div class="col-md-6">
                    <FormKit type="password" label="กำหนดรหัสผ่านใหม่" name="NewPassword" placeholder="กรุณาใส่รหัสผ่าน"
                      :validation="[
                  ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:,./|`'_+-]).*$/
                  ],
                  ['length', 8, 128],
                ]"
                      :validation-messages="{ matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร' }"
                      autocomplete="off" />
                  </div>
                  <div class="col-md-6">
                    <FormKit type="password" label="ทวนรหัสผ่านใหม่อีกครั้ง" name="NewPassword_confirm"
                      placeholder="กรุณาทวนรหัสผ่าน" :validation="[
                  ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:,./|`'_+-]).*$/
                  ],
                  ['length', 8, 128],
                  ['confirm'],
                ]"
                      :validation-messages="{ matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร', confirm: 'รหัสผ่านไม่ตรงกัน' }"
                      autocomplete="off" />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  </div>

  <div class="card">
    <div class="card-header">
      <h3 class="card-title">ข้อมูลผู้ช่วย</h3>
    </div>
    <div class="card-body">

      <div class="form-placeorder">

        <div class="row">
          <div class="col-md-6">
            <FormKit type="text" label="ชื่อ" name="FirstName" :value="props.userDetails?.FirstName"
              placeholder="ระบุชื่อ" :validation-rules="{ isValidThaiValue }" validation="isValidThaiValue|required"
              :validation-messages="{
                  required: 'กรุณาใส่ชื่อ',
                  isValidThaiValue: 'กรุณาใส่ชื่อเป็นภาษาไทย'
                }" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="text" label="นามสกุล" name="LastName" :value="props.userDetails?.LastName"
              placeholder="ระบุนามสกุล" :validation-rules="{ isValidThaiValue }" validation="isValidThaiValue|required"
              :validation-messages="{
                  required: 'กรุณาใส่นามสกุล',
                  isValidThaiValue: 'กรุณาใส่นามสกุลเป็นภาษาไทย'
                }" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="mask" mask="###-###-####" label="เบอร์มือถือ" name="PhoneNumber"
              :value="props.userDetails?.Phone" placeholder="เบอร์มือถือ 10 หลัก"
              :validation-rules="{ isValidThaiPhoneNumber }"
              validation="isValidThaiPhoneNumber|required|matches:/^[0-9]{10}$/" :validation-messages="{
                  required: 'กรุณาใส่เบอร์มือถือ',
                  matches: 'เบอร์มือถือมีจำนวน 10 หลัก',
                  isValidThaiPhoneNumber: 'กรุณากรอกเบอร์มือถือให้ถูกต้อง'
                }" show-mask="false" unmask-value="true" inputmode="numeric" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="email" label="อีเมล" name="Email" :value="props.userDetails?.Email"
              placeholder="ตัวอย่าง abc@email.com" validation="email" :validation-messages="{
                  email: 'รูปแบบอีเมลไม่ถูกต้อง'
                }" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="number" label="กำหนดวงเงินต่อวัน (บาท)" name="CreditLimit" placeholder="ระบุวงเงินต่อวัน"
              :value="props.userDetails?.CreditLimitAmount" min="0" max="1000000"
              validation="required|min:0|max:1000000|number" :validation-messages="{
                  required: 'กรุณากำหนดวงเงิน',
                  min: 'วงเงินต่ำสุด 0 บาท',
                  max: 'วงเงินสูงสุดไม่เกิน 1,000,000 บาท',
                  number: 'กรุณาใส่เป็นตัวเลขเท่านั้น',
                }" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="number" label="ผลตอบแทน (%)" name="Commission" placeholder="ระบุผลตอบแทน"
              :value="props.userDetails?.Commission" min="0" max="99" validation="required|min:0|max:99|number"
              :validation-messages="{
                  required: 'กรุณาระบุผลตอบแทน',
                  min: 'ผลตอบแทนต่ำสุด 0%',
                  max: 'ผลตอบแทนสูงสุดไม่เกิน 99%',
                  number: 'กรุณาใส่เป็นตัวเลขเท่านั้น',
                }" autocomplete="off" />
          </div>

          <FormKit type="hidden" name="BranchName" value="" />

          <!-- <div class="col-12">
            <FormKit type="text" label="สาขา" name="Branch" placeholder="x,xxx" v-model="branchText" autocomplete="off" />
          </div> -->
          <!-- <div class="col-12">
            
            <FormKit name="BranchName" type="taglist" label="สาขา (optional)" :value="props.userDetails?.UserGroupName"
              placeholder="ระบุสาขา" :options="searchBranch" :allow-new-values="true" max="1" autocomplete="off" />

          </div> -->
          <!-- <div class="col-12 d-none">
            <div class="form-hide-label accept-box">
              <FormKit type="checkbox" value="accept" name="terms-conditions" label="เปิดใช้งาน" v-model="isActive" />
            </div>
          </div> -->
          <!-- <div class="col-12">
            <h5 class="tags-label">รายชื่อสาขาที่มีอยู่</h5>
            <div class="tags-list">
              <template v-for="(item, i) in userGroupList" :key="i">
                <span class="tag-item badge-bg-primary">
                  {{ item.Name }}
                  <i @click="deleteBranch(item.ID)"></i>
                </span>
              </template>
</div>
</div> -->

        </div>

      </div>

    </div>
  </div>

  <ElementsModalDelGroup v-if="isDelGroup" :modal-show="isDelGroup" :modal-title="'ยืนยันการลบสาขา'"
    :modal-type="ModalType.Danger" @on-close-Modal="handleCloseModal" @on-confirm-modal="handleConfirmModal" />
</template>

<script setup lang="ts">
import type {
  UserDataRes,
  UserProfileReq,
  UserGroupListRes,
  UserBranch,
  delGroupReq
} from "~/shared/entities/user-entity"
import { ModalType } from "~/shared/entities/enum-entity"
import { useStoreUserSave } from "~/stores/user/storePasswordUser"

const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile", "onDeleteGroup", "checkProfileDetail"])
const userGroupList: globalThis.Ref<UserGroupListRes | any> = ref()

const userSave = useStoreUserSave()

const messageError = ref("")

const dateNow: Date = new Date()

const isError = ref(false)
const isLoading = ref(false)
const isDelGroup = ref(false)
const delGroupID = ref("")

const props = defineProps({
  userDetails: {
    type: Object as () => UserDataRes | null
  },
  passwordText: String
})



onMounted(async () => {
  loadGroupList()
})

// Search branch function
async function searchBranch({ search }: { search: string }): Promise<string[]> {
  if (!search || !userGroupList.value) return []

  const filteredList: UserBranch[] = userGroupList.value.filter((group: UserBranch) =>
    group.Name.toLowerCase().includes(search.toLowerCase())
  )
  return filteredList.map((result: UserBranch) => result.Name)
}

const deleteBranch = async (branchid: string) => {
  isDelGroup.value = true
  delGroupID.value = branchid
  //emit('onDeleteGroup', branchid)
}

const handleCloseModal = async () => {
  isDelGroup.value = false
}

const handleConfirmModal = async () => {
  isLoading.value = true
  let req: delGroupReq = {
    ID: delGroupID.value,
  }
  var response = await useRepository().user.deleteGroup(req)
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    emit('onDeleteGroup')
  } else {
    alert(response.apiResponse.ErrorMessage)
  }
  isLoading.value = false
}

const loadGroupList = async () => {

  const response = await useRepository().user.getGroupList()
  if (
    response.apiResponse.Status &&
    response.apiResponse.Status == "200" &&
    response.apiResponse.Data
  ) {
    userGroupList.value = response.apiResponse.Data
  } else {
    isError.value = true
    messageError.value = response.apiResponse.ErrorMessage ?? ""
  }
}

function isValidThaiPhoneNumber({ value }) {
  return new Promise((resolve) => {
    let validate = true;
    // Remove any formatting characters
    const cleaned = value.replace(/[\s\-()]/g, "");

    // Check if the phone number follows the pattern
    // Mobile numbers can start with 06, 08, 09 and followed by 8 digits.
    // Landline numbers start with 0 followed by 1 or 2 digits for the area code, and then 6 or 7 digits.
    const mobilePattern = /^0[689][0-9]{8}$/;
    //const landlinePattern = /^0[2-9][0-9]{7,8}$/;

    //validate = mobilePattern.test(cleaned) || landlinePattern.test(cleaned);
    validate = mobilePattern.test(cleaned);
    resolve(validate);
  });
}

function isValidThaiValue({ value }) {
  return new Promise((resolve) => {
    let validate = true;
    const cleaned = value.replace(/[\s\-()]/g, "");
    const thaiPattern = /^[ก-๙]+$/; // Match Thai characters
    validate = thaiPattern.test(cleaned);
    resolve(validate);
  });
}

</script>