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
              <h4 class="title">ชำระเงินเรียบร้อยแล้ว</h4>
              <div class="status-item text-info text-big">
                <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                <p>{{ paymentInfo.orderid }}</p>
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
                <p>{{ paymentInfo.orderid }}</p>
              </div>
              <div class="status-item">
                <h5 class="topic">จำนวนเงิน</h5>
                <p>{{ useUtility().getCurrency(paymentInfo.amount) }} บาท</p>
              </div>
              <div class="status-item">
                <h5 class="topic">วันที่ทำรายการ</h5>
                <p>{{ useUtility().formatDate(paymentInfo.payment_date, "D MMMM BBBB HH:mm:ss") }}</p>
              </div>
              <div class="status-item text-danger">
                <h5 class="topic">สถานะ</h5>
                <p v-if="paymentInfo.payment_code == 'cancel'">ยกเลิกรายการ</p>
                <p v-else-if="paymentInfo.payment_code == 'expired'">หมดอายุการชำระเงิน</p>
                <p v-else>ดำเนินการไม่สำเร็จ</p>
              </div>
              <div class="status-info">
                <!--
                <div class="notice-danger">
                    <i class="fa-solid fa-circle-xmark"></i> ธนาคารแจ้งว่าบัตรเครดิตถูกระงับการใช้งาน
                </div>
                -->
                <div class="status-action">
                  <NuxtLink class="btn btn-warning">ติดต่อเจ้าหน้าที่</NuxtLink>
                </div>
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
  orderid?: string,
  amount?: Number,
  payment_code?: string,
  payment_date?: string,
}

const paymentInfo = ref<paymentInfoData>({})

const loadPaymentDetail = async () => {

  if (typeof route.params.id === 'string') {

    const reqGateway = {
      URL: "/inquiry",
      refno: route.params.id,
    };

    console.log(route.params.id)
    const responseGateway = await useRepository().payment.paymentGateway(reqGateway);
    console.log(responseGateway.status)

    if(responseGateway.status == "0000" && responseGateway.data.endpoint_code == "affiliate_payment") {

      if(responseGateway.data.payment_status != 'P') {

        paymentInfo.value = {
          payment_status: responseGateway.data.payment_status,
          orderid: responseGateway.data.refno2,
          amount: responseGateway.data.amount,
          payment_code: responseGateway.data.payment_code,
          payment_date: responseGateway.data.payment_date,
        }

      }
      else {
        router.push({ path: '/main' })
      }

    }
    else {
      router.push({ path: '/main' })
    }

  }
  else {
    router.push({ path: '/main' })
  }

}

onMounted(async () => {
  //openLoadingDialog(true)
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