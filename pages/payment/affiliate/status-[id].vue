<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">
    <div class="row">
      <div class="col-lg-6">

        <div class="card" v-if="paymentInfo.payment_status == 'S'">
          <div class="card-body">
            <div class="status-list">
              <figure class="status-icon">
                <div class="icon check success"></div>
              </figure>
              <h4 class="title" v-if="paymentInfo.amount > 0">ชำระเงินเรียบร้อยแล้ว</h4>
              <h4 class="title" v-else>ทำรายการเรียบร้อยแล้ว</h4>
              <div class="status-item text-info text-big">
                <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                <p>{{ paymentInfo.order_no }}</p>
              </div>
              <div class="status-item text-info text-big">
                <h5 class="topic">หมายเลขอ้างอิง</h5>
                <p>{{ paymentInfo.payment_no }}</p>
              </div>
              <div class="status-item">
                <h5 class="topic">จำนวนเงิน</h5>
                <p>{{ useUtility().getCurrency(paymentInfo.amount) }} บาท</p>
              </div>
              <div class="status-item">
                <h5 class="topic">วันที่ทำรายการสำเร็จ</h5>
                <p>{{ useUtility().formatDate(paymentInfo.payment_date, "D MMMM BBBB HH:mm:ss") }}</p>
              </div>
              <div class="status-info">
                <div class="callout">
                  <i class="fa-regular fa-face-smile-hearts fa-beat"></i> 724 ประกันออนไลน์
                  ขอขอบพระคุณเป็นอย่างสูง ที่ได้เลือก 724 ให้เป็นที่ปรึกษาด้านประกันภัย
                </div>
                <div class="status-action">
                  <NuxtLink class="btn btn-outline-info" to="/main">กลับสู่หน้าหลัก</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card" v-if="paymentInfo.payment_status == 'C'">
          <div class="card-body">
            <div class="status-list">
              <figure class="status-icon">
                <div class="icon cross danger"></div>
              </figure>
              <h4 class="title">ทำรายการไม่สำเร็จ</h4>
              <div class="status-item text-info text-big">
                <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                <p>{{ paymentInfo.order_no }}</p>
              </div>
              <div class="status-item text-info text-big">
                <h5 class="topic">หมายเลขอ้างอิง</h5>
                <p>{{ paymentInfo.payment_no }}</p>
              </div>
              <div class="status-item">
                <h5 class="topic">จำนวนเงิน</h5>
                <p>{{ useUtility().getCurrency(paymentInfo.amount) }} บาท</p>
              </div>
              <div class="status-item text-danger">
                <h5 class="topic">สถานะ</h5>
                <p>ยกเลิกรายการ</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div class="col-lg-6">

        <aside class="card">
          <div class="card-body">
            <div class="support">
              <header>
                <h6 class="topic">ติดต่อเจ้าหน้าที่</h6>
                <p class="subtopic">เจ้าหน้าที่พร้อมให้บริการที่ไลน์ <a href="https://lin.ee/3sktdef" rel="noopener"
                    target="_blank" title="@724training">@724training</a> <br>หรือ
                  โทรศัพท์ <a href="tel:020266274" title="02-026-6274">02-026-6274</a></p>
              </header>
              <figure class="qr-line">
                <p>สแกน QR เพื่อเพิ่มเพื่อนในไลน์</p>
                <img src="https://qr-official.line.me/gs/M_sqg9780m_GW.png" alt="@724training">
              </figure>
              <span>หรือ</span>
              <p>คลิกปุ่มเพิ่มเพื่อนด้านล่างได้เลย</p>
              <a class="btn btn-success" href="https://lin.ee/3sktdef" rel="noopener" target="_blank"
                title="เพิ่มเพื่อน"><i class="fa-brands fa-line"></i>เพิ่มเพื่อน</a>
            </div>
          </div>
        </aside>

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
  payment_status?: string,
  order_no?: string,
  payment_no?: string,
  amount?: Number,
  payment_code?: string,
  payment_date?: string,
}

const paymentInfo = ref<paymentInfoData>({})

const loadPaymentDetail = async () => {

  if (typeof route.params.id === 'string') {

    const getAffiliatePaymentReq = {
      PaymentNo: route.params.id
    }

    const response = await useRepository().affiliate.getAffiliatePayment(getAffiliatePaymentReq)
    const resultCheck = useUtility().responseCheck(response)

    if (resultCheck.status == 'pass') {

      //console.log(response)
      if(response.apiResponse.Data?.Payment[0].IsSuccess) {  
        paymentInfo.value = {
          payment_status: 'S',
          order_no: response.apiResponse.Data?.Payment[0].OrderNo,
          payment_no: response.apiResponse.Data?.Payment[0].PaymentNo,
          amount: response.apiResponse.Data?.Payment[0].GrandAmount,
          payment_code: '',
          payment_date: response.apiResponse.Data?.Payment[0].PaymentDate,
        }
      }
      else if(response.apiResponse.Data?.Payment[0].IsCancel) {  
        paymentInfo.value = {
          payment_status: 'C',
          order_no: response.apiResponse.Data?.Payment[0].OrderNo,
          payment_no: response.apiResponse.Data?.Payment[0].PaymentNo,
          amount: response.apiResponse.Data?.Payment[0].GrandAmount,
          payment_code: '',
          payment_date: response.apiResponse.Data?.Payment[0].PaymentDate,
        }
      }
      else if(response.apiResponse.Data?.Payment[0].IsPending) {  
        router.push({ path: '/payment/affiliate/qrcode-' + response.apiResponse.Data?.Payment[0].PaymentNo })
      }

      openLoadingDialog(false)

    }
    else {
      return navigateTo('/main')
    }

  }
  else {
    return navigateTo('/main')
  }

}

onMounted(async () => {
  openLoadingDialog(true)
  await loadPaymentDetail()
})

// Define layout
const layout = "monito";
const layoutClass = "page-monito";
const showPageSteps = false;
const showPageHeader = true;

// Define page meta
const pageTitle = "ชำระเงินด้วย QR";
const pageCategory = "สมาชิก Affiliate";
const pageDescription = "";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-order category-compulsory single-thanks",
  },
});
</script>