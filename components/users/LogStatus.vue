<template>
    <aside class="card">
        <div class="card-body">
            <div class="status-list">
                <figure class="status-icon">
                    <div class="icon user success"></div>
                </figure>
                <h4 class="title">บันทึกรายการผู้ช่วย</h4>
                <div class="status-item">
                    <h5 class="topic">ชื่อผู้ใช้งาน</h5>
                    <p>M2312000087</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">วันที่สร้าง</h5>
                    <p>14 มี.ค. 2566 17:34</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">สร้างโดย</h5>
                    <p>ABCDEFG</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">อัปเดตข้อมูลเมื่อ</h5>
                    <p>25 มี.ค. 2566 11:14</p>
                </div>
                <div class="status-item">
                    <h5 class="topic">วงเงินต่อวัน</h5>
                    <p>10,000.00 บาท</p>
                </div>
                <div class="status-item text-success">
                    <h5 class="topic">สถานะ</h5>
                    <p>เปิดการใช้งาน</p>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <div class="user-toggle-status">
                <FormKit type="toggle" on-value="active" off-value="inactive" off-value-label="ปิดการใช้งาน" on-value-label="เปิดการใช้งาน" />
            </div>
        </div>
    </aside>
</template>