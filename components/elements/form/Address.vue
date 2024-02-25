<template>
  <div v-if="ObjectAddress" class="row" >
    <div class="col-6" >
      <FormKit
        type="text"
        label="บ้านเลขที่"
        :name="'AddressHouseNumber' + props.elementKey"
        placeholder="บ้านเลขที่"
        v-model="ObjectAddress.No"
        @keyup="handlerChangeFullAddress"
        :validation-rules="{ address_characters }"
        validation="required|address_characters"
        validation-visibility="live"
        :validation-messages="{
          required: 'กรุณาใส่ข้อมูล',
          address_characters: 'กรุณากรอกรูปแบบบ้านเลขที่ให้ถูกต้อง',
        }"
        autocomplete="off"
      />
    </div>
    
    <div class="col-6">
      <FormKit
        type="text"
        label="หมู่ที่"
        :name="'AddressMoo' + props.elementKey"
        placeholder="หมู่ที่"
        autocomplete="off"
        v-model="ObjectAddress.Moo"
        @keyup="handlerChangeFullAddress"
      />
    </div>
    <div class="col-xs-12 col-md-6">
      <FormKit
        type="text"
        label="หมู่บ้าน/อาคาร"
        :name="'AddressVillage' + props.elementKey"
        placeholder="หมู่บ้าน/อาคาร"
        v-model="ObjectAddress.Building"
        @keyup="handlerChangeFullAddress"
        autocomplete="off"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="text"
        label="ซอย/ตรอก/แยก"
        :name="'AddressSoi' + props.elementKey"
        placeholder="ซอย/ตรอก/แยก"
        autocomplete="off"
        v-model="ObjectAddress.Alley"
        @keyup="handlerChangeFullAddress"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="text"
        label="ถนน"
        :name="'AddressRoad' + props.elementKey"
        placeholder="ถนน"
        autocomplete="off"
        v-model="ObjectAddress.Road"
        @input-raw="handlerChangeFullAddress"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="select"
        label="จังหวัด"
        :name="'AddressProvince' + props.elementKey"
        placeholder="จังหวัด"
        @change="handlerChangeProvince"
        :options="province"
        validation="required"
        validation-visibility="live"
        v-model="ObjectAddress.ProvinceID"
        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="select"
        label="เขต/อำเภอ"
        :name="'AddressDistrict' + props.elementKey"
        placeholder="เขต/อำเภอ"
        :options="addrDistrict"
        @change="handlerChangeDistrict"
        validation="required"
        validation-visibility="live"
        v-model="ObjectAddress.DistrictID"
        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="select"
        label="แขวง/ตำบล"
        :name="'AddressSubdistrict' + props.elementKey"
        placeholder="แขวง/ตำบล"
        v-model="ObjectAddress.SubDistrictID"
        :options="addrSubDistrict"
        @change="handlerChangeSubDistrict"
        validation="required"
        validation-visibility="live"
        :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
      />
    </div>
    <div class="col-6">
      <FormKit
        type="text"
        label="รหัสไปรษณีย์"
        readonly
        :name="'AddressPostalCode' + props.elementKey"
        v-model="addrZipCode"
        @input-raw="handlerChangeFullAddress"
        placeholder="รหัสไปรษณีย์"
        validation="required"
        validation-visibility="live"
        :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
        autocomplete="off"
      />
    </div>
    <div class="col-xs-12 col-md-6">
      <FormKit
        type="text"
        label="ระบุที่อยู่เอง กรณีไม่มีข้อมูลให้เลือก"
        :name="'AddressCustom' + props.elementKey"
        autocomplete="false"
        v-model="ObjectAddress.AddressText"
        @keyup="handlerChangeFullAddress"
      />
    </div>
  </div>
  

</template>
<script setup lang="ts">
import type { DefaultAddress } from "~/shared/entities/placeorder-entity";
import type { SelectOption } from "~/shared/entities/select-option";
import type {  CustomerAddressListRes } from "~/shared/entities/customer-entity";
import province from  "~/shared/data/provinces-data";

const emit = defineEmits(['changeProvince', 'changeDistrict', 'changeSubDistrict', 'changeFullAddress'])

const props = defineProps({
  elementKey:String,
  orderNo: String,
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode: String,
  defaultAddressCache:Object,
  defaultAddressCustomer: {
    type: Object as () => CustomerAddressListRes
  },
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

const onLoad = onMounted(async () => {

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
  if (props.defaultAddressCache) {

    ObjectAddress.value = props.defaultAddressCache as DefaultAddress
      await emit('changeProvince', ObjectAddress.value.ProvinceID)
      //ObjectAddress.value.DistrictID = addressCache.DistrictID
      await emit('changeDistrict', ObjectAddress.value.DistrictID)
      //ObjectAddress.value.SubDistrictID = addressCache.SubDistrictID
      await emit('changeSubDistrict', ObjectAddress.value.SubDistrictID)

      addrZipCode.value = ObjectAddress.value.ZipCode ?? ""
    //emit('changeProvince', ObjectAddress.value.ProvinceID)
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
    else {
      addrSubDistrict.value = []
    }
  }
)
watch(
  () => props.addrZipCode,
  () => {
    if (props.addrZipCode && props.addrZipCode.length > 0) {
      addrZipCode.value = props.addrZipCode
    }
    else {
      addrZipCode.value = ''
    }
  }
)
watch(
  ()=>props.defaultAddressCache, 
  async () => {
    let addressCache = props.defaultAddressCache as DefaultAddress
    if(addressCache) {
      // console.log('addressCache', addressCache)
      ObjectAddress.value.ProvinceID = addressCache.ProvinceID 
      await emit('changeProvince', ObjectAddress.value.ProvinceID)
      ObjectAddress.value.DistrictID = addressCache.DistrictID
      await emit('changeDistrict', ObjectAddress.value.DistrictID)
      ObjectAddress.value.SubDistrictID = addressCache.SubDistrictID
      await emit('changeSubDistrict', ObjectAddress.value.SubDistrictID)

      ObjectAddress.value = addressCache
      addrZipCode.value = addressCache ? addressCache.ZipCode ?? '' : ''
    } else {
      ObjectAddress.value = {
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
      }
    }
})


// handler function for emit
const handlerChangeProvince = (e: any) => {
  if (e && e.target.value) {
    if(ObjectAddress.value){
      ObjectAddress.value.ProvinceID = e.target.value
    ObjectAddress.value.DistrictID=''
    ObjectAddress.value.SubDistrictID=''
    ObjectAddress.value.ZipCode=''
    }

    handlerChangeFullAddress()
    emit('changeProvince', e.target.value)

  }
}
const handlerChangeDistrict = (e: any) => {

  if (e && e.target.value) {
    if(ObjectAddress.value){
      ObjectAddress.value.DistrictID = e.target.value
      ObjectAddress.value.SubDistrictID=''
    ObjectAddress.value.ZipCode=''
    }
    handlerChangeFullAddress()
    emit('changeDistrict', e.target.value)
  }
}
const handlerChangeSubDistrict = (e: any) => {
  if (e && e.target.value) {
    if(ObjectAddress.value){
      ObjectAddress.value.SubDistrictID = e.target.value
      ObjectAddress.value.ZipCode=''
    }
    handlerChangeFullAddress()
    emit('changeSubDistrict', e.target.value)
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
    if (ObjectAddress.value.Alley.length > 0) {
      fullAddress += "ซอย " + ObjectAddress.value.Alley + " "
    }
    if (ObjectAddress.value.Road.length > 0) {
      fullAddress += "ถนน " + ObjectAddress.value.Road + " "
    }
    if (ObjectAddress.value.SubDistrictID.length > 0) {
      const id = ObjectAddress.value.SubDistrictID
      const filter = addrSubDistrict.value.filter(x => x.value == id)
      if (filter.length > 0) {
        if(addrZipCode.value.length > 0){
          fullAddress += filter[0].label.replace('('+addrZipCode.value+')','') + " "
        } else {
          fullAddress += filter[0].label + " "
        }
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
    // if (ObjectAddress.value.No.length > 0 &&
    //   ObjectAddress.value.SubDistrictID.length > 0 &&
    //   ObjectAddress.value.DistrictID.length > 0 &&
    //   ObjectAddress.value.ProvinceID.length > 0 &&
    //   ObjectAddress.value.ZipCode.length > 0) {
      
    // }
    emit('changeFullAddress', fullAddress, ObjectAddress.value)
  }
}
</script>
