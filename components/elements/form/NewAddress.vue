<template>
  <div class="col-6">
    <FormKit
      type="text"
      label="ตั้งชื่อเรียกรายการนี้"
      name="LabelAddress"
      placeholder="เพื่อให้ง่ายต่อการเรียกใช้งานครั้งต่อไป"
      validation="required"
      :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
      autocomplete="false"
    />
  </div>
  <div class="col-6">
    <FormKit
      type="text"
      label="หมายเลขโทรศัพท์"
      name="PhoneNumber"
      placeholder="098765XXXX"
      validation="required"
      :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
      autocomplete="false"
    />
  </div>
  <div class="col-sm-4 col-lg-3">
    <FormKit
      type="select"
      label="คำนำหน้าผู้รับ"
      name="Title"
      placeholder="คำนำหน้า"
      :options="prefix"
      validation="required"
      :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
    />
  </div>
  <div class="col-sm-8 col-lg-4">
    <FormKit
      type="text"
      label="ชื่อผู้รับ"
      name="FirstName"
      placeholder="ชื่อ"
      validation="required"
      :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
      autocomplete="false"
    />
  </div>
  <div class="col-md-12 col-lg-5">
    <FormKit
      type="text"
      label="นามสกุลผู้รับ"
      name="LastName"
      placeholder="นามสกุล"
      validation="required"
      :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
      autocomplete="false"
    />
  </div>

  <ElementsFormAddress
    :addr-province="addrProvince"
    :addr-district="addrDistrict"
    :addr-sub-district="addrSubDistrict"
    :addr-zip-code="addrZipCode"
    @change-province="handlerChangeProvince"
    @change-district="handlerChangeDistrict"
    @change-sub-district="handlerChangeSubDistrict"
    @change-full-address="handlerChangeFullAddress"
  />
</template>

<script setup lang="ts">
import { DefaultAddress } from "~/shared/entities/placeorder-entity";
import { SelectOption } from "~/shared/entities/select-option";

const emit = defineEmits(['changeProvince', 'changeDistrict', 'changeSubDistrict','changeFullAddress'])

const props = defineProps({
    prefix:Array<SelectOption>,
    addrProvince: Array<SelectOption>,
    addrDistrict: Array<SelectOption>,
    addrSubDistrict: Array<SelectOption>,
    addrZipCode: String,
})

const prefix: globalThis.Ref<SelectOption[]> = ref([])
const addrProvince: globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode = ref('')

const onLoad = onMounted(() => {
    if(props.prefix){
        prefix.value = props.prefix
    }
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
//watching props pass data
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
watch(
    () => props.prefix,
    () => {
        if (props.prefix && props.prefix.length > 0) {
            prefix.value = props.prefix
        }
    }
)
// handler function for emit
const handlerChangeProvince = (e: string) => {

    if (e) {
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
const handlerChangeFullAddress = (addr:string,ObjectAddress:DefaultAddress)=>{
  if(addr && ObjectAddress){
    emit('changeFullAddress',addr,ObjectAddress)
  }
}
</script>
