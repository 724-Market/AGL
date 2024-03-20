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
                      name="AddressTax"
                      :options="getAddressOption(props.isTaxAddress)"
                      options-class="option-block-stack"
                      v-model="addressIncludeTaxType"
                    />
                  </div>

                  <aside
                    class="new-request-tax-address inner-section"
                    v-if="
                      addressIncludeTaxType == 'addnew' &&
                      props.cacheOrderRequest?.Customer?.DefaultAddress?.AddressID ==
                        null
                    "

                  >
                    <h4>แก้ไขใบกำกับภาษี</h4>

                    <div class="row">
                      <!-- <div class="col-sm-4 col-lg-3">
                        <FormKit
                          type="select"
                          label="คำนำหน้าผู้รับ"
                          name="NewTitle"
                          placeholder="คำนำหน้า"
                          :options="prefix"
                          validation="required"
                          v-model="taxInvoiceAddress.Prefix"
                          validation-visibility="live"
                          :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                        />
                      </div> -->
                      <div class="col-sm-8 col-lg-4">
                        <FormKit
                          type="text"
                          label="ชื่อผู้รับ"
                          name="NewFirstName"
                          placeholder="ชื่อ"
                          validation-visibility="live"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="off"
                          @keyup="handlerChangeTaxInvoice"
                          v-model="taxInvoiceAddress.FirstName"
                        />
                      </div>
                      <div class="col-md-12 col-lg-5">
                        <FormKit
                          type="text"
                          label="นามสกุลผู้รับ"
                          name="NewLastName"
                          placeholder="นามสกุล"
                          validation-visibility="live"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="off"
                          @keyup="handlerChangeTaxInvoice"
                          v-model="taxInvoiceAddress.LastName"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="NewPhoneNumber"
                          placeholder="098765XXXX"
                          validation-visibility="live"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="off"
                          @keyup="handlerChangeTaxInvoice"
                          v-model="taxInvoiceAddress.PhoneNumber"
                        />
                      </div>

                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="ภาษี"
                          mask="#-####-#####-##-#"
                          name="TaxID"
                          maxlength="13"
                          placeholder="เลขบัตรประชาชน 13 หลัก"
                          v-model="taxInvoiceAddress.TaxID"
                          @keyup="handlerChangeTaxInvoice"
                          validation-visibility="live"
                          validation="required|matches:/^[0-9]{13}$/"
                          :validation-messages="{
                            required: 'กรุณาใส่เลขบัตรประชาชน',
                            matches: 'เลขบัตรประชาชนควรเป็นตัวเลข 13 หลัก',
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
                  </aside>

                  <aside
                    class="new-request-tax-address inner-section"
                    v-if="
                      addressIncludeTaxType == 'addnew'"

                  >
                    <div class="row" v-show="false">
                      <div class="col-sm-8 col-lg-4">
                        <FormKit
                          type="text"
                          label="ชื่อผู้รับ"
                          name="NewFirstName"
                          placeholder="ชื่อ"
                          autocomplete="off"
                          @keyup="handlerChangeTaxInvoice"
                          v-model="taxInvoiceAddress.FirstName"
                        />
                      </div>
                      <div class="col-md-12 col-lg-5">
                        <FormKit
                          type="text"
                          label="นามสกุลผู้รับ"
                          name="NewLastName"
                          placeholder="นามสกุล"
                          autocomplete="off"
                          @keyup="handlerChangeTaxInvoice"
                          v-model="taxInvoiceAddress.LastName"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="NewPhoneNumber"
                          placeholder="098765XXXX"
                          autocomplete="off"
                          @keyup="handlerChangeTaxInvoice"
                          v-model="taxInvoiceAddress.PhoneNumber"
                        />
                      </div>

                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="ภาษี"
                          mask="#-####-#####-##-#"
                          name="TaxID"
                          maxlength="13"
                          placeholder="เลขบัตรประชาชน 13 หลัก"
                          v-model="taxInvoiceAddress.TaxID"
                          @keyup="handlerChangeTaxInvoice"
                        />
                      </div>
                      <!--Waiting to test and remove CopyAddress component
                      <ElementsFormCopyAddress
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
                      />-->
                    </div>

                    
                  </aside>
                  <FormKit
                      type="button"
                      v-show="props.cacheOrderRequest?.OrderNo != null"
                      label="แก้ไขใบกำกับ"
                      name="tax-address"
                      :classes="{
                        input: 'btn-primary',
                      }"
                      @click="openDialogAddress"
                      :disabled="isLoading"
                      :loading="isLoading"
                    />
                </section>

                <div
                  class="shippped-tax-type"
                  v-show="shippingPolicy == 'postal' && requestIncludeTax.length > 0"
                >
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
                  <div class="form-hide-label" >
                    <FormKit
                      type="radio"
                      label="รายชื่อที่อยู่"
                      :options="getDeliveryOption(props.isTaxDelivery)"
                      options-class="option-block-stack"
                      v-model="addressDeliveryTaxType"
                    />
                  </div>
                    <!-- <FormKit
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
                  </div> -->
                  
                  <aside

                    v-if="
                      addressDeliveryTaxType == 'addnew' &&
                      props.cacheOrderRequest?.Customer?.DefaultAddress?.AddressID == null"

                    class="new-shipped-tax-address inner-section"
                  >
                    <h4>ที่อยู่จัดส่งใหม่</h4>
                    <div class="row">
                      <ElementsFormNewAddress
                        element-key="taxinvoice_delivery"
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
                  </aside>
<!--
                  <aside
                    v-if="
                      addressDeliveryTaxType == 'addnew'"
                  >
                    Waiting to test and remove CopyNewAddress component
                    <div class="row" v-show="false">

                      <ElementsFormCopyNewAddress
                        element-key="taxinvoice_delivery"
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

                    
                  </aside>-->
                  <FormKit
                      type="button"
                      v-show="props.cacheOrderRequest?.OrderNo != null"
                      label="แก้ไขที่อยู่จัดส่งใบกำกับ"
                      name="tax-delivery"
                      :classes="{
                        input: 'btn-primary',
                      }"
                      @click="openDialogDelivery"
                      :disabled="isLoading"
                      :loading="isLoading"
                    />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ElementsDialogEditAddress
    v-if="isEditTaxAddress"
    :address-type="'TAXINVOICE'"
    :customer-i-d="stCustomerID"
    :address-i-d="props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.AddressID 
    ?? props.cacheOrderRequest?.Customer?.DefaultAddress?.AddressID"
    :address-default-i-d="props.addressDefaultID"
    :address-data-array="newTaxAddressUpdate"
    :profile-data-array="newTaxAddressUpdate"
    :show="isEditTaxAddress"
    @close-address="closeModalAddress"
    @on-edit-address="getAddressList"
  ></ElementsDialogEditAddress>
  <ElementsDialogEditAddress
    v-if="isEditTaxDelivery"
    :address-type="'TAXINVOICE_DELIVERY'"
    :customer-i-d="stCustomerID"
    :address-i-d="props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.AddressID 
    ?? props.cacheOrderRequest?.Customer?.DefaultAddress?.AddressID"
    :address-default-i-d="props.addressDefaultID"
    :address-data-array="newTaxDeliveryAddressUpdate"
    :profile-data-array="newTaxDeliveryAddressUpdate"
    :show="isEditTaxDelivery"
    @close-address="closeModalDelivery"
    @on-edit-address="getAddressList"
  ></ElementsDialogEditAddress>
</template>
<script setup lang="ts">
import type { CustomerOrderRequest, DefaultAddress, PlaceOrderRequest, TaxInvoiceAddress, TaxInvoiceDeliveryAddress } from "~/shared/entities/placeorder-entity"
import type { RadioOption, SelectOption } from "~/shared/entities/select-option"

const emit = defineEmits(['changeProvince', 'changeDistrict', 'changeSubDistrict', 'changeProvince2', 'changeDistrict2', 'changeSubDistrict2', 'changeTaxInvoice', 'newTaxID', 'newTaxAddressID'])

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
  addressDefaultID: String,
  isIncludeTax: String,//1,0
  isTaxAddress: Boolean,
  isTaxDelivery: Boolean,
  shippingPolicy: String, // email,pdf,postal
  cacheOrderRequest: {
    type: Object as () => PlaceOrderRequest
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
const addressType = ref('')
const stCustomerID = ref('')
const arAddressList = ref([])

const isLoading = ref(false);
const isEditTaxAddress = ref(false)
const isEditTaxDelivery = ref(false)
const isNewLabel = ref(false)

interface AddressData {
  No?: string
  Moo?: string
  Place?: string
  Building?: string
  Floor?: string
  Alley?: string
  Road?: string
  Type?: string
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
  Type?: string
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

const taxInvoiceAddr = ref<AddressData>({})
const taxInvoiceProfile = ref<ProfileData>({})
const taxDeliveryAddr = ref<AddressData>({})
const taxDeliveryProfile = ref<ProfileData>({})
const newTaxAddressUpdate = ref<LabelAddressData>({})
const newTaxDeliveryAddressUpdate = ref<LabelAddressData>({})

const taxInvoiceAddress: globalThis.Ref<TaxInvoiceAddress> = ref({
  AddressID: '',
  ReferenceID: '',
  ReferenceType: '',
  ProvinceID: '',
  DistrictID: '',
  SubDistrictID: '',
  ProvinceName: '',
  DistrictName: '',
  SubDistrictName: '',
  TaxID: '',
  FirstName: '',
  LastName: '',
  PhoneNumber: '',
  Email: '',
  Name: '',
  Type: '',
  AddressLine1: '',
  AddressLine2: '',
  AddressText: '',
  No: '',
  Moo: '',
  Place: '',
  Building: '',
  Floor: '',
  Room: '',
  Branch: '',
  Alley: '',
  Road: '',
  Prefix:'',
})
const taxInvoiceDeliveryAddress: globalThis.Ref<TaxInvoiceAddress> = ref({
  AddressID: '',
  ReferenceID: '',
  ReferenceType: '',
  ProvinceID: '',
  DistrictID: '',
  SubDistrictID: '',
  ProvinceName: '',
  DistrictName: '',
  SubDistrictName: '',
  TaxID: '',
  FirstName: '',
  LastName: '',
  PhoneNumber: '',
  Email: '',
  Name: '',
  Type: '',
  AddressLine1: '',
  AddressLine2: '',
  AddressText: '',
  No: '',
  Moo: '',
  Place: '',
  Building: '',
  Floor: '',
  Room: '',
  Branch: '',
  Alley: '',
  Road: '',
})
const ShippingMethodText = ref('')
const ShippingMethodFee = ref('')
const insureDetail: globalThis.Ref<CustomerOrderRequest> = ref({})
const cacheDefaultAddress: globalThis.Ref<DefaultAddress | undefined> = ref()
const taxAddressOption = ref([])
const taxDeliveryOption = ref([])
const onLoad = onMounted(async () => {
  //console.log(props.cacheOrderRequest)

  insureDetail.value.TaxInvoiceAddress = taxInvoiceAddress.value 

  if (props.cacheOrderRequest) {
    taxAddressOption.value = await getAddressOption(props.isTaxAddress); // Update the value using .value
    taxDeliveryOption.value = await getDeliveryOption(props.isTaxDelivery); // Update the value using .value

    await setCacheData()
    stCustomerID.value = props.cacheOrderRequest?.Customer?.IsPerson ? props.cacheOrderRequest?.Customer?.PersonProfile?.CustomerID : props.cacheOrderRequest?.Customer?.LegalPersonProfile?.CustomerID
    await getAddressList(stCustomerID)
    if(props.cacheOrderRequest?.Customer?.IsTaxInvoiceAddressSameAsDefault == false){
      addressType.value = 'TAXINVOICE'
      await updateAddress(props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.AddressID)
    }
    if(props.cacheOrderRequest?.Customer?.IsTaxInvoiceDeliveryAddressSameAsDefault == false){
      addressType.value = 'TAXINVOICE_DELIVERY'
      await updateAddress(props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.AddressID)
    }
    
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

const getAddressOption = (isAddress: boolean) => {
  if (isAddress) {
    return [
      {
        label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน',
        help: insureFullAddress,
        //'724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160',
        value: 'insured',
      },
    ];
  } else {
    return [
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
      }
    ];
  }
};

const getDeliveryOption = (isTaxDelivery: boolean) => {
  if (isTaxDelivery) {
    return [
      {
        label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน',
        help: insureFullAddress,
        //'724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160',
        value: 'insured',
      },
    ];
  } else {
    return [
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
      }
    ];
  }
};


const openDialogAddress = (open: boolean) => {
  //addressIncludeTaxType == 'addnew'
  addressType.value = 'TAXINVOICE'
  mapAddressData();
  mapProfileData();
  isEditTaxAddress.value = false;
  isEditTaxAddress.value = open;
}

const closeModalAddress = async (refresh: boolean) => {
  if (refresh) {
    isEditTaxAddress.value = true;
    isEditTaxAddress.value = false;
  }
  isEditTaxAddress.value = false;
}

const openDialogDelivery = (open: boolean) => {
  addressType.value = 'TAXINVOICE_DELIVERY'
  mapAddressData();
  mapProfileData();
  isEditTaxDelivery.value = false;
  isEditTaxDelivery.value = open;
}

const closeModalDelivery = async (refresh: boolean) => {
  if (refresh) {
    isEditTaxDelivery.value = true;
    isEditTaxDelivery.value = false;
  }
  isEditTaxDelivery.value = false;
}

//Mapdata to show at label waiting upgrade to const mapProfileData = async (newData: Object) version
const mapProfileData = async () => {
  taxInvoiceProfile.value = {
    FirstName: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.FirstName || '',
    LastName: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.LastName || '',
    Name: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.Name || '',
    PhoneNumber: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.PhoneNumber || '',
    TaxID: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.TaxID || '',
    AddressID: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.AddressID || ''
  };
  taxDeliveryProfile.value = {
    FirstName: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.FirstName || '',
    LastName: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.LastName || '',
    Name: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.Name || '',
    PhoneNumber: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.PhoneNumber || '',
    TaxID: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.TaxID || '',
    AddressID: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.AddressID || ''
  };
};

const mapAddressData = async () => {
  taxInvoiceAddr.value = {
    No: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.No || '',
    Moo: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.Moo || '',
    Place: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.Place || '',
    Building: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.Building || '',
    Floor: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.Floor || '',
    Alley: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.Alley || '',
    Road: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.Road || '',
    Type: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.Type || '',
    ProvinceID: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.ProvinceID || '',
    DistrictID: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.DistrictID || '',
    SubDistrictID: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.SubDistrictID || '',
    postalCode: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.ZipCode || '',
    ProvinceLabel: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.ProvinceName || '',
    DistrictLabel: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.DistrictName || '',
    SubDistrictLabel: props.cacheOrderRequest?.Customer?.TaxInvoiceAddress?.SubDistrictName || ''
  };
  taxDeliveryAddr.value = {
    No: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.No || '',
    Moo: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.Moo || '',
    Place: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.Place || '',
    Building: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.Building || '',
    Floor: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.Floor || '',
    Alley: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.Alley || '',
    Road: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.Road || '',
    Type: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.Type || '',
    ProvinceID: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.ProvinceID || '',
    DistrictID: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.DistrictID || '',
    SubDistrictID: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.SubDistrictID || '',
    postalCode: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.ZipCode || '',
    ProvinceLabel: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.ProvinceName || '',
    DistrictLabel: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.DistrictName || '',
    SubDistrictLabel: props.cacheOrderRequest?.Customer?.TaxInvoiceDeliveryAddress?.SubDistrictName || ''
  };
};

const getAddressList = async (e: string, AddrID: string) => {

  const req = {
    CustomerID: e ?? "",
  };

  const response = await useRepository().customer.AddressList(req);
    if (
      response.apiResponse.Status == "200" &&
      response.apiResponse.Data 
    ) {
      arAddressList.value = response.apiResponse.Data
      if(AddrID){
        await updateAddress(AddrID)
      }
    }

};

// Update profile after save
const updateAddress = async (AddrID: string) => {
  // get order after save or create
  // const req = {
  //   CustomerID: e ?? "",
  // };


  //const getData = await useRepository().customer.AddressList(req);
  //if (getData.apiResponse.Status && getData.apiResponse.Status == "200" && getData.apiResponse.Data) {
    //const index = getData.apiResponse.Data.findIndex((item: any) => item.ID === AddrID);
  if (arAddressList) {
    // Finding index based on ID
  const index = arAddressList.value.findIndex((item) => item.ID === AddrID);

  // Checking if index is found
  // if (index !== -1) {
  //   Item with specified ID found
  //   const foundItem = arAddressList.value[index];
  //   console.log("Found item:", foundItem);
  // } else {
  //   Item with specified ID not found
  //   console.log("Item not found");
  // }

    // Check if the index is valid
    if (index !== -1) {
      if(addressType.value == 'TAXINVOICE'){
        // Extract address data and assign to addressDataArray
        //const taxAddress = getData.apiResponse.Data[index];
        const taxAddress = arAddressList.value[index];
        newTaxAddressUpdate.value = {
          No: taxAddress.No,
          Moo: taxAddress.Moo,
          Place: taxAddress.Place,
          Building: taxAddress.Building,
          Floor: taxAddress.Floor,
          Alley: taxAddress.Alley,
          Road: taxAddress.Road,
          ProvinceID: taxAddress.ProvinceID,
          DistrictID: taxAddress.DistrictID,
          SubDistrictID: taxAddress.SubDistrictID,
          postalCode: taxAddress.ZipCode,
          ProvinceName: taxAddress.ProvinceName,
          DistrictName: taxAddress.DistrictName,
          SubDistrictName: taxAddress.SubDistrictName,
          FirstName: taxAddress.FirstName,
          LastName: taxAddress.LastName,
          Name: taxAddress.Name,
          PhoneNumber: taxAddress.PhoneNumber,
          TaxID: taxAddress.TaxID
        };

        newTaxInvoiceFullAddressTemp.value = `${newTaxAddressUpdate.value.FirstName} 
        ${newTaxAddressUpdate.value.LastName}
        ${newTaxAddressUpdate.value.TaxID ? 'เลขที่ผู้เสียภาษี '+newTaxAddressUpdate.value.TaxID : ''} 
        ${newTaxAddressUpdate.value.PhoneNumber ? 'เบอร์มือถือ '+newTaxAddressUpdate.value.PhoneNumber : ''} : 
        ${newTaxAddressUpdate.value.No} 
        ${newTaxAddressUpdate.value.DistrictName} 
        ${newTaxAddressUpdate.value.SubDistrictName}
        ${newTaxAddressUpdate.value.ProvinceName} 
        ${newTaxAddressUpdate.value.postalCode}`
        insureDetail.value.TaxInvoiceAddress =  newTaxAddressUpdate.value
        
        addressIncludeTaxType.value = 'addnew'
        //requestIncludeTax.value = '1'
        await handlerChangeFullLabelAddressTaxInvoice()
        emit('newTaxID', AddrID)

      } else if (addressType.value == 'TAXINVOICE_DELIVERY'){
        //const taxDelivery = getData.apiResponse.Data[index];
        const taxDelivery = arAddressList.value[index];
        newTaxDeliveryAddressUpdate.value = {
          No: taxDelivery.No,
          Moo: taxDelivery.Moo,
          Place: taxDelivery.Place,
          Building: taxDelivery.Building,
          Floor: taxDelivery.Floor,
          Alley: taxDelivery.Alley,
          Road: taxDelivery.Road,
          ProvinceID: taxDelivery.ProvinceID,
          DistrictID: taxDelivery.DistrictID,
          SubDistrictID: taxDelivery.SubDistrictID,
          postalCode: taxDelivery.ZipCode,
          ProvinceName: taxDelivery.ProvinceName,
          DistrictName: taxDelivery.DistrictName,
          SubDistrictName: taxDelivery.SubDistrictName,
          FirstName: taxDelivery.FirstName,
          LastName: taxDelivery.LastName,
          Name: taxDelivery.Name,
          PhoneNumber: taxDelivery.PhoneNumber,
          TaxID: taxDelivery.TaxID
        };

        newTaxInvoiceDeliveryFullAddressTemp.value = `${newTaxDeliveryAddressUpdate.value.FirstName} 
        ${newTaxDeliveryAddressUpdate.value.LastName}
        ${newTaxDeliveryAddressUpdate.value.TaxID ? 'เลขที่ผู้เสียภาษี '+newTaxDeliveryAddressUpdate.value.TaxID : ''} 
        ${newTaxDeliveryAddressUpdate.value.PhoneNumber ? 'เบอร์มือถือ '+newTaxDeliveryAddressUpdate.value.PhoneNumber : ''} : 
        ${newTaxDeliveryAddressUpdate.value.No} 
        ${newTaxDeliveryAddressUpdate.value.DistrictName} 
        ${newTaxDeliveryAddressUpdate.value.SubDistrictName}
        ${newTaxDeliveryAddressUpdate.value.ProvinceName} 
        ${newTaxDeliveryAddressUpdate.value.postalCode}`

        insureDetail.value.TaxInvoiceDeliveryAddress = newTaxDeliveryAddressUpdate.value
        addressDeliveryTaxType.value = 'addnew'
        await handlerChangeFullLabelAddressTaxInvoiceDelivery()
        emit('newTaxAddressID', AddrID)
      }
      isNewLabel.value = true
      await mapAddressData();
      await mapProfileData();

    }
  }
  //emit('newTaxAddressID', AddrID)
}
// handler function for emit
const handlerChangeDelivery = (e: any) => {
  const value = e.target.value
  if (value) {
    const filter = delivery.value.filter(x => x.value == value)
    if (filter.length > 0) {
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
    const prefixName = prefix.value.filter(x => x.value == prefixId)[0]
    let prefixLabel = prefixName ? prefixName.label ?? '' : ''
    //newTaxInvoiceFullAddressTemp.value = `${prefixLabel} ${ObjectAddress.FirstName} ${ObjectAddress.LastName} ` + addr
    newTaxInvoiceFullAddressTemp.value = `${ObjectAddress.FirstName} 
    ${ObjectAddress.LastName} 
    ${ObjectAddress.TaxID ? 'เลขที่ผู้เสียภาษี '+ObjectAddress.TaxID : ''} 
    ${ObjectAddress.PhoneNumber ? 'เบอร์มือถือ '+ObjectAddress.PhoneNumber : ''} : ` + addr

    insureDetail.value.TaxInvoiceAddress = taxInvoiceAddress.value
    newTaxInvoiceFullAddress.value = newTaxInvoiceFullAddressTemp.value
    handlerChangeTaxInvoice()
  }
}
const handlerChangeFullLabelAddressTaxInvoice = () => {
    newTaxInvoiceFullAddress.value = newTaxInvoiceFullAddressTemp.value
    handlerChangeTaxInvoice()
}
const handlerChangeFullAddressTaxInvoiceDelivery = (addr: string, ObjectAddress: DefaultAddress) => {
  if (addr && ObjectAddress) {
    taxInvoiceDeliveryAddress.value = ObjectAddress as TaxInvoiceAddress
    //newTaxInvoiceDeliveryFullAddressTemp.value = `${ObjectAddress.PrefixName} ${ObjectAddress.FirstName} ${ObjectAddress.LastName} ` + addr
    newTaxInvoiceDeliveryFullAddressTemp.value = `${ObjectAddress.FirstName} ${ObjectAddress.LastName}
    ${ObjectAddress.TaxID ? 'เลขที่ผู้เสียภาษี '+ObjectAddress.TaxID : ''} 
    ${ObjectAddress.PhoneNumber ? 'เบอร์มือถือ '+ObjectAddress.PhoneNumber : ''} : ` + addr

    insureDetail.value.TaxInvoiceDeliveryAddress = taxInvoiceDeliveryAddress.value
    newTaxInvoiceDeliveryFullAddress.value = newTaxInvoiceDeliveryFullAddressTemp.value
    handlerChangeTaxInvoice()
  }
}
const handlerChangeFullLabelAddressTaxInvoiceDelivery = () => {
    newTaxInvoiceDeliveryFullAddress.value = newTaxInvoiceDeliveryFullAddressTemp.value
    handlerChangeTaxInvoice()
}
const handlerSubmitAddressTaxInvoice = () => {
  insureDetail.value.TaxInvoiceAddress = taxInvoiceAddress.value
  newTaxInvoiceFullAddress.value = newTaxInvoiceFullAddressTemp.value
  handlerChangeTaxInvoice()
}
const handlerSubmitAddressTaxInvoiceDelivery = () => {
  //alert("Not able")
  insureDetail.value.TaxInvoiceDeliveryAddress = taxInvoiceDeliveryAddress.value
  newTaxInvoiceDeliveryFullAddressTemp.value = newTaxInvoiceDeliveryFullAddressTemp.value
  handlerChangeTaxInvoice()
}
const handlerChangeTaxInvoice = () => {

  insureDetail.value.IsTaxInvoiceAddressSameAsDefault = addressIncludeTaxType.value == 'insured'
  insureDetail.value.IsTaxInvoiceDeliveryAddressSameAsDefault = addressDeliveryTaxType.value == 'insured'
  emit('changeTaxInvoice', insureDetail.value, requestIncludeTax.value.length > 0, shippedPolicy.value, ShippingMethodText.value)
}

const setCacheData = async () => {
  if (props.cacheOrderRequest) {
    requestIncludeTax.value = props.cacheOrderRequest.IsTaxInvoice == true ? ['request'] : []
    if (props.cacheOrderRequest.Customer) {
      addressIncludeTaxType.value = props.cacheOrderRequest.Customer.IsTaxInvoiceAddressSameAsDefault == true ? 'insured' : 'addnew'
      addressDeliveryTaxType.value = props.cacheOrderRequest.Customer.IsTaxInvoiceDeliveryAddressSameAsDefault == true ? 'insured' : 'addnew'
      await mapAddressData();
      if (props.cacheOrderRequest.Customer.IsTaxInvoiceAddressSameAsDefault == false && props.cacheOrderRequest.Customer.TaxInvoiceAddress?.ProvinceID != '') {
          if(props.cacheOrderRequest.Customer.TaxInvoiceAddress)
          {
            taxInvoiceAddress.value = props.cacheOrderRequest.Customer.TaxInvoiceAddress as TaxInvoiceAddress
            if(taxInvoiceAddr.value && taxInvoiceAddr.value.No)
            {
              newTaxInvoiceFullAddress.value = taxInvoiceAddr.value
            }
            
          }
     }
     else{
      taxInvoiceAddress.value = props.cacheOrderRequest.Customer.DefaultAddress as TaxInvoiceAddress
     }
     insureDetail.value.TaxInvoiceAddress = taxInvoiceAddress.value
      if (props.cacheOrderRequest.Customer.IsTaxInvoiceDeliveryAddressSameAsDefault == false && props.cacheOrderRequest.Customer.TaxInvoiceDeliveryAddress?.ProvinceID != '') {
        cacheDefaultAddress.value = props.cacheOrderRequest.Customer.TaxInvoiceDeliveryAddress as DefaultAddress
        if(taxDeliveryAddr.value && taxDeliveryAddr.value.No)
        {
          newTaxInvoiceDeliveryFullAddressTemp.value = taxDeliveryAddr.value
        }
        //const deliveryMethod1 = props.cacheOrderRequest.DeliveryMethod1
      }
      else{
        cacheDefaultAddress.value = props.cacheOrderRequest.Customer.TaxInvoiceDeliveryAddress as DefaultAddress
      }
      insureDetail.value.TaxInvoiceDeliveryAddress =  cacheDefaultAddress.value
      const deliveryMethod2 = props.cacheOrderRequest.DeliveryMethod2
      if (props.delivery && deliveryMethod2) {
        const filter = props.delivery.filter(x => x.value == deliveryMethod2.DeliveryChannelType)
        if (filter.length > 0) {
          shippedPolicy.value = 'separately'
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
    if (props.insureFullAddress) {
      insureFullAddress.value = props.insureFullAddress
    }

  }
)
watch(
  addressIncludeTaxType,
  () => {
    if (addressIncludeTaxType.value) {

      handlerChangeTaxInvoice()
    }

  }
)
watch(
  addressDeliveryTaxType,
  () => {
    if (addressDeliveryTaxType.value) {
      if(addressDeliveryTaxType.value != 'addnew' ){
        handlerChangeTaxInvoice()
      }
      else{
  cacheDefaultAddress.value = {
          AddressID:"",
          AddressLine1:"",
          AddressLine2:"",
          AddressText:"",
          Alley:"",
          Branch:"",
          Building:"",
          DistrictID:"",
          Email:"",
          FirstName:"",
          Floor:"",
          LastName:"",
          Moo:"",
          Name:"",
          No:"",
          PhoneNumber:"",
          Place:"",
          ProvinceID:"",
          ReferenceID:"",
          ReferenceType:"",
          Road:"",
          Room:"",
          SubDistrictID:"",
          TaxID:"",
          Type:""
        }
      }
      if(addressDeliveryTaxType.value == 'addnew' && props.cacheOrderRequest?.OrderNo){
        handlerChangeTaxInvoice()
      }
    }

  }
)
watch(
  shippedPolicy,
  () => {
    if (shippedPolicy.value) {
      if(shippedPolicy.value == 'separately'){
        if (props.delivery && props.delivery.length > 0) {
          ShippingMethodText.value = props.delivery[0].value ?? '';
          ShippingMethodFee.value = props.delivery[0].option ?? '';
        }
      }
      handlerChangeTaxInvoice()
    }

  }
)
watch(requestIncludeTax, () => {
  handlerChangeTaxInvoice()
})
watch(() => props.cacheOrderRequest, () => {
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
