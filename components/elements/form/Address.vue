<template>
  <div class="col-6">
    <FormKit
      type="text"
      label="บ้านเลขที่"
      name="AddressHouseNumber"
      placeholder="บ้านเลขที่"
      validation="required"
      :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
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
    />
  </div>
  <div class="col-xs-12 col-md-6">
    <FormKit
      type="text"
      label="หมู่บ้าน/อาคาร"
      name="AddressVillage"
      placeholder="หมู่บ้าน/อาคาร"
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
    />
  </div>
  <div class="col-6">
    <FormKit
      type="text"
      label="ถนน"
      name="AddressRoad"
      placeholder="ถนน"
      autocomplete="false"
    />
  </div>
  <div class="col-6">
    <FormKit
      type="text"
      label="รหัสไปรษณีย์"
      readonly
      name="AddressPostalCode"
      v-model="addrZipCode"
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
      :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
    />
  </div>
  <div class="col-6">
    <FormKit
      type="autocomplete"
      label="แขวง/ตำบล"
      name="AddressSubdistrict"
      placeholder="แขวง/ตำบล"
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
    />
  </div>
</template>
<script setup lang="ts">
import { SelectOption } from "~/shared/entities/select-option";

const emit = defineEmits(['changeProvince','changeDistrict','changeSubDistrict'])

const props = defineProps({
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode:String,
})

const addrProvince:globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict:globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict:globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode=ref('')

const onLoad = onMounted(()=>{
  if(props.addrProvince){
    addrProvince.value = props.addrProvince
  }
  if(props.addrDistrict){
    addrDistrict.value = props.addrDistrict
  }
  if(props.addrSubDistrict){
    addrSubDistrict.value = props.addrSubDistrict
  }
  if(props.addrZipCode){
    addrZipCode.value = props.addrZipCode
  }
})
//watching data
watch(
  ()=>props.addrProvince,
  ()=>{
    if(props.addrProvince && props.addrProvince.length>0){
      addrProvince.value = props.addrProvince
    }
  }
)
watch(
  ()=>props.addrDistrict,
  ()=>{
    if(props.addrDistrict && props.addrDistrict.length>0){
      addrDistrict.value = props.addrDistrict
    }
  }
)
watch(
  ()=>props.addrSubDistrict,
  ()=>{
    if(props.addrSubDistrict && props.addrSubDistrict.length>0){
      addrSubDistrict.value = props.addrSubDistrict
    }
  }
)
watch(
  ()=>props.addrZipCode,
  ()=>{
    if(props.addrZipCode && props.addrZipCode.length>0){
      addrZipCode.value = props.addrZipCode
    }
  }
)
// handler function for emit
const handlerChangeProvince = (e: string)=>{

  if(e){
    emit('changeProvince',e)

  }
}
const handlerChangeDistrict = (e: string)=>{
  if(e){
    emit('changeDistrict',e)
  }
}
const handlerChangeSubDistrict = (e: string)=>{
  if(e){
    emit('changeSubDistrict',e)
  }
}
</script>
