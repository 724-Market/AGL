<template>
  <div class="row">

    <div class="col-md-12">
      <FormKit type="text" label="No" name="No" placeholder="No" validation="required"
        :validation-messages="{ required: 'กรุณาระบุ No.' }" autocomplete="off" />
    </div>

    <div class="col-md-12">
      <FormKit type="text" label="Moo" name="Moo" placeholder="Moo" validation="required"
        :validation-messages="{ required: 'กรุณาระบุ Moo' }" autocomplete="off" />
    </div>

    <div class="col-md-12">
      <FormKit type="text" label="Place" name="Place" placeholder="Place" autocomplete="off" />
    </div>

    <div class="col-md-12">
      <FormKit type="text" label="Building" name="Building" placeholder="Building" autocomplete="off" />
    </div>

    <div class="col-md-12">
      <FormKit type="text" label="Floor" name="Floor" placeholder="Floor" autocomplete="off" />
    </div>

    <div class="col-md-12">
      <FormKit type="text" label="Alley" name="Alley" placeholder="Alley" autocomplete="off" />
    </div>

    <div class="col-md-12">
      <FormKit type="text" label="Road" name="Road" placeholder="Road" autocomplete="off" />
    </div>

    <div class="col-md-12">
      <FormKit type="autocomplete" name="Province" label="จังหวัด" placeholder="เลือกจังหวัด" validation="required"
        :validation-messages="{ required: 'กรุณาเลือกจังหวัด' }" :options="province" clear-search-on-open open-on-focus
        v-model="selectedProvince" @click="handleProvinceClick" />
    </div>
    <div class="col-md-12">
      <FormKit type="autocomplete" name="district" label="อำเภอ" placeholder="เลือกอำเภอ" validation="required"
        :validation-messages="{ required: 'กรุณาเลือกอำเภอ' }" :options="filteredDistricts" clear-search-on-open
        open-on-focus v-model="selectedDistrict" @click="handleDistrictClick" />
    </div>
    <div class="col-md-12">
      <FormKit type="autocomplete" name="subDistrict" label="ตำบล" placeholder="เลือกตำบล" validation="required"
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
  <div class="col-md-12">{{ selectedSubDistrictLabel }}</div>
  <div class="col-md-12">{{ selectedSubDistrict }}</div>
  <div class="col-md-12">{{ selectedDistrictLabel }}</div>
  <div class="col-md-12">{{ selectedDistrict }}</div>
  <div class="col-md-12">{{ selectedProvinceLabel }}</div>
  <div class="col-md-12">{{ selectedProvince }}</div>
</template>
<script setup lang="ts">
import districts from "~/shared/repository/fulladdress";

const selectedDistrict = ref();
const selectedSubDistrict = ref();
const selectedProvince = ref();
const selectedDistrictLabel = ref();
const selectedSubDistrictLabel = ref();
const selectedProvinceLabel = ref();

const province = ref<Array<{ value: string; label: string }>>([]);

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

onMounted(async () => {
  await loadProvince()
  selectedProvince.value = '0E4B61AD55B447A1816B69CE06005B5F';
  selectedDistrict.value = 'district3';
  selectedSubDistrict.value = 'subdistrict3';
});

const filteredDistricts = computed(() => {
  const provinceFiltered = districts.filter(district => district.province === selectedProvince.value);
  const prov = province.value.find(province => province.value === selectedProvince.value);
  selectedProvinceLabel.value = prov ? prov.label : '';
  return provinceFiltered;
});

const filteredSubDistricts = computed(() => {
  const district = districts.find(district => district.value === selectedDistrict.value);
  selectedDistrictLabel.value = district ? district.label : '';
  return district ? district.subDistricts : [];
});

const selectedPostalCode = computed(() => {
  const postal = filteredSubDistricts.value.find(subDistrict => subDistrict.value === selectedSubDistrict.value);
  selectedSubDistrictLabel.value = postal ? postal.label : '';
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
