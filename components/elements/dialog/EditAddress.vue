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
            <FormKit type="hidden" name="CustomerID" :value="customerID" />
            <FormKit type="hidden" name="AddressID" :value="props.defaultAddressCustomer?.ID" />
            <div class="col-6">
              <FormKit type="text" label="บ้านเลขที่" name="No" :value="props.defaultAddressCustomer?.No"
                placeholder="บ้านเลขที่" validation="required|address_characters" :validation-messages="{
                  required: 'กรุณาใส่ข้อมูล',
                  address_characters: 'กรุณากรอกรูปแบบบ้านเลขที่ให้ถูกต้อง',
                }" autocomplete="false" />
            </div>
            <div class="col-6">
              <FormKit type="text" label="หมู่ที่" name="Moo" :value="props.defaultAddressCustomer?.Moo"
                placeholder="หมู่ที่"  />
            </div>
            <div class="col-xs-12 col-md-6">
              <FormKit type="text" label="หมู่บ้าน/อาคาร" name="Building" :value="props.defaultAddressCustomer?.Building"
                placeholder="หมู่บ้าน/อาคาร" />
            </div>
            <div class="col-6">
              <FormKit type="text" label="ซอย/ตรอก/แยก" name="Alley" placeholder="ซอย/ตรอก/แยก"
                :value="props.defaultAddressCustomer?.Alley" />
            </div>
            <div class="col-6">
              <FormKit type="text" label="ถนน" name="Road" placeholder="ถนน" 
                :value="props.defaultAddressCustomer?.Road" />
            </div>
            <div class="col-6">
              <FormKit type="select" label="จังหวัด" name="ProvinceID" placeholder="จังหวัด"
                :options="editAddrProvince" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                v-model="provinceIDsel" open-on-click @change="handlerChangeProvince" />
            </div>
            <div class="col-6">
              <FormKit type="select" label="เขต/อำเภอ" name="DistrictID" placeholder="เขต/อำเภอ"
                :options="editAddrDistrict" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                v-model="districtIDsel" @change="handlerChangeDistricts" />
            </div>
            <div class="col-6">
              <FormKit type="select" label="แขวง/ตำบล" name="SubDistrictID" placeholder="แขวง/ตำบล"
                :options="editAddrSubDistrict" validation="required" @change="handlerChangeSubDistricts"
                v-model="subDistrictIDsel" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
            </div>
            <div class="col-6">
              <FormKit type="text" label="รหัสไปรษณีย์" readonly name="ZipCode" v-model="zipCodesel"
                placeholder="รหัสไปรษณีย์" validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                 />
            </div>
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
  elementKey: String,
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
  const resCreate = await useRepository().customer.AddressSave(formData);
  if (
    resCreate.apiResponse.Status &&
    resCreate.apiResponse.Status == "200"
  ) {

    emit('onEditAddress', props.customerID)

    closeModal(false);
  } else {
    alert(resCreate.apiResponse.ErrorMessage);
  }

};
const loadDistrict = async (provId: string): Promise<SelectOption[]> => {
  let options: SelectOption[] = [];
  const req: DistrictReq = {
    ProvinceID: provId,
  };
  const response = await useRepository().master.district(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      options = response.apiResponse.Data.map((x) => {
        const opt: SelectOption = {
          label: x.Name,
          value: x.ID,
        };
        return opt;
      });
    } else {
      // data not found
      alert("data not found")
    }
  } else {
  }

  return options;
};
const loadSubsDistrict = async (distId: string): Promise<SelectOption[]> => {
  let options: SelectOption[] = [];
  const req: SubDistrictReq = {
    DistrictID: distId,
  };
  const response = await useRepository().master.subDistrict(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      options = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.ID,
          option: x.ZipCode ?? "",
        };
        return options;
      });
    } else {
      // data not found
      alert("data not found")
    }
  } else {
  }

  return options;
};
// handler function for emit
const handlerChangeProvince = async (e: any) => {
  console.log(e.target.value)
  console.log(e)
  if (e && e.target.value) {
    try {
      const loadedDistricts = await loadDistrict(e.target.value);
      editAddrDistrict.value = loadedDistricts;
      districtIDsel.value = '';
      subDistrictIDsel.value = ''
      zipCodesel.value = ''
    } catch (error) {
      console.error('Error loading districts:', error);
    }
  }
}
// handler function for emit
const handlerChangeDistricts = async (e: any) => {
  if (e && e.target.value) {
    try {
      const loadSubDistrict = await loadSubsDistrict(e.target.value);
      // Map through the array and modify the label property
      const modifiedSubDistricts = loadSubDistrict.map((subDistrict) => ({
        label: `${subDistrict.label} : ${subDistrict.option}`,
        value: subDistrict.value,
        option: subDistrict.option,
      }));
      // Assuming you want the option from the first element in the array
      editAddrSubDistrict.value = modifiedSubDistricts;
      //editAddrSubDistrict.value = loadSubDistrict;
      subDistrictIDsel.value = ''
      zipCodesel.value = ''
    } catch (error) {
      console.error('Error loading districts:', error);
    }
  }
}
// handler function for emit
const handlerChangeSubDistricts = async (e: any) => {
  if (e && e.target.value) {
    const selectedSubDistrict = editAddrSubDistrict.value.find(item => item.value === e.target.value);

    if (selectedSubDistrict) {
      zipCodesel.value = selectedSubDistrict.option;
    } else {
      // Handle the case when the selected value is not found
      alert("zipCode is null")
    }
  }
}
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