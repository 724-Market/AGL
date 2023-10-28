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
								<FormKit type="radio" label="รายชื่อที่อยู่" name="PostalAddressPolicy"
									options-class="option-block-stack" />
							</div>
							<aside class="new-shipping-address inner-section">
								<h4>ที่อยู่จัดส่งใหม่</h4>
								<div class="row">
									<ElementsFormNewAddress />
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
import { 
  IDeliveryResponse,
  DeliveryPaperRes
} from "~/shared/entities/delivery-entity";
import { 
  PaymentFeeLimitRes
} from '~/shared/entities/paper-entity';
import { RadioOption } from "~/shared/entities/select-option";

const emit = defineEmits(['shippingTypeChange','changeDeliveryChannel'])

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
});

const onShippingMethodChange = async (event: any) => {
  ShippingFeeText.value = event.target.value
  emit('changeDeliveryChannel',ShippingMethodText.value,ShippingFeeText.value)
};

watch(shippingPaperText, async (newshippingPaperType) => {
	emit('shippingTypeChange', newshippingPaperType)
});

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