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
            
            <RegisterFormAddress :default-address-customer="props.defaultAddressCustomer" />

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

import type { CustomerAddressListRes } from "~/shared/entities/customer-entity";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";

const emit = defineEmits(["closeAddress", "onEditAddress"]);

const isLoading = ref(false)
//define store
const storeOrder = useStorePlaceorder();


const editAddrProvince = ref<Array<{ value: string; label: string }>>([]);
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
  customerID: String,
  addressID: String,
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

  if (props.addrProvince && props.addrDistrict && props.addrSubDistrict && props.defaultAddressCustomer?.ZipCode) {

    editAddrProvince.value = props.addrProvince
    editAddrDistrict.value = props.addrDistrict
    editAddrSubDistrict.value = props.addrSubDistrict


    provinceIDsel.value = props.defaultAddressCustomer?.ProvinceID
    districtIDsel.value = props.defaultAddressCustomer?.DistrictID
    subDistrictIDsel.value = props.defaultAddressCustomer?.SubDistrictID
    zipCodesel.value = props.defaultAddressCustomer?.ZipCode
  }
  if (props.show) {
    openModal();
  }

});

// Submit form event
const submitEditAddress = async (formData: any) => {
  const saveAddress = {
    AddressID: props.defaultAddressCustomer?.ID,
    CustomerID: props.customerID,
    ProvinceID: formData.Province,
    DistrictID: formData.district,
    SubDistrictID: formData.subDistrict,
    TaxID: formData.TaxID,
    FirstName: formData.FirstName,
    LastName: formData.LastName,
    PhoneNumber: formData.PhoneNumber,
    Email: formData.Email,
    Name: formData.Name,
    Type: formData.Type,
    AddressLine1: formData.AddressLine1,
    AddressLine2: formData.AddressLine2,
    AddressText: formData.AddressText,
    No: formData.No,
    Moo: formData.Moo,
    Place: formData.Place,
    Building: formData.Building,
    Floor: formData.Floor,
    Room: formData.Room,
    Branch: formData.Branch,
    Alley: formData.Alley,
    Road: formData.RoadCustomerID
  }
  console.log("saveAddress"+saveAddress)
  const resSave = await useRepository().customer.AddressSave(saveAddress);
  if (
    resSave.apiResponse.Status &&
    resSave.apiResponse.Status == "200"
  ) {

    emit('onEditAddress', props.customerID)

    closeModal(false);
  } else {
    alert(resSave.apiResponse.ErrorMessage);
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