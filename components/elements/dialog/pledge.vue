<template>
  <Teleport to="body">
    <dialog id="wallet-dialog">
      <div class="dialog-card">
        <div class="card-header">
          <button class="btn btn-close btn-close-wallet">ปิด</button>
        </div>

        <div class="card-body pledge-step-1 is-active">
          <FormKit type="form" @submit="submitPledge" :actions="false" id="form-pledge"
            form-class="form-pledge form-theme" #default="{ value }" v-model="values" :incomplete-message="false">

            <figure class="dialog-icon"><i class="fa-regular fa-wallet"></i></figure>

            <h5>กรอกจำนวนเงินที่ต้องการเติม</h5>
            <div class="form-hide-label topup-value">
              <FormKit type="number" label="จำนวนเงินที่ต้องการเติม" name="amount" inputmode="numeric"
                validation="required|number|min:100|max:1000000" :validation-messages="{
                  required: 'กรุณากรอกจำนวนเงิน',
                  number: 'กรุณากรอกเป็นตัวเลขเท่านั้น',
                  min: 'ขั้นต่ำ 100 บาท',
                  max: 'สูงสุดไม่เกิน 1,000,000 บาท'
                }" step="1" autocomplete="off" />
            </div>
            <div class="topup">
              <button>100</button>
              <button>300</button>
              <button>500</button>
              <button>1,000</button>
              <button>1,500</button>
              <button>2,000</button>
              <small>ขั้นต่ำ 100 บาท สูงสุดไม่เกิน 1,000,000 บาท</small>
            </div>

            <h5>เลือกช่องทางการชำระเงิน</h5>
            <div class="form-hide-label payment-choice">
              <ElementsFormRadioPledgeMethods />
            </div>
            <div class="notice-info">มีค่าธรรมเนียม 3 บาท<br>(ยกเว้นค่าธรรมเนียม เมื่อเติมเงิน 20,000 บาทขึ้นไป)
            </div>

            <div class="form-hide-label accept-box">
              <FormKit type="checkbox" value="accept" name="terms-conditions"
                label="ข้าพเจ้าเข้าใจข้อกำหนดและยอมรับเงื่อนไขต่างๆ และตกลงยอมรับผูกพันตามข้อกำหนด" validation="required"
                :validation-messages="{ required: 'กรุณาคลิกยอมรับข้อกำหนดและเงื่อนไข' }" />
            </div>

            <FormKit type="submit" label="ยืนยันการเติมเงิน" name="pledge-submit" id="pledge-submit" :classes="{
              input: 'btn-primary btn-accept',
              outer: 'pledge-action',
            }" :disabled="isLoading" :loading="isLoading" />

          </FormKit>
        </div>

        <div class="card-body pledge-step-2 is-active">
          <div class="payment-info">
            <div class="status-list">
              <div class="logo">724 Payment</div>
              <div class="status-item">
                <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                <p>7B2303094767564</p>
              </div>
              <div class="status-item">
                <h5 class="topic">จำนวนเงินที่ต้องชำระ</h5>
                <p>1,000 บาท</p>
              </div>
              <div class="status-item">
                <h5 class="topic">มีค่าธรรมเนียม</h5>
                <p>3 บาท</p>
              </div>
              <div class="status-item">
                <h5 class="topic">ยอดเงินเติมที่สามารถใช้ได้</h5>
                <p>997 บาท</p>
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
              <a class="btn btn-secondary" href="#" title="บันทึก QR"><i class="fa-solid fa-download"></i>บันทึก
                QR</a>
            </div>
          </div>
        </div>

        <div class="card-body pledge-step-3 is-active">
          <div class="status-list">
            <figure class="status-icon">
              <div class="icon check success"></div>
            </figure>
            <h4 class="title">ชำระเงินสำเร็จแล้ว</h4>
            <div class="status-item">
              <h5 class="topic">หมายเลขทำรายการ</h5>
              <p>7B2303094767564</p>
            </div>
            <div class="status-item">
              <h5 class="topic">จำนวนเงิน</h5>
              <p>1,000 บาท</p>
            </div>
            <div class="status-item">
              <h5 class="topic">วันที่ทำรายการสำเร็จ</h5>
              <p>14 มี.ค. 2566 17:34</p>
            </div>
            <div class="status-item text-success">
              <h5 class="topic">สถานะ</h5>
              <p>ทำรายการสำเร็จ</p>
            </div>
            <div class="status-info">
              <div class="status-action">
                <a class="btn btn-close-wallet" href="#" title="ปิดหน้าต่างนี้">ปิดหน้าต่างนี้</a>
              </div>
            </div>
          </div>

          <div class="status-list">
            <figure class="status-icon">
              <div class="icon cross danger"></div>
            </figure>
            <h4 class="title">ชำระเงินไม่สำเร็จ</h4>
            <div class="status-item">
              <h5 class="topic">หมายเลขทำรายการ</h5>
              <p>7B2303094767564</p>
            </div>
            <div class="status-item">
              <h5 class="topic">จำนวนเงิน</h5>
              <p>1,000 บาท</p>
            </div>
            <div class="status-item text-danger">
              <h5 class="topic">สถานะ</h5>
              <p>ทำรายการไม่สำเร็จ</p>
            </div>
            <div class="status-info">
              <div class="status-action">
                <a class="btn btn-close-wallet" href="#" title="ทำรายการใหม่">ทำรายการใหม่</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </Teleport>
</template>

<script setup>
// Loading state after form submiting
const isLoading = ref(false);

// Submitted state after submit
const submitted = ref(false);

// Submit form event
const submitPledge = async (formData) => {
  // Add waiting time for debug
  await new Promise((r) => setTimeout(r, 1000))
}

onMounted(() => {
  const dialogWallet = document.getElementById('wallet-dialog')
  const openDialogWallet = document.querySelector('.btn-open-wallet')
  const closeDialogWallet = document.querySelectorAll('.btn-close-wallet')

  openDialogWallet.addEventListener('click', showDialogWallet)
  closeDialogWallet.forEach(function (closeItem) {
    closeItem.addEventListener('click', hiddenDialogWallet)
  })

  function showDialogWallet() {
    dialogWallet.showModal()
  }

  function hiddenDialogWallet() {
    dialogWallet.close()
  }
})
</script>