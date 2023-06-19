<template>
  <div class="card">
    <div class="card-body">

      <div class="accordion" id="accordion-shipping">
        <div class="accordion-item">

          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapse-shipping" aria-expanded="true"
              aria-controls="collapse-shipping">วิธีการรับกรมธรรม์
            </button>
          </h2>

          <div id="collapse-shipping" class="accordion-collapse collapse show" data-bs-parent="#accordion-shipping">
            <div class="accordion-body">

              <div class="notice-info">
                <i class="fa-regular fa-circle-info"></i>
                ส่งกรมธรรม์ทางอีเมลหรือสามารถดาวน์โหลดได้จากระบบ
              </div>

              <div class="notice-warning">
                <i class="fa-regular fa-circle-info"></i>
                ควรเลือกกระดาษให้ตรงกับบริษัทประกันที่ซื้อและรายการกระดาษจะถูกหักออกจากคลัง หลังจากกดพิมพ์กรมธรรม์
              </div>

              <div class="form-placeorder">
                <section class="shipping-type">
                  <div class="form-hide-label">
                    <ElementsFormRadioShippingPolicy v-model="shippingPolicyText" />
                  </div>
                </section>

                <aside v-if="isPdfShipping" class="shipping-email-pdf col-md-12 col-lg-4">
                  <FormKit type="email" label="อีเมลสำหรับรับไฟล์กรมธรรม์" name="Email"
                    v-model="emailText" @change="handleEmailChange"
                    placeholder="xxxxxx@email.com" validation="required"
                    :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
                </aside>

                <aside v-if="isPrintShipping" class="shipping-print">
                  <p>จำนวนกระดาษ <span>{{props.packageSelect.CompanyName}}</span> คงเหลือ <span>{{props.packageSelect.PaperBalance}}</span> ใบ</p>
                </aside>

                <section v-if="isPostalShipping" class="shipping-method">
                  <h3>วิธีการจัดส่ง</h3>
                  <div class="row">
                    <div class="col-6">
                      <FormKit type="select" label="ช่องทางการจัดส่ง" name="ShippingMethod"
                        placeholder="ช่องทางการจัดส่ง" v-model="ShippingMethodText"
                        :options="{
                          dhl: 'DHL Express',
                          kerry: 'Kerry'
                        }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                    </div>

                    <div class="col-6">
                      <FormKit type="text" label="ค่าจัดส่ง" name="ShippingFee" placeholder="ค่าจัดส่ง"
                        v-model="ShippingFeeText" readonly />
                    </div>
                  </div>
                </section>

                <section v-if="isPostalShipping" class="shipping-address">
                  <h3>ที่อยู่สำหรับจัดส่ง</h3>
                  <div class="form-hide-label">
                    <FormKit type="radio" label="รายชื่อที่อยู่" name="PostalAddressPolicy" v-model="postalAddressPolicyText" 
                      :options="[
                        { label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน', value: 'insured', help: insureFullAddress ?? '724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160' },
                        { label: 'เปลี่ยนที่อยู่ใหม่', value: 'addnew', attrs: { addnewaddress: true } },
                      ]" options-class="option-block-stack" />
                  </div>

                  <aside v-if="isAddnew" class="new-shipping-address inner-section">
                    <h4>ที่อยู่จัดส่งใหม่</h4>

                    <div class="row">
                      <ElementsFormNewAddress 
                        :addr-province="addrProvince"
                        :addr-district="addrDistrict"
                        :addr-sub-district="addrSubDistrict"
                        :addr-zip-code="addrZipCode"
                        @change-province="handlerChangeProvince"
                        @change-district="handlerChangeDistrict"
                        @change-sub-district="handlerChangeSubDistrict"
                        @change-full-address="handlerChangeFullAddress"/>
                    </div>

                    <button class="btn-primary btn-save">บันทึกข้อมูล</button>
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

<style scoped>
.shipping-email-pdf,
.shipping-print,
.shipping-method,
.shipping-address,
.new-shipping-address {
  display: block;
}
</style>

<script setup lang="ts">
import { IInformation } from "~~/shared/entities/information-entity";
import { IPackageResponse } from "~/shared/entities/packageList-entity";
import { SelectOption } from "~/shared/entities/select-option";
import { DefaultAddress, InsuranceRecieveObject } from "~/shared/entities/placeorder-entity";

const emit = defineEmits(['changeProvince','changeDistrict','changeSubDistrict','checkInsuranceRecieve'])

const props = defineProps({
  prefix:Array<SelectOption>,
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode:String,
  insureFullAddress:String,
  packageSelect: {
    type: Object as () => IPackageResponse,
  },
})

const isLoading = ref(false);

var packageSelect: globalThis.Ref<IPackageResponse | undefined> = ref();
var companyName: globalThis.Ref<string> = ref("")
var paperBalance: globalThis.Ref<Number> = ref(0)

var shippingPolicyText: globalThis.Ref<String> = ref("")
var isPdfShipping: globalThis.Ref<boolean> = ref(false)
var isPrintShipping: globalThis.Ref<boolean> = ref(false)
var isPostalShipping: globalThis.Ref<boolean> = ref(false)

var postalAddressPolicyText: globalThis.Ref<String> = ref("")
var isInsured: globalThis.Ref<boolean> = ref(false)
var isAddnew: globalThis.Ref<boolean> = ref(false)

var emailText: string = ""
var emailValue: string = ""
var ShippingMethodText: string = ""
var ShippingFeeText: string = "50 บาท"

const prefix: globalThis.Ref<SelectOption[]> = ref([])
const addrProvince: globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode = ref('')

const newAddressObject: globalThis.Ref<DefaultAddress | undefined> = ref() 
const insureFullAddress: globalThis.Ref<String> = ref('')
const insureFullNewAddress: globalThis.Ref<String> = ref('')

const onLoad = onMounted(async () => {
  // const jsonPackage = sessionStorage.getItem("useStorePackage") || "";
  // packdageSelect = JSON.parse(jsonPackage) as IPackageResponse;
  // companyName.value = packdageSelect?.CompanyName
  // paperBalance.value = packdageSelect?.PaperBalance ?? 0

    if(props.prefix){
        prefix.value = props.prefix
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
    if(props.insureFullAddress)
    {
      insureFullAddress.value = props.insureFullAddress
    }
    if(props.packageSelect){
      packageSelect.value = props.packageSelect
      companyName.value = props.packageSelect.CompanyName ?? ""
      paperBalance.value = props.packageSelect.PaperBalance ?? 0
    }
});

watch(shippingPolicyText, async (newShippingPolicy) => {
  await handleRadioShippingPolicyChange(newShippingPolicy);
});

watch(postalAddressPolicyText, async (newAddressPolicy) => {
  await handleRadioPostalAddressPolicyChange(newAddressPolicy);
});

const handleRadioShippingPolicyChange = async (event: String) => {
  switch (event) {
    case "pdf":
      isPdfShipping.value = true
      isPrintShipping.value = false
      isPostalShipping.value = false
      isInsured.value = true
      await handleCheckInsuranceRecieve()
      break;
    case "print": 
      isPdfShipping.value = false
      isPrintShipping.value = true
      isPostalShipping.value = false
      isInsured.value = true
      await handleCheckInsuranceRecieve()
      break;
    case "postal": 
      isPdfShipping.value = false
      isPrintShipping.value = false
      isPostalShipping.value = true
      await handleCheckInsuranceRecieve()
      break;
  }
}

const handleRadioPostalAddressPolicyChange = async (event: String) => {
  switch (event) {
    case "insured":
      isInsured.value = true
      isAddnew.value = false
      break;
    case "addnew": 
      isInsured.value = false
      isAddnew.value = true
      break;
  }
}

const handleEmailChange = async (event: any) => {
  emailValue = event.target.value
  await handleCheckInsuranceRecieve()
  console.log('handleEmailChange', event.target.value);
}

// handler function for emit
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
const handlerChangeFullAddress = async (addr:string, ObjectAddress:DefaultAddress)=>{
  if(addr && ObjectAddress){
    //TODO implement coding new address
    insureFullNewAddress.value = addr
    newAddressObject.value = ObjectAddress
    console.log(addr,ObjectAddress)
    await handleCheckInsuranceRecieve()
    //emit('changeFullAddress',addr,ObjectAddress)
  }
}
const handleCheckInsuranceRecieve = async () => {
  let RecieveObject: InsuranceRecieveObject = {
    ShippingPolicy: shippingPolicyText.value.toString(),
    Email: emailValue,
    PostalDelivary: {
      IsDeliveryAddressSameAsDefault: postalAddressPolicyText.value == 'insured' ? true : false,
      ShippingMethod: ShippingMethodText,
      ShippingFee: ShippingFeeText,
      DeliveryAddress: {
        AddressID: newAddressObject.value?.AddressID ?? '',
        ReferenceID: newAddressObject.value?.ReferenceID ?? '',
        ReferenceType: newAddressObject.value?.ReferenceType ?? '',
        ProvinceID: newAddressObject.value?.ProvinceID ?? '',
        DistrictID: newAddressObject.value?.DistrictID ?? '',
        SubDistrictID: newAddressObject.value?.SubDistrictID ?? '',
        TaxID: newAddressObject.value?.TaxID ?? '',
        FirstName: newAddressObject.value?.FirstName ?? '',
        LastName: newAddressObject.value?.LastName ?? '',
        PhoneNumber: newAddressObject.value?.PhoneNumber ?? '',
        Email: newAddressObject.value?.Email ?? '',
        Name: newAddressObject.value?.Name ?? '',
        Type: newAddressObject.value?.Type ?? '',
        AddressLine1: newAddressObject.value?.AddressLine1 ?? '',
        AddressLine2: newAddressObject.value?.AddressLine2 ?? '',
        AddressText: newAddressObject.value?.AddressText ?? '',
        No: newAddressObject.value?.No ?? '',
        Moo: newAddressObject.value?.Moo ?? '',
        Place: newAddressObject.value?.Place ?? '',
        Building: newAddressObject.value?.Building ?? '',
        Floor: newAddressObject.value?.Floor ?? '',
        Room: newAddressObject.value?.Room ?? '',
        Branch: newAddressObject.value?.Branch ?? '',
        Alley: newAddressObject.value?.Alley ?? '',
        Road: newAddressObject.value?.Road ?? '',
      }
    }
  }

  emit('checkInsuranceRecieve', RecieveObject)
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
    }
)
watch(
    () => props.addrZipCode,
    () => {
        if (props.addrZipCode && props.addrZipCode.length > 0) {
            addrZipCode.value = props.addrZipCode
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
</script>