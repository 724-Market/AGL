<template>
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
							<h3>ที่อยู่สำหรับจัดส่ง</h3>
							<div class="form-hide-label">
								<FormKit 
                  type="radio" 
                  label="รายชื่อที่อยู่" 
                  name="PostalAddressPolicy"
                  :options="agentAddress"
                  v-model="agentAddressText"
									options-class="option-block-stack" />
							</div>
							<aside class="new-shipping-address inner-section">
								<h4>ที่อยู่จัดส่งใหม่</h4>
								<div class="row">
									<ElementsFormNewAddress 
										element-key="delivery"
										:prefix="prefix"
										:addr-province="addrProvince"
										:addr-district="addrDistrict"
										:addr-sub-district="addrSubDistrict"
										:addr-zip-code="addrZipCode"
										@change-province="handlerChangeProvince"
										@change-district="handlerChangeDistrict"
										@change-sub-district="handlerChangeSubDistrict"
										@change-full-address="handlerChangeFullAddress"
									/>
								</div>
								<FormKit 
									type="submit" label="บันทึกข้อมูล"
									:classes="{ input: 'btn-primary', outer: 'form-actions' }" 
									:loading="isLoading" 
								/>
							</aside>
						</section>

					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
import { AgentAddressListRes } from "~/shared/entities/agent-entity";
import { 
  IDeliveryResponse,
  DeliveryPaperRes
} from "~/shared/entities/delivery-entity";
import { DistrictReq, PrefixReq, SubDistrictReq } from "~/shared/entities/master-entity";
import { 
  PaymentFeeLimitRes,
  DeliveryAddressReq
} from '~/shared/entities/paper-entity';
import { DefaultAddress } from "~/shared/entities/placeorder-entity";
import { RadioOption, SelectOption } from "~/shared/entities/select-option";

const emit = defineEmits(['shippingTypeChange','changeDeliveryChannel','checkAddress'])

const props = defineProps({ 
	deliveryChanel: Array<IDeliveryResponse>,
	shippingPaperType: Array<DeliveryPaperRes>,
	paymentFeeLimit: Array<PaymentFeeLimitRes>
})

const shippingPaperTypeOption: globalThis.Ref<RadioOption[]> = ref([])
const shippingMethodOption: globalThis.Ref<RadioOption[]> = ref([])

var paymentFeeLimitMin = ref(0)
var shippingPaperText = ref("")
var ShippingMethodText = ref("")
var ShippingFeeText = ref(0)
var isLoading = ref(false)

const agentAddress: globalThis.Ref<RadioOption[]> = ref([]);
var agentAddressText = ref("")
const prefix: globalThis.Ref<SelectOption[]> = ref([]);
const addrProvince: globalThis.Ref<SelectOption[]> = ref([]);
const addrDistrict: globalThis.Ref<SelectOption[]> = ref([]);
const addrSubDistrict: globalThis.Ref<SelectOption[]> = ref([]);
const addrZipCode = ref("");

const newAddressObject: globalThis.Ref<DefaultAddress | undefined> = ref()
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
  await loadAgentAddress();
	await loadPrefix();
	await loadProvince();
})

const onShippingMethodChange = async (event: any) => {
  ShippingFeeText.value = event.target.value
  emit('changeDeliveryChannel',ShippingMethodText.value,ShippingFeeText.value)
}

watch(shippingPaperText, async (newshippingPaperType) => {
	emit('shippingTypeChange', newshippingPaperType)
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

const handleCheckInsuranceRecieve = async () => {
	let address = newAddressObject.value as DeliveryAddressReq
	console.log('address', address)
//   let RecieveObject: InsuranceRecieveObject = {
//     ShippingPolicy: shippingPolicyText.value.toString(),
//     Email: emailValue,
//     PostalDelivary: {
//       IsDeliveryAddressSameAsDefault: postalAddressPolicyText.value == 'insured' ? true : false,
//       ShippingMethod: RecieveShippingMethodText.value,
//       ShippingFee: ShippingFeeText.value,
//       DeliveryAddress: {
//         AddressID: newAddressObject.value?.AddressID ?? '',
//         ReferenceID: newAddressObject.value?.ReferenceID ?? '',
//         ReferenceType: newAddressObject.value?.ReferenceType ?? '',
//         ProvinceID: newAddressObject.value?.ProvinceID ?? '',
//         DistrictID: newAddressObject.value?.DistrictID ?? '',
//         SubDistrictID: newAddressObject.value?.SubDistrictID ?? '',
//         TaxID: newAddressObject.value?.TaxID ?? '',
//         FirstName: newAddressObject.value?.FirstName ?? '',
//         LastName: newAddressObject.value?.LastName ?? '',
//         PhoneNumber: newAddressObject.value?.PhoneNumber ?? '',
//         Email: newAddressObject.value?.Email ?? '',
//         Name: newAddressObject.value?.Name ?? '',
//         Type: newAddressObject.value?.Type ?? '',
//         AddressLine1: newAddressObject.value?.AddressLine1 ?? '',
//         AddressLine2: newAddressObject.value?.AddressLine2 ?? '',
//         AddressText: newAddressObject.value?.AddressText ?? '',
//         No: newAddressObject.value?.No ?? '',
//         Moo: newAddressObject.value?.Moo ?? '',
//         Place: newAddressObject.value?.Place ?? '',
//         Building: newAddressObject.value?.Building ?? '',
//         Floor: newAddressObject.value?.Floor ?? '',
//         Room: newAddressObject.value?.Room ?? '',
//         Branch: newAddressObject.value?.Branch ?? '',
//         Alley: newAddressObject.value?.Alley ?? '',
//         Road: newAddressObject.value?.Road ?? '',
//         ZipCode: newAddressObject.value?.ZipCode ?? '',
//       }
//     }
//   }
//   emit('checkInsuranceRecieve', RecieveObject)
}

const handleSaveAddress = async () => {
  isLoading.value = true;
  // var response = await useRepository().agent.GetAddressList();
  // if (response.apiResponse.Status && response.apiResponse.Status == "200") {
  //   if (response.apiResponse.Data) {
      
  //   }
  // }
  isLoading.value = false;
};

const loadAgentAddress = async () => {
  isLoading.value = true;
  var response = await useRepository().agent.GetAddressList();
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if (response.apiResponse.Data) {
      agentAddress.value = response.apiResponse.Data.map((x) => {
        const options: RadioOption = {
          label: `${x.OwnerFirstName} ${x.OwnerLastName}`,
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
    value: ''
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
      console.log("prefix.value", prefix.value);
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

</script>