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
                          name="Title"
                          placeholder="คำนำหน้า"
                          :options="Prefix"
                          validation="required"
                          v-model="personProfile.PrefixID"
                          @change="handlerChangePersonalProfile"
                          :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-4">
                        <FormKit
                          type="text"
                          label="ชื่อ"
                          name="FirstName"
                          placeholder="ชื่อ"
                          v-model="personProfile.FirstName"
                          @input-raw="handlerChangePersonalProfile"
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
                          @input-raw="handlerChangePersonalProfile"
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
                          @input-raw="handlerChangePersonalProfile"
                          placeholder="วัน/เดือน/ปี"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-6">
                        <ElementsFormIdCard
                          v-model="personProfile.PersonalID"
                          validation="required|length:13|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 13 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="PhoneNumber"
                          placeholder="098765XXXX"
                          v-model="personProfile.PhoneNumber"
                          @input-raw="handlerChangePersonalProfile"
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
                          @input-raw="handlerChangePersonalProfile"
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
                          v-model="personProfile.PrefixID"
                          @change="handlerChangePersonalProfile"
                          :options="Prefix"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-4">
                        <FormKit
                          type="text"
                          label="Firstname"
                          name="FirstName"
                          placeholder="Firstn-ame"
                          v-model="personProfile.FirstName"
                          @input-raw="handlerChangePersonalProfile"
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
                          @input-raw="handlerChangePersonalProfile"
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
                          @input-raw="handlerChangePersonalProfile"
                          validation="required"
                          :max="effectiveMinDate"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-4">
                        <ElementsFormPassport
                          v-model="personProfile.PersonalID"
                          @input-raw="handlerChangePersonalProfile"
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
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 10 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          autocomplete="false"
                          v-model="personProfile.PhoneNumber"
                          @input-raw="handlerChangePersonalProfile"
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
                          @input-raw="handlerChangePersonalProfile"
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
                          v-model="legalPersonProfile.ContactFirstName"
                          @input-raw="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-md-12 col-lg-4">
                        <FormKit
                          type="text"
                          label="เลขประจำตัวผู้เสียภาษี"
                          name="TaxId"
                          placeholder="เลขประจำตัวผู้เสียภาษี"
                          validation="required|length:13|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 13 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.TaxID"
                          @input-raw="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="PhoneNumber"
                          placeholder="098765XXXX"
                          validation="required|+length:10|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 10 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.ContactPhoneNumber"
                          @input-raw="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="email"
                          label="อีเมล"
                          name="Email"
                          placeholder="xxxxxx@email.com"
                          autocomplete="false"
                          v-model="legalPersonProfile.ContactEmail"
                          @input-raw="handlerChangeLegalPersonProfile"
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
                          v-model="legalPersonProfile.ContactFirstName"
                          @input-raw="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-md-12 col-lg-4">
                        <FormKit
                          type="text"
                          label="เลขประจำตัวผู้เสียภาษี"
                          name="TaxId"
                          placeholder="เลขประจำตัวผู้เสียภาษี"
                          validation="required|length:13|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 13 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.TaxID"
                          @input-raw="handlerChangeLegalPersonProfile"
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
                          @input-raw="handlerChangeLegalPersonProfile"
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
                          @input-raw="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="PhoneNumber"
                          placeholder="098765XXXX"
                          validation="required|+length:10|number"
                          :validation-messages="{
                            required: 'กรุณาใส่ข้อมูล',
                            length: 'กรุณาใส่ตัวเลขมากกว่าหรือน้อยกว่า 10 ตัว',
                            number: 'กรุณากรอกเฉพาะตัวเลขเท่านั้น',
                          }"
                          autocomplete="false"
                          v-model="legalPersonProfile.ContactPhoneNumber"
                          @input-raw="handlerChangeLegalPersonProfile"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="email"
                          label="อีเมล"
                          name="Email"
                          placeholder="xxxxxx@email.com"
                          autocomplete="false"
                          v-model="legalPersonProfile.ContactEmail"
                          @input-raw="handlerChangeLegalPersonProfile"
                        />
                      </div>
                    </div>
                  </section>
                </aside>

                <section class="insured-address">
                  <h3>ที่อยู่ผู้เอาประกันภัย</h3>

                  <div class="row">
                    <ElementsFormAddress
                      element-key="insured"
                      :addr-province="addrProvince"
                      :addr-district="addrDistrict"
                      :addr-sub-district="addrSubDistrict"
                      :addr-zip-code="addrZipCode"
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
</template>
<script setup lang="ts">
import { DefaultAddress,CustomerOrderRequest, LegalPersonProfile, PersonProfile } from "~/shared/entities/placeorder-entity";
import { SelectOption } from "~/shared/entities/select-option";

const emit = defineEmits(['changeCustomerType','changeProvince','changeDistrict','changeSubDistrict','changeFullAddress','changeInsureDetail'])
const props = defineProps({
  prefix:Array<SelectOption>,
  nationality:Array<SelectOption>,
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode:String
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
const defaultAddress:globalThis.Ref<DefaultAddress|undefined> = ref()

const InsuredTypeText:globalThis.Ref<String> = ref('person')
const InsuredClassifierText:globalThis.Ref<String> = ref('')
const CompanyClassifierText:globalThis.Ref<String> = ref('')
const Prefix:globalThis.Ref<SelectOption[]> = ref([])
const Nationality:globalThis.Ref<SelectOption[]> = ref([])
const addrProvince:globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict:globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict:globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode=ref('')

const dateNow: Date = new Date()
const effectiveMinDate: string = dateNow.toLocaleDateString("en-CA") // en-CA or sv => yyyy-MM-dd

const values = reactive({})
const onLoad = onMounted(()=>{
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
})
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
    insureDetail.value.DefaultAddress = ObjectAddress
    handlerChangeInsureDetail()

    emit('changeFullAddress',addr,ObjectAddress)
  }
}
const handlerChangePersonalProfile = ()=>{
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
const handlerChangeInsureDetail = ()=>{
  let data:CustomerOrderRequest = insureDetail.value
  data.DefaultAddress = insureDetail.value.DefaultAddress
  data.LegalPersonProfile = insureDetail.value.LegalPersonProfile
  data.PersonProfile = insureDetail.value.PersonProfile
  console.log(data,insureDetail.value)
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
    clearData()
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

    clearData()
  }
});
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
