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
            <RegisterFormProfile v-if="props.addressType=='CURRENT'" :profileData="profileDataArray" />
            <RegisterFormDelivery v-if="props.addressType=='DELIVERY'" :profileData="profileDataArray" />
            <RegisterFormTax v-if="props.addressType=='TAXINVOICE'" :profileData="profileDataArray" />
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

const provinceIDsel = ref('')
const districtIDsel = ref('')
const subDistrictIDsel = ref('')

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
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode: String,
  orderNo: String,
  defaultAddressCustomer: {
    type: Object as () => CustomerAddressListRes
  },
  customerProfileDetails: {
    type: Object as () => CustomerOrderRequest
  }
});
const _show = ref(false);


onMounted(async () => {
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
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      Name: formData.Name,
      PhoneNumber: formData.PhoneNumber,
      TaxID: formData.TaxID,
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
  if(props.addressID == props.addressDefaultID){
    const resCreate = await useRepository().customer.AddressCreate(reqSaveAddress);
    if (
      resCreate.apiResponse.Status &&
      resCreate.apiResponse.Status == "200"
    ) {

      emit('onEditAddress', props.customerID, resCreate.apiResponse.Data)

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