<template>
  <div class="row" >
    <p>ที่อยู่</p>
    <div class="col-md-6">
      <FormKit type="text" label="เลขที่" name="No" v-model="addressData.No" placeholder="เลขที่" validation="required"
        :validation-messages="{ required: 'กรุณาระบุ No.' }" autocomplete="off" />
    </div>

    <div class="col-md-6">
      <FormKit type="text" label="หมู่" name="Moo" v-model="addressData.Moo" placeholder="หมู่" autocomplete="off" />
    </div>

    <div class="col-md-6">
      <FormKit type="text" label="ที่ตั้ง" name="Place" v-model="addressData.Place" placeholder="ที่ตั้ง" autocomplete="off" />
    </div>

    <div class="col-md-6">
      <FormKit type="text" label="ตึก/อาคาร" name="Building" v-model="addressData.Building" placeholder="ตึก/อาคาร" autocomplete="off" />
    </div>

    <div class="col-md-6">
      <FormKit type="text" label="ชั้น" name="Floor" v-model="addressData.Floor" placeholder="ชั้น" autocomplete="off" />
    </div>

    <div class="col-md-6">
      <FormKit type="text" label="ซอย" name="Alley" v-model="addressData.Alley" placeholder="ซอย" autocomplete="off" />
    </div>

    <div class="col-md-6">
      <FormKit type="text" label="ถนน" name="Road" v-model="addressData.Road" placeholder="ถนน" autocomplete="off" />
    </div>

    <div class="col-md-6">
      <FormKit type="autocomplete" name="ProvinceID" label="จังหวัด" placeholder="เลือกจังหวัด" validation="required"
        :validation-messages="{ required: 'กรุณาเลือกจังหวัด' }" :options="province" clear-search-on-open open-on-focus
        v-model="selectedProvince" @click="handleProvinceClick" />
    </div>
    <div class="col-md-6">
      <FormKit type="autocomplete" name="DistrictID" label="อำเภอ" placeholder="เลือกอำเภอ" validation="required"
        :validation-messages="{ required: 'กรุณาเลือกอำเภอ' }" :options="filteredDistricts" clear-search-on-open
        open-on-focus v-model="selectedDistrict" @click="handleDistrictClick" />
    </div>
    <div class="col-md-6">
      <FormKit type="autocomplete" name="SubDistrictID" label="ตำบล" placeholder="เลือกตำบล" validation="required"
        :validation-messages="{ required: 'กรุณาเลือกตำบล' }" :options="filteredSubDistricts" clear-search-on-open
        open-on-focus v-model="selectedSubDistrict" />
    </div>
    <div class="col-md-12">
      <FormKit type="text" name="postalCode" label="รหัสไปรษณีย์" placeholder="เลือกรหัสไปรษณีย์" disabled
        v-model="selectedPostalCode" />
      <FormKit type="hidden" name="ProvinceLabel" v-model="selectedProvinceLabel" />
      <FormKit type="hidden" name="DistrictLabel" v-model="selectedDistrictLabel" />
      <FormKit type="hidden" name="SubDistrictLabel" v-model="selectedSubDistrictLabel" />
    </div>
  </div>
  <!-- <div class="col-md-12">{{ selectedSubDistrictLabel }}</div>
  <div class="col-md-12">{{ selectedSubDistrict }}</div>
  <div class="col-md-12">{{ selectedDistrictLabel }}</div>
  <div class="col-md-12">{{ selectedDistrict }}</div>
  <div class="col-md-12">{{ selectedProvinceLabel }}</div>
  <div class="col-md-12">{{ selectedProvince }}</div> -->
</template>
<script setup lang="ts">
import districtsData from "~/shared/data/districts-data";
import province from "~/shared/data/provinces-data";

const props = defineProps(['addressData'])

const selectedDistrict = ref();
const selectedSubDistrict = ref();
const selectedProvince = ref();
const selectedDistrictLabel = ref();
const selectedSubDistrictLabel = ref();
const selectedProvinceLabel = ref();

//const province = ref<Array<{ value: string; label: string }>>([]);
/*
const loadProvince = async () => {
  const response = await useRepository().master.modalProvince();
  const resultCheck = useUtility().responseCheck(response)
  if (resultCheck.status === 'pass') {

    if (response.apiResponse.Data) {
      province.value = response.apiResponse.Data.map((item) => ({
        value: item.ID,
        label: item.Name
      }));
    }

  }
}
*/

onMounted(async () => {
  if (props.addressData) {
    selectedProvince.value = props.addressData.ProvinceID
    await filteredSubDistricts
    selectedDistrict.value = props.addressData.DistrictID
    await selectedPostalCode
    selectedSubDistrict.value = props.addressData.SubDistrictID
  }
  
});

const filteredDistricts = computed(() => {
  const provinceFiltered = districtsData.filter(districtsData => districtsData.province === selectedProvince.value);
  const prov = province.find(province => province.value === selectedProvince.value);
  selectedProvinceLabel.value = prov ? prov.label : '';
  return provinceFiltered;
});

const filteredSubDistricts = computed(() => {
  const district = districtsData.find(districtsData => districtsData.value === selectedDistrict.value);
  selectedDistrictLabel.value = district ? district.label : '';

  if(district) {
    const district2 = district.subDistricts.map((item) => ({
      value: item.value,
      label: item.label + ' (' + item.postalCode + ')', 
      postalCode: item.postalCode,
    })); 
    // console.log(district.subDistricts)
    // console.log(district2)
    return district2 ? district2 : []
  }
  else {
    return []
  }

});

const selectedPostalCode = computed(() => {
  console.log(filteredSubDistricts)
  const postal = filteredSubDistricts.value.find(subDistrict => subDistrict.value === selectedSubDistrict.value);
  selectedSubDistrictLabel.value = postal ? postal.label.replace('('+postal.postalCode+')', '') : '';
  return postal ? postal.postalCode : '';
});

const handleProvinceClick = () => {
  selectedDistrict.value = null;
  selectedSubDistrict.value = null;
};

const handleDistrictClick = () => {
  selectedSubDistrict.value = null;
};

watch(selectedProvince, (newProvince) => {
  // Reset selectedDistrict, selectedSubDistrict, and selectedPostalCode when changing the Province
  selectedDistrict.value = null;
  selectedSubDistrict.value = null;
});

watch(selectedDistrict, (newDistrict) => {
  // Reset selectedDistrict, selectedSubDistrict, and selectedPostalCode when changing the district
  selectedSubDistrict.value = null;
});

</script>
