<template>
  <div class="card">
    <div class="card-body">
      <div class="accordion" id="accordion-shipping">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-shipping"
              aria-expanded="true"
              aria-controls="collapse-shipping"
            >
              วิธีการรับกรมธรรม์
            </button>
          </h2>

          <div
            id="collapse-shipping"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordion-shipping"
          >
            <div class="accordion-body">
              <div v-if="isPdfShipping" class="notice-info">
                <i class="fa-regular fa-circle-info"></i>
                ส่งกรมธรรม์ทางอีเมลหรือสามารถดาวน์โหลดได้จากระบบ
              </div>

              <div v-if="isPrintShipping" class="notice-warning">
                <i class="fa-regular fa-circle-info"></i>
                ควรเลือกกระดาษให้ตรงกับบริษัทประกันที่ซื้อและรายการกระดาษจะถูกหักออกจากคลัง
                หลังจากกดพิมพ์กรมธรรม์
              </div>

              <div class="form-placeorder">
                <section class="shipping-type">
                  <div class="form-hide-label">
                    <ElementsFormRadioShippingPolicy v-model="shippingPolicyText" />
                  </div>
                </section>

                <!-- TODO: Element key duplicate with insure detail -->
                <aside v-if="isPdfShipping" class="shipping-email-pdf col-md-12 col-lg-4">
                  <FormKit
                    type="email"
                    label="อีเมลสำหรับรับไฟล์กรมธรรม์"
                    name="EmailRecieve" 
                    v-model="emailText"
                    @change="handleEmailChange"
                    placeholder="xxxxxx@email.com"
                    validation="required"
                    :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                    autocomplete="off"
                  />
                </aside>

                <aside
                  v-if="isPrintShipping && props.packageSelect"
                  class="shipping-print"
                >
                  <p>
                    จำนวนกระดาษ <span>{{ props.packageSelect.CompanyName }}</span> คงเหลือ
                    <span>{{ props.packageSelect.Paper ? props.packageSelect.Paper.Quantity : 0 }}</span> ใบ
                  </p>
                </aside>

                <section v-if="isPostalShipping" class="shipping-method">
                  <h3>วิธีการจัดส่ง</h3>
                  <div class="row">
                    <div class="col-6">
                      <FormKit
                        type="select"
                        label="ช่องทางการจัดส่ง"
                        name="ShippingMethod"
                        placeholder="ช่องทางการจัดส่ง"
                        v-model="RecieveShippingMethodText"
                        @change="handleShippingMethodChange"
                        :options="delivery"
                        validation="required"
                        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                      />
                    </div>

                    <div class="col-6">
                      <FormKit
                        type="text"
                        label="ค่าจัดส่ง"
                        name="ShippingFee"
                        placeholder="ค่าจัดส่ง"
                        v-model="ShippingFeeText"
                        readonly
                      />
                    </div>
                  </div>
                </section>

                <section v-if="isPostalShipping" class="shipping-address">
                  <h3>ที่อยู่สำหรับจัดส่ง</h3>
                  <div class="form-hide-label">
                    <FormKit
                      type="radio"
                      label="รายชื่อที่อยู่"
                      name="PostalAddressPolicy"
                      v-model="postalAddressPolicyText"
                      :options="postalAddressPolicy"
                      options-class="option-block-stack"
                    >
                      <!-- <template #label="context">
                      <div class="ml-2">{{context.option.label}}</div>
                      <button>ลบ</button>
                      </template> -->
                    </FormKit>
                  </div>

                  <aside v-if="isAddnew && props.addressDefaultID == null" class="new-shipping-address inner-section">
                    <h4>ที่อยู่จัดส่งใหม่</h4>

                    <div class="row">
                      <ElementsFormNewAddress
                        element-key="delivery"
                        :prefix="prefix"
                        :addr-province="addrProvince"
                        :addr-district="addrDistrict"
                        :addr-sub-district="addrSubDistrict"
                        :addr-zip-code="addrZipCode"
                        :default-address-cache="newAddressCache"
                        @change-province="handlerChangeProvince"
                        @change-district="handlerChangeDistrict"
                        @change-sub-district="handlerChangeSubDistrict"
                        @change-full-address="handlerChangeFullAddress"
                      />
                    </div>

                    <!-- <button class="btn-primary btn-save" @click.prevent="handleButtonSaveClick" :disabled="insureFullNewAddress == ''">บันทึกข้อมูล</button> -->
                    <!-- <FormKit
                      type="submit"
                      label="บันทึกข้อมูล"
                      @click.prevent="handleButtonSaveClick"
                      :classes="{ input: 'btn-primary', outer: 'form-actions' }"
                      :disabled="insureFullNewAddress == ''"
                      :loading="isLoading"
                    /> 
                    <FormKit
                      type="submit"
                      label="บันทึกข้อมูล"
                      :loading="isLoading"
                    />-->


                  </aside>
                  <aside v-if="isAddnew && props.addressDefaultID != null">
                    <FormKit type="button" v-show="props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.AddressID != null" 
                      label="แก้ไขที่อยู่" name="customer-delivery" :classes="{
                      input: 'btn-primary',
                      }" @click="openDialogAddress" :disabled="isLoading" :loading="isLoading" 
                    />
                    <!-- Move to report at radio
                    <ElementsFormLabelAddress v-if="props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.AddressID != null"
                      :label-address="isNewLabel 
                      ? newAddressUpdate
                      : props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress"
                      />
                       -->
                  </aside>
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <ElementsDialogEditAddress v-if="isEditDeliveryAddress"
    :address-type="props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.Type"
    :customer-i-d="props.customerId" 
    :address-default-i-d="props.addressDefaultID"
    :address-i-d="props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.AddressID"
    :address-data-array="isNewLabel ? newAddressUpdate : addressDataArray" 
    :profile-data-array="isNewLabel ? newAddressUpdate : profileDataArray" 
    :show="isEditDeliveryAddress" @close-address="closeModalAddress"
    @on-edit-address="updateAddress"
    ></ElementsDialogEditAddress> 
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
import type { IInformation } from "~~/shared/entities/information-entity";
import type { IPackageResponse } from "~/shared/entities/packageList-entity";
import type { SelectOption, RadioOption } from "~/shared/entities/select-option";
import type { DefaultAddress, DeliveryAddress, InsuranceRecieveObject } from "~/shared/entities/placeorder-entity";

const emit = defineEmits(['changeProvince','changeDistrict','changeSubDistrict','checkInsuranceRecieve', 'newAddressID'])

const props = defineProps({
  prefix:Array<SelectOption>,
  delivery:Array<SelectOption>,
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode:String,
  customerId: String,
  addressDefaultID: String,
  insureFullAddress:String,
  packageSelect: {
    type: Object as () => IPackageResponse,
  },
  insuranceRecieveCache: {
    type: Object as () => InsuranceRecieveObject,
  },
})

const isLoading = ref(false);

const isEditDeliveryAddress = ref(false);

const isNewLabel = ref(false)

interface AddressData {
  No?: string
  Moo?: string
  Place?: string
  Building?: string
  Floor?: string
  Alley?: string
  Road?: string
  ProvinceID?: string
  DistrictID?: string
  SubDistrictID?: string
  postalCode?: string
  ProvinceLabel?: string
  DistrictLabel?: string
  SubDistrictLabel?: string
}

interface ProfileData {
  AddressID?: string
  FirstName?: string
  LastName?: string
  Name?: string
  PhoneNumber?: string
  TaxID?: string
}

interface LabelAddressData {
  AddressID?: string
  FirstName?: string
  LastName?: string
  Name?: string
  PhoneNumber?: string
  TaxID?: string
  No?: string
  Moo?: string
  Place?: string
  Building?: string
  Floor?: string
  Alley?: string
  Road?: string
  ProvinceID?: string
  DistrictID?: string
  SubDistrictID?: string
  postalCode?: string
  ProvinceName?: string
  DistrictName?: string
  SubDistrictName?: string
}

const addressDataArray = ref<AddressData>({})
const profileDataArray = ref<ProfileData>({})
const newAddressUpdate = ref<LabelAddressData>({})

const insuranceRecieveCache: globalThis.Ref<InsuranceRecieveObject | undefined> = ref()
const newAddressCache: globalThis.Ref<DefaultAddress | undefined> = ref()

var packageSelect: globalThis.Ref<IPackageResponse | undefined> = ref();
var companyName: globalThis.Ref<string> = ref("")
var paperBalance: globalThis.Ref<Number> = ref(0)

var shippingPolicyText: globalThis.Ref<String> = ref("")
var isPdfShipping: globalThis.Ref<boolean> = ref(false)
var isPrintShipping: globalThis.Ref<boolean> = ref(false)
var isPostalShipping: globalThis.Ref<boolean> = ref(false)

const postalAddressPolicy: globalThis.Ref<RadioOption[]> = ref([])
var postalAddressPolicyText: globalThis.Ref<String> = ref("insured")
var isInsured: globalThis.Ref<boolean> = ref(false)
var isAddnew: globalThis.Ref<boolean> = ref(false)

var emailText = ref("")
var emailValue: string = ""
var RecieveShippingMethodText = ref("")
var ShippingFeeText = ref("")

const prefix: globalThis.Ref<SelectOption[]> = ref([])
const delivery: globalThis.Ref<SelectOption[]> = ref([])
const addrProvince: globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode = ref("")

const newAddressObject: globalThis.Ref<DefaultAddress | undefined> = ref()
const insureFullAddress: globalThis.Ref<String> = ref('')
const insureFullNewAddress: globalThis.Ref<String> = ref('')

const onLoad = onMounted(async () => {
    if(props.prefix){
        prefix.value = props.prefix
    }
    if(props.delivery){
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
    if(props.insureFullAddress)
    {
      insureFullAddress.value = props.insureFullAddress
    }
    if(props.packageSelect){
      packageSelect.value = props.packageSelect
      companyName.value = props.packageSelect.CompanyName ?? ""
      paperBalance.value = props.packageSelect.PaperBalance ?? 0
    }
    if(props.insuranceRecieveCache){
      insuranceRecieveCache.value = props.insuranceRecieveCache
      if(insuranceRecieveCache.value) {
        //TODO fix shipping type
        if(insuranceRecieveCache.value.ShippingPolicy=='ELECTRONIC'){
          shippingPolicyText.value = 'pdf'
        }
        else if (insuranceRecieveCache.value.ShippingPolicy=='PAPER'){
          shippingPolicyText.value = 'print'
        }
        else{
          shippingPolicyText.value = 'postal'
        }
      
        emailText.value = insuranceRecieveCache.value.Email
        emailValue = insuranceRecieveCache.value.Email
        // await handleRadioShippingPolicyChange(insuranceRecieveCache.value.ShippingPolicy)

        if(shippingPolicyText.value == 'postal') {
          RecieveShippingMethodText.value = insuranceRecieveCache.value.PostalDelivary?.ShippingMethod ?? ""
          ShippingFeeText.value = insuranceRecieveCache.value.PostalDelivary?.ShippingFee ?? ""
          postalAddressPolicyText.value = insuranceRecieveCache.value.PostalDelivary?.IsDeliveryAddressSameAsDefault ? 'insured' : 'addnew'
          // await handleRadioPostalAddressPolicyChange(insuranceRecieveCache.value.PostalDelivary?.IsDeliveryAddressSameAsDefault ? 'insured' : 'addnew')

          if(postalAddressPolicyText.value == 'addnew') {
            let newAddress: DeliveryAddress = insuranceRecieveCache.value.PostalDelivary?.DeliveryAddress as DeliveryAddress
            newAddressCache.value = {
              AddressID: newAddress.AddressID,
              ReferenceID: newAddress.ReferenceID,
              ReferenceType: newAddress.ReferenceType,
              ProvinceID: newAddress.ProvinceID,
              DistrictID: newAddress.DistrictID,
              SubDistrictID: newAddress.SubDistrictID,
              TaxID: newAddress.TaxID,
              FirstName: newAddress.FirstName,
              LastName: newAddress.LastName,
              PhoneNumber: newAddress.PhoneNumber,
              Email: newAddress.Email,
              Name: newAddress.Name,
              Type: newAddress.Type,
              AddressLine1: newAddress.AddressLine1,
              AddressLine2: newAddress.AddressLine2,
              AddressText: newAddress.AddressText,
              No: newAddress.No,
              Moo: newAddress.Moo,
              Place: newAddress.Place,
              Building: newAddress.Building,
              Floor: newAddress.Floor,
              Room: newAddress.Room,
              Branch: newAddress.Branch,
              Alley: newAddress.Alley,
              Road: newAddress.Road,
              ZipCode: newAddress.ZipCode,
            }
          }
        }
        handleCheckInsuranceRecieve()
      }
    
    }
    
    await setPostalAddressPolicy(insureFullAddress.value.toString(), '')
});

const openDialogAddress = (open: boolean) => {
  mapAddressData();
  mapProfileData();
  isEditDeliveryAddress.value = false;
  isEditDeliveryAddress.value = open;
}

const closeModalAddress = async (refresh: boolean) => {
  if (refresh) {
    isEditDeliveryAddress.value = true;
    isEditDeliveryAddress.value = false;
  }
  isEditDeliveryAddress.value = false;
}

const mapProfileData = async () => {
  profileDataArray.value = {
    FirstName: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.FirstName || '',
    LastName: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.LastName || '',
    Name: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.Name || '',
    PhoneNumber: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.PhoneNumber || '',
    TaxID: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.TaxID || '',
    AddressID: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.AddressID || ''
  };
};

const mapAddressData = async () => {
  addressDataArray.value = {
    No: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.No || '',
    Moo: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.Moo || '',
    Place: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.Place || '',
    Building: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.Building || '',
    Floor: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.Floor || '',
    Alley: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.Alley || '',
    Road: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.Road || '',
    ProvinceID: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.ProvinceID || '',
    DistrictID: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.DistrictID || '',
    SubDistrictID: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.SubDistrictID || '',
    postalCode: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.ZipCode || '',
    ProvinceLabel: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.ProvinceName || '',
    DistrictLabel: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.DistrictName || '',
    SubDistrictLabel: props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.SubDistrictName || ''
  };
};

// Update profile after save
const updateAddress = async (e: string, AddrID: string) => {
  
  // get order after save or create
  const req = {
    CustomerID: e ?? "",
  };


  const getData = await useRepository().customer.AddressList(req);
  if (getData.apiResponse.Status && getData.apiResponse.Status == "200" && getData.apiResponse.Data) {
    const index = getData.apiResponse.Data.findIndex((item: any) => item.ID === props.insuranceRecieveCache?.PostalDelivary?.DeliveryAddress?.AddressID);

    // Check if the index is valid
    if (index !== -1) {
      // Extract address data and assign to addressDataArray
      newAddressUpdate.value = {
        No: getData.apiResponse.Data[index].No,
        Moo: getData.apiResponse.Data[index].Moo,
        Place: getData.apiResponse.Data[index].Place,
        Building: getData.apiResponse.Data[index].Building,
        Floor: getData.apiResponse.Data[index].Floor,
        Alley: getData.apiResponse.Data[index].Alley,
        Road: getData.apiResponse.Data[index].Road,
        ProvinceID: getData.apiResponse.Data[index].ProvinceID,
        DistrictID: getData.apiResponse.Data[index].DistrictID,
        SubDistrictID: getData.apiResponse.Data[index].SubDistrictID,
        ZipCode: getData.apiResponse.Data[index].ZipCode,
        ProvinceName: getData.apiResponse.Data[index].ProvinceName,
        DistrictName: getData.apiResponse.Data[index].DistrictName,
        SubDistrictName: getData.apiResponse.Data[index].SubDistrictName,
        FirstName: getData.apiResponse.Data[index].FirstName,
        LastName: getData.apiResponse.Data[index].LastName,
        Name: getData.apiResponse.Data[index].Name,
        PhoneNumber: getData.apiResponse.Data[index].PhoneNumber,
        TaxID: getData.apiResponse.Data[index].TaxID
      };
      isNewLabel.value = true
      await mapAddressData();
      insureFullNewAddress.value = `${newAddressUpdate.value.FirstName} ${newAddressUpdate.value.LastName} 
      ${newAddressUpdate.value.PhoneNumber} ${newAddressUpdate.value.DistrictName} ${newAddressUpdate.value.SubDistrictName}
      ${newAddressUpdate.value.ProvinceName} ${newAddressUpdate.value.ZipCode}`
      
      await setPostalAddressPolicy(insureFullAddress.value.toString(), insureFullNewAddress.value.toString())
      
    }
  }
  
  emit('newAddressID', AddrID)
}

watch(shippingPolicyText, async (newShippingPolicy) => {
  await handleRadioShippingPolicyChange(newShippingPolicy)
})

watch(postalAddressPolicyText, async (newAddressPolicy) => {
  //await openDialogAddress(!isAddnew.value)
  await handleRadioPostalAddressPolicyChange(newAddressPolicy)
})

// watch(insureFullNewAddress, async (newinsureFullNewAddress) => {
//   await setPostalAddressPolicy(insureFullAddress.value.toString(), newinsureFullNewAddress.toString())
// });

const setPostalAddressPolicy = async (labelInsured: string, labelAddnew: string) => {
  postalAddressPolicy.value = [
    {
      label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน',
      value: 'insured',
      help: labelInsured
    },
    {
      label: 'เปลี่ยนที่อยู่ใหม่',
      value: 'addnew',
      help: labelAddnew,
      attrs: { addnewaddress: true }
    }
  ]
}

const handleRadioShippingPolicyChange = async (event: String) => {
  switch (event) {
    case "pdf":
      isPdfShipping.value = true
      isPrintShipping.value = false
      isPostalShipping.value = false
      isInsured.value = true
      await handleCheckInsuranceRecieve()
      break
    case "print":
      isPdfShipping.value = false
      isPrintShipping.value = true
      isPostalShipping.value = false
      isInsured.value = true
      await handleCheckInsuranceRecieve()
      break
    case "postal":
      isPdfShipping.value = false
      isPrintShipping.value = false
      isPostalShipping.value = true
      await handleCheckInsuranceRecieve()
      break
  }
}

const handleShippingMethodChange = async (event: any) => {
  const value = event.target.value
  if(value){
    const filter = delivery.value.filter(x=>x.value==value)

    if(filter.length>0){
      ShippingFeeText.value = filter[0].option ?? ""
    }
  }
  await handleCheckInsuranceRecieve()
}

const handleRadioPostalAddressPolicyChange = async (event: String) => {
  switch (event) {
    case "insured":
      isInsured.value = true
      isAddnew.value = false
      await handleCheckInsuranceRecieve()
      break
    case "addnew":
      isInsured.value = false
      isAddnew.value = true
      await handleCheckInsuranceRecieve()
      break
  }
}

const handleEmailChange = async (event: any) => {
  emailValue = event.target.value
  await handleCheckInsuranceRecieve()
}

const handleButtonSaveClick = async (event: any) => {
  await setPostalAddressPolicy(insureFullAddress.value.toString(), insureFullNewAddress.value.toString())
}

// handler function for emit
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

const handlerChangeFullAddress = async (addr:string, ObjectAddress:DefaultAddress)=>{
  if(addr && ObjectAddress){
    //TODO implement coding new address
    //insureFullNewAddress.value = `${ObjectAddress.PrefixName} ${ObjectAddress.FirstName} ${ObjectAddress.LastName} `+addr
    insureFullNewAddress.value = `${ObjectAddress.FirstName} ${ObjectAddress.LastName} `+addr
    newAddressObject.value = ObjectAddress

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
      ShippingMethod: RecieveShippingMethodText.value,
      ShippingFee: ShippingFeeText.value,
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
        ZipCode: newAddressObject.value?.ZipCode ?? '',
      }
    }
  }
  await setPostalAddressPolicy(insureFullAddress.value.toString(), insureFullNewAddress.value.toString())
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
      console.log('props.addrSubDistrict', props.addrSubDistrict)
      if (props.addrSubDistrict && props.addrSubDistrict.length > 0) {
          addrSubDistrict.value = props.addrSubDistrict
      }
      else {
        console.log('props.addrSubDistrict Else', props.addrSubDistrict)
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
    () => props.insureFullAddress,
    () => {
        if (props.insureFullAddress && props.insureFullAddress.length > 0) {
            insureFullAddress.value = props.insureFullAddress
            setPostalAddressPolicy(insureFullAddress.value.toString(), insureFullNewAddress.value.toString() ?? '')
        }
    }
)
watch(
  ()=>props.insuranceRecieveCache,
  ()=>{
    if(props.insuranceRecieveCache && props.insuranceRecieveCache != undefined){
      insuranceRecieveCache.value = props.insuranceRecieveCache
      // console.log('insuranceRecieveCache.value', insuranceRecieveCache.value)
      if(insuranceRecieveCache.value) {
        //TODO fix shipping type
        if(insuranceRecieveCache.value.ShippingPolicy=='ELECTRONIC'){
          shippingPolicyText.value = 'pdf'
          }
          else if (insuranceRecieveCache.value.ShippingPolicy=='PAPER'){
            shippingPolicyText.value = 'print'
          }
          else{
            shippingPolicyText.value = 'postal'
          }
          emailText.value = insuranceRecieveCache.value.Email
          emailValue = insuranceRecieveCache.value.Email
          // await handleRadioShippingPolicyChange(insuranceRecieveCache.value.ShippingPolicy)

          if(shippingPolicyText.value == 'postal') {
            RecieveShippingMethodText.value = insuranceRecieveCache.value.PostalDelivary?.ShippingMethod ?? ""
            ShippingFeeText.value = insuranceRecieveCache.value.PostalDelivary?.ShippingFee ?? ""
            postalAddressPolicyText.value = insuranceRecieveCache.value.PostalDelivary?.IsDeliveryAddressSameAsDefault ? 'insured' : 'addnew'
            // await handleRadioPostalAddressPolicyChange(insuranceRecieveCache.value.PostalDelivary?.IsDeliveryAddressSameAsDefault ? 'insured' : 'addnew')

            if(postalAddressPolicyText.value == 'addnew') {
              let newAddress: DeliveryAddress = insuranceRecieveCache.value.PostalDelivary?.DeliveryAddress as DeliveryAddress
              newAddressCache.value = {
                AddressID: newAddress.AddressID,
                ReferenceID: newAddress.ReferenceID,
                ReferenceType: newAddress.ReferenceType,
                ProvinceID: newAddress.ProvinceID,
                DistrictID: newAddress.DistrictID,
                SubDistrictID: newAddress.SubDistrictID,
                TaxID: newAddress.TaxID,
                FirstName: newAddress.FirstName,
                LastName: newAddress.LastName,
                PhoneNumber: newAddress.PhoneNumber,
                Email: newAddress.Email,
                Name: newAddress.Name,
                Type: newAddress.Type,
                AddressLine1: newAddress.AddressLine1,
                AddressLine2: newAddress.AddressLine2,
                AddressText: newAddress.AddressText,
                No: newAddress.No,
                Moo: newAddress.Moo,
                Place: newAddress.Place,
                Building: newAddress.Building,
                Floor: newAddress.Floor,
                Room: newAddress.Room,
                Branch: newAddress.Branch,
                Alley: newAddress.Alley,
                Road: newAddress.Road,
                ZipCode: newAddress.ZipCode,
              }
            }
          }

        handleCheckInsuranceRecieve()
      }
    }
  }
)
</script>
