<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitPackage" :actions="false" id="form-package" form-class="form-order form-theme"
      :incomplete-message="false">

      <div class="row">
        <div class="col col-main">
          <div class="has-sticky">

            <div class="card">
              <div class="card-body">

                <ElementsUtilitiesPackageDetail :planDetail="packageProductPlan" :planBenefit="packageProductBenefit"
                  :planFeature="packageProductFeature" :planSummary="packagePlanSummary"
                  @on-select-package="handleSelectPackage" />

              </div>
            </div>

          </div>
        </div>

        <div class="col col-sidebar">
          <section class="site-sidebar is-sticky">

            <aside class="card">
              <div class="card-header">
                <h3 class="card-title">ช่องทางการชำระเงิน</h3>
              </div>
              <div class="card-body">

                <ElementsFormRadioPaymentMethods />

              </div>
            </aside>

            <FormKit type="submit" label="ชำระเงิน" name="package-submit" id="package-submit"
              :classes="{ input: 'btn-primary', outer: 'form-actions' }" :loading="isLoading" />

            <NuxtLink class="btn-back btn-gray" to="/main">ย้อนกลับ</NuxtLink>

          </section>
        </div>

      </div>

      <ElementsDialogLoading :propsLoading="loadingProps" />

      <ElementsDialogModal :isShowModal="isShowModal" :modal-type="modalType" :modal-title="modalTitle"
        :modal-text="modalText" :modal-button="modalButton" @on-close-modal="handleCloseModal" />

    </FormKit>

  </NuxtLayout>
</template>

<script setup lang="ts">
import settingData from "~/shared/data/setting-data"

const route = useRoute()
const router = useRouter()
const affiliateProductPlanDetails = ref()
const affiliatePaymentType = ref()

const packageProductPlan = ref({})
const packageProductBenefit = ref([])
const packageProductFeature = ref([])
const packagePlanSummary = ref({})

/////////////////////////////////////////
// Loading state after form submiting
const isLoading = ref(false)

/////////////////////////////////////////
// Modal Loading
const loadingProps = ref({})
const openLoadingDialog = (isShowLoading = true, showLogo = false, showText = false) => {
  loadingProps.value = useUtility().createLoadingProps(isShowLoading, showLogo, showText)
}

/////////////////////////////////////////
// Modal Dialog
const isShowModal = ref(false)
const modalType = ref('')
const modalTitle = ref('')
const modalText = ref('')
const modalButton = ref('')
const modalRedirectPath = ref('')

// Function to handle close modal events
const handleCloseModal = async () => {
  if (modalRedirectPath.value) {
    router.push({ path: modalRedirectPath.value })
  }
  else {
    isShowModal.value = false
  }
}

// Function show message modal events
const serverModal = async (serverCheck: any) => {
  isShowModal.value = true
  modalType.value = serverCheck.modalType
  modalTitle.value = serverCheck.modalTitle
  modalText.value = serverCheck.modalText
  modalButton.value = serverCheck.modalButton
}

/////////////////////////////////////////
// Mounted
onMounted(async () => {
  openLoadingDialog(true)
  await loadAffiliateProductPlan()
  openLoadingDialog(false)
})

/////////////////////////////////////////
const loadAffiliateProductPlan = async () => {

  const ProductPlanID = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';

  const affiliateProductPlanlReq = {
    ProductPlanID: ProductPlanID
  }

  const response = await useRepository().affiliate.getAffiliateProductPlan(affiliateProductPlanlReq)
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status == 'pass') {
    affiliateProductPlanDetails.value = response.apiResponse.Data

    packageProductPlan.value = response.apiResponse.Data.ProductPlan[0].Plan
    packageProductBenefit.value = response.apiResponse.Data.ProductPlan[0].Benefit
    packageProductFeature.value = response.apiResponse.Data.ProductPlan[0].Feature
    packagePlanSummary.value = response.apiResponse.Data.PlanSummary

    console.log(packageProductPlan.value)
    console.log(packageProductBenefit.value)
    console.log(packageProductFeature.value)
    console.log(packagePlanSummary.value)
  }
  else {
    router.push("/main")
  }

}

/////////////////////////////////////////
// Submit page
const submitPackage = async () => {

  openLoadingDialog(true)

  const ProductPlanID = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';

  const affiliateProductPlanlReq = {
    ProductPlanID: ProductPlanID
  }

  const response2 = await useRepository().affiliate.getAffiliateProductPlan(affiliateProductPlanlReq)
  const resultCheck2 = useUtility().responseCheck(response2)

  if (resultCheck2.status == 'pass') {

    //affiliateProductPlanDetails.value = response.apiResponse.Data
    if (response2.apiResponse.Data.Order.GrandAmount == 0) {
      affiliatePaymentType.value = 'FREE'
    }
    else {
      affiliatePaymentType.value = 'BILL_PAYMENT'
    }

    const createAffiliateOrderReq = {
      ProductPlanID: ProductPlanID,
      PaymentType: affiliatePaymentType,
      IsReNew: false,
      IsUseRemain: false,
      IsConsent: true
    }

    const response = await useRepository().affiliate.createAffiliateOrder(createAffiliateOrderReq)
    const resultCheck = useUtility().responseCheck(response)

    if (resultCheck.status == 'pass') {

      //console.log(response)
      if (response.apiResponse.Data.PaymentType == 'FREE') {
        router.push({ path: '/payment/affiliate/status-' + response.apiResponse.Data.PaymentNo })
      }
      else {

        const reqGateway = {
          URL: "/payment",
          payment_type: 'bill_payment',
          endpoint_code: "affiliate_payment",
          orderid: response.apiResponse.Data.OrderNo,
          refno: response.apiResponse.Data.PaymentNo,
          expire_type: settingData.paymentGateWayExpireType,
          expire_value: settingData.paymentGateWayExpireValue,
          amount: response.apiResponse.Data.GrandAmount,
        };

        const responseGateway = await useRepository().payment.gateway(reqGateway);

        if (responseGateway.status == "0000") {
          // console.log(responseGateway)
          router.push({ path: '/payment/affiliate/qrcode-' + response.apiResponse.Data.PaymentNo })
        }
        else {
          alert(responseGateway.message)
        }

      }

    }
    else {
      resultCheck.modalType = 'warning'
      resultCheck.modalTitle = 'ไม่สามารถทำรายการได้'
      resultCheck.modalText = 'คุณใช้งานแพ็กเกจนี้อยู่แล้ว'
      resultCheck.modalButton = 'รับทราบ'
      serverModal(resultCheck)
      openLoadingDialog(false)
    }


  }
  else {
    router.push("/main")
  }

}

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = ''
const showPageSteps = false
const showPageHeader = true
const showLogoHeader = false

// Define page meta
const pageTitle = 'เลือกแพ็กเกจ'
const pageCategory = 'แพ็กเกจ'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-main single-package'
  }
})
</script>