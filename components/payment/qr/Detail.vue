<template>
    <div class="card-body">
        <div class="qr-payment">
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

            <div class="qr-info">
                <figure class="qr-code">
                    <img src="/uploads/qr.png" alt="">
                </figure>

                <small>0543FRE3GDTEY094767</small>

                <p>หรือคลิกปุ่มเพื่อบันทึก QR ด้านล่าง</p>
                <a class="btn btn-secondary" href="#" title="บันทึก QR"><iclass="fa-solid fa-download"></i>บันทึก QR</a>
            </div>

            <div class="qr-action">
                <a class="btn btn-outline-info" href="#" title="แชร์หน้านี้">แชร์หน้านี้</a>
                <a class="btn" href="#" title="เปลี่ยนช่องทางการชำระเงิน">เปลี่ยนช่องทางการชำระเงิน</a>
            </div>
        </div>
    </div>
    
</template>

<script setup lang="ts">

</script>