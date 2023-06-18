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

                  <aside class="insured-classifier">
                    <section>
                      <FormKit
                        type="radio"
                        label="ลักษณะ"
                        name="InsuredClassifier"
                        :options="{
                          thai: 'คนไทย',
                          foreigner: 'คนต่างชาติ',
                        }"
                        validation="required"
                        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                        options-class="option-block"
                      />
                    </section>

                    <section class="insured-thai-information">
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
                            :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                          />
                        </div>
                        <div class="col-sm-8 col-lg-4">
                          <FormKit
                            type="text"
                            label="ชื่อ"
                            name="FirstName"
                            placeholder="ชื่อ"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-md-12 col-lg-5">
                          <FormKit
                            type="text"
                            label="นามสกุล"
                            name="LastName"
                            placeholder="นามสกุล"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-6">
                          <FormKit
                            type="date"
                            label="วันเดือนปีเกิด"
                            name="ฺBirthDate"
                            placeholder="วัน/เดือน/ปี"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-6">
                          <ElementsFormIdCard />
                        </div>
                        <div class="col-6">
                          <FormKit
                            type="text"
                            label="หมายเลขโทรศัพท์"
                            name="PhoneNumber"
                            placeholder="098765XXXX"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
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
                          />
                        </div>
                      </div>
                    </section>

                    <section class="insured-foreigner-information">
                      <h3>ชื่อผู้เอาประกันภัย (บุคคลธรรมดา : คนต่างชาติ)</h3>

                      <div class="row">
                        <div class="col-sm-4 col-lg-3">
                          <FormKit
                            type="select"
                            label="Title"
                            name="Title"
                            placeholder="Title"
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
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-md-12 col-lg-5">
                          <FormKit
                            type="text"
                            label="Lastname"
                            name="LastName"
                            placeholder="Lastname"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-6">
                          <FormKit
                            type="date"
                            label="Birthdate"
                            name="BirthDate"
                            placeholder="ฺBirthdate"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-6">
                          <ElementsFormPassport />
                        </div>
                        <div class="col-6">
                          <FormKit
                            type="text"
                            label="Phone Number"
                            name="PhoneNumber"
                            placeholder="098765XXXX"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-6">
                          <FormKit
                            type="email"
                            label="Email"
                            name="Email"
                            placeholder="xxxxxx@email.com"
                            autocomplete="false"
                          />
                        </div>
                      </div>
                    </section>
                  </aside>

                  <aside class="company-classifier">
                    <section>
                      <FormKit
                        type="radio"
                        label="ลักษณะ"
                        name="CompanyClassifier"
                        :options="{
                          headoffice: 'สำนักงานใหญ่',
                          branch: 'สาขา',
                        }"
                        validation="required"
                        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                        options-class="option-block"
                      />
                    </section>

                    <section class="insured-headoffice-information">
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
                          />
                        </div>
                        <div class="col-sm-8 col-lg-5">
                          <FormKit
                            type="text"
                            label="ชื่อกิจการ"
                            name="CompanyName"
                            placeholder="ชื่อกิจการ"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-md-12 col-lg-4">
                          <FormKit
                            type="text"
                            label="เลขประจำตัวผู้เสียภาษี"
                            name="TaxId"
                            placeholder="เลขประจำตัวผู้เสียภาษี"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-6">
                          <FormKit
                            type="text"
                            label="หมายเลขโทรศัพท์"
                            name="PhoneNumber"
                            placeholder="098765XXXX"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
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
                          />
                        </div>
                      </div>
                    </section>

                    <section class="insured-branch-information">
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
                          />
                        </div>
                        <div class="col-sm-8 col-lg-5">
                          <FormKit
                            type="text"
                            label="ชื่อกิจการ"
                            name="CompanyName"
                            placeholder="ชื่อกิจการ"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-md-12 col-lg-4">
                          <FormKit
                            type="text"
                            label="เลขประจำตัวผู้เสียภาษี"
                            name="TaxId"
                            placeholder="เลขประจำตัวผู้เสียภาษี"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-6">
                          <FormKit
                            type="text"
                            label="รหัสสาขา"
                            name="BranchCode"
                            placeholder="รหัสสาขา"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-6">
                          <FormKit
                            type="text"
                            label="ชื่อสาขา"
                            name="BranchName"
                            placeholder="ชื่อสาขา"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                            autocomplete="false"
                          />
                        </div>
                        <div class="col-6">
                          <FormKit
                            type="text"
                            label="หมายเลขโทรศัพท์"
                            name="PhoneNumber"
                            placeholder="098765XXXX"
                            validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
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
                          />
                        </div>
                      </div>
                    </section>
                  </aside>

                  <section class="insured-address">
                    <h3>ที่อยู่ผู้เอาประกันภัย</h3>

                    <div class="row">
                      <ElementsFormAddress
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
import { DefaultAddress } from "~/shared/entities/placeorder-entity";
import { SelectOption } from "~/shared/entities/select-option";


const props = defineProps({
  prefix:Array<SelectOption>,
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode:String,
  insureFullAddress:String,
});
//const emit = defineEmits(['changeCustomerType','changeCompanyType','changeProvince','changeDistrict','changeSubDistrict'])
const emit = defineEmits(['changeCustomerType','changeProvince','changeDistrict','changeSubDistrict','changeFullAddress'])
const InsuredTypeText:globalThis.Ref<String> = ref('person')
const Prefix:globalThis.Ref<SelectOption[]> = ref([])
const addrProvince:globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict:globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict:globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode=ref('')

const values = reactive({})
const onLoad = onMounted(()=>{
  if(props.prefix){
    Prefix.value = props.prefix
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

// handler function for emit
const handlerChangeCustomerType = (e: String)=>{
  if(e){

    emit('changeCustomerType',e)
  }
}
const handlerChangeProvince = (e: string)=>{
  if(e){
    console.log(e)
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
    emit('changeFullAddress',addr,ObjectAddress)
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
      console.log(props.addrDistrict)
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
    console.log(props.prefix)
    if(props.prefix && props.prefix.length>0){
      Prefix.value = props.prefix
    }
  }
)

// watching data to Radio Formkit
watch(InsuredTypeText, async (newInsuredTypeText) => {
  handlerChangeCustomerType(newInsuredTypeText)
  console.log(newInsuredTypeText)
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
