<template>
  <div v-if="ObjectAddress">
    <div class="col-6">
      <FormKit type="text" label="บ้านเลขที่" name="AddressHouseNumber" placeholder="บ้านเลขที่" validation="required" v-model="ObjectAddress.No"
        :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
    </div>
    <div class="col-6">
      <FormKit type="text" label="หมู่ที่" name="AddressMoo" placeholder="หมู่ที่" autocomplete="false" v-model="ObjectAddress.Moo"/>
    </div>
    <div class="col-xs-12 col-md-6">
      <FormKit type="text" label="หมู่บ้าน/อาคาร" name="AddressVillage" placeholder="หมู่บ้าน/อาคาร" v-model="ObjectAddress.Building"
        autocomplete="false" />
    </div>
    <div class="col-6">
      <FormKit type="text" label="ซอย/ตรอก/แยก" name="AddressSoi" placeholder="ซอย/ตรอก/แยก" autocomplete="false" v-model="ObjectAddress.Soi"/>
    </div>
    <div class="col-6">
      <FormKit type="text" label="ถนน" name="AddressRoad" placeholder="ถนน" autocomplete="false" v-model="ObjectAddress.Road" />
    </div>
    <div class="col-6">
      <FormKit type="text" label="รหัสไปรษณีย์" readonly name="AddressPostalCode" v-model="addrZipCode"
        placeholder="รหัสไปรษณีย์" validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
        autocomplete="false" />
    </div>
    <div class="col-6">
      <FormKit type="autocomplete" label="จังหวัด" name="AddressProvince" placeholder="จังหวัด"
        @input-raw="handlerChangeProvince" :options="addrProvince" validation="required" v-model="ObjectAddress.ProvinceID"
        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
    </div>
    <div class="col-6">
      <FormKit type="autocomplete" label="เขต/อำเภอ" name="AddressDistrict" placeholder="เขต/อำเภอ"
        :options="addrDistrict" @input-raw="handlerChangeDistrict" validation="required" v-model="ObjectAddress.DistrictID"
        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
    </div>
    <div class="col-6">
      <FormKit type="autocomplete" label="แขวง/ตำบล" name="AddressSubdistrict" placeholder="แขวง/ตำบล" v-model="ObjectAddress.SubDistrictID"
        :options="addrSubDistrict" @input-raw="handlerChangeSubDistrict" validation="required"
        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
    </div>
    <div class="col-xs-12 col-md-6">
      <FormKit type="text" label="ระบุที่อยู่เอง กรณีไม่มีข้อมูลให้เลือก" name="AddressCustom" autocomplete="false" v-model="ObjectAddress.AddressText"/>
    </div>
  </div>
</template>
<script setup lang="ts">
import { DefaultAddress } from "~/shared/entities/placeorder-entity";
import { SelectOption } from "~/shared/entities/select-option";

const emit = defineEmits(['changeProvince', 'changeDistrict', 'changeSubDistrict'])

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

const ObjectAddress: globalThis.Ref<DefaultAddress | null> = ref(null)

const onLoad = onMounted(() => {
  const _defaultAddress: DefaultAddress = {
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
    Soi:'',
    PhoneNumber: '',
    Place: '',
    ProvinceID: '',
    ReferenceID: '',
    ReferenceType: '',
    Road: '',
    Room: '',
    SubDistrictID: '',
    TaxID: '',
    Type: ''
  }
  ObjectAddress.value = _defaultAddress
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
    const filter = addrProvince.value.filter(x => x.value == e)
    if (filter.length > 0) {

    }

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
</script>
