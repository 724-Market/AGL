<template>
  <dialog id="address-dialog" v-show="props.show">
    <div class="dialog-card">
      <div class="card-header">
        <button type="button" class="btn btn-close btn-close-wallet" @click="closeModal(false)">
          ปิด
        </button>
      </div>
      <FormKit type="form" @submit="submitEditAddress" :actions="false" id="form-user" form-class="form-order form-theme"
        :incomplete-message="false">
        <div class="card-body">
          <div class="row">
            <p>{{ props.addressType }}</p>
            <!-- <p>addressID{{ props.addressID }}</p>
            <p>addressDefaultID{{ props.addressDefaultID }}</p> -->
            <RegisterFormProfile v-if="props.addressType=='CURRENT'" :profileData="profileDataArray" />
            <RegisterFormDelivery v-if="props.addressType=='DELIVERY'" :profileData="profileDataArray" />

            <section class="insured-type" v-if="props.addressType=='TAXINVOICE'">
              <FormKit type="radio" label="ใบกำกับภาษี" name="InsuredType" :options="[
                    {
                      label: 'บุคคลธรรมดา',
                      value: 'P'
                    },
                    {
                      label: 'นิติ',
                      value: 'I'
                    },
                  ]" v-model="profileDataArray.ReceiverType" validation="required"
                :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block"
                />  
            </section>
            <aside class="insured-classifier" v-if="props.addressType=='TAXINVOICE' && profileDataArray.ReceiverType == 'P'">
              <section>
                <FormKit type="radio" label="ลักษณะ" name="InsuredClassifier" v-model="InsuredClassifierText"
                  :options="{
                    thai: 'คนไทย',
                    foreigner: 'คนต่างชาติ',
                  }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                  options-class="option-block" />
              </section>
              <RegisterFormTaxTH v-if="InsuredClassifierText == 'thai'" 
              :profileData="profileDataArray" :prefixData="prefixPOption" />
              <RegisterFormTaxEN v-if="InsuredClassifierText == 'foreigner'" 
              :profileData="profileDataArray" :prefixData="prefixPOption" :nationality="props.nationality" />
            </aside>
            <aside class="company-classifier" v-else-if="props.addressType=='TAXINVOICE' && profileDataArray.ReceiverType == 'I'">
              <section>
                <FormKit type="radio" label="ลักษณะ" name="CompanyClassifier" :options="{
                  headoffice: 'สำนักงานใหญ่',
                  branch: 'สาขา',
                }" v-model="CompanyClassifierText" validation="required"
                  :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block" />
              </section>
              <RegisterFormTaxHeadOffice v-if="CompanyClassifierText == 'headoffice'" 
              :profileData="profileDataArray" :prefixData="prefixIOption" />
              <RegisterFormTaxBranchOffice v-if="CompanyClassifierText == 'branch'" 
              :profileData="profileDataArray" :prefixData="prefixIOption" />
            </aside>
            <!-- <div v-if="InsuredTypeText == 'P'">
              <RegisterFormTaxTH v-if="props.addressType=='TAXINVOICE' && InsuredClassifierText == 'thai'" 
              :profileData="profileDataArray" :prefixData="prefixPOption" />
              <RegisterFormTaxEN v-if="props.addressType=='TAXINVOICE' && InsuredClassifierText == 'foreigner'" 
              :profileData="profileDataArray" :prefixData="prefixPOption" />
            </div>
            <div v-else>
              <RegisterFormTaxHeadOffice v-if="props.addressType=='TAXINVOICE' && CompanyClassifierText == 'headoffice'" 
              :profileData="profileDataArray" :prefixData="prefixIOption" />
              <RegisterFormTaxBranchOffice v-if="props.addressType=='TAXINVOICE' && CompanyClassifierText == 'branch'" 
              :profileData="profileDataArray" :prefixData="prefixIOption" />
            </div> -->
            
            <RegisterFormDelivery v-if="props.addressType=='TAXINVOICE_DELIVERY'" :profileData="profileDataArray" />
            <RegisterFormAddress v-if="addressDataArray" :addressData="addressDataArray" />
          </div>
        </div>
        <FormKit type="submit" label="บันทึก" name="user-submit" id="user-submit" :classes="{
          input: 'btn-primary',
          outer: 'form-actions',
        }" :disabled="isLoading" :loading="isLoading" />
      </FormKit>


    </div>
    
  </dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CustomerOrderRequest } from "~/shared/entities/placeorder-entity";
import type { SelectOption } from "~/shared/entities/select-option";
import type { DistrictReq, SubDistrictReq } from "~/shared/entities/master-entity";

import type { CustomerAddressListRes } from "~/shared/entities/customer-entity";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";

const emit = defineEmits(["closeAddress", "onEditAddress"]);

const isLoading = ref(false)
//define store
const storeOrder = useStorePlaceorder();


const editAddrProvince: globalThis.Ref<SelectOption[]> = ref([])
const editAddrDistrict: globalThis.Ref<SelectOption[]> = ref([])
const editAddrSubDistrict: globalThis.Ref<SelectOption[]> = ref([])
const zipCodesel = ref('')
const IsTax = ref(true)
const IsTaxType = ref('I')

const provinceIDsel = ref('')
const districtIDsel = ref('')
const subDistrictIDsel = ref('')
const InsuredTypeText = ref('P')
const InsuredClassifierText: globalThis.Ref<String> = ref('thai')
const CompanyClassifierText: globalThis.Ref<String> = ref('')

// Assuming each item in editAddrProvince has label and value properties
//const transformedOptions: string[] | number[] = editAddrDistrict.map(item => item.value);

const props = defineProps({
  show: Boolean,
  addressDataArray: Object,
  profileDataArray: Object,
  addressType: String,
  elementKey: String,
  customerID: String,
  addressID: String,
  addressDefaultID: String,
  nationality: Array<SelectOption>,
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode: String,
  orderNo: String,
  prefixIOption: Object,
  prefixPOption: Object,
  defaultAddressCustomer: {
    type: Object as () => CustomerAddressListRes
  },
  customerProfileDetails: {
    type: Object as () => CustomerOrderRequest
  }
});
const _show = ref(false);
const IsDisablePersonType = ref(false);
const IsDisableCompanyType = ref(false);


onMounted(async () => {
  if(props.profileDataArray.ReceiverType == 'I'){
    IsDisablePersonType.value = true
    IsDisableCompanyType.value = false
    if(props.profileDataArray.BranchName == 'สำนักงานใหญ่'){
      CompanyClassifierText.value = 'headoffice'
    } else {
      CompanyClassifierText.value = 'branch'
    }
  }
  if(props.profileDataArray.ReceiverType == 'P'){
    IsDisablePersonType.value = false
    IsDisableCompanyType.value = true
  }
  if (props.show) {
    openModal();
  }

});

// Submit form event
const submitEditAddress = async (formData: any) => {
  const reqSaveAddress = {
      CustomerID: props.customerID,
      AddressID: props.addressID,
      Type: props.addressType,
      ReceiverType: formData.InsuredType,
      PrefixID: formData.InsuredType == 'P' ? formData.TitlePerson : formData.CompanyType,
      FirstName: formData.InsuredType == 'P' ? formData.FirstName : formData.CompanyName,
      LastName: formData.InsuredType == 'P' ? formData.LastName : 'จำกัด',
      Email: formData.InsuredType == 'P' ? formData.Email : formData.CompanyEmail,
      PhoneNumber: formData.InsuredType == 'P' ? formData.PhoneNumber : formData.CompanyPhoneNumber,
      TaxID: formData.InsuredType == 'P' ? formData.TaxID : formData.CompanyTaxId,
      BranchID: formData.BranchCode,
      BranchName: formData.BranchName,
      No: formData.No,
      Moo: formData.Moo,
      Place: formData.Place,
      Building: formData.Building,
      Floor: formData.Floor,
      Alley: formData.Alley,
      Road: formData.Road,
      ProvinceID: formData.ProvinceID,
      DistrictID: formData.DistrictID,
      SubDistrictID: formData.SubDistrictID
  }
  /* Loop for check data
  for (const key in reqSaveAddress) {
    console.log(`${key}: ${reqSaveAddress[key]}`);
  }
  */
  if(((props.addressID == props.addressDefaultID) || (props.addressID == '')) && props.addressType != 'CURRENT'){
    const resCreate = await useRepository().customer.AddressCreate(reqSaveAddress);
    if (
      resCreate.apiResponse.Status &&
      resCreate.apiResponse.Status == "200"
    ) {
      const newAddressID = resCreate.apiResponse.Data.AddressID; // Assign the returned AddressID
      emit('onEditAddress', props.customerID, newAddressID); // Emit with addressID

      closeModal(false);
    } else {
      alert(resCreate.apiResponse.ErrorMessage);
    }
  } else {
    const resCreate = await useRepository().customer.AddressSave(reqSaveAddress);
    if (
      resCreate.apiResponse.Status &&
      resCreate.apiResponse.Status == "200"
    ) {

      emit('onEditAddress', props.customerID, props.addressID)

      closeModal(false);
    } else {
      alert(resCreate.apiResponse.ErrorMessage);
    }
  }
  //*/
};

watch(
  () => props.show,
  () => {
    console.log("prop value changed", props.show);
    if (props.show) {
      openModal();
    } else {
      closeModal(false);
    }
  }
);

async function openModal() {
  //modal.show()
  _show.value = props.show;
  const dialogLoading = document.getElementById("address-dialog");
  if (dialogLoading) dialogLoading.showModal();
}

async function closeModal(refresh: boolean) {
  //modal.hide()
  _show.value = false;
  const dialogLoading = document.getElementById("address-dialog");
  if (dialogLoading) dialogLoading.close();
  emit("closeAddress", false, refresh);
}
</script>