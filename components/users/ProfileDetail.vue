<template>
  <!-- <div class="row">
    <div class="col col-main"> -->

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
                    <FormKit type="text" label="กำหนดรหัสผ่าน" name="password" placeholder="กรุณาใส่รหัสผ่าน" :validation="[['required'],
                    ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
                    ],
                    ['length', 8, 128],
                    ]" :validation-messages="{required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร'}" autocomplete="off" />
                  </div>
                  <div class="col-md-6">
                    <FormKit type="text" label="ทวนรหัสผ่านอีกครั้ง" name="password_confirm"
                      placeholder="กรุณาทวนรหัสผ่าน" :validation="[['required'],
                      ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
                      ],
                      ['length', 8, 128],
                      ['confirm'],
                      ]" :validation-messages="{required: 'กรุณาใส่รหัสผ่าน', matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร', confirm: 'รหัสผ่านไม่ตรงกัน'}" autocomplete="off" />
                  </div>
                </div>
                <div class="row" v-else>
                    <div class="col-md-6">
                      <FormKit type="text" label="กำหนดรหัสผ่านใหม่" name="password" placeholder="กรุณาใส่รหัสผ่าน" :validation="[
                      ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
                      ],
                      ['length', 8, 128],
                      ]" :validation-messages="{matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร'}" autocomplete="off" />
                    </div>
                    <div class="col-md-6">
                      <FormKit type="text" label="ทวนรหัสผ่านใหม่อีกครั้ง" name="password_confirm"
                        placeholder="กรุณาทวนรหัสผ่าน" :validation="[
                        ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[!?@#$%^&*()<>{}=:;,./|`'_+-]).*$/
                        ],
                        ['length', 8, 128],
                        ['confirm'],
                        ]" :validation-messages="{matches: 'รูปแบบของรหัสผ่านไม่ถูกต้อง', length: 'รหัสผ่านควรมีอย่างน้อย 8 ตัวอักษร', confirm: 'รหัสผ่านไม่ตรงกัน'}" autocomplete="off" />
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
            <FormKit type="text" label="ชื่อ" name="FirstName" placeholder="ระบุชื่อ"
              v-model="firstNameText" validation="required" :validation-messages="{
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
            <FormKit type="form" #default="{ tags }" :actions="false">
              <FormKit type="taglist" name="flavors" label="สาขา" :options="['Chocolate', 'Vanilla', 'Strawberry']"
                :value="['Chocolate', 'Vanilla']" :allow-new-values="true" />
              <pre wrap>{{ tags }}</pre>
            </FormKit>
          </div>
          <div class="col-12">
            <FormKit type="text" label="สาขา" name="Branch" placeholder="x,xxx" v-model="branchText"
              autocomplete="false" />
          </div>
          <div class="col-12">
            <div class="form-hide-label accept-box">
              <FormKit type="checkbox" value="accept" name="terms-conditions" label="เปิดใช้งาน" v-model="isActive" />
            </div>
            <template v-for="(item, i) in userGroupList" :key="i">
              <span class="badge-bg-info">
                {{ item.Name }}
                <i @click="deleteBranch(item.ID)">
                  Delete
                </i>
              </span>
            </template>
          </div>
          <!-- <button type="button" class="formkit-input btn btn-primary form-actions"
                                @click="submitCreateUser" label="ไปเลือกวิธีชำระเงิน" name="user-submit" id="user-submit"
                                :loading="isLoading">
                                บันทึก
                              </button> -->

          <!-- <section class="insured-address">
                          <h3>กรอกข้อมูลผู้ใช้งาน</h3>
                          <div class="row">
                            <div class="col-6" v-if="props.userDetails?.UserID">
                              <h3> ชื่อผู้ช่วย : {{ userIDRes }}</h3>
                            </div>
                            <div class="col-6" v-if="userPassRes">
                              <h3> รหัสผ่าน : {{ userPassRes }}</h3>
                              <h3> รหัสผ่านจาก input : {{ userSave.Password }}</h3>
                            </div>

                            <div class="col-6">
                              <FormKit type="text" label="รหัสผ่าน" name="Password" maxlength="10" placeholder="XXXXXXXXXX"
                                v-model="passwordNumberText" autocomplete="false" />
                            </div>
                            <div class="col-6">
                              <FormKit type="text" label="ยืนยันรหัสผ่าน" name="ConfirmPassword" maxlength="10"
                                placeholder="XXXXXXXXXX" v-model="confirmPasswordText" autocomplete="false" />
                            </div>
                            <div class="col-sm-8 col-lg-4">
                              <FormKit type="text" label="ชื่อ" name="FirstName" :value="userDetails?.FirstName"
                                placeholder="ชื่อ" v-model="firstNameText" autocomplete="false" />
                            </div>
                            <div class="col-md-12 col-lg-5">
                              <FormKit type="text" label="นามสกุล" name="LastName" placeholder="นามสกุล"
                                v-model="lastNameText" autocomplete="false" />
                            </div>
                            <div class="col-6">
                              <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" maxlength="10"
                                placeholder="098765XXXX" validation="required|+length:10|number" :validation-messages="{
                                  required: 'กรุณาใส่ข้อมูล',
                                  length: 'กรุณาใส่ตัวเลขเบอร์โทรศัพท์ 10 หลัก',
                                  number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                                }" v-model="phoneNumberText" autocomplete="false" />
                            </div>
                            <div class="col-6">
                              <FormKit type="email" label="อีเมล" name="Email" placeholder="xxxxxx@email.com"
                                autocomplete="false" v-model="emailText" />
                            </div>
                            <div class="col-6">
                              <FormKit type="number" label="กำหนดวงเงินต่อวัน" name="LimitMoney" autocomplete="off"
                                :validation="[['required']]" :validation-messages="{
                                  required: 'กรุณากรอกจำนวนเงิน',
                                  number: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
                                }" v-model="limitMoney" />
                            </div>
                            <div class="col-6">
                              <FormKit type="number" label="ผลตอบแทน" name="Commission" maxlength="1"
                                validation="required|+length:1|number" :validation-messages="{
                                  required: 'กรุณาใส่ข้อมูล',
                                  length: 'กรุณาใส่ตัวเลขเบอร์โทรศัพท์ 1 หลัก',
                                  number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                                }" v-model="commission" autocomplete="off" />
                            </div>
                            <div class="col-6">
                              <FormKit type="text" label="สาขา" name="Branch" placeholder="x,xxx" v-model="branchText"
                                autocomplete="false" />
                            </div>

                            <div class="form-hide-label accept-box">
                              <FormKit type="checkbox" value="accept" name="terms-conditions" label="เปิดใช้งาน"
                                v-model="isActive" />
                            </div>
                            <template v-for="(item, i) in userGroupList" :key="i">
                              <button>
                                <p>{{ item.Name }}</p>
                              </button>
                              <button @click="deleteBranch(item.ID)">
                                Delete
                              </button>
                            </template>
                            <button type="button" class="formkit-input btn btn-primary form-actions"
                              @click="submitCreateUser" label="ไปเลือกวิธีชำระเงิน" name="user-submit" id="user-submit"
                              :loading="isLoading">
                              บันทึก
                            </button>
                          </div>
                        </section> -->

        </div>

      </div>

    </div>
  </div>


  <!-- <div class="card">
        <div class="card-body">
          <div class="accordion" id="accordion-insured-information">
            <div class="accordion-item">
              <div id="collapse-insured-information" class="accordion-collapse collapse show"
                data-bs-parent="#accordion-insured-information">

                <div class="row">

                  <div class="col accordion-body">
                    <div class="form-placeorder">

                      <section class="insured-address">
                        <h3>กรอกข้อมูลผู้ใช้งาน</h3>
                        <div class="row">
                          <div class="col-6" v-if="props.userDetails?.UserID">
                            <h3> ชื่อผู้ช่วย : {{ userIDRes }}</h3>
                          </div>
                          <div class="col-6" v-if="userPassRes">
                            <h3> รหัสผ่าน : {{ userPassRes }}</h3>
                            <h3> รหัสผ่านจาก input : {{ userSave.Password }}</h3>
                          </div>

                          <div class="col-6">
                            <FormKit type="text" label="รหัสผ่าน" name="Password" maxlength="10" placeholder="XXXXXXXXXX"
                              v-model="passwordNumberText" autocomplete="false" />
                          </div>
                          <div class="col-6">
                            <FormKit type="text" label="ยืนยันรหัสผ่าน" name="ConfirmPassword" maxlength="10"
                              placeholder="XXXXXXXXXX" v-model="confirmPasswordText" autocomplete="false" />
                          </div>
                          <div class="col-sm-8 col-lg-4">
                            <FormKit type="text" label="ชื่อ" name="FirstName" :value="userDetails?.FirstName"
                              placeholder="ชื่อ" v-model="firstNameText" autocomplete="false" />
                          </div>
                          <div class="col-md-12 col-lg-5">
                            <FormKit type="text" label="นามสกุล" name="LastName" placeholder="นามสกุล"
                              v-model="lastNameText" autocomplete="false" />
                          </div>
                          <div class="col-6">
                            <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" maxlength="10"
                              placeholder="098765XXXX" validation="required|+length:10|number" :validation-messages="{
                                required: 'กรุณาใส่ข้อมูล',
                                length: 'กรุณาใส่ตัวเลขเบอร์โทรศัพท์ 10 หลัก',
                                number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                              }" v-model="phoneNumberText" autocomplete="false" />
                          </div>
                          <div class="col-6">
                            <FormKit type="email" label="อีเมล" name="Email" placeholder="xxxxxx@email.com"
                              autocomplete="false" v-model="emailText" />
                          </div>
                          <div class="col-6">
                            <FormKit type="number" label="กำหนดวงเงินต่อวัน" name="LimitMoney" autocomplete="off"
                              :validation="[['required']]" :validation-messages="{
                                required: 'กรุณากรอกจำนวนเงิน',
                                number: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
                              }" v-model="limitMoney" />
                          </div>
                          <div class="col-6">
                            <FormKit type="number" label="ผลตอบแทน" name="Commission" maxlength="1"
                              validation="required|+length:1|number" :validation-messages="{
                                required: 'กรุณาใส่ข้อมูล',
                                length: 'กรุณาใส่ตัวเลขเบอร์โทรศัพท์ 1 หลัก',
                                number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                              }" v-model="commission" autocomplete="off" />
                          </div>
                          <div class="col-6">
                            <FormKit type="text" label="สาขา" name="Branch" placeholder="x,xxx" v-model="branchText"
                              autocomplete="false" />
                          </div>

                          <div class="form-hide-label accept-box">
                            <FormKit type="checkbox" value="accept" name="terms-conditions" label="เปิดใช้งาน"
                              v-model="isActive" />
                          </div>
                          <template v-for="(item, i) in userGroupList" :key="i">
                            <button>
                              <p>{{ item.Name }}</p>
                            </button>
                            <button @click="deleteBranch(item.ID)">
                              Delete
                            </button>
                          </template>
                          <button type="button" class="formkit-input btn btn-primary form-actions"
                            @click="submitCreateUser" label="ไปเลือกวิธีชำระเงิน" name="user-submit" id="user-submit"
                            :loading="isLoading">
                            บันทึก
                          </button>
                        </div>
                      </section>

                    </div>
                  </div>

                  <div class="col col-sidebar">

                    <section class="site-sidebar is-sticky">

                      <aside class="card">

                        <div class="card-header">
                          <h3 class="card-title">รายการที่เลือก</h3>

                        </div>

                        <div class="card-body card-table">

                          <div class="summary-table">
                            <table class="table no-striped">
                              <thead>
                                <tr>
                                  <th scope="col">Commission</th>
                                  <th scope="col" class="text-end">Date</th>
                                </tr>
                              </thead>
                              <tbody>
                                <template v-for="(item, j) in props.userCommissionList" :key="j">
                                  <p>{{ item.Commission }} : {{ useUtility().formatDate(item.CreateDate, "DD MMMM BBBB HH: mm: ss") }}</p>
                                </template>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </aside>

                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->

  <!-- </div>

    <div class="col col-sidebar">
      <section class="site-sidebar is-sticky">
        <aside class="card">
          <div class="card-header">
            <h3 class="card-title">บันทึกรายการผู้ช่วย</h3>
          </div>
          <div class="card-body card-table">
            ตาราง log
          </div>
        </aside>

        <aside class="card">
          <div class="card-header">
            <h3 class="card-title">บันทึกรายการผลตอบแทน</h3>
          </div>
          <div class="card-body card-table">
            ตาราง ผลตอบแทน
            <template v-for="(item, j) in props.userCommissionList" :key="j">
              <p>{{ item.Commission }} : {{ useUtility().formatDate(item.CreateDate, "DD MMMM BBBB HH: mm: ss") }}</p>
            </template>
          </div>
        </aside>
      </section>
    </div>

  </div> -->
</template>

<script setup lang="ts">
import {
  UserProfileReq,
  UserDataRes,
  UserCommissionListRes,
  UserGroupListRes,
  delGroupReq,
} from "~/shared/entities/user-entity";

import { useStoreUserSave } from "~/stores/user/storePasswordUser";

const route = useRoute()
const profileID = route.params.id

const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile"])
const userDetails: globalThis.Ref<UserDataRes | undefined> = ref();
const userGroupList: globalThis.Ref<UserGroupListRes[] | undefined> = ref();

const userSave = useStoreUserSave();

const messageError = ref("");

const dateNow: Date = new Date();

const isError = ref(false);
const isLoading = ref(false);

var userIDRes = ref("");
var passwordNumberText = ref("");
var confirmPasswordText = ref("");
var firstNameText = ref("");
var lastNameText = ref("");
var phoneNumberText = ref("");
var emailText = ref("");
const limitMoney = ref(0);
const commission = ref(0);
var branchText = ref("");
const isActive = ref(false);

const props = defineProps({
  userProfile: {
    type: Object as () => UserProfileReq,
  },
  userDetails: {
    type: Object as () => UserDataRes,
  },
  userCommissionList: {
    type: Object as () => UserCommissionListRes[],
  },
  loadData: Boolean,
  getUserPassword: String,
  getStatus: {
    type: [Number, String],
    default: 0,
    validator: (value) => {
      return typeof value === 'number' || (typeof value === 'string' && value.trim() === '') || value === null;
    },
  },
  userID: String,
});

const userPassRes = toRef(props, 'getUserPassword');

// Create a ref to store the initial value
const originalUserPass = ref(props.getUserPassword);

onMounted(() => {
  loadGroupList();

  console.log("Commission list component ", props.userCommissionList)

  if (props.userDetails && originalUserPass.value !== null) {

    passwordNumberText.value = "";
    confirmPasswordText.value = "";
    firstNameText.value = props.userDetails.FirstName;
    lastNameText.value = props.userDetails.LastName;
    phoneNumberText.value = props.userDetails.Phone;
    emailText.value = props.userDetails.Email;

    // Convert string values to numbers
    limitMoney.value = parseFloat(props.userDetails.CreditLimitAmount);
    commission.value = props.userDetails.Commission;
    branchText.value = props.userDetails.UserGroupName;
    isActive.value = !!props.userDetails.IsActive;
    userIDRes.value = props.userDetails?.UserName;
    //userPassRes.value = originalUserPass.value ?? ''; 

    clearStore()
  }
});

const deleteBranch = async (branchid: string) => {
  //ลบแบบร่างนี้
  let confirmAction = confirm("ต้องการลบรายการหรือไม่?");
  if (confirmAction) {
    isLoading.value = true;
    let req: delGroupReq = {
      ID: branchid,
    };
    var response = await useRepository().user.deleteGroup(req);
    if (response.apiResponse.Status && response.apiResponse.Status == "200") {
      //await loadHistoryStatus();
      emit('reProfile', props.userID);

    } else {
      console.log("props.userID" + props.userID)
      alert(response.apiResponse.ErrorMessage);
    }
    isLoading.value = false;
  }
};

const clearStore = async () => {
  const req: UserProfileReq = {
    Password: "",
    FirstName: "",
    LastName: "",
    PhoneNumber: "",
    Email: "",
    CreditLimit: 0,
    Commission: 0,
    BranchName: "",
    IsActive: isActive.value,

  }
  console.log("submitCreateUser setUser store" + passwordNumberText.value);
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
};


// Submit form event
const submitCreateUser = async (formData: any) => {
  if (props.userID == null && passwordNumberText.value != null) {
    const req: UserProfileReq = {
      Password: passwordNumberText.value,
      FirstName: firstNameText.value,
      LastName: lastNameText.value,
      PhoneNumber: phoneNumberText.value,
      Email: emailText.value,
      CreditLimit: limitMoney.value,
      Commission: commission.value,
      BranchName: branchText.value,
      IsActive: isActive.value,

    }
    console.log("submitCreateUser setUser store" + passwordNumberText.value);
    userSave.setUserSave(req);
  }
  if (props.userID == null) {
    // Add waiting time for debug
    emit("createUserConfirm",
      passwordNumberText.value,
      firstNameText.value,
      lastNameText.value,
      phoneNumberText.value,
      emailText.value,
      limitMoney.value,
      commission.value,
      branchText.value,
      isActive.value
    );
  } else {
    if (passwordNumberText.value == null) {
      userSave.clearUserSave()
    }
    emit("editUserConfirm",
      props.userDetails?.UserID,
      passwordNumberText.value,
      firstNameText.value,
      lastNameText.value,
      phoneNumberText.value,
      emailText.value,
      limitMoney.value,
      commission.value,
      branchText.value,
      isActive.value
    );
    passwordNumberText.value = "";
    confirmPasswordText.value = "";
  }
};

// Watch for changes in response.apiResponse.Status
watch(
  () => props.getStatus,
  async (newStatus) => {
    if (newStatus == '200') {
      console.log('User profile update!!!' + newStatus);
      isLoading.value = true;
      await loadGroupList();
      isLoading.value = false;

    }
  }
);
</script>