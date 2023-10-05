<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

        <div class="row">
            <div class="col-lg-6">

                <div class="card">
                    <div class="card-body">

                        <div class="status-list">
                            <figure class="status-icon">
                                <div class="icon check success"></div>
                            </figure>
                            <h4 class="title">ทำรายการสำเร็จ</h4>
                            <div class="status-item text-info text-big">
                                <h5 class="topic">หมายเลขทำรายการ</h5>
                                <p>7B2303094767564</p>
                            </div>
                            <div class="status-item">
                                <h5 class="topic">วันที่ทำรายการสำเร็จ</h5>
                                <p>14 มี.ค. 2566 17:34</p>
                            </div>
                            <div class="status-item text-warning">
                                <h5 class="topic">สถานะ</h5>
                                <p>รอดำเนินการ</p>
                            </div>

                            <div class="status-info">
                                <div class="status-action">
                                    <NuxtLink class="btn" to="/papers" title="ไปหน้าประวัติการแลกกระดาษ">ไปหน้าประวัติการแลกกระดาษ</NuxtLink>
                                    <NuxtLink class="btn-secondary" to="/papers/status" title="ตรวจสอบสถานะ">ตรวจสอบสถานะ</NuxtLink>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="card">
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
                                <p>ไม่สำเร็จ</p>
                            </div>

                            <div class="status-info">
                                <div class="notice-danger">
                                    <i class="fa-solid fa-circle-xmark"></i> ยอดเงินมัดจำคงเหลือไม่เพียงพอ
                                </div>
                                <div class="status-action">
                                    <NuxtLink class="btn" to="/papers" title="ไปหน้าประวัติการแลกกระดาษ">ไปหน้าประวัติการแลกกระดาษ</NuxtLink>
                                    <NuxtLink class="btn-secondary" to="/papers/exchange" title="ทำรายการอีกครั้ง">ทำรายการอีกครั้ง</NuxtLink>
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
                            <figure class="dialog-icon">
                                <i class="fa-regular fa-messages-question"></i>
                            </figure>
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
                            <a class="btn-success" href="https://lin.ee/3sktdef" rel="noopener" target="_blank"
                                title="เพิ่มเพื่อน"><i class="fa-brands fa-line"></i>เพิ่มเพื่อน</a>
                        </div>

                    </div>
                </aside>

            </div>
        </div>

    </NuxtLayout>
</template>

<script setup>
// Define Variables

// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "ผลการทำรายการ"
const pageCategory = "แลกกระดาษ"
const pageDescription = ""

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: "description", content: pageDescription }],
    bodyAttrs: {
        class: "page-papers single-thanks"
    }
})
</script>