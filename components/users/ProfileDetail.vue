<template>
    <div class="card">
      <div class="card-body">
        <div class="accordion" id="accordion-insured-information">
          <div class="accordion-item">
            <div
              id="collapse-insured-information"
              class="accordion-collapse collapse show"
              data-bs-parent="#accordion-insured-information"
            >

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
                        <FormKit
                          type="text"
                          label="รหัสผ่าน"
                          name="Password"
                          maxlength="10"
                          placeholder="XXXXXXXXXX"
                          v-model="passwordNumberText"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="ยืนยันรหัสผ่าน"
                          name="ConfirmPassword"
                          maxlength="10"
                          placeholder="XXXXXXXXXX"
                          v-model="confirmPasswordText"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-4">
                        <FormKit
                          type="text"
                          label="ชื่อ"
                          name="FirstName"
                          :value="userDetails?.FirstName"
                          placeholder="ชื่อ"
                          v-model="firstNameText"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-md-12 col-lg-5">
                        <FormKit
                          type="text"
                          label="นามสกุล"
                          name="LastName"
                          placeholder="นามสกุล"
                          v-model="lastNameText"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="PhoneNumber"
                          maxlength="10"
                          placeholder="098765XXXX"
                          validation="required|+length:10|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขเบอร์โทรศัพท์ 10 หลัก',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          v-model="phoneNumberText"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="email"
                          label="อีเมล"
                          name="Email"
                          placeholder="xxxxxx@email.com"
                          autocomplete="false"
                          v-model="emailText"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="number"
                          label="กำหนดวงเงินต่อวัน"
                          name="LimitMoney"
                          autocomplete="off"
                          :validation="[['required']]"
                          :validation-messages="{
                            required: 'กรุณากรอกจำนวนเงิน',
                            number: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
                          }"
                          v-model="limitMoney"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="number"
                          label="ผลตอบแทน"
                          name="Commission"
                          maxlength="1"
                          step="1"
                          v-model="commission"
                          autocomplete="off"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="สาขา"
                          name="Branch"
                          placeholder="x,xxx"
                          v-model="branchText"
                          autocomplete="false"
                        />
                      </div>

                      <div class="form-hide-label accept-box">
                        <FormKit
                          type="checkbox"
                          value="accept"
                          name="terms-conditions"
                          label="เปิดใช้งาน"
                          v-model="isActive"
                        />
                      </div>
                      <template v-for="(item, i) in userGroupList" :key="i">
                        <button >
                         <p>{{ item.Name }}</p>
                        </button>
                        <button @click="deleteBranch(item.ID)">
                          Delete
                        </button>
                      </template>
                      <button
                        type="button"
                        class="formkit-input btn btn-primary form-actions"
                        @click="submitCreateUser"
                        label="ไปเลือกวิธีชำระเงิน"
                        name="user-submit"
                        id="user-submit"
                        :loading="isLoading"
                      >
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
                            <template v-for="(item, j) in userCommissionList" :key="j">
                              <p>{{ item.Commission }} : {{ useUtility().formatDate(item.CreateDate, "DD MMMM BBBB HH:mm:ss") }}</p>
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
    </div>
  </template>
  <script setup lang="ts">
  import { 
    UserProfileReq,
    UserDataRes,
    UserCommissionListReq,
    UserCommissionListRes,
    UserGroupListRes,
    delGroupReq,
  } from "~/shared/entities/user-entity";
   
  import { useStoreUserSave } from "~/stores/user/storePasswordUser";
  import { defineProps, onMounted } from 'vue';
  import { toRef } from 'vue';

  const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile"])
  const userDetails: globalThis.Ref<UserDataRes | undefined> = ref();
  const userGroupList: globalThis.Ref<UserGroupListRes | undefined> = ref();
  const userCommissionList: Ref<UserCommissionListRes[]> = ref([]);

  const userSave = useStoreUserSave();

  const isError = ref(false);
  const messageError = ref("");
   
  const dateNow: Date = new Date();
  
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
    getUserPassword: String,
    userID: String,
  });
 
  const userPassRes = toRef(props, 'getUserPassword');

  // Create a ref to store the initial value
  const originalUserPass = ref(props.getUserPassword);

  onMounted(() => {
    loadGroupList();
    if (props.userID){
      loadCommissionList(props.userDetails?.UserID);
    }

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
      console.log("props.userID"+props.userID)
      alert(response.apiResponse.ErrorMessage);
    }
    isLoading.value = false;
  }
};

const clearStore = async () => {
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

const loadCommissionList = async (userid: string) => {
  const useCommisionReq: UserCommissionListReq = {
    SubUserID: userid,
    Paging: {
      Page: 0,
      Length: 10,
      TotalRecord: 0,
    }
  }
  
  const response = await useRepository().user.getCommionList(useCommisionReq);

    if (
      response.apiResponse.Status !== undefined &&
      response.apiResponse.Status === 200 &&
      response.apiResponse.Data
    ) {
      userCommissionList.value = Array.isArray(response.apiResponse.Data)
        ? response.apiResponse.Data
        : [response.apiResponse.Data]; // Convert to array if not already
    } else {
      console.log("User CommissionList fail!!!")
      isError.value = true;
      messageError.value = response.apiResponse.ErrorMessage ?? "";
    }
  };


// Submit form event
const submitCreateUser = async (formData: any) => {
  if (props.userID == null || passwordNumberText.value != null){
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
    console.log("submitCreateUser setUser store"+passwordNumberText.value);
    userSave.setUserSave(req);
  }
  if (props.userID == null){
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
    if (passwordNumberText.value==null){
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
  </script>
  