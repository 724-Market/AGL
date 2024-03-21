<template>
  <!-- <div class="col-6">
    <FormKit
      type="text"
      label="ตั้งชื่อเรียกรายการนี้"
      :name="'LabelAddress' + props.elementKey"
      placeholder="เพื่อให้ง่ายต่อการเรียกใช้งานครั้งต่อไป"
      v-model="LabelAddressText"
      @change="handleLabelAddressChange"
      validation="required"
      :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
      autocomplete="false"
    />
  </div> -->
  <div class="col-sm-3 col-lg-3">
    <FormKit
      type="select"
      label="คำนำหน้าผู้รับ"
      :name="'Title' + elementKey"
      placeholder="คำนำหน้า"
      v-model="TitleText"
      @change="handleTitleChange"
      :options="prefix"
      validation="required"
      validation-visibility="live"
      :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
    />
  </div>
  <div class="col-sm-4 col-lg-4">
    <FormKit
      type="text"
      label="ชื่อผู้รับ"
      :name="'FirstName' + props.elementKey"
      placeholder="ชื่อ"
      v-model="FirstNameText"
      @change="handleFirstNameChange"
      validation="required"
      validation-visibility="live"
      :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
      autocomplete="off"
    />
  </div>
  <div class="col-md-5 col-lg-5">
    <FormKit
      type="text"
      label="นามสกุลผู้รับ"
      :name="'LastName' + props.elementKey"
      placeholder="นามสกุล"
      v-model="LastNameText"
      @change="handleLastNameChange"
      validation="required"
      validation-visibility="live"
      :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
      autocomplete="off"
    />
  </div>

  <div class="col-6">
    <FormKit
      type="text"
      label="หมายเลขโทรศัพท์"
      :name="'PhoneNumber' + props.elementKey"
      placeholder="098765XXXX"
      maxlength="10"
      v-model="PhoneNumberText"
      @change="handlePhoneNumberChange"
      validation="required|matches:/^[0-9]{10}$/"
      validation-visibility="live"
      :validation-messages="{ required: 'กรุณาใส่ข้อมูล', matches: 'หมายเลขโทรศัพท์ควรเป็นตัวเลข 10 หลัก' }"
      autocomplete="off"
    />
  </div>

  <ElementsFormAddress
    :element-key="elementKey"
    :addr-province="addrProvince"
    :addr-district="addrDistrict"
    :addr-sub-district="addrSubDistrict"
    :addr-zip-code="addrZipCode"
    :default-address-cache="defaultAddressCache"
    @change-province="handlerChangeProvince"
    @change-district="handlerChangeDistrict"
    @change-sub-district="handlerChangeSubDistrict"
    @change-full-address="handlerChangeFullAddress"
  />
</template>

<script setup lang="ts">
import type { DefaultAddress } from "~/shared/entities/placeorder-entity";
import type { SelectOption } from "~/shared/entities/select-option";

const emit = defineEmits(['changeProvince', 'changeDistrict', 'changeSubDistrict','changeFullAddress'])

const props = defineProps({
  elementKey:String,
    prefix:Array<SelectOption>,
    addrProvince: Array<SelectOption>,
    addrDistrict: Array<SelectOption>,
    addrSubDistrict: Array<SelectOption>,
    addrZipCode: String,
    defaultAddressCache: {
      type: Object as () => DefaultAddress,
    },
})

const defaultAddressCache: globalThis.Ref<DefaultAddress | undefined> = ref()

const LabelAddressText = ref('')
const PhoneNumberText = ref('')
const TitleText = ref('')
const  FirstNameText = ref('')
const LastNameText = ref('')

const insureFullAddress: globalThis.Ref<String> = ref('')
const AddressObject: globalThis.Ref<DefaultAddress | undefined> = ref()

const prefix: globalThis.Ref<SelectOption[]> = ref([])
const addrProvince: globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode = ref('')
const elementKey = ref('')

const onLoad = onMounted(() => {
  if(props.elementKey){
    elementKey.value = props.elementKey
  }
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
    if(props.defaultAddressCache) {
      defaultAddressCache.value = props.defaultAddressCache
    }

    if(defaultAddressCache.value) {
      LabelAddressText.value = '' //TODO: without field
      PhoneNumberText.value = defaultAddressCache.value.PhoneNumber
      TitleText.value = '' //TODO: without field
      FirstNameText.value = defaultAddressCache.value.FirstName
      LastNameText.value = defaultAddressCache.value.LastName
    }
})

const handleLabelAddressChange = async (event: any) => {
  LabelAddressText.value = event.target.value
  await handlerChangeFullAddress(insureFullAddress.value.toString(), AddressObject.value as DefaultAddress)
}
const handlePhoneNumberChange = async (event: any) => {
  PhoneNumberText.value = event.target.value
  await handlerChangeFullAddress(insureFullAddress.value.toString(), AddressObject.value as DefaultAddress)
}
const handleTitleChange = async (event: any) => {
  TitleText.value = event.target.value
  await handlerChangeFullAddress(insureFullAddress.value.toString(), AddressObject.value as DefaultAddress)
}
const handleFirstNameChange = async (event: any) => {
  FirstNameText.value = event.target.value
  await handlerChangeFullAddress(insureFullAddress.value.toString(), AddressObject.value as DefaultAddress)
}
const handleLastNameChange = async (event: any) => {
  LastNameText.value = event.target.value
  await handlerChangeFullAddress(insureFullAddress.value.toString(), AddressObject.value as DefaultAddress)
}

//watching props pass data
watch(
  () => props.elementKey,
  () => {
    if (props.elementKey && props.elementKey.length > 0) {
      elementKey.value = props.elementKey
    }
  }
)
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
    () => props.prefix,
    () => {
        if (props.prefix && props.prefix.length > 0) {
            prefix.value = props.prefix
        }
    }
)
watch(
  ()=>props.defaultAddressCache,
  ()=>{
    defaultAddressCache.value = props.defaultAddressCache
    if(props.defaultAddressCache){
      FirstNameText.value = defaultAddressCache.value?.FirstName ?? ""
      LastNameText.value = defaultAddressCache.value?.LastName ?? ""
      LabelAddressText.value = defaultAddressCache.value?.LastName ?? ""
      PhoneNumberText.value = defaultAddressCache.value?.PhoneNumber ?? ""
    }
    else {
      FirstNameText.value = ""
      LastNameText.value = ""
      LabelAddressText.value = ""
      PhoneNumberText.value = ""
    }
  }
)
// handler function for emit
const handlerChangeProvince = async (e: string) => {
    if (e) {
        emit('changeProvince', e)
    }
}
const handlerChangeDistrict = async (e: string) => {
    if (e) {
        emit('changeDistrict', e)
    }
}
const handlerChangeSubDistrict = async (e: string) => {
    if (e) {
        emit('changeSubDistrict', e)
    }
}
const handlerChangeFullAddress = (addr:string, ObjectAddress:DefaultAddress)=>{
  if(addr && ObjectAddress){
    insureFullAddress.value = addr
    AddressObject.value = ObjectAddress

    const prefixName = prefix.value.filter(x=>x.value==TitleText.value)[0]
    let prefixLabel = prefixName ? prefixName.label ?? '' : ''
    
    ObjectAddress.AddressText = LabelAddressText.value
    ObjectAddress.PhoneNumber = PhoneNumberText.value
    ObjectAddress.PrefixID =  TitleText.value
    ObjectAddress.PrefixName = TitleText.value !="" ? prefixLabel : TitleText.value
    ObjectAddress.FirstName = FirstNameText.value
    ObjectAddress.LastName = LastNameText.value

    emit('changeFullAddress', addr, ObjectAddress)
  }
}
</script>
