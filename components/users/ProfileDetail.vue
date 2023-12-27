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
                    <FormKit type="text" label="กำหนดรหัสผ่าน" v-model="passwordText" name="password" placeholder="กรุณาใส่รหัสผ่าน" :validation="[['required'],
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
                      <FormKit type="text" label="กำหนดรหัสผ่านใหม่" v-model="passwordText" name="password" placeholder="กรุณาใส่รหัสผ่าน" :validation="[
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
    <ElementsModalDelGroup
      v-if="isDelGroup" 
      :modal-show="isDelGroup"
      :modal-title="'ยืนยันการลบสาขา'" 
      :modal-type="ModalType.Danger"
      @on-close-Modal="handleCloseModal"
      @on-confirm-modal="handleConfirmModal"
    />
    <!-- <ElementsModalLoading :loading="isLoading"></ElementsModalLoading> -->
</template>

<script setup lang="ts">
import {
  UserDataRes,
  UserCommissionListRes,
  UserGroupListRes,
  delGroupReq,
} from "~/shared/entities/user-entity";
import { ModalType } from "~/shared/entities/enum-entity";

const route = useRoute()
const profileID = route.params.id

const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile", "onDeleteGroup", "checkProfileDetail"])
const userGroupList: globalThis.Ref<UserGroupListRes[] | undefined> = ref();

const messageError = ref("");


const isError = ref(false);
const isLoading = ref(false);

var userIDRes = ref("");
var passwordText = ref("");
var password_confirm = ref("");
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

onMounted(() => {
  loadGroupList();

  console.log("Commission list component ", props.userCommissionList)

  //if (props.userDetails && originalUserPass.value !== null) {
  if (props.userDetails) {
    console.log("props.userDetails && originalUserPass.value !== null")
    passwordText.value = "";
    password_confirm.value = "";
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

</script>