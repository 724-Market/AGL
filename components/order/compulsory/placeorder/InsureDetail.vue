<template>
  <div class="card">
    <div class="card-body">
      <div class="accordion" id="accordion-insured-information">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-insured-information"
              aria-expanded="true"
              aria-controls="collapse-insured-information"
            >
              ข้อมูลผู้เอาประกันภัย
            </button>
          </h2>
          <div
            id="collapse-insured-information"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordion-insured-information"
          >
            <div class="accordion-body">
              <div class="form-placeorder">
                <section class="insured-type">
                  <FormKit
                    type="radio"
                    label="ประเภทผู้เอาประกันภัย"
                    name="InsuredType"
                    :options="{
                      person: 'บุคคลธรรมดา',
                      company: 'นิติบุคคล',
                    }"
                    v-model="InsuredTypeText"
                    validation="required"
                    :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                    options-class="option-block"
                  />
                </section>

                <aside class="insured-classifier" v-if="InsuredTypeText == 'person'">
                  <section>
                    <FormKit
                      type="radio"
                      label="ลักษณะ"
                      name="InsuredClassifier"
                      v-model="InsuredClassifierText"
                      :options="{
                        thai: 'คนไทย',
                        foreigner: 'คนต่างชาติ',
                      }"
                      validation="required"
                      :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                      options-class="option-block"
                    />
                  </section>
                  <!-- - - - - - - บุคคลธรรมดา คนไทย - - - - - - -->
                  <section
                    class="insured-thai-information"
                    v-if="InsuredClassifierText == 'thai'"
                  >
                    <h3>ชื่อผู้เอาประกันภัย (บุคคลธรรมดา : คนไทย)</h3>

                    <div class="row">
                      <div class="col-sm-4 col-lg-3">
                        <FormKit
                          type="select"
                          label="คำนำหน้า"
                          name="TitleThaiPerson"
                          placeholder="คำนำหน้า"
                          :options="Prefix"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                          @change="handlerChangePersonalProfile"
                          v-model="personProfile.PrefixID"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-4">
                        <FormKit
                          type="text"
                          label="ชื่อ"
                          name="FirstName"
                          placeholder="ชื่อ"
                          v-model="personProfile.FirstName"
                          @change="handlerChangePersonalProfile"
                          :validation-rules="{ special_characters }"
                          validation="required|special_characters"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            special_characters: 'ไม่ให้กรอกอักขระพิเศษ',
                          }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-md-12 col-lg-5">
                        <FormKit
                          type="text"
                          label="นามสกุล"
                          name="LastName"
                          placeholder="นามสกุล"
                          v-model="personProfile.LastName"
                          @change="handlerChangePersonalProfile"
                          :validation-rules="{ special_characters }"
                          validation="required|special_characters"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            special_characters: 'ไม่ให้กรอกอักขระพิเศษ',
                          }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="date"
                          label="วันเดือนปีเกิด"
                          name="ฺBirthDate"
                          :max="effectiveMinDate"
                          v-model="personProfile.BirthDate"
                          @change="handlerChangePersonalProfile"
                          placeholder="วัน/เดือน/ปี"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-6">
                        <ElementsFormIdCard
                          v-model="personProfile.PersonalID"
                          maxlength="13"
                          validation="required|length:13,13|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลข 13 ตัวเท่านั้น',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="PhoneNumber"
                          maxlength="10"
                          placeholder="098765XXXX"
                          v-model="personProfile.PhoneNumber"
                          @change="handlerChangePersonalProfile"
                          validation="required|+length:10|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 10 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
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
                          v-model="personProfile.Email"
                          @change="handlerChangePersonalProfile"
                        />
                      </div>
                    </div>
                  </section>
                  <!-- - - - - - - บุคคลธรรมดา ต่างชาติ - - - - - - -->
                  <section
                    class="insured-foreigner-information"
                    v-if="InsuredClassifierText == 'foreigner'"
                  >
                    <h3>ชื่อผู้เอาประกันภัย (บุคคลธรรมดา : คนต่างชาติ)</h3>

                    <div class="row">
                      <div class="col-sm-4 col-lg-3">
                        <FormKit
                          type="select"
                          label="Title"
                          name="Title"
                          placeholder="Title"
                          @change="handlerChangePersonalProfile"
                          :options="Prefix"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                          v-model="personProfile.PrefixID"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-4">
                        <FormKit
                          type="text"
                          label="Firstname"
                          name="FirstName"
                          placeholder="Firstname"
                          v-model="personProfile.FirstName"
                          @change="handlerChangePersonalProfile"
                          :validation-rules="{ special_characters }"
                          validation="required|special_characters"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            special_characters: 'ไม่ให้กรอกอักขระพิเศษ',
                          }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-md-12 col-lg-5">
                        <FormKit
                          type="text"
                          label="Lastname"
                          name="LastName"
                          v-model="personProfile.LastName"
                          @change="handlerChangePersonalProfile"
                          placeholder="Lastname"
                          :validation-rules="{ special_characters }"
                          validation="required|special_characters"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            special_characters: 'ไม่ให้กรอกอักขระพิเศษ',
                          }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-sm-4 col-lg-3">
                        <FormKit
                          type="date"
                          label="Birthdate"
                          name="BirthDate"
                          placeholder="ฺBirthdate"
                          v-model="personProfile.BirthDate"
                          @change="handlerChangePersonalProfile"
                          validation="required"
                          :max="effectiveMinDate"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-4">
                        <ElementsFormPassport
                          v-model="personProfile.PersonalID"
                          @change="handlerChangePersonalProfile"
                          maxlength="13"
                          :validation-rules="{ special_characters }"
                          validation="required|special_characters"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            special_characters: 'ไม่ให้กรอกอักขระพิเศษ',
                          }"
                        />
                      </div>
                      <div class="col-md-12 col-lg-5">
                        <FormKit
                          type="select"
                          label="Nationality"
                          name="Nationality"
                          placeholder="Nationality"
                          :options="Nationality"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                          v-model="personProfile.NationalityID"
                          @change="handlerChangePersonalProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="Phone Number"
                          name="PhoneNumber"
                          placeholder="098765XXXX"
                          validation="required|+length:10|number"
                          maxlength="10"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 10 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          autocomplete="false"
                          v-model="personProfile.PhoneNumber"
                          @change="handlerChangePersonalProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="email"
                          label="Email"
                          name="Email"
                          placeholder="xxxxxx@email.com"
                          autocomplete="false"
                          v-model="personProfile.Email"
                          @change="handlerChangePersonalProfile"
                        />
                      </div>
                    </div>
                  </section>
                </aside>
                <aside class="company-classifier" v-if="InsuredTypeText == 'company'">
                  <section>
                    <FormKit
                      type="radio"
                      label="ลักษณะ"
                      name="CompanyClassifier"
                      :options="{
                        headoffice: 'สำนักงานใหญ่',
                        branch: 'สาขา',
                      }"
                      v-model="CompanyClassifierText"
                      validation="required"
                      :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                      options-class="option-block"
                    />
                  </section>
                  <!-- - - - - - - นิติบุคคล สำนักงานใหญ่ - - - - - - -->
                  <section
                    class="insured-headoffice-information"
                    v-if="CompanyClassifierText == 'headoffice'"
                  >
                    <!-- //TODO : Bug Data Not Bliding -->
                    <h3>ชื่อผู้เอาประกันภัย (นิติบุคคล : สำนักงานใหญ่)</h3>
                    <div class="row">
                      <div class="col-sm-4 col-lg-3">
                        <FormKit
                          type="select"
                          label="ประเภทกิจการ"
                          name="CompanyType"
                          placeholder="ประเภทกิจการ"
                          :options="Prefix"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                          v-model="legalPersonProfile.PrefixID"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-5">
                        <FormKit
                          type="text"
                          label="ชื่อกิจการ"
                          name="CompanyName"
                          placeholder="ชื่อกิจการ"
                          :validation-rules="{ special_characters }"
                          validation="required|special_characters"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            special_characters: 'ไม่ให้กรอกอักขระพิเศษ',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.Name"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-md-12 col-lg-4">
                        <FormKit
                          type="text"
                          label="เลขประจำตัวผู้เสียภาษี"
                          name="CompanyTaxId"
                          placeholder="เลขประจำตัวผู้เสียภาษี"
                          validation="required|length:13|number"
                          maxlength="13"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 13 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.TaxID"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="CompanyPhoneNumber"
                          placeholder="098765XXXX"
                          validation="required|+length:10|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 10 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.ContactPhoneNumber"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="email"
                          label="อีเมล"
                          name="CompanyEmail"
                          placeholder="xxxxxx@email.com"
                          autocomplete="false"
                          v-model="legalPersonProfile.ContactEmail"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                    </div>
                  </section>

                  <!-- - - - - - - นิติบุคคล สาขา - - - - - - -->
                  <section
                    class="insured-branch-information"
                    v-if="CompanyClassifierText == 'branch'"
                  >
                    <h3>ชื่อผู้เอาประกันภัย (นิติบุคคล : สาขา)</h3>

                    <div class="row">
                      <div class="col-sm-4 col-lg-3">
                        <FormKit
                          type="select"
                          label="ประเภทกิจการ"
                          name="BranchCompanyType"
                          placeholder="ประเภทกิจการ"
                          :options="Prefix"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                          v-model="legalPersonProfile.PrefixID"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-5">
                        <FormKit
                          type="text"
                          label="ชื่อกิจการ"
                          name="BranchCompanyName"
                          placeholder="ชื่อกิจการ"
                          :validation-rules="{ special_characters }"
                          validation="required|special_characters"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            special_characters: 'ไม่ให้กรอกอักขระพิเศษ',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.Name"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-md-12 col-lg-4">
                        <FormKit
                          type="text"
                          label="เลขประจำตัวผู้เสียภาษี"
                          name="BranchTaxId"
                          placeholder="เลขประจำตัวผู้เสียภาษี"
                          validation="required|length:13|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 13 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.TaxID"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="รหัสสาขา"
                          name="BranchCode"
                          placeholder="รหัสสาขา"
                          validation="required|+length:5|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 5 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.BranchID"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="ชื่อสาขา"
                          name="BranchName"
                          placeholder="ชื่อสาขา"
                          :validation-rules="{ special_characters }"
                          validation="required|special_characters"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            special_characters: 'ไม่ให้กรอกอักขระพิเศษ',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.BranchName"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="BranchPhoneNumber"
                          placeholder="098765XXXX"
                          validation="required|+length:10|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 10 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.ContactPhoneNumber"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="email"
                          label="อีเมล"
                          name="BranchEmail"
                          placeholder="xxxxxx@email.com"
                          autocomplete="false"
                          v-model="legalPersonProfile.ContactEmail"
                          @change="handlerChangeLegalPersonProfile"
                        />
                      </div>
                    </div>
                  </section>
                </aside>

                <section class="insured-address">
                  <h3>ที่อยู่ผู้เอาประกันภัย</h3>
                <button type="button" class="btn-gray btn-open-papers" @click="onModalEditAddress(true)"><i
                        class="fa-solid fa-layer-group"></i>Edit</button>
                 
                  <div class="row">
                    <ElementsFormAddress
                      element-key="insured"
                      :order-No="props.cacheOrderRequest?.OrderNo"
                      :addr-province="addrProvince"
                      :addr-district="addrDistrict"
                      :addr-sub-district="addrSubDistrict"
                      :addr-zip-code="addrZipCode"
                      :default-address-cache="defaultAddress"
                      :default-address-customer="defaultAddressCustomer"
                      @change-province="handlerChangeProvince"
                      @change-district="handlerChangeDistrict"
                      @change-sub-district="handlerChangeSubDistrict"
                      @change-full-address="handlerChangeFullAddress"
                    />
                  </div>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ElementsDialogEditAddress 
  v-if="isEditAddress"
   element-key="insured"
  :customer-i-d="props.customerId"
  :address-i-d="insureDetail.DefaultAddress?.AddressID"
  :order-No="props.cacheOrderRequest?.OrderNo"
  :addr-province="addrProvince"
  :addr-district="addrDistrict"
  :addr-sub-district="addrSubDistrict"
  :addr-zip-code="addrZipCode"
  :default-address-customer="defaultAddressCustomer"
  :customer-profile-details="insureDetail"
  :show="isEditAddress" 
  @close-address="closeModalAddress" 
  @on-edit-address="updateAddress"   
  ></ElementsDialogEditAddress>
</template>
<script setup lang="ts">
import type { DefaultAddress, CustomerOrderRequest, LegalPersonProfile, PersonProfile, PlaceOrderRequest } from "~/shared/entities/placeorder-entity";
import type { SelectOption } from "~/shared/entities/select-option";
import type { CustomerIDReq, CustomerAddressListRes } from "~/shared/entities/customer-entity";

const emit = defineEmits(['changeCustomerType','changeProvince','changeDistrict','changeSubDistrict','changeFullAddress','changeInsureDetail'])
const props = defineProps({
  prefix:Array<SelectOption>,
  nationality:Array<SelectOption>,
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode:String,
  customerId:String,
  cacheOrderRequest:{
    type:Object as ()=> PlaceOrderRequest
  }
});
//const emit = defineEmits(['changeCustomerType','changeCompanyType','changeProvince','changeDistrict','changeSubDistrict'])
const insureDetail:globalThis.Ref<CustomerOrderRequest> = ref({
  IsPerson: true,
  IsBranch: false
})
const personProfile:globalThis.Ref<PersonProfile> = ref({
  CustomerID:'',
  PrefixID:'',
  FirstName:'',
  LastName:'',
  BirthDate:'',
  PersonalID:'',
  NationalityID:'',
  PhoneNumber:'',
  Email:''
})
const legalPersonProfile:globalThis.Ref<LegalPersonProfile> = ref({
  CustomerID: '',
  PrefixID: '',
  Name: '',
  BranchName: '',
  TaxID: '',
  BranchID: '',
  ContactFirstName: '',
  ContactLastName: '',
  ContactPhoneNumber: '',
  ContactEmail: '',
})
// const legalPersonProfile:globalThis.Ref<LegalPersonProfile|undefined> = ref()
const defaultAddress:globalThis.Ref<DefaultAddress|undefined> = ref()
const defaultAddressCustomer:globalThis.Ref<CustomerAddressListRes|undefined> = ref()

const InsuredTypeText:globalThis.Ref<String> = ref('person')
const InsuredClassifierText:globalThis.Ref<String> = ref('thai')
const CompanyClassifierText:globalThis.Ref<String> = ref('')
const Prefix:globalThis.Ref<SelectOption[]> = ref([])
const Nationality:globalThis.Ref<SelectOption[]> = ref([])
const addrProvince:globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict:globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict:globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode=ref('')
const prefixID = ref('')
const renderKey = ref(0)

var isEditAddress = ref(false)

const dateNow: Date = new Date()
const effectiveMinDate: string = dateNow.toLocaleDateString("en-CA") // en-CA or sv => yyyy-MM-dd

const values = reactive({})
const onLoad = onMounted(()=>{
    if(props.customerId){
      updateAddress(props.customerId);

    }
  if(props.prefix){
    Prefix.value = props.prefix
  }
  if(props.nationality){
    Nationality.value = props.nationality
  }
  if(props.addrProvince){
    addrProvince.value = props.addrProvince
  }
  if(props.addrDistrict){
    addrDistrict.value = props.addrDistrict
  }
  if(props.addrSubDistrict){
    addrSubDistrict.value = props.addrSubDistrict
  }
  if(props.addrZipCode){
    addrZipCode.value = props.addrZipCode
  }
  console.log(props.cacheOrderRequest)
  if(props.cacheOrderRequest){

    if(props.cacheOrderRequest.Customer && props.cacheOrderRequest.OrderNo!=""){
      // ประเภทผู้เอาประกัน
      InsuredTypeText.value = props.cacheOrderRequest.Customer.IsPerson==true ? 'person' : 'company'


      if(props.cacheOrderRequest.Customer.IsPerson==true && props.cacheOrderRequest.Customer.PersonProfile){
        // ลักษณะบุคคลธรรมดา
        InsuredClassifierText.value = props.cacheOrderRequest.Customer.PersonProfile.NationalityID=='62ED0829703B4E589A2A63C740B88155' ? 'thai' : 'foreigner'
      }
      else{
        // ลักษณะนิติบุคคล
        CompanyClassifierText.value= props.cacheOrderRequest.Customer.IsBranch==true ? 'branch' : 'headoffice'
      }

      insureDetail.value = props.cacheOrderRequest.Customer
      //console.log('Mounted',props.cacheOrderRequest.Customer)
    if(props.cacheOrderRequest.Customer.PersonProfile){
      personProfile.value =  props.cacheOrderRequest.Customer.PersonProfile
    }
    if(props.cacheOrderRequest.Customer.LegalPersonProfile){
      legalPersonProfile.value =  props.cacheOrderRequest.Customer.LegalPersonProfile
      console.log("mount legalPersonProfile.value",legalPersonProfile)
    }

    if(props.cacheOrderRequest.Customer.DefaultAddress){
      defaultAddress.value = props.cacheOrderRequest.Customer.DefaultAddress
      emit('changeProvince',defaultAddress.value.ProvinceID)
    }
    }
    handlerChangeInsureDetail()
    
  }
})

const onModalEditAddress = (open: boolean) => {
  isEditAddress.value = false;
  isEditAddress.value = open;
}

const closeModalAddress = async (refresh: boolean) => {
    if (refresh) {
      isEditAddress.value = true;
      isEditAddress.value = false;
    }
    isEditAddress.value = false;
}

// Update profile after save
const updateAddress = async (e: string) => {
  // get order after save or create
  const req: CustomerIDReq = {
    CustomerID: e ?? "",
  };
  
  const getData = await useRepository().customer.AddressList(req);
  if (
    getData.apiResponse.Status &&
    getData.apiResponse.Status == "200" &&
    getData.apiResponse.Data 
  ) {
    defaultAddressCustomer.value = getData.apiResponse.Data[0];
    emit('changeProvince',defaultAddressCustomer.value?.ProvinceID)
    emit('changeDistrict',defaultAddressCustomer.value?.DistrictID)
    emit('changeSubDistrict',defaultAddressCustomer.value?.SubDistrictID)
  }
}

// handler validate function
const special_characters = function ({value}) {

  return new Promise((resolve) => {
    const reg = new RegExp(/^(?!.*[!@#$%^&*()_+=\[\]{};':\"\\|,.<>\/?`~])[\w\W]*$/g)
    const validate = reg.test(value)
    resolve(validate)
  })
}
// handler function for emit
const handlerChangeCustomerType = (e: String)=>{
  if(e){

    emit('changeCustomerType',e)
  }
}
const handlerChangeProvince = (e: string)=>{
  if(e){

    emit('changeProvince',e)
  }
}
const handlerChangeDistrict = (e: string)=>{
  if(e){
    emit('changeDistrict',e)
  }
}
const handlerChangeSubDistrict = (e: string)=>{
  if(e){
    emit('changeSubDistrict',e)
  }
}
const handlerChangeFullAddress = (addr:string,ObjectAddress:DefaultAddress)=>{
  if(addr && ObjectAddress){
    if(InsuredTypeText.value=="person"){
      ObjectAddress.PrefixID = personProfile.value.PrefixID
      ObjectAddress.PrefixName = Prefix.value.filter(x=>x.value==personProfile.value.PrefixID)[0].label
    }
    else{
      ObjectAddress.PrefixID =  legalPersonProfile.value.PrefixID
      ObjectAddress.PrefixName = Prefix.value.filter(x=>x.value==legalPersonProfile.value.PrefixID)[0].label
    }
    insureDetail.value.DefaultAddress = ObjectAddress
    handlerChangeInsureDetail()

    emit('changeFullAddress',addr,ObjectAddress)
  }
}
const handlerChangePersonalProfile = ()=>{
  //console.log('handlerChangePersonalProfile',personProfile.value)
  insureDetail.value.PersonProfile = personProfile.value
  if(InsuredClassifierText.value=='thai'){
    insureDetail.value.PersonProfile.NationalityID='62ED0829703B4E589A2A63C740B88155'
  }

  handlerChangeInsureDetail()
}
const handlerChangeLegalPersonProfile = ()=>{

  insureDetail.value.LegalPersonProfile = legalPersonProfile.value

  handlerChangeInsureDetail()
}
const handlerChangeInsureDetail = async ()=>{
  let data:CustomerOrderRequest = insureDetail.value
  data.DefaultAddress = insureDetail.value.DefaultAddress
  data.LegalPersonProfile = insureDetail.value.LegalPersonProfile
  data.PersonProfile = insureDetail.value.PersonProfile

  if(data.DefaultAddress){
    if(data.IsPerson && data.PersonProfile)
    {
      data.DefaultAddress.TaxID = data.PersonProfile.PersonalID
      data.DefaultAddress.FirstName = data.PersonProfile.FirstName
      data.DefaultAddress.LastName = data.PersonProfile.LastName
      data.DefaultAddress.Email = data.PersonProfile.Email
      data.DefaultAddress.PhoneNumber = data.PersonProfile.PhoneNumber
    }
    else if (data.LegalPersonProfile){
      data.DefaultAddress.TaxID = data.LegalPersonProfile.TaxID
      data.LegalPersonProfile.ContactFirstName = data.LegalPersonProfile.Name
      data.LegalPersonProfile.ContactLastName="-"
      data.DefaultAddress.FirstName = data.LegalPersonProfile.ContactFirstName
      data.DefaultAddress.LastName = data.LegalPersonProfile.ContactLastName
      data.DefaultAddress.Email = data.LegalPersonProfile.ContactEmail
      data.DefaultAddress.PhoneNumber = data.LegalPersonProfile.ContactPhoneNumber
    }

  }

  emit('changeInsureDetail',data)
}
const clearData = ()=>{
  personProfile.value = {
    CustomerID:'',
  PrefixID:'',
  FirstName:'',
  LastName:'',
  BirthDate:'',
  PersonalID:'',
  NationalityID:'',
  PhoneNumber:'',
  Email:''
  }
  legalPersonProfile.value = {
    CustomerID: '',
    PrefixID: '',
    Name: '',
    BranchName: '',
    TaxID: '',
    BranchID: '',
    ContactFirstName: '',
    ContactLastName: '',
    ContactPhoneNumber: '',
    ContactEmail: '',
  }
}
// watching data
watch(
  ()=>props.addrProvince,
  ()=>{
    if(props.addrProvince && props.addrProvince.length>0){
      addrProvince.value = props.addrProvince
    }
  }
)
watch(
  ()=>props.addrDistrict,
  ()=>{
    if(props.addrDistrict && props.addrDistrict.length>0){
      addrDistrict.value = props.addrDistrict
    }
  }
)
watch(
  ()=>props.addrSubDistrict,
  ()=>{
    if(props.addrSubDistrict && props.addrSubDistrict.length>0){
      addrSubDistrict.value = props.addrSubDistrict
    }
  }
)
watch(
  ()=>props.addrZipCode,
  ()=>{
    if(props.addrZipCode && props.addrZipCode.length>0){
      addrZipCode.value = props.addrZipCode
    }
  }
)
watch(
  ()=>props.prefix,
  ()=>{
    if(props.prefix && props.prefix.length>0){
      Prefix.value = props.prefix
    }
  }
)
watch(
  ()=>props.nationality,
  ()=>{
    if(props.nationality && props.nationality.length>0){
      Nationality.value = props.nationality
    }
  }
)

// watching data to Radio Formkit
watch(InsuredTypeText, async (newInsuredTypeText) => {
  if(newInsuredTypeText.length>0){
    insureDetail.value.IsBranch = false
    insureDetail.value.IsPerson = newInsuredTypeText=='person'
    // clear data when change to customer type
    //clearData()
    handlerChangeCustomerType(newInsuredTypeText)
  }

});
//CompanyClassifierText
watch(CompanyClassifierText, async (newCompanyClassifierText) => {
  //headoffice: 'สำนักงานใหญ่',
  //branch: 'สาขา',

  if(newCompanyClassifierText.length>0){
    insureDetail.value.IsBranch = newCompanyClassifierText =='branch'
    insureDetail.value.IsPerson = false

    //clearData()
  }
});
watch(()=>props.cacheOrderRequest,(newValue)=>{
  if(newValue){
    const Customer = newValue.Customer
    if(Customer && newValue.OrderNo && newValue.OrderNo!=""){
      // ประเภทผู้เอาประกัน
      InsuredTypeText.value =Customer.IsPerson==true ? 'person' : 'company'


      if(Customer.IsPerson==true && Customer.PersonProfile){
        // ลักษณะบุคคลธรรมดา
        InsuredClassifierText.value = Customer.PersonProfile.NationalityID=='62ED0829703B4E589A2A63C740B88155' ? 'thai' : 'foreigner'
      }
      else{
        // ลักษณะนิติบุคคล
        CompanyClassifierText.value= Customer.IsBranch==true ? 'branch' : 'headoffice'
      }

      insureDetail.value = Customer
    if(Customer.PersonProfile){
      const person = Customer.PersonProfile
      //console.log(JSON.stringify(person))
      personProfile.value =  person
      //personProfile.value.PrefixID = props.cacheOrderRequest.Customer.PersonProfile.PrefixID
      prefixID.value =Customer.PersonProfile.PrefixID
    }
    if(Customer.LegalPersonProfile){

      const legalPerson = Customer.LegalPersonProfile

      legalPersonProfile.value = legalPerson

      prefixID.value = legalPerson.PrefixID
      console.log('legalPersonProfile.value', legalPersonProfile.value)
    }

    if(Customer.DefaultAddress){
      // console.log(props.cacheOrderRequest.Customer.DefaultAddress)
      defaultAddress.value = Customer.DefaultAddress
    }
    }
    handlerChangeInsureDetail()
  }

})
</script>
<style scoped>
.insured-classifier,
.company-classifier,
.insured-thai-information,
.insured-foreigner-information,
.insured-headoffice-information,
.insured-branch-information {
  display: none;
}

.insured-type:has(.formkit-input[value="person" i]:checked) ~ .insured-classifier,
.insured-type:has(.formkit-input[value="company" i]:checked) ~ .company-classifier,
.insured-classifier:has(.formkit-input[value="thai" i]:checked) .insured-thai-information,
.insured-classifier:has(.formkit-input[value="foreigner" i]:checked)
  .insured-foreigner-information,
.company-classifier:has(.formkit-input[value="headoffice" i]:checked)
  .insured-headoffice-information,
.company-classifier:has(.formkit-input[value="branch" i]:checked)
  .insured-branch-information {
  display: block;
}
</style>
