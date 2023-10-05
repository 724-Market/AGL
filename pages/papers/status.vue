<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

        <div class="row">

            <div class="col col-main">

                <div class="has-sticky">

                    <div class="card">
                        <div class="card-body">

                            <section class="timeline is-vertical">

                                <div class="timeline-item is-cancel">
                                    <div class="datetime">
                                        <time datetime="2022-02-09 09:30">2022-02-09<span>09:30</span></time>
                                    </div>
                                    <figure class="timeline-icon">
                                        <div class="icon cross"></div>
                                    </figure>
                                    <div class="detail">
                                        <h4 class="title">ยกเลิกการทำรายการ</h4>
                                        <p>ไม่สามารถออกกรมธรรม์ได้ เนื่องจากผิดเงื่อนไข</p>
                                    </div>
                                </div>

                                <div class="timeline-item is-success">
                                    <div class="datetime">
                                        <time datetime="2022-02-09 09:30">2022-02-09<span>09:30</span></time>
                                    </div>
                                    <figure class="timeline-icon">
                                        <div class="icon check"></div>
                                    </figure>
                                    <div class="detail">
                                        <h4 class="title">ได้รับกรมธรรม์</h4>
                                        <p>กรมธรรม์จัดส่งเรียบร้อยแล้ว <a class="action" href="#">กรมธรรม์ TR-4635-453-32-1</a>
                                        </p>
                                    </div>
                                </div>

                                <div class="timeline-item is-admin">
                                    <div class="datetime">
                                        <time datetime="2022-02-08 12:10">2022-02-08<span>12:10</span></time>
                                    </div>
                                    <figure class="timeline-icon">
                                        <div class="icon"></div>
                                    </figure>
                                    <div class="detail">
                                        <p>เจ้าหน้าที่ประสานงานกับบริษัทขนส่ง</p>
                                    </div>
                                </div>

                                <div class="timeline-item">
                                    <div class="datetime">
                                        <time datetime="2022-02-08 10:55">2022-02-08<span>10:55</span></time>
                                    </div>
                                    <figure class="timeline-icon">
                                        <div class="icon delivery"></div>
                                    </figure>
                                    <div class="detail">
                                        <h4 class="title">จัดส่งกรมธรรม์</h4>
                                        <p>โดย DHL Express <a class="action" href="#">TH 453-75648-56</a></p>
                                    </div>
                                </div>

                                <div class="timeline-item is-danger is-current">
                                    <div class="datetime">
                                        <time datetime="2022-02-08 10:55">2022-02-08<span>10:55</span></time>
                                    </div>
                                    <figure class="timeline-icon">
                                        <div class="icon delivery"></div>
                                    </figure>
                                    <div class="detail">
                                        <h4 class="title">จัดส่งกรมธรรม์</h4>
                                        <p>เกิดปัญหาระหว่างจัดส่ง กรุณา <a class="action btn-open-support" href="#" title="ติดต่อเจ้าหน้าที่">ติดต่อเจ้าหน้าที่</a></p>
                                    </div>
                                </div>

                                <div class="timeline-item is-admin is-current">
                                    <div class="datetime">
                                        <time datetime="2022-02-07 12:34">2022-02-07<span>12:34</span></time>
                                    </div>
                                    <figure class="timeline-icon">
                                        <div class="icon"></div>
                                    </figure>
                                    <div class="detail">
                                        <p>เจ้าหน้าที่ประสานงานกับบริษัทประกันภัย</p>
                                    </div>
                                </div>

                                <div class="timeline-item is-warning">
                                    <div class="datetime">
                                        <time datetime="2022-02-06 02:23">2022-02-06<span>02:23</span></time>
                                    </div>
                                    <figure class="timeline-icon">
                                        <div class="icon car-inspect"></div>
                                    </figure>
                                    <div class="detail">
                                        <h4 class="title">ตรวจสภาพรถ</h4>
                                        <p>กำลังนัดหมายเพื่อตรวจสอบสภาพรถ</p>
                                    </div>
                                </div>

                                <div class="timeline-item">
                                    <div class="datetime">
                                        <time datetime="2022-02-05 03:03">2022-02-05<span>03:03</span></time>
                                    </div>
                                    <figure class="timeline-icon">
                                        <div class="icon pledge"></div>
                                    </figure>
                                    <div class="detail">
                                        <h4 class="title">ชำระเงิน</h4>
                                        <p>ผ่านวงเงินมัดจำ 645.21 บาท</p>
                                    </div>
                                </div>

                                <div class="timeline-item">
                                    <div class="datetime">
                                        <time datetime="2022-02-05 02:08">2022-02-05<span>02:08</span></time>
                                    </div>
                                    <figure class="timeline-icon">
                                        <div class="icon purchase-order"></div>
                                    </figure>
                                    <div class="detail">
                                        <h4 class="title">ข้อมูลคำสั่งซื้อ</h4>
                                        <h5 class="subtitle">พ.ร.บ.</h5>
                                        <p>MG รุ่น MG3 รุ่นย่อย D ปี 2018 (สีน้ำเงิน)
                                            <a class="action btn-open-support" href="#" title="ติดต่อเจ้าหน้าที่">ติดต่อเจ้าหน้าที่</a>
                                        </p>
                                    </div>
                                </div>
                            </section>

                        </div>

                    </div>

                </div>

            </div>

            <div class="col col-sidebar">

                <section class="site-sidebar is-sticky">

                    <div class="card">
                        <div class="card-body">

                            <div class="status-list">
                                <figure class="status-icon">
                                    <div class="icon papers success"></div>
                                </figure>
                                <h4 class="title">รายละเอียดคำสั่งซื้อ</h4>
                                <div class="status-item">
                                    <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                                    <p>7B2303094767564</p>
                                </div>
                                <div class="status-item">
                                    <h5 class="topic">วันที่ทำรายการ</h5>
                                    <p>14 มี.ค. 2566 17:34</p>
                                </div>
                                <div class="status-item">
                                    <h5 class="topic">ยอดชำระทั้งหมด</h5>
                                    <p>6,000.00 บาท</p>
                                </div>
                                <div class="status-item text-warning">
                                    <h5 class="topic">สถานะ</h5>
                                    <p>รอชำระเงิน</p>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body card-table">

                            <h5 class="card-title">รายการกระดาษ</h5>

                            <div class="summary-table">
                                <table class="table no-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">รายการกระดาษ</th>
                                            <th scope="col" class="text-center">จำนวน</th>
                                            <th scope="col" class="text-end">ราคามัดจำ (บาท)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="spacer">
                                            <td colspan="3"></td>
                                        </tr>
                                        <tr class="product">
                                            <th scope="row">ราคามัดจำ 500<span>พ.ร.บ. • ทิพยประกันภัย</span></th>
                                            <td class="quantity">X 10</td>
                                            <td class="text-end price">5,000.00</td>
                                        </tr>
                                        <tr class="product">
                                            <th scope="row">ราคามัดจำ 1,000<span>ประเภท • ไทยศรีเออโก้</span></th>
                                            <td class="quantity">X 200</td>
                                            <td class="text-end price">2,000.00</td>
                                        </tr>
                                        <tr class="shipping">
                                            <th scope="row">ค่าจัดส่ง<span>DHL Express</span></th>
                                            <td></td>
                                            <td class="text-end price">50.00</td>
                                        </tr>
                                        <tr class="spacer">
                                            <td colspan="3"></td>
                                        </tr>
                                        <tr class="subtotal">
                                            <th scope="row">รวมราคามัดจำ</th>
                                            <td></td>
                                            <td class="text-end price">7,050.00</td>
                                        </tr>
                                        <tr class="discount">
                                            <th scope="row">หักส่วนลดค่าจัดส่ง<span>แลกกระดาษเกิน 5,000 บาท</span></th>
                                            <td></td>
                                            <td class="text-end price">-50.00</td>
                                        </tr>
                                        <tr class="coupon">
                                            <th scope="row">ใช้คูปองส่วนลด</th>
                                            <td></td>
                                            <td class="text-end price">-1,000.00</td>
                                        </tr>
                                        <tr class="spacer">
                                            <td colspan="3"></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td scope="col">ยอดมัดจำที่ใช้</td>
                                            <td scope="col"></td>
                                            <td scope="col" class="text-end price">6,000.00</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                        </div>
                    </div>

                    <div class="card">
                        <div class="card-body card-table">

                            <h5 class="card-title">รายการกระดาษ</h5>

                            <div class="checked-all">

                                <FormKit type="toggle" label="เตรียมกระดาษครบทั้งหมด" alt-label-position />

                            </div>

                            <div class="summary-table is-admin">
                                <table class="table no-striped">
                                    <thead>
                                        <tr>
                                            <th scope="col">รายการกระดาษ</th>
                                            <th scope="col" class="text-center">จำนวน</th>
                                            <th scope="col" class="text-end">ราคามัดจำ (บาท)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr class="spacer">
                                            <td colspan="3"></td>
                                        </tr>
                                        <tr class="product">
                                            <th scope="row">ราคามัดจำ 100<span>พ.ร.บ. • ทิพยประกันภัย</span>

                                                <FormKit type="toggle" off-value-label="ไม่ครบ" on-value-label="ครบ" />

                                            </th>
                                            <td class="quantity">X 10</td>
                                            <td class="text-end price">1,000.00</td>
                                        </tr>

                                        <tr class="product">
                                            <th scope="row">ราคามัดจำ 1,000<span>ประเภท • ไทยศรีเออโก้</span>

                                                <FormKit type="toggle" off-value-label="ไม่ครบ" on-value-label="ครบ" />

                                            </th>
                                            <td class="quantity">X 200</td>
                                            <td class="text-end price">2,000.00</td>
                                        </tr>

                                        <tr class="product">
                                            <th scope="row">ราคามัดจำ 100<span>ประเภท • วิริยะ</span>

                                                <FormKit type="toggle" off-value-label="ไม่ครบ" on-value-label="ครบ" />

                                            </th>
                                            <td class="quantity">X 2,000</td>
                                            <td class="text-end price">20,000.00</td>
                                        </tr>

                                        <tr class="product">
                                            <th scope="row">ราคามัดจำ 1,000<span>ประเภท • ไทยศรีเออโก้</span>

                                                <FormKit type="toggle" off-value-label="ไม่ครบ" on-value-label="ครบ" />

                                            </th>
                                            <td class="quantity">X 200</td>
                                            <td class="text-end price">2,000.00</td>
                                        </tr>

                                        <tr class="product">
                                            <th scope="row">ราคามัดจำ 500<span>พ.ร.บ. • ทิพยประกันภัย</span>

                                                <FormKit type="toggle" off-value-label="ไม่ครบ" on-value-label="ครบ" />

                                            </th>
                                            <td class="quantity">X 10</td>
                                            <td class="text-end price">5,000.00</td>
                                        </tr>

                                        <tr class="shipping">
                                            <th scope="row">ค่าจัดส่ง<span>DHL Express</span></th>
                                            <td></td>
                                            <td class="text-end price">50.00</td>
                                        </tr>
                                        <tr class="spacer">
                                            <td colspan="3"></td>
                                        </tr>
                                        <tr class="subtotal">
                                            <th scope="row">รวมราคามัดจำ</th>
                                            <td></td>
                                            <td class="text-end price">7,050.00</td>
                                        </tr>
                                        <tr class="discount">
                                            <th scope="row">หักส่วนลดค่าจัดส่ง<span>แลกกระดาษเกิน 5,000 บาท</span></th>
                                            <td></td>
                                            <td class="text-end price">-50.00</td>
                                        </tr>
                                        <tr class="coupon">
                                            <th scope="row">ใช้คูปองส่วนลด</th>
                                            <td></td>
                                            <td class="text-end price">-1,000.00</td>
                                        </tr>
                                        <tr class="spacer">
                                            <td colspan="3"></td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td scope="col">ยอดมัดจำที่ใช้</td>
                                            <td scope="col"></td>
                                            <td scope="col" class="text-end price">6,000.00</td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>

                        </div>

                        <div class="card-footer">

                            <div class="status-action">
                                <button type="button" class="btn-primary">กระดาษครบแล้ว เตรียมจัดส่ง</button>
                                <button type="button" class="btn-white btn-open-papers-cancellation">ยกเลิกรายการ</button>
                            </div>

                        </div>

                    </div>

                </section>

            </div>

        </div>

        <ElementsDialogPaperscancellation />

        <ElementsDialogSupport />

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
const pageTitle = "ติดตามสถานะ"
const pageCategory = "แลกกระดาษ"
const pageDescription = ""

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: "description", content: pageDescription }],
    bodyAttrs: {
        class: "page-papers single-status template-timeline"
    }
})
</script>