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
          <div id="collapse-user-secret" class="accordion-collapse collapse show" data-bs-parent="#accordion-user-secret">
            <div class="accordion-body">

              <div class="form-placeorder">

                <div class="row" v-if="props.userDetails && props.userDetails.UserID">
                  <div class="col">
                    <div class="user-detail">
                      <h4 class="title">ชื่อผู้ใช้งาน</h4>
                      <p>{{ props.userDetails.UserName }}</p>
                      <FormKit name="SubUserID" type="hidden" :value="props.userDetails.UserID" />
                    </div>
                  </div>
                </div>

                <div class="row" v-if="!props.userDetails?.UserID">
                  <div class="col-md-6">
                    <FormKit type="text" label="กำหนดรหัสผ่าน" name="Password" placeholder="กรุณาใส่รหัสผ่าน" :validation="[['required'],
                    ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:,./|`'_+-]).*$/
                    ],
                    ['length', 8, 128],
                    ]"
                      :validation-messages="{ required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร' }"
                      autocomplete="off" />
                  </div>
                  <div class="col-md-6">
                    <FormKit type="text" label="ทวนรหัสผ่านอีกครั้ง" name="Password_confirm"
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
                    <FormKit type="text" label="กำหนดรหัสผ่านใหม่" name="Password" placeholder="กรุณาใส่รหัสผ่าน"
                      :validation="[
                        ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:,./|`'_+-]).*$/
                        ],
                        ['length', 8, 128],
                      ]"
                      :validation-messages="{ matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร' }"
                      autocomplete="off" />
                  </div>
                  <div class="col-md-6">
                    <FormKit type="text" label="ทวนรหัสผ่านใหม่อีกครั้ง" name="Password_confirm"
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
              placeholder="ระบุชื่อ" validation="required" :validation-messages="{
                required: 'กรุณาใส่ชื่อ'
              }" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="text" label="นามสกุล" name="LastName" :value="props.userDetails?.LastName"
              placeholder="ระบุนามสกุล" validation="required" :validation-messages="{
                required: 'กรุณาใส่นามสกุล'
              }" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" :value="props.userDetails?.Phone"
              maxlength="10" placeholder="ตัวอย่าง 0987654321" validation="required|+length:10|number"
              :validation-messages="{
                required: 'กรุณาใส่หมายเลขโทรศัพท์',
                length: 'หมายเลขโทรศัพท์มีจำนวน 10 หลัก',
                number: 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
              }" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="email" label="อีเมล" name="Email" :value="props.userDetails?.Email"
              placeholder="ตัวอย่าง abc@email.com" validation="required|email" :validation-messages="{
                required: 'กรุณาใส่อีเมล',
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
            <FormKit type="number" label="ผลตอบแทน (%)" name="Commission" placeholder="ระบุผลตอบแทน" :value="props.userDetails?.Commission" min="0"
              max="99" validation="required|min:0|max:99|number" :validation-messages="{
                required: 'กรุณาระบุผลตอบแทน',
                min: 'ผลตอบแทนต่ำสุด 0%',
                max: 'ผลตอบแทนสูงสุดไม่เกิน 99%',
                number: 'กรุณาใส่เป็นตัวเลขเท่านั้น',
              }" autocomplete="off" />
          </div>
          <!-- <div class="col-12">
            <FormKit type="text" label="สาขา" name="Branch" placeholder="x,xxx" v-model="branchText" autocomplete="off" />
          </div> -->
          <div class="col-12">
            <!-- <FormKit type="form" :actions="false"> -->
            <FormKit name="BranchName" type="taglist" label="สาขา (optional)" :value="props.userDetails?.UserGroupName"
              placeholder="ระบุสาขา" :options="searchBranch" :allow-new-values="true" max="1" autocomplete="off" />
            <!-- </FormKit> -->
          </div>
          <!-- <div class="col-12 d-none">
            <div class="form-hide-label accept-box">
              <FormKit type="checkbox" value="accept" name="terms-conditions" label="เปิดใช้งาน" v-model="isActive" />
            </div>
          </div> -->
          <div class="col-12">
            <h5 class="tags-label">รายชื่อสาขาที่มีอยู่</h5>
            <div class="tags-list">
              <template v-for="(item, i) in userGroupList" :key="i">
                <span class="tag-item badge-bg-primary">
                  {{ item.Name }}
                  <i @click="deleteBranch(item.ID)"></i>
                </span>
              </template>
            </div>
          </div>

        </div>

      </div>

    </div>
  </div>

  <ElementsModalDelGroup v-if="isDelGroup" :modal-show="isDelGroup" :modal-title="'ยืนยันการลบสาขา'"
    :modal-type="ModalType.Danger" @on-close-Modal="handleCloseModal" @on-confirm-modal="handleConfirmModal" />
</template>

<script setup lang="ts">
import {
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
  loadData: Boolean,
  getUserPassword: String,
  userID: String,
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

</script>