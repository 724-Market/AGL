<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <div class="row">
      <div class="col col-main">

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">รายละเอียด แพ็คเกจที่เลือก</h3>
          </div>
          <div class="card-body">

              <div v-for="(value, key) in affiliateProductPlanDetails" :key="key">
                {{ key }} : {{ value }}
              </div>

              <br><br>

              <div>
                <button type="button" class="btn-info" @click="create_order()">ชำระเงิน</button>
              </div>

          </div>
        </div>

      </div>
    </div>

    <ElementsDialogLoading :propsLoading="loadingProps" />

    <ElementsDialogModal :isShowModal="isShowModal" :modal-type="modalType" :modal-title="modalTitle"
      :modal-text="modalText" :modal-button="modalButton" @on-close-modal="handleCloseModal" />

  </NuxtLayout>
</template>

<script setup>

import settingData from "~/shared/data/setting-data";

const route = useRoute()
const router = useRouter();
const affiliateProductPlanDetails = ref()
const AgentInfo = useUtility().getSession('AgentInfo') 

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

// Function to handle close modal events
const handleCloseModal = async () => {
  isShowModal.value = false
}

onMounted(async () => {
  openLoadingDialog(true)
  await loadAffiliateProductPlan()
  openLoadingDialog(false)
})

const loadAffiliateProductPlan = async () => {

  const ProductPlanID = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';

  const affiliateProductPlanlReq = {
    ProductPlanID: ProductPlanID,
    AgentID: AgentInfo.AgentProfile.AgentID
  }

  const response = await useRepository().affiliate.getAffiliateProductPlan(affiliateProductPlanlReq)
  const resultCheck = useUtility().responseCheck(response)

  if(resultCheck.status == 'pass') {
    affiliateProductPlanDetails.value = response.apiResponse.Data
  }
  else {
    router.push("/main")
  }

}

const create_order = async () => {

  openLoadingDialog(true)
  
  const ProductPlanID = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? '';
  
  const createAffiliateOrderReq = {
    ProductPlanID: ProductPlanID,
    PaymentType: "BILL_PAYMENT", 
    IsReNew: false, 
    IsUseRemain: false, 
    IsConsent: true 
  }

  const response = await useRepository().affiliate.createAffiliateOrder(createAffiliateOrderReq)
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status == 'pass') {

    console.log(response)

    const reqGateway = {
      URL: '',
      payment_type: 'bill_payment',
      endpoint_code: "affiliate_payment",
      orderid: response.apiResponse.Data.OrderNo,
      refno: response.apiResponse.Data.PaymentNo,
      expire_type: settingData.paymentGateWayExpireType,
      expire_value: settingData.paymentGateWayExpireValue,
      amount: response.apiResponse.Data.GrandAmount,
    };

    const responseGateway = await useRepository().payment.gateway(reqGateway);

    if(responseGateway.status == "0000") {
      // console.log(responseGateway)
      router.push({ path: '/payment/affiliate-qrcode/' + response.apiResponse.Data.PaymentNo })
    } 
    else {
      alert(responseGateway.message)
    }

  }
  else {
    alert('ไม่สามารถทำรายการได้')
    openLoadingDialog(false)
  }

}

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = ''
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = false

// Define page meta
const pageTitle = 'หน้าหลัก'
const pageCategory = 'หน้าหลัก'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-main single-main'
  }
})
</script>