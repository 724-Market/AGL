<template>
  <NuxtLayout
    :name="layout"
    :layout-class="layoutClass"
    :page-title="pageTitle"
    :page-category="pageCategory"
    :show-page-steps="showPageSteps"
    :show-page-header="showPageHeader"
  >
    <div class="row">
      <div class="col-lg-7">
        <div class="card payment-card">
          <div class="card-body">
            <PaymentQrFormDetail :payment-info="paymentInfo"></PaymentQrFormDetail>
          </div>
        </div>
      </div>
      <div class="col-lg-5">
        <PaymentQrMethod></PaymentQrMethod>
      </div>
    </div>

    <ElementsDialogLoading :propsLoading="loadingProps" />

  </NuxtLayout>
</template>

<script lang="ts" setup>

/////////////////////////////////////////
// Define router and route
const router = useRouter()
const route = useRoute()

/////////////////////////////////////////
// Modal Loading
const loadingProps = ref({})
const openLoadingDialog = (isShowLoading = true, showLogo = false, showText = false) => {
  loadingProps.value = useUtility().createLoadingProps(isShowLoading, showLogo, showText)
}

interface paymentInfoData {
  orderid?: string, 
  amount?: Number, 
  payment_expired?: string,
  payment_qr?: string,
  refno1?: string,
}

const paymentInfo = ref<paymentInfoData>({})

const loadPaymentDetail = async () => {

  const getAffiliatePaymentReq = {
    PaymentNo: route.params.id
  }

  const response = await useRepository().affiliate.getAffiliatePayment(getAffiliatePaymentReq)
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status == 'pass') {
    if(response.apiResponse.Data?.Payment[0].IsPending) {

      const reqGateway = {
        URL: "/inquiry",
        refno: route.params.id,
      };

      const responseGateway = await useRepository().payment.paymentGateway(reqGateway);
      //console.log(responseGateway)

      if(responseGateway.status == "0000" && responseGateway.data.endpoint_code == "affiliate_payment") {

        if(responseGateway.data.payment_status == 'P') {

          paymentInfo.value = {
            orderid: responseGateway.data.refno2,
            amount: responseGateway.data.amount,
            payment_expired: responseGateway.data.payment_expired,
            payment_qr: responseGateway.data.payment_qr,
            refno1: responseGateway.data.refno1,
          }

          openLoadingDialog(false)

        }
        else {
          router.push({ path: '/payment/affiliate/status-' + responseGateway.data.refno2 })
        }

      }
      else {
        return navigateTo('/main')
      }

    }
    else {
      router.push({ path: '/payment/affiliate/status-' + response.apiResponse.Data?.Payment[0].PaymentNo })
    }
  }
  else {
    return navigateTo('/main')
  }

}

onMounted(async () => {
  openLoadingDialog(true)
  await loadPaymentDetail()
  //openLoadingDialog(false)
})

// Define layout
const layout = "monito";
const layoutClass = "page-monito";
const showPageSteps = false;
const showPageHeader = true;

// Define page meta
const pageTitle = "ชำระเงินด้วย QR";
const pageCategory = "แจ้งงาน พ.ร.บ.";
const pageDescription = "";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "category-payment single-qr",
  },
});
</script>
