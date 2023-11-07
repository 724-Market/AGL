<template>
  <div class="card">
    <div class="card-body">

      <div class="accordion" id="accordion-shipping">
        <div class="accordion-item">

          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapse-shipping" aria-expanded="true"
              aria-controls="collapse-shipping">วิธีการรับกระดาษ</button>
          </h2>

          <div id="collapse-shipping" class="accordion-collapse collapse show" data-bs-parent="#accordion-shipping">
            <div class="accordion-body">

              <div class="form-placeorder">
                <div class="form-hide-label">
                  <ElementsFormRadioShippingPaper :option="shippingPaperTypeOption" v-model="shippingPaperText" />
                </div>

                <section class="shipping-method" v-if="shippingPaperText == 'DELIVERY'">
                  <h3>วิธีการจัดส่ง</h3>
                  <div class="row">
                    <div class="col-12">
                      <div class="notice-info">
                        <i class="fa-regular fa-circle-info"></i>
                        <u>ฟรี</u>
                        ค่าจัดส่ง
                        เมื่อแลกกระดาษเกิน {{ paymentFeeLimitMin }} บาทขึ้นไป
                      </div>
                    </div>
                    <div class="col-6">
                      <FormKit type="select" label="ช่องทางการจัดส่ง" name="ShippingMethod" placeholder="ช่องทางการจัดส่ง" 
                        :options="shippingMethodOption" v-model="ShippingMethodText" @change="onShippingMethodChange"
                                            validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                    </div>
                    <div class="col-6">
                      <FormKit type="text" label="ค่าจัดส่ง" name="ShippingFee" placeholder="ค่าจัดส่ง"
                        v-model="ShippingFeeText" readonly />
                    </div>
                  </div>
                </section>

                <section class="shipping-address" v-if="shippingPaperText == 'DELIVERY'">
                  <div class="card-header card-header-btn">
                      <div>
                        <h3>ที่อยู่สำหรับจัดส่ง</h3>
                      </div>
                      <div class="d-flex justify-content-end">
                        <div class="m-1">
                          <button 
                            type="button" 
                            class="btn btn-warning" 
                            @click="handleEdit"
                            :disabled="agentAddressText == '' || agentAddressText == 'addnew'"
                          >แก้ไข</button>
                        </div>
                        <div class="m-1">
                          <button 
                            type="button" 
                            class="btn btn-danger" 
                            @click="handleDelete"
                            :disabled="agentAddressText == '' || agentAddressText == 'addnew' || isEditMode"
                          >ลบ</button>
                        </div>
                      </div>
                  </div>
                  <div class="form-hide-label">
                    <FormKit 
                      type="radio" 
                      label="รายชื่อที่อยู่" 
                      name="agentAddress"
                      :options="agentAddress"
                      v-model="agentAddressText"
                      options-class="option-block-stack" />
                  </div>
                  <aside class="new-shipping-address inner-section" v-if="isShowComponentAddress">
                    <h4>ที่อยู่จัดส่งใหม่</h4>
                    <div class="row">
                      <ElementsFormNewAddress 
                        element-key="delivery"
                        :prefix="prefix"
                        :addr-province="addrProvince"
                        :addr-district="addrDistrict"
                        :addr-sub-district="addrSubDistrict"
                        :addr-zip-code="addrZipCode"
                        :default-address-cache="newAddressObjectCache"
                        @change-province="handlerChangeProvince"
                        @change-district="handlerChangeDistrict"
                        @change-sub-district="handlerChangeSubDistrict"
                        @change-full-address="handlerChangeFullAddress"
                      />
                    </div>
                    <button 
                      type="button" 
                      label="บันทึกข้อมูล"
                      class="btn btn-primary"
                      @click="handleSave"
                      :loading="isLoading" 
                      :disabled="!isSubmit"
                    >บันทึกข้อมูล</button>
                  </aside>
                </section>

              </div>

            </div>
          </div>

        </div>
      </div>
      <div class="m-2 d-flex justify-content-end" v-if="isAcdordian">
        <button 
          type="button" 
          label="OK"
          class="btn btn-primary"
          @click="handleAcdordian"
          :loading="isLoading" 
          :disabled="!isAcdordian"
        >OK</button>
      </div>
    </div>
  </div>
  <ElementsModalAlert v-if="isShow" :is-error="isShow" :message="message" :reload="false" @close-modal="handleCloseModal" />
</template>

<script setup lang="ts">
import { AgentAddressDeleteReq, AgentAddressListRes, AgentAddressSaveReq } from "~/shared/entities/agent-entity";
import { 
  IDeliveryResponse,
  DeliveryPaperRes
} from "~/shared/entities/delivery-entity";
import { DistrictReq, PrefixReq, SubDistrictReq } from "~/shared/entities/master-entity";
import { 
  PaymentFeeLimitRes,
  DeliveryAddressReq
} from '~/shared/entities/paper-entity';
import { 
  AgentAddressCreateReq,
 } from "~/shared/entities/agent-entity";
import { DefaultAddress } from "~/shared/entities/placeorder-entity";
import { RadioOption, SelectOption } from "~/shared/entities/select-option";

const emit = defineEmits(['shippingTypeChange','changeDeliveryChannel','checkAddress'])

const props = defineProps({ 
	deliveryChanel: Array<IDeliveryResponse>,
	shippingPaperType: Array<DeliveryPaperRes>,
	paymentFeeLimit: Array<PaymentFeeLimitRes>,
  isSubmit: Boolean,
})

var isShow = ref(false) 
var message = ref("")

const shippingPaperTypeOption: globalThis.Ref<RadioOption[]> = ref([])
const shippingMethodOption: globalThis.Ref<RadioOption[]> = ref([])

var paymentFeeLimitMin = ref(0)
var shippingPaperText = ref("")
var ShippingMethodText = ref("")
var ShippingFeeText = ref(0)
var isSubmit = ref(false)
var isLoading = ref(false)

var isAcdordian = ref(false)
var isEditMode = ref(false)

const agentAddress: globalThis.Ref<RadioOption[]> = ref([]); 
const agentAddressList: globalThis.Ref<AgentAddressListRes[]> = ref([]);
var agentAddressText = ref("")
var isShowComponentAddress = ref(false)
const prefix: globalThis.Ref<SelectOption[]> = ref([]);
const addrProvince: globalThis.Ref<SelectOption[]> = ref([]);
const addrDistrict: globalThis.Ref<SelectOption[]> = ref([]);
const addrSubDistrict: globalThis.Ref<SelectOption[]> = ref([]);
const addrZipCode = ref("");

const newAddressObject: globalThis.Ref<DefaultAddress | undefined> = ref()
const newAddressObjectCache: globalThis.Ref<DefaultAddress | undefined> = ref()
const insureFullAddress: globalThis.Ref<String> = ref('')
const insureFullNewAddress: globalThis.Ref<String> = ref('')

const onLoad = onMounted(async () => {
	if (props.shippingPaperType) {
		shippingPaperTypeOption.value = [
          {
            label: 'รับทางไปรษณีย์',
            value: props.shippingPaperType[1].Type,
          },
          {
            label: 'รับที่สาขา',
            value: props.shippingPaperType[0].Type,
          }
      	]
  }
	if (props.deliveryChanel) {
		shippingMethodOption.value = [
          {
            label: props.deliveryChanel[0].Name,
            value: props.deliveryChanel[0].Cost.toString(),
          }
      	]
	}
	if (props.paymentFeeLimit) {
		paymentFeeLimitMin.value = props.paymentFeeLimit[0].Min
  }
  if (props.isSubmit) {
		isSubmit.value = props.isSubmit
  }
  await loadAgentAddress();
	await loadPrefix();
	await loadProvince();
})

const handleCloseModal = async (event: boolean) => {
  isShow.value = event
  message.value = ''
}

const handleAcdordian = async () => {
  const acordian = document.getElementById("collapse-shipping");
  if(acordian) {
    acordian.classList.remove("show");
    isAcdordian.value = false
    emit('shippingTypeChange', shippingPaperText.value)
  }
}

watch(shippingPaperText, async (newshippingPaperType) => {
  agentAddressText.value = ''
  isShowComponentAddress.value = false
  if(newshippingPaperType == 'WALKIN') {
    emit('shippingTypeChange', newshippingPaperType)
  } 
  else {
    emit('shippingTypeChange', 'clear')
  }
})

const onShippingMethodChange = async (event: any) => {
  ShippingFeeText.value = event.target.value
  emit('changeDeliveryChannel', ShippingMethodText.value,ShippingFeeText.value)
  await handleCheckInsuranceRecieve()
}

watch(agentAddressText, async (newAgentAddressText) => {
  if(newAgentAddressText == 'addnew') {
    newAddressObjectCache.value = undefined
    newAddressObject.value = undefined
    isShowComponentAddress.value = true
    isAcdordian.value = false
  }
  else {
    const addressSelect = agentAddressList.value.find(w => w.ID == agentAddressText.value) 
    if(addressSelect && addressSelect.ID != '') {
      newAddressObjectCache.value =  {
        AddressID: addressSelect.ID,
        ReferenceID: addressSelect.ReferenceID,
        ReferenceType: addressSelect.ReferenceType,
        ProvinceID: addressSelect.ProvinceID,
        DistrictID: addressSelect.DistrictID,
        SubDistrictID: addressSelect.SubDistrictID,
        TaxID: addressSelect.TaxID,
        PrefixID: '',
        FirstName: addressSelect.FirstName,
        LastName: addressSelect.LastName,
        PhoneNumber: addressSelect.PhoneNumber,
        Email: addressSelect.Email,
        Name: addressSelect.Name,
        Type: addressSelect.Type,
        AddressLine1: addressSelect.AddressLine1,
        AddressLine2: addressSelect.AddressLine2,
        AddressText: addressSelect.AddressText,
        No: addressSelect.No,
        Moo: addressSelect.Moo,
        Place: addressSelect.Place,
        Building: addressSelect.Building,
        Floor: addressSelect.Floor,
        Room: addressSelect.Room,
        Branch: addressSelect.Branch,
        Alley: addressSelect.Alley,
        Road: addressSelect.Road,
        ZipCode: addressSelect.ZipCode,
      }
      newAddressObject.value = newAddressObjectCache.value 
    }
    isShowComponentAddress.value = false
    isAcdordian.value = true
  }
  isEditMode.value = false
  await handleCheckInsuranceRecieve()
  // console.log('newAddressObjectCache.value', newAddressObjectCache.value)
})

const handlerChangeProvince = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrDistrict.value = await loadDistrict(e);

    isLoading.value = false;
  }
}

const handlerChangeDistrict = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrSubDistrict.value = await loadSubDistrict(e);

    isLoading.value = false;
  }
}

const handlerChangeSubDistrict = async (e: string) => {
  if (e) {
    isLoading.value = true;
    addrZipCode.value = await loadZipCode(e);
    isLoading.value = false;
  }
}

const handlerChangeFullAddress = async (addr:string, ObjectAddress:DefaultAddress)=>{
  if(addr && ObjectAddress){
    insureFullNewAddress.value = `${ObjectAddress.PrefixName} ${ObjectAddress.FirstName} ${ObjectAddress.LastName} `+addr
    newAddressObject.value = ObjectAddress
    await handleCheckInsuranceRecieve()
  }
}

const setPostalAddress = async (labelAddnew: string) => {
  agentAddress.value = agentAddressList.value.map((x) => {
    const options: RadioOption = {
      label: `${x.FirstName} ${x.LastName}`,
      value: x.ID,
      help: `${x.No} ${x.Moo} ${x.Place} ${x.Building} 
             ${x.Floor} ${x.Room} ${x.Branch} ${x.Alley} 
             ${x.Road} ${x.ProvinceName} ${x.DistrictName} ${x.SubDistrictName} 
             ${x.ZipCode ?? ''}`
    };
    return options;
  });
  agentAddress.value.push({
    label: '+ เพิ่มที่อยู่ใหม่',
    value: 'addnew',
    help: labelAddnew
  })
}

const handleSave = async (event: any) => {
  if(agentAddressText.value == 'addnew') await setPostalAddress(insureFullNewAddress.value.toString())

  isLoading.value = true;
  if(isSubmit) {
    if(agentAddressText.value == 'addnew') {
      let address = newAddressObject.value as AgentAddressCreateReq
      var resCreate = await useRepository().agent.CreateAddress(address);
      console.log('resCreate', resCreate)
      if (resCreate.apiResponse.Status && resCreate.apiResponse.Status == "200") {
        isShow.value = true
        message.value = 'create success'
      }
    } else {
      let address = newAddressObject.value as AgentAddressSaveReq
      address.AddressID = agentAddressText.value
      var resSave = await useRepository().agent.AddressSave(address);
      if (resSave.apiResponse.Status && resSave.apiResponse.Status == "200") {
        isShow.value = true
        message.value = 'save success'
        await loadAgentAddress()
      }
    }
    isEditMode.value = false
    isAcdordian.value = true
    isShowComponentAddress.value = false
  }
  isLoading.value = false;
}

const handleEdit = async (event: any) => {
  isAcdordian.value = false
  // const addressSelect = agentAddressList.value.find(w => w.ID == agentAddressText.value) 
  if(newAddressObjectCache.value && newAddressObjectCache.value.AddressID != '') {
    isEditMode.value = true
    isShowComponentAddress.value = true
    await handleCheckInsuranceRecieve()
    // newAddressObjectCache.value =  {
    //   AddressID: addressSelect.ID,
    //   ReferenceID: addressSelect.ReferenceID,
    //   ReferenceType: addressSelect.ReferenceType,
    //   ProvinceID: addressSelect.ProvinceID,
    //   DistrictID: addressSelect.DistrictID,
    //   SubDistrictID: addressSelect.SubDistrictID,
    //   TaxID: addressSelect.TaxID,
    //   PrefixID: '',
    //   FirstName: addressSelect.FirstName,
    //   LastName: addressSelect.LastName,
    //   PhoneNumber: addressSelect.PhoneNumber,
    //   Email: addressSelect.Email,
    //   Name: addressSelect.Name,
    //   Type: addressSelect.Type,
    //   AddressLine1: addressSelect.AddressLine1,
    //   AddressLine2: addressSelect.AddressLine2,
    //   AddressText: addressSelect.AddressText,
    //   No: addressSelect.No,
    //   Moo: addressSelect.Moo,
    //   Place: addressSelect.Place,
    //   Building: addressSelect.Building,
    //   Floor: addressSelect.Floor,
    //   Room: addressSelect.Room,
    //   Branch: addressSelect.Branch,
    //   Alley: addressSelect.Alley,
    //   Road: addressSelect.Road,
    //   ZipCode: addressSelect.ZipCode,
    // }
  }
}

const handleDelete = async (event: any) => {
  isLoading.value = true;

  if(agentAddressText.value != '' && agentAddressText.value != 'addnew') {
    let req: AgentAddressDeleteReq = {
      AddressID: agentAddressText.value
    }
    var response = await useRepository().agent.AddressDelete(req);
    if (response.apiResponse.Status && response.apiResponse.Status == "200") {
      isShow.value = true
      message.value = 'Delete success'
    }
    await loadAgentAddress()
    agentAddressText.value = ''
  }

  isLoading.value = false;
}

const handleCheckInsuranceRecieve = async () => {
	let address = newAddressObject.value as DeliveryAddressReq
  emit('checkAddress', address)
}

const loadAgentAddress = async () => {
  isLoading.value = true;
  var response = await useRepository().agent.GetAddressList();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      agentAddressList.value = response.apiResponse.Data
      agentAddress.value = agentAddressList.value.map((x) => {
        const options: RadioOption = {
          label: `${x.FirstName} ${x.LastName}`,
          value: x.ID,
          help: `${x.No} ${x.Moo} ${x.Place} ${x.Building} 
                 ${x.Floor} ${x.Room} ${x.Branch} ${x.Alley} 
                 ${x.Road} ${x.ProvinceName} ${x.DistrictName} ${x.SubDistrictName} 
                 ${x.ZipCode}`
        };
        return options;
      });
      
    }
  }
  agentAddress.value.push({
    label: '+ เพิ่มที่อยู่ใหม่',
    value: 'addnew'
  })
  isLoading.value = false;
};

const loadPrefix = async () => {
  const req: PrefixReq = {
    IsPerson: true
  };
  const response = await useRepository().master.prefix(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      prefix.value = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.ID,
        };
        return options;
      });
      prefix.value.unshift({
        label: "เลือกคำนำหน้า",
        value: "",
        attrs: { disabled: true },
      });
    } else {
      // data not found
    }
  } else {
  }
}

const loadProvince = async () => {
  const response = await useRepository().master.province();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      addrProvince.value = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.ID,
        };
        return options;
      });
    } else {
      // data not found
    }
  } else {
  }
}

const loadDistrict = async (provId: string): Promise<SelectOption[]> => {
  let options: SelectOption[] = [];
  const req: DistrictReq = {
    ProvinceID: provId,
  };
  const response = await useRepository().master.district(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      options = response.apiResponse.Data.map((x) => {
        const opt: SelectOption = {
          label: x.Name,
          value: x.ID,
        };
        return opt;
      });
    } else {
      // data not found
    }
  } else {
  }

  return options;
}

const loadSubDistrict = async (distId: string): Promise<SelectOption[]> => {
  let options: SelectOption[] = [];
  const req: SubDistrictReq = {
    DistrictID: distId,
  };
  const response = await useRepository().master.subDistrict(req);
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      options = response.apiResponse.Data.map((x) => {
        const options: SelectOption = {
          label: x.Name,
          value: x.ID,
          option: x.ZipCode ?? "",
        };
        return options;
      });
    } else {
      // data not found
    }
  } else {
  }

  return options;
}

const loadZipCode = async (subDistId: string): Promise<string> => {
  let option = "";
  const filter = addrSubDistrict.value.filter((x) => x.value == subDistId);
  if (filter.length > 0) {
    option = filter[0].option ?? "";
  }

  return option;
}

watch(
  () => props.deliveryChanel,
  async () => {
    if (props.deliveryChanel) {
		shippingMethodOption.value = [
          {
            label: props.deliveryChanel[0].Name,
            value: props.deliveryChanel[0].Cost.toString(),
          }
      	]
    }
  }
)

watch(
  () => props.shippingPaperType,
  async () => {
    if (props.shippingPaperType) {
		shippingPaperTypeOption.value = [
          {
            label: 'รับทางไปรษณีย์',
            value: props.shippingPaperType[1].Type,
          },
          {
            label: 'รับที่สาขา',
            value: props.shippingPaperType[0].Type,
          }
      	]
    }
  }
)

watch(
  () => props.paymentFeeLimit,
  async () => {
    if (props.paymentFeeLimit) {
		paymentFeeLimitMin.value = props.paymentFeeLimit[0].Min
    }
  }
)

watch(
  () => props.isSubmit,
  async () => {
    isSubmit.value = props.isSubmit
  }
)

</script>