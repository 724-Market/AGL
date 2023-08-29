<template>
    <div id="transaction-stats" class="card-stat-stack">

        <div class="card-stat">
            <a href="#" title="แบบร่าง">
            <div class="stat-wrapper">
                <div class="stat-header">
                <h5 class="topic">แบบร่าง</h5>
                <span class="value">7</span>
                </div>
                <div class="stat-action">
                <figure class="figure">
                    <i class="fa-duotone fa-file-pen fa-swap-opacity"></i>
                </figure>
                </div>
            </div>
            </a>
        </div>

        <div class="card-stat is-active">
            <a href="#" title="รอชำระเงิน">
            <div class="stat-wrapper">
                <div class="stat-header">
                <h5 class="topic">รอชำระเงิน</h5>
                <span class="value">4,321</span>
                </div>
                <div class="stat-action">
                <figure class="figure">
                    <i class="fa-duotone fa-hourglass-clock fa-swap-opacity"></i>
                </figure>
                </div>
            </div>
            </a>
        </div>

        <div class="card-stat">
            <a href="#" title="รับแจ้งงาน">
            <div class="stat-wrapper">
                <div class="stat-header">
                <h5 class="topic">รับแจ้งงาน</h5>
                <span class="value">26</span>
                </div>
                <div class="stat-action">
                <figure class="figure">
                    <i class="fa-duotone fa-memo-circle-info fa-swap-opacity"></i>
                </figure>
                </div>
            </div>
            </a>
        </div>

        <div class="card-stat">
            <a href="#" title="กำลังจัดส่ง">
            <div class="stat-wrapper">
                <div class="stat-header">
                <h5 class="topic">กำลังจัดส่ง</h5>
                <span class="value">5</span>
                </div>
                <div class="stat-action">
                <figure class="figure">
                    <i class="fa-duotone fa-truck-fast"></i>
                </figure>
                </div>
            </div>
            </a>
        </div>

        <div class="card-stat is-success">
            <a href="#" title="สำเร็จ">
            <div class="stat-wrapper has-compare">
                <div class="stat-header">
                <h5 class="topic">สำเร็จ</h5>
                <span class="value">28,439</span>
                </div>
                <div class="stat-action">
                <figure class="figure">
                    <i class="fa-solid fa-check fa-lg"></i>
                </figure>
                </div>
                <div class="stat-info">
                <p class="is-up"><span>3.24%</span>เทียบกับ 30 วันล่าสุด</p>
                </div>
            </div>
            </a>
        </div>

        <div class="card-stat is-danger">
            <a href="#" title="ไม่สำเร็จ">
            <div class="stat-wrapper has-compare">
                <div class="stat-header">
                <h5 class="topic">ไม่สำเร็จ<span class="badge-navy" data-bs-toggle="tooltip"
                    data-bs-custom-class="meta-tooltip"
                    data-bs-title="A/B<br>A คือ งานที่ไม่สมบูรณ์ สามารถทำการคืนเงินได้<br>B คือ งานที่ไม่สำเร็จ"
                    data-bs-html="true"><i class="fa-solid fa-circle-question"></i></span></h5>
                <span class="value">2<small>/6</small></span>
                </div>
                <div class="stat-action">
                <figure class="figure">
                    <i class="fa-solid fa-xmark-large"></i>
                </figure>
                </div>
                <div class="stat-info">
                <p class="is-down"><span>1.95%</span>เทียบกับ 30 วันล่าสุด</p>
                </div>
            </div>
            </a>
        </div>

    </div>
</template>

<script setup lang="ts">

</script>