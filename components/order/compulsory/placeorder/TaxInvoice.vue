<template>
  <div class="card">
    <div class="card-body">
      <div class="accordion" id="accordion-tax-invoice">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-tax-invoice"
              aria-expanded="true"
              aria-controls="collapse-tax-invoice"
            >
              ใบกำกับภาษี
            </button>
          </h2>
          <div
            id="collapse-tax-invoice"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordion-tax-invoice"
          >
            <div class="accordion-body">
              <div class="notice-success" v-if="isIncludeTax == '1'">
                <i class="fa-regular fa-memo-circle-check"></i
                >มีใบกำกับภาษีแนบท้ายอยู่กับไฟล์กรมธรรม์แล้ว
              </div>

              <div class="notice-warning" v-else>
                <i class="fa-regular fa-circle-info"></i
                >ไม่มีใบกำกับภาษีแนบท้ายในไฟล์กรมธรรม์ หากต้องการ ต้องกดออกใบกำกับภาษี
              </div>

              <div class="form-placeorder">
                <!-- <div class="placeorder-action">
                  <a href="#" class="btn btn-preview-tax"
                    ><i class="fa-solid fa-file-pdf"></i>ดูตัวอย่างใบกำกับภาษีที่แนบ</a
                  >
                </div> -->
                <div class="placeorder-action">
                  <div class="form-hide-label">
                    <FormKit
                      type="checkbox"
                      label="ต้องการออกใบกำกับภาษี"
                      v-model="requestIncludeTax"
                      :options="{
                        request: 'ออกใบกำกับภาษี',
                      }"
                    />
                  </div>
                </div>
                <section class="request-tax-address" v-if="requestIncludeTax.length > 0">
                  <div class="form-hide-label">
                    <FormKit
                      type="radio"
                      label="รายชื่อที่อยู่"
                      :options="[
                        {
                          label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน',
                          help: insureFullAddress,
                          value: 'insured',
                        },
                        {
                          label: 'แก้ไขใบกำกับภาษี',
                          value: 'addnew',
                          help: newTaxInvoiceFullAddress,
                          attrs: { addnewaddress: true },
                        },
                      ]"
                      options-class="option-block-stack"
                      v-model="addressIncludeTaxType"
                    />
                  </div>

                  <aside class="new-request-tax-address inner-section" v-if="addressIncludeTaxType=='addnew'">
                    <h4>แก้ไขใบกำกับภาษี</h4>

                    <div class="row">
                      <div class="col-sm-4 col-lg-3">
                        <FormKit
                          type="select"
                          label="คำนำหน้าผู้รับ"
                          name="NewTitle"
                          placeholder="คำนำหน้า"
                          :options="prefix"
                          validation="required"
                          v-model="taxInvoiceAddress.Prefix"
                          :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-4">
                        <FormKit
                          type="text"
                          label="ชื่อผู้รับ"
                          name="NewFirstName"
                          placeholder="ชื่อ"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                          v-model="taxInvoiceAddress.FirstName"
                        />
                      </div>
                      <div class="col-md-12 col-lg-5">
                        <FormKit
                          type="text"
                          label="นามสกุลผู้รับ"
                          name="NewLastName"
                          placeholder="นามสกุล"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                          v-model="taxInvoiceAddress.LastName"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="NewPhoneNumber"
                          placeholder="098765XXXX"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                          v-model="taxInvoiceAddress.PhoneNumber"
                        />
                      </div>

                      <div class="col-6">
                        <FormKit type="number" label="ภาษี" mask="#-####-#####-##-#" 
                          name="TaxID" placeholder="เลขบัตรประชาชน 13 หลัก"
                          v-model="taxInvoiceAddress.TaxID"
                          validation="required|matches:/^[0-9]{13}$/" :validation-messages="{
                            required: 'กรุณาใส่เลขบัตรประชาชน',
                            matches: 'เลขบัตรประชาชนควรเป็นตัวเลข 13 หลัก'
                          }"
                        />
                      </div>
                      
                      <ElementsFormAddress
                        element-key="taxinvoice"
                        :addr-province="addrProvince"
                        :addr-district="addrDistrict"
                        :addr-sub-district="addrSubDistrict"
                        :addr-zip-code="addrZipCode"
                        :default-address-cache="taxInvoiceAddress"
                        @change-province="handlerChangeProvince"
                        @change-district="handlerChangeDistrict"
                        @change-sub-district="handlerChangeSubDistrict"
                        @change-full-address="handlerChangeFullAddressTaxInvoice"
                      />
                    </div>

                    <button
                     type="button"
                      class="btn-primary btn-save"
                      @click="handlerSubmitAddressTaxInvoice"
                    >
                      บันทึกข้อมูล
                    </button>
                  </aside>
                </section>

                <div class="shippped-tax-type" v-show="shippingPolicy == 'postal' && requestIncludeTax.length > 0">
                  <div class="form-hide-label">
                    <ElementsFormRadioShippedPolicy
                      v-model="shippedPolicy"
                      :options="shippedPolicyOption"
                    />
                  </div>
                </div>

                <section
                  class="shipped-tax-address"
                  v-if="
                    requestIncludeTax.length > 0 &&
                    ((shippingPolicy == 'postal' && shippedPolicy == 'separately') ||
                      shippingPolicy != 'postal')
                  "
                >
                  <h3>วิธีการจัดส่ง</h3>
                  <div class="row">
                    <div class="col-6">
                      <FormKit
                        type="select"
                        label="ช่องทางการจัดส่ง"
                        name="ShippedMethod"
                        placeholder="ช่องทางการจัดส่ง"
                        :options="delivery"
                        validation="required"
                        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                        @change="handlerChangeDelivery"
                        v-model="ShippingMethodText"
                      />
                    </div>

                    <div class="col-6">
                      <FormKit
                        type="text"
                        label="ค่าจัดส่ง"
                        name="ShippedFee"
                        placeholder="ค่าจัดส่ง"
                        value=""
                        v-model="ShippingMethodFee"
                        readonly
                      />
                    </div>
                  </div>
                  <div class="form-hide-label">
                    <FormKit
                      type="radio"
                      label="รายชื่อที่อยู่"
                      :options="[
                        {
                          label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน',
                          help: insureFullAddress,
                          //'724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160',
                          value: 'insured',
                        },
                        {
                          label: 'เปลี่ยนที่อยู่ใหม่',
                          value: 'addnew',
                          help: newTaxInvoiceDeliveryFullAddress,
                          attrs: { addnewaddress: true },
                        },
                      ]"
                      options-class="option-block-stack"
                      v-model="addressDeliveryTaxType"
                    />
                  </div>
                  <aside v-if="addressDeliveryTaxType=='addnew'" class="new-shipped-tax-address inner-section">
                    <h4>ที่อยู่จัดส่งใหม่</h4>
                    <div class="row">
                      <ElementsFormNewAddress
                        key="taxinvoice_delivery"
                        :addr-province="addrProvince2"
                        :addr-district="addrDistrict2"
                        :addr-sub-district="addrSubDistrict2"
                        :addr-zip-code="addrZipCode2"
                        :prefix="prefix"
                        :default-address-cache="cacheDefaultAddress"
                        @change-province="handlerChangeProvince2"
                        @change-district="handlerChangeDistrict2"
                        @change-sub-district="handlerChangeSubDistrict2"
                        @change-full-address="handlerChangeFullAddressTaxInvoiceDelivery"
                      />
                    </div>

                    <button
                      type="button"
                      class="btn-primary btn-save"
                      @click="handlerSubmitAddressTaxInvoiceDelivery"
                    >
                      บันทึกข้อมูล
                    </button>
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
import type { CustomerOrderRequest, DefaultAddress, PlaceOrderRequest, TaxInvoiceAddress, TaxInvoiceDeliveryAddress } from "~/shared/entities/placeorder-entity"
import type { RadioOption, SelectOption } from "~/shared/entities/select-option"

const emit = defineEmits(['changeProvince', 'changeDistrict', 'changeSubDistrict','changeProvince2', 'changeDistrict2', 'changeSubDistrict2','changeTaxInvoice'])

const props = defineProps({
  prefix: Array<SelectOption>,
  delivery: Array<SelectOption>,
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode: String,
  addrProvince2: Array<SelectOption>,
  addrDistrict2: Array<SelectOption>,
  addrSubDistrict2: Array<SelectOption>,
  addrZipCode2: String,
  insureFullAddress: String,
  isIncludeTax: String,//1,0
  shippingPolicy: String, // email,pdf,postal
  cacheOrderRequest:{
    type:Object as ()=> PlaceOrderRequest
  }
})

const prefix: globalThis.Ref<SelectOption[]> = ref([])
const delivery: globalThis.Ref<SelectOption[]> = ref([])
const addrProvince: globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode = ref('')
const addrProvince2: globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict2: globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict2: globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode2 = ref('')
const insureFullAddress: globalThis.Ref<String> = ref('')
const newTaxInvoiceFullAddress: globalThis.Ref<String> = ref('')
const newTaxInvoiceDeliveryFullAddress: globalThis.Ref<String> = ref('')
const newTaxInvoiceFullAddressTemp: globalThis.Ref<String> = ref('')
const newTaxInvoiceDeliveryFullAddressTemp: globalThis.Ref<String> = ref('')

const shippedPolicy = ref('together') //together,separately
const shippedPolicyOption: globalThis.Ref<RadioOption[]> = ref([
  {
      label: 'จัดส่งพร้อมกรมธรรม์',
      value: 'together',
    },
    {
      label: 'จัดส่งแยก',
      value: 'separately',
    },
])
const requestIncludeTax: globalThis.Ref<string[]> = ref([])
const addressIncludeTaxType = ref('insured')
const addressDeliveryTaxType = ref('insured')

const taxInvoiceAddress:globalThis.Ref<TaxInvoiceAddress> = ref({
  AddressID: '',
  ReferenceID: '',
  ReferenceType:'',
  ProvinceID: '',
  DistrictID:'',
  SubDistrictID:'',
  TaxID:'',
  FirstName:'',
  LastName:'',
  PhoneNumber:'',
  Email:'',
  Name:'',
  Type:'',
  AddressLine1:'',
  AddressLine2:'',
  AddressText:'',
  No:'',
  Moo:'',
  Place:'',
  Building:'',
  Floor:'',
  Room:'',
  Branch:'',
  Alley:'',
  Road:'',
})
const taxInvoiceDeliveryAddress:globalThis.Ref<TaxInvoiceAddress> = ref({
  AddressID: '',
  ReferenceID: '',
  ReferenceType:'',
  ProvinceID: '',
  DistrictID:'',
  SubDistrictID:'',
  TaxID:'',
  FirstName:'',
  LastName:'',
  PhoneNumber:'',
  Email:'',
  Name:'',
  Type:'',
  AddressLine1:'',
  AddressLine2:'',
  AddressText:'',
  No:'',
  Moo:'',
  Place:'',
  Building:'',
  Floor:'',
  Room:'',
  Branch:'',
  Alley:'',
  Road:'',
})
const ShippingMethodText = ref('')
const ShippingMethodFee = ref('')
const insureDetail:globalThis.Ref<CustomerOrderRequest> = ref({})
const cacheDefaultAddress:globalThis.Ref<DefaultAddress|undefined> = ref()
  const onLoad = onMounted(async () => {
    //console.log(props.cacheOrderRequest)
    insureDetail.value.TaxInvoiceAddress = taxInvoiceAddress.value
    if(props.cacheOrderRequest){
      setCacheData()
    }
  if (props.prefix) {
    prefix.value = props.prefix
  }
  if (props.delivery) {
    delivery.value = props.delivery
  }
  if (props.addrProvince) {
    addrProvince.value = props.addrProvince
  }
  if (props.addrDistrict) {
    addrDistrict.value = props.addrDistrict
  }
  if (props.addrSubDistrict) {
    addrSubDistrict.value = props.addrSubDistrict
  }
  if (props.addrZipCode) {
    addrZipCode.value = props.addrZipCode
  }
  if (props.insureFullAddress) {
    insureFullAddress.value = props.insureFullAddress
  }
  if (props.addrProvince2) {
    addrProvince2.value = props.addrProvince2
  }
  if (props.addrDistrict2) {
    addrDistrict2.value = props.addrDistrict2
  }
  if (props.addrSubDistrict2) {
    addrSubDistrict2.value = props.addrSubDistrict2
  }
  if (props.addrZipCode2) {
    addrZipCode2.value = props.addrZipCode2
  }
  if (props.isIncludeTax) {
    if (props.isIncludeTax == '1') {
      const array = ['request']
      requestIncludeTax.value = array
      handlerChangeTaxInvoice()
    }

  }

});
// handler function for emit
const handlerChangeDelivery = (e:any)=>{
  const value = e.target.value
  if(value){
    const filter = delivery.value.filter(x=>x.value==value)
  if(filter.length>0){
    ShippingMethodFee.value = filter[0].option ?? ""
  }

  handlerChangeTaxInvoice()
  }
}
const handlerChangeProvince = (e: string) => {
  if (e) {
    emit('changeProvince', e)
  }
}
const handlerChangeDistrict = (e: string) => {
  if (e) {
    emit('changeDistrict', e)
  }
}
const handlerChangeSubDistrict = (e: string) => {
  if (e) {
    emit('changeSubDistrict', e)
  }
}
const handlerChangeProvince2 = (e: string) => {
  if (e) {
    emit('changeProvince2', e)
  }
}
const handlerChangeDistrict2 = (e: string) => {
  if (e) {
    emit('changeDistrict2', e)
  }
}
const handlerChangeSubDistrict2 = (e: string) => {
  if (e) {
    emit('changeSubDistrict2', e)
  }
}

const handlerChangeFullAddressTaxInvoice = (addr: string, ObjectAddress: DefaultAddress) => {
  if (addr && ObjectAddress) {
    taxInvoiceAddress.value = ObjectAddress as TaxInvoiceAddress
    const prefixId = taxInvoiceAddress.value.Prefix
    const prefixName = prefix.value.filter(x=>x.value==prefixId)[0]
    let prefixLabel = prefixName ? prefixName.label ?? '' : ''
    newTaxInvoiceFullAddressTemp.value = `${prefixLabel} ${ObjectAddress.FirstName} ${ObjectAddress.LastName} `+addr
  }
}
const handlerChangeFullAddressTaxInvoiceDelivery = (addr: string, ObjectAddress: DefaultAddress) => {
  if (addr && ObjectAddress) {
    taxInvoiceDeliveryAddress.value = ObjectAddress as TaxInvoiceAddress
    newTaxInvoiceDeliveryFullAddressTemp.value =  `${ObjectAddress.PrefixName} ${ObjectAddress.FirstName} ${ObjectAddress.LastName} `+addr

  }
}
const handlerSubmitAddressTaxInvoice = ()=>{
  insureDetail.value.TaxInvoiceAddress = taxInvoiceAddress.value
  newTaxInvoiceFullAddress.value = newTaxInvoiceFullAddressTemp.value
  handlerChangeTaxInvoice()
}
const handlerSubmitAddressTaxInvoiceDelivery = ()=>{
  insureDetail.value.TaxInvoiceDeliveryAddress = taxInvoiceDeliveryAddress.value
  newTaxInvoiceDeliveryFullAddressTemp.value = newTaxInvoiceDeliveryFullAddressTemp.value
  handlerChangeTaxInvoice()
}
const handlerChangeTaxInvoice = ()=>{
  insureDetail.value.IsTaxInvoiceAddressSameAsDefault = addressIncludeTaxType.value=='insured'
  insureDetail.value.IsTaxInvoiceDeliveryAddressSameAsDefault = addressDeliveryTaxType.value=='insured'
  emit('changeTaxInvoice',insureDetail.value,requestIncludeTax.value.length > 0,shippedPolicy.value,ShippingMethodText.value)
}

const setCacheData = ()=>{
  if(props.cacheOrderRequest){
    requestIncludeTax.value =props.cacheOrderRequest.IsTaxInvoice==true? ['request'] : []
    if(props.cacheOrderRequest.Customer){
       console.log('props.cacheOrderRequest Customer', props.cacheOrderRequest.Customer)
      
      addressIncludeTaxType.value=props.cacheOrderRequest.Customer.IsTaxInvoiceAddressSameAsDefault==true ? 'insured' : 'addnew'
      addressDeliveryTaxType.value=props.cacheOrderRequest.Customer.IsTaxInvoiceDeliveryAddressSameAsDefault==true ? 'insured' : 'addnew'

      if(props.cacheOrderRequest.Customer.IsTaxInvoiceAddressSameAsDefault==false && props.cacheOrderRequest.Customer.TaxInvoiceAddress?.ProvinceID != ''){
        taxInvoiceAddress.value = props.cacheOrderRequest.Customer.TaxInvoiceAddress as DefaultAddress
      }
      if(props.cacheOrderRequest.Customer.IsTaxInvoiceDeliveryAddressSameAsDefault==false && props.cacheOrderRequest.Customer.TaxInvoiceDeliveryAddress?.ProvinceID != ''){
        cacheDefaultAddress.value = props.cacheOrderRequest.Customer.TaxInvoiceDeliveryAddress as DefaultAddress
        //const deliveryMethod1 = props.cacheOrderRequest.DeliveryMethod1

      }
      const deliveryMethod2 = props.cacheOrderRequest.DeliveryMethod2
          if(props.delivery && deliveryMethod2){
          const filter = props.delivery.filter(x=>x.value == deliveryMethod2.DeliveryChannelType)
          if(filter.length>0){
            shippedPolicy.value='separately'
            ShippingMethodText.value = deliveryMethod2.DeliveryChannelType
            ShippingMethodFee.value = filter[0].option ?? "0"
          }
        }
    }
    handlerChangeTaxInvoice()
  }
}
//watching props pass data
watch(
  () => props.addrProvince,
  () => {
    if (props.addrProvince && props.addrProvince.length > 0) {
      addrProvince.value = props.addrProvince
    }
  }
)
watch(
  () => props.addrDistrict,
  () => {
    if (props.addrDistrict && props.addrDistrict.length > 0) {
      addrDistrict.value = props.addrDistrict
    }
  }
)
watch(
  () => props.addrSubDistrict,
  () => {
    if (props.addrSubDistrict && props.addrSubDistrict.length > 0) {
      addrSubDistrict.value = props.addrSubDistrict
    }
    else {
      addrSubDistrict.value = []
    }
  }
)
watch(
  () => props.addrZipCode,
  () => {
    if (props.addrZipCode && props.addrZipCode.length > 0) {
      addrZipCode.value = props.addrZipCode
    }
    else {
      addrZipCode.value = ''
    }
  }
)
watch(
  () => props.addrProvince2,
  () => {
    if (props.addrProvince2 && props.addrProvince2.length > 0) {
      addrProvince2.value = props.addrProvince2
    }
  }
)
watch(
  () => props.addrDistrict2,
  () => {
    if (props.addrDistrict2 && props.addrDistrict2.length > 0) {
      addrDistrict2.value = props.addrDistrict2
    }
  }
)
watch(
  () => props.addrSubDistrict2,
  () => {
    if (props.addrSubDistrict2 && props.addrSubDistrict2.length > 0) {
      addrSubDistrict2.value = props.addrSubDistrict2
    }
    else {
      addrSubDistrict2.value = []
    }
  }
)
watch(
  () => props.addrZipCode2,
  () => {
    if (props.addrZipCode2 && props.addrZipCode2.length > 0) {
      addrZipCode2.value = props.addrZipCode2
    }
    else {
      addrZipCode2.value = ''
    }
  }
)
watch(
  () => props.prefix,
  () => {
    if (props.prefix && props.prefix.length > 0) {
      prefix.value = props.prefix
    }
  }
)
watch(
  () => props.delivery,
  () => {
    if (props.delivery && props.delivery.length > 0) {
      delivery.value = props.delivery
    }
  }
)
watch(
  () => props.isIncludeTax,
  () => {
    if (props.isIncludeTax == '1') {
      const array = ['request']
      requestIncludeTax.value = array
    }
  }
)
watch(
  () => props.insureFullAddress,
  () => {
    if(props.insureFullAddress){
      insureFullAddress.value = props.insureFullAddress
    }

  }
)
watch(
  addressIncludeTaxType,
  () => {
    if(addressIncludeTaxType.value){
      handlerChangeTaxInvoice()
    }

  }
)
watch(
  addressDeliveryTaxType,
  () => {
    if(addressDeliveryTaxType.value){
      handlerChangeTaxInvoice()
    }

  }
)
watch(
  shippedPolicy,
  () => {
    if(shippedPolicy.value){
      handlerChangeTaxInvoice()
    }

  }
)
watch(requestIncludeTax,()=>{
  handlerChangeTaxInvoice()
})
watch(()=>props.cacheOrderRequest,(newValue)=>{
  setCacheData()
})

// watch(
//   () => props.shippingPolicy,
//   () => {
//     if (props.shippingPolicy == 'postal') {
//       shippedPolicyOption.value = [
//   {
//       label: 'จัดส่งพร้อมกรมธรรม์',
//       value: 'together',
//     },
//     {
//       label: 'จัดส่งแยก',
//       value: 'separately',
//     },
// ]
//     }
//     else{
//       shippedPolicyOption.value = [
//   {
//       label: 'จัดส่งพร้อมกรมธรรม์',
//       value: 'together',
//     },
// ]
//     }
//   }
// )
</script>
