<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

        <div class="row">
            <div class="col-lg-7">

                <div class="card payment-card">
                    <div class="card-body">
                        <div class="payment-info">

                            <div class="status-list">
                                <div class="logo">724 Payment</div>
                                <div class="status-item">
                                    <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                                    <p>7B2303094767564</p>
                                </div>
                                <div class="status-item">
                                    <h5 class="topic">จำนวนเงิน</h5>
                                    <p>123.45 บาท</p>
                                </div>
                                <div class="status-item text-warning">
                                    <h5 class="topic">กรุณาชำระภายใน</h5>
                                    <p>14 มี.ค. 2566 17:34 น.</p>
                                </div>
                            </div>

                            <div class="payment-action">
                                <a class="btn-secondary" href="#"
                                    title="ตรวจสอบสถานะการชำระเงิน">ตรวจสอบสถานะการชำระเงิน</a>
                            </div>

                        </div>
                    </div>
                </div>

            </div>

            <div class="col-lg-5">

                <aside class="card">
                    <div class="card-header">
                        <h3 class="card-title">วิธีการชำระเงินด้วย บัตรเครดิต/บัตรเดบิต</h3>
                    </div>

                    <div class="card-body">

                        <div class="procedure d-none">
                            <h4>ขั้นตอนการสแกน QR ที่แนะนำ</h4>
                            <ol>
                                <li>เปิดแอปพลิเคชันธนาคารบนอุปกรณ์ของท่าน</li>
                                <li>ไปยังเมนู “สแกน” หรือ “สแกนจ่าย” จากนั้นให้สแกน QR ที่ปรากฎอยู่บนหน้าจอ</li>
                                <li>ด้วยสอบความถูกต้องและทำรายการต่อไป โดยกรุณาเช็คชื่อบัญชีผู้รับต้องเป็น
                                    <strong>“<u>บริษัท 724 มาร์เก็ต จำกัด</u>”</strong> เท่านั้น
                                </li>
                                <li>หลังจากชำระเงินเสร็จสิ้น ระบบจะนำท่านไปหน้าผลการทำรายการโดยอัตโนมัติ</li>
                            </ol>
                            <h4>หรือ</h4>
                            <ol>
                                <li>คลิกปุ่ม <b>“บันทึก QR”</b> หรือแคปหน้าจอ</li>
                                <li>เปิดแอปพลิเคชันธนาคารบนอุปกรณ์ของท่าน</li>
                                <li>ไปยังเมนู “สแกน” หรือ “สแกนจ่าย” จากนั้นกดปุ่ม “รูปภาพ” เพื่อเลือกรูป QR
                                    ในอุปกรณ์ของท่าน</li>
                                <li>ด้วยสอบความถูกต้องและทำรายการต่อไป โดยกรุณาเช็คชื่อบัญชีผู้รับต้องเป็น
                                    <strong>“<u>บริษัท 724 มาร์เก็ต จำกัด</u>”</strong> เท่านั้น
                                </li>
                                <li>หลังจากชำระเงินเสร็จสิ้น ระบบจะนำท่านไปหน้าผลการทำรายการโดยอัตโนมัติ</li>
                            </ol>
                        </div>

                        <div class="notice-info">
                            <i class="fa-regular fa-circle-info"></i>
                            ระบบไม่มีการเก็บบันทึกข้อมูลบัตรเครดิต/บัตรเดบิตของท่าน มั่นใจได้ในความปลอดภัยตลอดการใช้งาน
                        </div>

                    </div>

                </aside>

            </div>
        </div>

    </NuxtLayout>
</template>

<script setup>
// Define layout
const layout = 'monito'
const layoutClass = 'page-monito'
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = 'ชำระเงินด้วย บัตรเครดิต/บัตรเดบิต'
const pageCategory = 'แจ้งงาน พ.ร.บ.'
const pageDescription = ''

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: 'description', content: pageDescription }],
    bodyAttrs: {
        class: 'category-payment single-cards',
    },
})
</script>