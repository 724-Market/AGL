<template>
  <div class="row">
    <div class="col-8">
      <FormKit type="text" label="บ้านเลขที่" name="No" v-model="addressData.No" placeholder="บ้านเลขที่"
        validation="required" :validation-messages="{
          required: 'กรุณาใส่บ้านเลขที่'
        }" autocomplete="off" />
    </div>
    <div class="col-4">
      <FormKit type="number" label="หมู่ที่" name="Moo" v-model="addressData.Moo" placeholder="หมู่ที่" autocomplete="off"
        inputmode="numeric" />
    </div>
    <div class="col-8">
      <FormKit type="text" label="หมู่บ้าน/คอนโด" name="Place" v-model="addressData.Place" placeholder="หมู่บ้าน/คอนโด"
        autocomplete="off" />
    </div>
    <div class="col-4">
      <FormKit type="text" label="ห้อง" name="Room" v-model="addressData.Room" placeholder="ห้อง" autocomplete="off" />
    </div>
    <div class="col-8">
      <FormKit type="text" label="ตึก/อาคาร" name="Building" v-model="addressData.Building" placeholder="ตึก/อาคาร"
        autocomplete="off" />
    </div>
    <div class="col-4">
      <FormKit type="text" label="ชั้น" name="Floor" v-model="addressData.Floor" placeholder="ชั้น" autocomplete="off" />
    </div>
    <div class="col-7">
      <FormKit type="text" label="ซอย" name="Alley" v-model="addressData.Alley" placeholder="ซอย" autocomplete="off" />
    </div>
    <div class="col-5">
      <FormKit type="text" label="ตรอก/แยก" name="Branch" v-model="addressData.Branch" placeholder="ตรอก/แยก"
        autocomplete="off" />
    </div>
    <div class="col-12">
      <FormKit type="text" label="ถนน" name="Road" v-model="addressData.Road" placeholder="ถนน" autocomplete="off" />
    </div>
    <div class="col-12">
      <FormKit type="autocomplete" label="จังหวัด" name="ProvinceID" v-model="selectedProvince" placeholder="เลือกจังหวัด"
        validation="required" :validation-messages="{ required: 'กรุณาเลือกจังหวัด' }" :options="province"
        clear-search-on-open open-on-focus @click="handleProvinceClick" />
    </div>
    <div class="col-12">
      <FormKit type="autocomplete" label="เขต/อำเภอ" name="DistrictID" v-model="selectedDistrict" placeholder="เลือกอำเภอ"
        validation="required" :validation-messages="{ required: 'กรุณาเลือกอำเภอ' }" :options="filteredDistricts"
        clear-search-on-open open-on-focus @click="handleDistrictClick" />
    </div>
    <div class="col-12">
      <FormKit type="autocomplete" label="แขวง/ตำบล" name="SubDistrictID" v-model="selectedSubDistrict"
        placeholder="เลือกตำบล" validation="required" :validation-messages="{ required: 'กรุณาเลือกตำบล' }"
        :options="filteredSubDistricts" clear-search-on-open open-on-focus />
    </div>
    <div class="col-12">
      <FormKit type="text" label="รหัสไปรษณีย์" name="postalCode" v-model="selectedPostalCode" placeholder="รหัสไปรษณีย์"
        validation="required" :validation-messages="{
          required: 'กรุณาใส่รหัสไปรษณีย์'
        }" autocomplete="off" readonly />

      <FormKit type="hidden" name="ProvinceLabel" v-model="selectedProvinceLabel" />
      <FormKit type="hidden" name="DistrictLabel" v-model="selectedDistrictLabel" />
      <FormKit type="hidden" name="SubDistrictLabel" v-model="selectedSubDistrictLabel" />
    </div>
    <div class="col-12">
      <FormKitSummary />
    </div>
  </div>
</template>

<script setup lang="ts">
/////////////////////////////////////////
// Import data
import districtsData from "~/shared/data/districts-data"
import province from "~/shared/data/provinces-data"

import { FormKitSummary } from '@formkit/vue'

/////////////////////////////////////////
// Define props for the component
const props = defineProps(['addressData'])

/////////////////////////////////////////
// Define variables
const selectedDistrict = ref()
const selectedSubDistrict = ref()
const selectedProvince = ref()
const selectedDistrictLabel = ref()
const selectedSubDistrictLabel = ref()
const selectedProvinceLabel = ref()

/////////////////////////////////////////
// Mounted
onMounted(async () => {
  if (props.addressData) {
    selectedProvince.value = props.addressData.ProvinceID

    await filteredSubDistricts

    selectedDistrict.value = props.addressData.DistrictID

    await selectedPostalCode

    selectedSubDistrict.value = props.addressData.SubDistrictID
  }
})

/////////////////////////////////////////
// Computed data
const filteredDistricts = computed(() => {
  const provinceFiltered = districtsData.filter(districtsData => districtsData.province === selectedProvince.value)
  const prov = province.find(province => province.value === selectedProvince.value)

  selectedProvinceLabel.value = prov ? prov.label : ''

  return provinceFiltered
})

const filteredSubDistricts = computed(() => {
  const district = districtsData.find(districtsData => districtsData.value === selectedDistrict.value)

  selectedDistrictLabel.value = district ? district.label : ''

  if (district) {
    const district2 = district.subDistricts.map((item) => ({
      value: item.value,
      label: item.label + ' (' + item.postalCode + ')',
      postalCode: item.postalCode,
    }))

    return district2 ? district2 : []
  }
  else {
    return []
  }
})

const selectedPostalCode = computed(() => {
  const postal = filteredSubDistricts.value.find(subDistrict => subDistrict.value === selectedSubDistrict.value)

  selectedSubDistrictLabel.value = postal ? postal.label.replace('(' + postal.postalCode + ')', '') : ''

  return postal ? postal.postalCode : ''
})

/////////////////////////////////////////
// Handle click
const handleProvinceClick = () => {
  selectedDistrict.value = null
  selectedSubDistrict.value = null
}

const handleDistrictClick = () => {
  selectedSubDistrict.value = null
}

/////////////////////////////////////////
// Watch
watch(selectedProvince, (newProvince) => {
  // Reset selectedDistrict, selectedSubDistrict, and selectedPostalCode when changing the Province
  selectedDistrict.value = null
  selectedSubDistrict.value = null
})

watch(selectedDistrict, (newDistrict) => {
  // Reset selectedDistrict, selectedSubDistrict, and selectedPostalCode when changing the district
  selectedSubDistrict.value = null
})
</script>