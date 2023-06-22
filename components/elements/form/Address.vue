<template>
  <div v-if="ObjectAddress" class="row">
    <div class="col-6">
      <FormKit
        type="text"
        label="บ้านเลขที่"
        name="AddressHouseNumber"
        placeholder="บ้านเลขที่"
        v-model="ObjectAddress.No"
        @input-raw="handlerChangeFullAddress"
        :validation-rules="{ address_characters }"
        validation="required|address_characters"
        :validation-messages="{
          required: 'กรุณาใส่ข้อมูล',
          address_characters: 'กรุณากรอกรูปแบบบ้านเลขที่ให้ถูกต้อง',
        }"
        autocomplete="false"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="text"
        label="หมู่ที่"
        name="AddressMoo"
        placeholder="หมู่ที่"
        autocomplete="false"
        v-model="ObjectAddress.Moo"
        @input-raw="handlerChangeFullAddress"
      />
    </div>
    <div class="col-xs-12 col-md-6">
      <FormKit
        type="text"
        label="หมู่บ้าน/อาคาร"
        name="AddressVillage"
        placeholder="หมู่บ้าน/อาคาร"
        v-model="ObjectAddress.Building"
        @input-raw="handlerChangeFullAddress"
        autocomplete="false"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="text"
        label="ซอย/ตรอก/แยก"
        name="AddressSoi"
        placeholder="ซอย/ตรอก/แยก"
        autocomplete="false"
        v-model="ObjectAddress.Soi"
        @input-raw="handlerChangeFullAddress"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="text"
        label="ถนน"
        name="AddressRoad"
        placeholder="ถนน"
        autocomplete="false"
        v-model="ObjectAddress.Road"
        @input-raw="handlerChangeFullAddress"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="text"
        label="รหัสไปรษณีย์"
        readonly
        name="AddressPostalCode"
        v-model="addrZipCode"
        @input-raw="handlerChangeFullAddress"
        placeholder="รหัสไปรษณีย์"
        validation="required"
        :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
        autocomplete="false"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="autocomplete"
        label="จังหวัด"
        name="AddressProvince"
        placeholder="จังหวัด"
        @input-raw="handlerChangeProvince"
        :options="addrProvince"
        validation="required"
        v-model="ObjectAddress.ProvinceID"
        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="autocomplete"
        label="เขต/อำเภอ"
        name="AddressDistrict"
        placeholder="เขต/อำเภอ"
        :options="addrDistrict"
        @input-raw="handlerChangeDistrict"
        validation="required"
        v-model="ObjectAddress.DistrictID"
        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="autocomplete"
        label="แขวง/ตำบล"
        name="AddressSubdistrict"
        placeholder="แขวง/ตำบล"
        v-model="ObjectAddress.SubDistrictID"
        :options="addrSubDistrict"
        @input-raw="handlerChangeSubDistrict"
        validation="required"
        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
      />
    </div>
    <div class="col-xs-12 col-md-6">
      <FormKit
        type="text"
        label="ระบุที่อยู่เอง กรณีไม่มีข้อมูลให้เลือก"
        name="AddressCustom"
        autocomplete="false"
        v-model="ObjectAddress.AddressText"
        @input-raw="handlerChangeFullAddress"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
import { DefaultAddress } from "~/shared/entities/placeorder-entity";
import { SelectOption } from "~/shared/entities/select-option";

const emit = defineEmits(['changeProvince', 'changeDistrict', 'changeSubDistrict', 'changeFullAddress'])

const props = defineProps({
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode: String,

})

const addrProvince: globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode = ref('')

const ObjectAddress: globalThis.Ref<DefaultAddress> = ref({
    AddressID: '',
    AddressLine1: '',
    AddressLine2: '',
    AddressText: '',
    Alley: '',
    Branch: '',
    Building: '',
    DistrictID: '',
    Email: '',
    FirstName: '',
    Floor: '',
    LastName: '',
    Moo: '',
    Name: '',
    No: '',
    Soi: '',
    PhoneNumber: '',
    Place: '',
    ProvinceID: '',
    ReferenceID: '',
    ReferenceType: '',
    Road: '',
    Room: '',
    SubDistrictID: '',
    TaxID: '',
    Type: '',
    ZipCode: '',
  })

const onLoad = onMounted(() => {
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
})
// handler validate function
const address_characters = function ({value}) {

  return new Promise((resolve) => {
    const reg = new RegExp("^[0-9,\/,\-.]*$")
    const validate = reg.test(value)
    resolve(validate)
  })
}
//watching data
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


// handler function for emit
const handlerChangeProvince = (e: string) => {
  if (e) {
    if(ObjectAddress.value){
      ObjectAddress.value.ProvinceID = e
    }
    console.log(ObjectAddress.value.ProvinceID )
    handlerChangeFullAddress()
    emit('changeProvince', e)

  }
}
const handlerChangeDistrict = (e: string) => {
  if (e) {
    if(ObjectAddress.value){
      ObjectAddress.value.DistrictID = e
    }
    handlerChangeFullAddress()
    emit('changeDistrict', e)
  }
}
const handlerChangeSubDistrict = (e: string) => {
  if (e) {
    if(ObjectAddress.value){
      ObjectAddress.value.SubDistrictID = e
    }
    handlerChangeFullAddress()
    emit('changeSubDistrict', e)
  }
}
const handlerChangeFullAddress = () => {
  let fullAddress = "";
  if (ObjectAddress && ObjectAddress.value) {

    if (ObjectAddress.value.No.length > 0) {
      fullAddress += ObjectAddress.value.No + " ";
    }
    if (ObjectAddress.value.Moo.length > 0) {
      fullAddress += "หมู่ที่ " + ObjectAddress.value.Moo + " ";
    }
    if (ObjectAddress.value.Building.length > 0) {
      fullAddress += ObjectAddress.value.Building + " "
    }
    if (ObjectAddress.value.Soi.length > 0) {
      fullAddress += "ซอย " + ObjectAddress.value.Soi + " "
    }
    if (ObjectAddress.value.Road.length > 0) {
      fullAddress += "ถนน " + ObjectAddress.value.Road + " "
    }
    if (ObjectAddress.value.SubDistrictID.length > 0) {
      const id = ObjectAddress.value.SubDistrictID
      const filter = addrSubDistrict.value.filter(x => x.value == id)
      if (filter.length > 0) {
        fullAddress += filter[0].label + " "
      }
    }
    if (ObjectAddress.value.DistrictID.length > 0) {
      const id = ObjectAddress.value.DistrictID
      const filter = addrDistrict.value.filter(x => x.value == id)
      if (filter.length > 0) {
        fullAddress += filter[0].label + " "
      }
    }
    if (ObjectAddress.value.ProvinceID.length > 0) {
      const id = ObjectAddress.value.ProvinceID
      const filter = addrProvince.value.filter(x => x.value == id)
      if (filter.length > 0) {
        fullAddress += filter[0].label + " "
      }
    }
    if (addrZipCode.value.length > 0) {
      ObjectAddress.value.ZipCode = addrZipCode.value
      fullAddress += "รหัสไปรษณีย์ " + addrZipCode.value + " "
    }
    if (ObjectAddress.value.No.length > 0 &&
      ObjectAddress.value.SubDistrictID.length > 0 &&
      ObjectAddress.value.DistrictID.length > 0 &&
      ObjectAddress.value.ProvinceID.length > 0 &&
      ObjectAddress.value.ZipCode.length > 0) {
      emit('changeFullAddress', fullAddress, ObjectAddress.value)
    }
  }
}
</script>
