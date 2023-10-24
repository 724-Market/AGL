<template>
	<NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
		:show-page-steps="showPageSteps" :show-page-header="showPageHeader">

		<FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
			:incomplete-message="false">

			<div class="row">
				<div class="col">

					<div class="card">
						<div class="card-body">
							<PapersExchangeHowToGetPaper
								@shipping-type-change="onChangeShippingPaperType"
								:delivery-chanel="deliveryChanels"
								:shipping-paper-type="deliveryPaperTypes"
								:payment-fee-limit="paymentFeeLimit"
							></PapersExchangeHowToGetPaper>
						</div>
					</div>

					<div class="card">
						<div class="card-header">
							<h3 class="card-title">เลือกกระดาษ</h3>
						</div>
						<div class="card-body">
							<ElementsFormPaperBranchStock></ElementsFormPaperBranchStock>
						</div>
					</div>

					<PapersExchangeListPapers></PapersExchangeListPapers>

				</div>

				<PapersExchangeSlideBar></PapersExchangeSlideBar>
			</div>

		</FormKit>

		<ElementsDialogPaperstock />

	</NuxtLayout>
</template>

<script setup lang="ts">
import { 
  IDeliveryResponse,
  DeliveryPaperRes
} from "~/shared/entities/delivery-entity";
import { 
  AreaListRes,
  PaymentFeeLimitReq,
  PaymentFeeLimitRes,
  ProductcompanyAreaListReq,
  ProductcompanyAreaListRes,
  ProductsubcategoryAreaListReq,
  ProductsubcategoryAreaListRes,
  WarehouseAreaListReq,
  WarehouseAreaListRes
} from '~/shared/entities/paper-entity';
import { storeToRefs } from "pinia";
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";

const deliveryChanels: globalThis.Ref<IDeliveryResponse[] | undefined> = ref()
const deliveryPaperTypes: globalThis.Ref<DeliveryPaperRes[] | undefined> = ref()
const paymentFeeLimit: globalThis.Ref<PaymentFeeLimitRes[] | undefined> = ref()

const paperAreas: globalThis.Ref<AreaListRes[] | undefined> = ref()
const warehouses: globalThis.Ref<WarehouseAreaListRes[] | undefined> = ref()
const productsubcategorys: globalThis.Ref<ProductsubcategoryAreaListRes[] | undefined> = ref()
const productCompanys: globalThis.Ref<ProductcompanyAreaListRes[] | undefined> = ref()

const storeAuth = useStoreUserAuth()
const { AuthenInfo } = storeToRefs(storeAuth)

const isLoading = ref(true)
const submitted = ref(false)

const statusMessage = ref()
const statusMessageType = ref()

const router = useRouter()

const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
	await loadDeliveryChanel()
	await loadDeliveryPaperType()
  } else {
    router.push("/login")
  }
});

const loadDeliveryChanel = async () => {
  isLoading.value = true;
  var res = await useRepository().delivery.channel();
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      deliveryChanels.value = res.apiResponse.Data
    }
  }
  isLoading.value = false
};

const loadDeliveryPaperType = async () => {
  isLoading.value = true;
  var res = await useRepository().delivery.DeliveryPaperChannel();
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      deliveryPaperTypes.value = res.apiResponse.Data
    }
  }
  isLoading.value = false;
}

const onChangeShippingPaperType = async (deliveryType: string) => {
  isLoading.value = true;
  let req: PaymentFeeLimitReq = {
	DeliveryType: deliveryType
  }
  var res = await useRepository().paper.getPaymentDeliveryFeeLimitReq(req);
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      paymentFeeLimit.value = res.apiResponse.Data
    }
  }
  isLoading.value = false;
}

const loadPaperArea = async () => {
  isLoading.value = true;
  var res = await useRepository().paper.getarea();
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      paperAreas.value = res.apiResponse.Data
      console.log("paperAreas.value", paperAreas.value)
    }
  }
  isLoading.value = false;
}

const onChangePaperArea = async (req: WarehouseAreaListReq) => {
  isLoading.value = true;
  var res = await useRepository().paper.getWarehouseArea(req);
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      warehouses.value = res.apiResponse.Data
    }
  }
  isLoading.value = false;
}

const onChangeWarehouseArea = async (req: ProductsubcategoryAreaListReq) => {
  isLoading.value = true;
  var res = await useRepository().paper.getProductsubcategoryWarehouse(req);
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      productsubcategorys.value = res.apiResponse.Data
    }
  }
  isLoading.value = false;
}

const onChangeProductSubcategory = async (req: ProductcompanyAreaListReq) => {
  isLoading.value = true;
  var res = await useRepository().paper.getProductcompanySubcategory(req);
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      productCompanys.value = res.apiResponse.Data
    }
  }
  isLoading.value = false;
}

// Submit form event
const submitOrder = async () => {
	// Add waiting time for debug
	await new Promise((r) => setTimeout(r, 1000))
}

// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "เลือกกระดาษ"
const pageCategory = "แลกกระดาษ"
const pageDescription = ""

// Define meta seo
useHead({
	title: pageTitle,
	meta: [{ name: "description", content: pageDescription }],
	bodyAttrs: {
		class: "page-papers single-exchange"
	}
})
</script>