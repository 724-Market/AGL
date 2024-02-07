<template>
    <div class="navbar-inner">
        <div class="collapse navbar-collapse" id="sidenav-collapse-main">

            <ul class="navbar-nav">
                <li class="nav-item">
                    <NuxtLink class="nav-link active" to="/main" title="หน้าหลัก">
                        <i class="fa-duotone fa-house"></i><span class="nav-link-text">หน้าหลัก</span>
                    </NuxtLink>
                </li>
                <li class="nav-item" style="display: none">
                    <a class="nav-link" href="#" title="แดชบอร์ด">
                        <i class="fa-duotone fa-chart-line"></i><span class="nav-link-text">แดชบอร์ด</span>
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="#menu-order" title="แจ้งงาน" data-bs-toggle="collapse" role="button"
                        aria-expanded="false" aria-controls="menu-order">
                        <i class="fa-duotone fa-memo-circle-check"></i><span class="nav-link-text">แจ้งงาน</span>
                    </a>
                    <div class="collapse show-z" id="menu-order" data-bs-parent="#sidenav-collapse-main">
                        <ul class="nav">
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/order" title="ประวัติการทำรายการ">ประวัติการทำรายการ
                                </NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/order/compulsory/create" title="ทำรายการใหม่">ทำรายการใหม่
                                </NuxtLink>
                            </li>
                            <li class="nav-item" style="display: none">
                                <NuxtLink class="nav-link" to="/order/compulsory/information" title="กรอกข้อมูล">กรอกข้อมูล
                                </NuxtLink>
                            </li>
                            <li class="nav-item" style="display: none">
                                <NuxtLink class="nav-link" to="/order/compulsory/packages" title="เลือกแพ็กเกจ">เลือกแพ็กเกจ
                                </NuxtLink>
                            </li>
                            <li class="nav-item" style="display: none">
                                <NuxtLink class="nav-link" to="/order/compulsory/placeorder" title="คำสั่งซื้อ">คำสั่งซื้อ
                                </NuxtLink>
                            </li>
                            <li class="nav-item" style="display: none">
                                <NuxtLink class="nav-link" to="/order/compulsory/payment" title="วิธีชำระเงิน">วิธีชำระเงิน
                                </NuxtLink>
                            </li>
                            <li class="nav-item" style="display: none">
                                <NuxtLink class="nav-link" to="/order/compulsory/summary" title="สรุปรายการ">สรุปรายการ
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item" style="display: none">
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
                                <NuxtLink class="nav-link" to="/papers" title="ประวัติการแลกกระดาษ">ประวัติการแลกกระดาษ
                                </NuxtLink>
                            </li>
                            <li class="nav-item">
                                <NuxtLink class="nav-link" to="/papers/exchange" title="แลกกระดาษเพิ่ม">แลกกระดาษเพิ่ม
                                </NuxtLink>
                            </li>
                        </ul>
                    </div>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="/users" title="ผู้ช่วย">
                        <i class="fa-duotone fa-users"></i><span class="nav-link-text">ผู้ช่วย</span>
                    </NuxtLink>
                </li>
                <li class="nav-item">
                    <NuxtLink class="nav-link" to="/backend/papers" title="เจ้าหน้าที่">
                        <i class="fa-duotone fa-user-visor"></i><span class="nav-link-text">เจ้าหน้าที่</span>
                    </NuxtLink>
                </li>
            </ul>
        </div>
    </div>
</template>