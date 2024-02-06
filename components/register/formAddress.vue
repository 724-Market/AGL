<template>
  <div class="row">
    <div class="col-md-12">
      <FormKit type="autocomplete" name="Province" label="จังหวัด" placeholder="เลือกจังหวัด" :options="province"
        clear-search-on-open open-on-focus v-model="selectedProvince" @click="handleProvinceClick" />
    </div>
    <div class="col-md-12">
      <FormKit type="autocomplete" name="district" label="อำเภอ" placeholder="เลือกอำเภอ" :options="filteredDistricts"
        clear-search-on-open open-on-focus v-model="selectedDistrict" @click="handleDistrictClick" />
    </div>
    <div class="col-md-6">
      <FormKit type="autocomplete" name="subDistrict" label="ตำบล" placeholder="เลือกตำบล" :options="filteredSubDistricts"
        clear-search-on-open open-on-focus v-model="selectedSubDistrict" />
    </div>
    <div class="col-md-6">
      <FormKit type="text" name="postalCode" label="รหัสไปรษณีย์" placeholder="เลือกรหัสไปรษณีย์" disabled
        v-model="selectedPostalCode" />
    </div>
  </div>
  <div class="col-md-6">{{ selectedProvince }}</div>
</template>
<script setup lang="ts">
import districts from "~/shared/repository/fulladdress";

const selectedDistrict = ref('');
const selectedSubDistrict = ref('');
const selectedProvince = ref('');



/*
const province = [
  { value: 'US', label: 'United States' },
  { value: 'TH', label: 'Thailand' },
  // Add more province as needed
];

const districts = [
  {
    label: 'เขตจอมทอง',
    value: '4C0E3DFA645C41F99D59E5B3F27B1621',
    Province: '74A02FB676204F39941587CA1EA14093',
    subDistricts: [
      {
        label: 'แขวงบางมด',
        value: '0E75E1F0A6B047139A6CA88566245135',
        postalCode: '10150'
      },
      {
        label: 'แขวงบางขุนเทียน',
        value: '373F5C4EF3964AAF92593345AF57FE3F',
        postalCode: '10150'
      },
      {
        label: 'แขวงบางค้อ',
        value: '9FB89F17C55C44168439AD757CDCE288',
        postalCode: '10150'
      },
      {
        label: 'แขวงจอมทอง',
        value: 'A55235EAD9D24FD4A2EE5D989EF2C78D',
        postalCode: '10150'
      }
    ]
  },
  // Add more districts as needed
];

*/


// api 
  const province: globalThis.Ref<SelectOption[]> = ref([]);

  import type { SelectOption } from "~/shared/entities/select-option";

  const loadProvince = async () => {
  const response = await useRepository().master.modalProvine();
  const resultCheck = useUtility().responseCheck(response)
  if (resultCheck.status === 'pass') {

     province.value = response.apiResponse.Data.map((item) => {
        const options: SelectOption = {
          value: item.ID,
          label: item.Name,
        };
        return options;
      });
    
    
    }  
  }
  
  onMounted (async () => {
  await loadProvince ()
  selectedProvince.value = '0E4B61AD55B447A1816B69CE06005B5F';
  selectedDistrict.value = 'district3';
  selectedSubDistrict.value = 'subdistrict3';
  
  });

const filteredDistricts = computed(() => districts.filter(district => district.province === selectedProvince.value));
const filteredSubDistricts = computed(() => {
  const district = districts.find(district => district.value === selectedDistrict.value);
  return district ? district.subDistricts : [];
});

const selectedPostalCode = computed(() => {
  const postal = filteredSubDistricts.value.find(subDistrict => subDistrict.value === selectedSubDistrict.value);
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
