<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader">
        <div class="row">
            <div class="col">

                <div id="transaction-stats" class="card-stat-stack">
                    <OrderHistoryCardsUsers />
                </div>

                <div class="card">
                    <div class="card-body card-table">

                        <table id="datatables" class="table table-transaction nowrap" data-order='[[ 1, "asc" ]]'>
                            <thead>
                                <tr>
                                    <th data-orderable="false"></th>
                                    <th>วันที่สร้าง</th>
                                    <th>ชื่อผู้ใช้งาน</th>
                                    <th>ชื่อผู้ช่วย</th>
                                    <th>สาขา</th>
                                    <th class="limit">วงเงินต่อวัน (บาท)</th>
                                    <th>สถานะ</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td>
                                        <div class="dropdown">
                                            <a class="btn btn-actions dropdown-toggle" href="#" role="button"
                                                title="เครื่องมือจัดการเพิ่มเติม" data-bs-toggle="dropdown"
                                                aria-expanded="false"><i class="fa-solid fa-ellipsis-vertical"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><span
                                                            class="icon-edit">แก้ไขข้อมูล</span></a></li>
                                                <li><a class="dropdown-item" href="#"><span
                                                            class="icon-tracking">ดูประวัติ</span></a></li>
                                                <li>
                                                    <hr class="dropdown-divider">
                                                </li>
                                                <li><a class="dropdown-item" href="#"><span
                                                            class="icon-trash">ลบผู้ช่วยนี้</span></a></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="created"><time datetime="2023-05-05 08:08">2023-05-05 08:08</time></td>
                                    <td class="username">M0001</td>
                                    <td class="name">วิทยา อภิมหาบุณย์<span>089-xxx-x464</span></td>
                                    <td class="tags">บางบอน</td>
                                    <td class="limit">2,000</td>
                                    <td class="status">
                                        <FormKit type="toggle" name="toggle" on-value="active" off-value="inactive"
                                            value="inactive" />
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div class="dropdown">
                                            <a class="btn btn-actions dropdown-toggle" href="#" role="button"
                                                title="เครื่องมือจัดการเพิ่มเติม" data-bs-toggle="dropdown"
                                                aria-expanded="false"><i class="fa-solid fa-ellipsis-vertical"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><span
                                                            class="icon-edit">แก้ไขข้อมูล</span></a></li>
                                                <li><a class="dropdown-item" href="#"><span
                                                            class="icon-tracking">ดูประวัติ</span></a></li>
                                                <li>
                                                    <hr class="dropdown-divider">
                                                </li>
                                                <li><a class="dropdown-item" href="#"><span
                                                            class="icon-trash">ลบผู้ช่วยนี้</span></a></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="created"><time datetime="2023-04-12 11:06">2023-04-12 11:06</time></td>
                                    <td class="username">M0002</td>
                                    <td class="name">พัชราภรณ์ โภชนะวนิชย์<span>089-xxx-x077</span></td>
                                    <td class="tags">สยามเซ็นเตอร์</td>
                                    <td class="limit">20,000</td>
                                    <td class="status">
                                        <FormKit type="toggle" name="toggle" on-value="active" off-value="inactive"
                                            value="active" />
                                    </td>
                                </tr>

                                <tr>
                                    <td>
                                        <div class="dropdown">
                                            <a class="btn btn-actions dropdown-toggle" href="#" role="button"
                                                title="เครื่องมือจัดการเพิ่มเติม" data-bs-toggle="dropdown"
                                                aria-expanded="false"><i class="fa-solid fa-ellipsis-vertical"></i></a>
                                            <ul class="dropdown-menu">
                                                <li><a class="dropdown-item" href="#"><span
                                                            class="icon-edit">แก้ไขข้อมูล</span></a></li>
                                                <li><a class="dropdown-item" href="#"><span
                                                            class="icon-tracking">ดูประวัติ</span></a></li>
                                                <li>
                                                    <hr class="dropdown-divider">
                                                </li>
                                                <li><a class="dropdown-item" href="#"><span
                                                            class="icon-trash">ลบผู้ช่วยนี้</span></a></li>
                                            </ul>
                                        </div>
                                    </td>
                                    <td class="created"><time datetime="2023-04-15 10:23">2023-04-15 10:23</time></td>
                                    <td class="username">M0004</td>
                                    <td class="name">ปฐมพงศ์ สังคจิตต์<span>089-xxx-x478</span></td>
                                    <td class="tags">พระรามเก้า</td>
                                    <td class="limit">200</td>
                                    <td class="status">
                                        <FormKit type="toggle" name="toggle" on-value="active" off-value="inactive"
                                            value="active" />
                                    </td>
                                </tr>

                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </div>

    </NuxtLayout>
</template>

<script setup>
// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true
// Define page meta
const pageTitle = "ผู้ช่วย"
const pageCategory = "รายชื่อผู้ช่วย"
const pageDescription = ""
// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: "description", content: pageDescription }],
    bodyAttrs: {
        class: "page-users single-history template-datatable"
    }
})
</script>