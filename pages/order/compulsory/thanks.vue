<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

        <div class="row">
            <div class="col-lg-6">

                <!-- <div class="card">
                    <div class="card-body">

                        <div class="status-list">
                            <figure class="status-icon">
                                <div class="icon check success"></div>
                            </figure>
                            <h4 class="title">ทำรายการสั่งซื้อ<br>และชำระเงินเรียบร้อยแล้ว</h4>
                            <div class="status-item text-info text-big">
                                <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                                <p>7B2303094767564</p>
                            </div>
                            <div class="status-item">
                                <h5 class="topic">วันที่ทำรายการสำเร็จ</h5>
                                <p>14 มี.ค. 2566 17:34</p>
                            </div>
                            <div class="status-item text-warning">
                                <h5 class="topic">สถานะ</h5>
                                <p>กำลังดำเนินการ</p>
                            </div>
                            <div class="status-item">
                                <h5 class="topic">จะได้รับกรมธรรม์</h5>
                                <p>ภายใน 5 นาที</p>
                            </div>

                            <div class="status-info">
                                <div class="callout">
                                    <i class="fa-regular fa-face-smile-hearts fa-beat"></i> 724 ประกันออนไลน์
                                    ขอขอบพระคุณเป็นอย่างสูง ที่ได้เลือก 724 ให้เป็นที่ปรึกษาด้านประกันภัย
                                </div>
                                <div class="status-action">
                                    <a class="btn btn-outline-info" href="#" title="แชร์หน้านี้">แชร์หน้านี้</a>
                                    <a class="btn btn-primary" href="#"
                                        title="ตรวจสอบสถานะสั่งซื้อ">ตรวจสอบสถานะสั่งซื้อ</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div> -->
                <OrderCompulsoryThanksSuccess
                    v-if="status == 'Success'"
                    :notice-payment="noticePaymentInfo"
                ></OrderCompulsoryThanksSuccess>

                <!-- <div class="card">
                    <div class="card-body">

                        <div class="status-list">
                            <figure class="status-icon">
                                <div class="icon cross danger"></div>
                            </figure>
                            <h4 class="title">ทำรายการไม่สำเร็จ</h4>
                            <div class="status-item text-info text-big">
                                <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                                <p>7B2303094767564</p>
                            </div>
                            <div class="status-item">
                                <h5 class="topic">วันที่ทำรายการ</h5>
                                <p>14 มี.ค. 2566 17:34</p>
                            </div>
                            <div class="status-item text-danger">
                                <h5 class="topic">สถานะ</h5>
                                <p>ดำเนินการไม่สำเร็จ</p>
                            </div>
                            <div class="status-item text-danger">
                                <h5 class="topic">จะได้รับกรมธรรม์</h5>
                                <p>ไม่สามารถออกกรมธรรม์ได้</p>
                            </div>

                            <div class="status-info">
                                <div class="notice-danger">
                                    <i class="fa-solid fa-circle-xmark"></i> ธนาคารแจ้งว่าบัตรเครดิตถูกระงับการใช้งาน
                                </div>
                                <div class="status-action">
                                    <a class="btn" href="#" title="เปลี่ยนช่องทางการชำระเงิน">เปลี่ยนช่องทางการชำระเงิน</a>
                                    <a class="btn btn-warning" href="#" title="ติดต่อเจ้าหน้าที่">ติดต่อเจ้าหน้าที่</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div> -->
                <OrderCompulsoryThanksCancel
                    v-if="status == 'Cancel'"
                    :notice-payment="noticePaymentInfo"
                ></OrderCompulsoryThanksCancel>

            </div>

            <div class="col-lg-6">

                <!-- <aside class="card">
                    <div class="card-body">

                        <div class="notice-info">
                            <i class="fa-regular fa-circle-info"></i> หากติดปัญหา หรือไม่ได้รับกรมธรรม์ตามระยะเวลาที่กำหนด
                            กรุณาติดต่อเจ้าหน้าที่
                        </div>

                        <div class="support">
                            <header>
                                <h6 class="topic">ติดต่อเจ้าหน้าที่</h6>
                                <p class="subtopic">เจ้าหน้าที่พร้อมให้บริการที่ไลน์ <a href="https://lin.ee/3sktdef"
                                        rel="noopener" target="_blank" title="@724training">@724training</a> <br>หรือ
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
                </aside> -->
                <OrderCompulsoryThanksContact></OrderCompulsoryThanksContact>

            </div>
        </div>

    </NuxtLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"
import { NoticePaymentData }  from "~/shared/entities/payment-entity"
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStoreNoticePayment } from "~/stores/order/storeNoticePayment"

// Loading state after form submiting
const isLoading = ref(false)

// Submitted state after submit
const submitted = ref(false)

const isError = ref(false);
const messageError = ref("");

// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

let values = reactive({})

const noticePaymentInfo:globalThis.Ref<NoticePaymentData | undefined> = ref()
var status = ref("");

const storeAuth = useStoreUserAuth()
const { AuthenInfo } = storeToRefs(storeAuth)

const noticePayment = useStoreNoticePayment()
const { NoticePaymentInfo } = storeToRefs(noticePayment)

const router = useRouter();

const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    if(NoticePaymentInfo.value) {
        noticePaymentInfo.value = NoticePaymentInfo.value
        status.value = noticePaymentInfo.value.Status
    } else {
        router.push("/order/compulsory/information");
    }
  } else {
    router.push("/login");
  }
})

// Define layout
const layout = 'monito'
const layoutClass = 'page-monito'
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = 'ผลการทำรายการ'
const pageCategory = 'แจ้งงาน พ.ร.บ.'
const pageDescription = ''

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: 'description', content: pageDescription }],
    bodyAttrs: {
        class: 'page-order category-compulsory single-thanks',
    },
})
</script>