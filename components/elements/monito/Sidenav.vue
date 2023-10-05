<template>
    <div class="navbar-inner">
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">

            <ul class="navbar-nav">
                <li class="nav-item">
                    <a class="nav-link" href="#" title="หน้าหลัก">
                        <i class="fa-duotone fa-house"></i><span class="nav-link-text">หน้าหลัก</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#" title="แดชบอร์ด">
                        <i class="fa-duotone fa-chart-line"></i><span class="nav-link-text">แดชบอร์ด</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link active" href="#menu-order" title="แจ้งงาน" data-bs-toggle="collapse" role="button"
                        aria-expanded="true" aria-controls="menu-order">
                        <i class="fa-duotone fa-memo-circle-check"></i><span class="nav-link-text">แจ้งงาน</span>
                    </a>
                    <div class="collapse show" id="menu-order" data-bs-parent="#sidenav-collapse-main">
                        <ul class="nav">
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/order" title="ประวัติการทำรายการ">ประวัติการทำรายการ</NuxtLink>
                                <!-- <a class="nav-link" href="/order" title="ประวัติการทำรายการ">ประวัติการทำรายการ</a> -->
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/order/compulsory/information" title="กรอกข้อมูล">กรอกข้อมูล</NuxtLink>
                                <!-- <a class="nav-link" href="/order/compulsory/information" title="กรอกข้อมูล">กรอกข้อมูล</a> -->
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/order/compulsory/packages" title="เลือกแพ็กเกจ">เลือกแพ็กเกจ</NuxtLink>
                                <!-- <a class="nav-link" href="/order/compulsory/packages" title="เลือกแพ็กเกจ">เลือกแพ็กเกจ</a> -->
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/order/compulsory/placeorder" title="คำสั่งซื้อ">คำสั่งซื้อ</NuxtLink>
                                <!-- <a class="nav-link" href="/order/compulsory/placeorder" title="คำสั่งซื้อ">คำสั่งซื้อ</a> -->
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/order/compulsory/payment" title="วิธีชำระเงิน">วิธีชำระเงิน</NuxtLink>
                                <!-- <a class="nav-link" href="/order/compulsory/payment" title="วิธีชำระเงิน">วิธีชำระเงิน</a> -->
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/order/compulsory/summary" title="สรุปรายการ">สรุปรายการ</NuxtLink>
                                <!-- <a class="nav-link" href="/order/compulsory/summary" title="สรุปรายการ">สรุปรายการ</a> -->
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/page/redirect" title="Redirect">Redirect</NuxtLink>
                                <!-- <a class="nav-link" href="/page/redirect" title="Redirect">Redirect</a> -->
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/payment/qr" title="QR Payment">QR Payment</NuxtLink>
                                <!-- <a class="nav-link" href="/payment/qr" title="QR Payment">QR Payment</a> -->
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/payment/cards" title="บัตรเครดิต/บัตรเดบิต">บัตรเครดิต/บัตรเดบิต</NuxtLink>
                                <!-- <a class="nav-link" href="/payment/cards"
                                    title="บัตรเครดิต/บัตรเดบิต">บัตรเครดิต/บัตรเดบิต</a> -->
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/order/compulsory/thanks" title="Thanks">Thanks</NuxtLink>
                                <!-- <a class="nav-link" href="/order/compulsory/thanks" title="Thanks">Thanks</a> -->
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#menu-wallet" title="เงินมัดจำ" data-bs-toggle="collapse" role="button"
                        aria-expanded="false" aria-controls="menu-wallet">
                        <i class="fa-duotone fa-wallet"></i><span class="nav-link-text">เงินมัดจำ</span>
                    </a>
                    <div class="collapse" id="menu-wallet" data-bs-parent="#sidenav-collapse-main">
                        <ul class="nav">
                            <li class="nav-item">
                                <a class="nav-link" href="#" title="ประวัติการเติมเงิน">ประวัติการเติมเงิน</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="#" title="เติมเงิน">เติมเงิน</a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#menu-papers" title="แลกกระดาษ" data-bs-toggle="collapse" role="button"
                        aria-expanded="false" aria-controls="menu-papers">
                        <i class="fa-duotone fa-scroll fa-swap-opacity"></i><span class="nav-link-text">แลกกระดาษ</span>
                    </a>
                    <div class="collapse" id="menu-papers" data-bs-parent="#sidenav-collapse-main">
                        <ul class="nav">
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/papers" title="ประวัติการแลกกระดาษ">ประวัติการแลกกระดาษ</NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/papers/exchange" title="แลกกระดาษเพิ่ม">แลกกระดาษเพิ่ม</NuxtLink>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="/status" title="ติดตามสถานะ">
                        <i class="fa-duotone fa-timeline fa-rotate-90"></i><span class="nav-link-text">ติดตามสถานะ</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>