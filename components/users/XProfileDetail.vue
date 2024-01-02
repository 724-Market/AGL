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

                <div class="row" v-if="props.userDetails?.UserID">
                  <div class="col">
                    <div class="user-detail">
                      <h4 class="title">ชื่อผู้ใช้งาน</h4>
                      <p>{{ userIDRes }}</p>
                    </div>
                  </div>
                </div>

                <div class="row" v-if="!profileID">
                  <div class="col-md-6">
                    <FormKit type="text" label="กำหนดรหัสผ่าน" v-model="passwordText" name="password"
                      placeholder="กรุณาใส่รหัสผ่าน" :validation="[['required'],
                      ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
                      ],
                      ['length', 8, 128],
                      ]"
                      :validation-messages="{ required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร' }"
                      autocomplete="off" />
                  </div>
                  <div class="col-md-6">
                    <FormKit type="text" label="ทวนรหัสผ่านอีกครั้ง" name="password_confirm"
                      placeholder="กรุณาทวนรหัสผ่าน" :validation="[['required'],
                      ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
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
                    <FormKit type="text" label="กำหนดรหัสผ่านใหม่" v-model="passwordText" name="password"
                      placeholder="กรุณาใส่รหัสผ่าน" :validation="[
                        ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
                        ],
                        ['length', 8, 128],
                      ]"
                      :validation-messages="{ matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร' }"
                      autocomplete="off" />
                  </div>
                  <div class="col-md-6">
                    <FormKit type="text" label="ทวนรหัสผ่านใหม่อีกครั้ง" name="password_confirm"
                      placeholder="กรุณาทวนรหัสผ่าน" :validation="[
                        ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
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
            <FormKit type="text" label="ชื่อ" name="FirstName" placeholder="ระบุชื่อ" v-model="firstNameText"
              validation="required" :validation-messages="{
                required: 'กรุณาใส่ชื่อ'
              }" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="text" label="นามสกุล" name="LastName" placeholder="ระบุนามสกุล" v-model="lastNameText"
              validation="required" :validation-messages="{
                required: 'กรุณาใส่นามสกุล'
              }" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" maxlength="10"
              placeholder="ตัวอย่าง 0987654321" validation="required|+length:10|number" :validation-messages="{
                required: 'กรุณาใส่หมายเลขโทรศัพท์',
                length: 'หมายเลขโทรศัพท์มีจำนวน 10 หลัก',
                number: 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
              }" v-model="phoneNumberText" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="email" label="อีเมล" name="Email" placeholder="ตัวอย่าง abc@email.com"
              validation="required|email" :validation-messages="{
                required: 'กรุณาใส่อีเมล',
                email: 'รูปแบบอีเมลไม่ถูกต้อง'
              }" v-model="emailText" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="number" label="กำหนดวงเงินต่อวัน (บาท)" name="LimitMoney" min="0" max="1000000"
              validation="required|min:0|max:1000000|number" :validation-messages="{
                required: 'กรุณากำหนดวงเงิน',
                min: 'วงเงินต่ำสุด 0 บาท',
                max: 'วงเงินสูงสุดไม่เกิน 1,000,000 บาท',
                number: 'กรุณาใส่เป็นตัวเลขเท่านั้น',
              }" v-model="limitMoney" autocomplete="off" />
          </div>
          <div class="col-md-6">
            <FormKit type="number" label="ผลตอบแทน (%)" name="Commission" min="0" max="99"
              validation="required|min:0|max:99|number" :validation-messages="{
                required: 'กรุณาระบุผลตอบแทน',
                min: 'ผลตอบแทนต่ำสุด 0%',
                max: 'ผลตอบแทนสูงสุดไม่เกิน 99%',
                number: 'กรุณาใส่เป็นตัวเลขเท่านั้น',
              }" v-model="commission" autocomplete="off" />
          </div>
          <div class="col-12">
            <FormKit type="text" label="สาขา" name="Branch" placeholder="x,xxx" v-model="branchText" autocomplete="off" />
          </div>
          <div class="col-12">
            <!-- <FormKit type="form" :actions="false"> -->
            <FormKit name="Branch" type="taglist" label="สาขา" placeholder="ระบุสาขา" :options="searchBranch"
              :allow-new-values="true" max="1" v-model="branchText" autocomplete="off" />
            <!-- </FormKit> -->
          </div>
          <div class="col-12 d-none">
            <div class="form-hide-label accept-box">
              <FormKit type="checkbox" value="accept" name="terms-conditions" label="เปิดใช้งาน" v-model="isActive" />
            </div>
          </div>
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
  UserProfileReq,
  UserDataRes,
  UserCommissionListRes,
  UserGroupListRes,
  delGroupReq,
} from "~/shared/entities/user-entity";
import { ModalType } from "~/shared/entities/enum-entity";
import { useStoreUserSave } from "~/stores/user/storePasswordUser";

const route = useRoute()
const profileID = route.params.id

const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile", "onDeleteGroup", "checkProfileDetail"])
const userGroupList: globalThis.Ref<UserGroupListRes[] | any> = ref();

const userSave = useStoreUserSave();

const messageError = ref("");

const dateNow: Date = new Date();

const isError = ref(false);
const isLoading = ref(false);

var userIDRes = ref("");
var passwordText = ref("");
var confirmPasswordText = ref("");
var firstNameText = ref("");
var lastNameText = ref("");
var phoneNumberText = ref("");
var emailText = ref("");
var limitMoney = ref("");
var commission = ref("");
var branchText = ref("");
const isActive = ref(false);
const isDelGroup = ref(false);
const delGroupID = ref("");

const props = defineProps({
  userDetails: {
    type: Object as () => UserDataRes,
  },
  userCommissionList: {
    type: Object as () => UserCommissionListRes[],
  },
  loadData: Boolean,
  getUserPassword: String,
  userID: String,
});

onMounted(async () => {
  loadGroupList()

  // console.log("Commission list component ", props.userCommissionList)

  //if (props.userDetails && originalUserPass.value !== null) {
  if (props.userDetails) {
    // console.log("props.userDetails && originalUserPass.value !== null")
    //passwordText.value = "";
    firstNameText.value = props.userDetails.FirstName;
    lastNameText.value = props.userDetails.LastName;
    phoneNumberText.value = props.userDetails.Phone;
    emailText.value = props.userDetails.Email;

    // Convert string values to numbers
    limitMoney.value = props.userDetails.CreditLimitAmount;
    commission.value = props.userDetails.Commission;
    branchText.value = props.userDetails.UserGroupName;
    isActive.value = !!props.userDetails.IsActive;
    userIDRes.value = props.userDetails?.UserName;
    //userPassRes.value = originalUserPass.value ?? ''; 

    //clearStore()
  }
});

// Search branch function
async function searchBranch({ search }: { search: string }) {
  if (!search || !userGroupList.value) return []

  const filteredList = userGroupList.value.filter((group) =>
    group.Name.toLowerCase().includes(search.toLowerCase())
  )

  return filteredList.map((result) => {
    return {
      label: result.Name,
      value: result.ID
    }
  })
}

const deleteBranch = async (branchid: string) => {
  isDelGroup.value = true;
  delGroupID.value = branchid;
  //emit('onDeleteGroup', branchid);
}

const handleCloseModal = async () => {
  isDelGroup.value = false;
};

const handleConfirmModal = async () => {
  isLoading.value = true;
  let req: delGroupReq = {
    ID: delGroupID.value,
  };
  var response = await useRepository().user.deleteGroup(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    emit('onDeleteGroup');
  } else {
    alert(response.apiResponse.ErrorMessage);
  }
  isLoading.value = false;
};

const clearStore = async () => {
  const req: UserProfileReq = {
    Password: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    CreditLimit: 999,
    Commission: 0,
    BranchName: "",
    IsActive: isActive.value,

  }
  // console.log("submitCreateUser setUser store" + passwordText.value);
  userSave.setUserSave(req);

};

const loadGroupList = async () => {

  const response = await useRepository().user.getGroupList();
  if (
    response.apiResponse.Status &&
    response.apiResponse.Status == "200" &&
    response.apiResponse.Data
  ) {
    userGroupList.value = response.apiResponse.Data;
  } else {
    isError.value = true;
    messageError.value = response.apiResponse.ErrorMessage ?? "";
  }
}

</script>