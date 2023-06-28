<template>
  <NuxtLayout :name="layout">

    <div class="row">
      <div class="col">

        <FormKit type="form" @submit="submitSearch" :actions="false" id="form-search" form-class="form-search form-theme"
          #default="{ value }" v-model="values" :incomplete-message="false">

          <div class="card">

            <div class="card-body">

              <div class="notice-info">แสดงผลการค้นหา "0890435478" จากหมายเลขโทรศัพท์ และ "ป้ายแดง", "นครปฐม"
                <button type="button" class="btn-secondary"><i class="fa-solid fa-circle-xmark"></i>
                  ล้างค่าการค้นหา</button>
              </div>

              <div class="search-box">

                <FormKit type="select" label="ค้นหาจาก" name="SearchCategory" placeholder="หมวดหมู่การค้นหา" :options="{
                  tel: 'หมายเลขโทรศัพท์',
                  car: 'ข้อมูลรถ',
                  invoice: 'เลขที่คำสั่งซื้อ'
                }" validation="required" :validation-messages="{ required: 'กรุณาเลือกหมวดหมู่' }" />

                <FormKit type="text" label="คำค้นหา" name="SearchText" placeholder="ระบุคำค้นหา" validation="required"
                  :validation-messages="{
                    required: 'กรุณาใส่คำค้นหา'
                  }" autocomplete="off" />

                <FormKit type="submit" label="ค้นหา" name="search-submit" id="search-submit" :classes="{
                  input: 'btn-primary btn-search',
                  outer: 'form-actions',
                }" :disabled="submitted" :loading="isLoading" />

              </div>

              <div class="accordion search-advance-box" id="accordion-search-advance">
                <div class="accordion-item">
                  <h5 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                      data-bs-target="#panel-search-advance" aria-expanded="false" aria-controls="panel-search-advance">
                      ค้นหาขั้นสูง
                    </button>
                  </h5>
                  <div id="panel-search-advance" class="accordion-collapse collapse">
                    <div class="accordion-body">

                      <div class="advance-section">
                        <div class="section">

                          <FormKit type="checkbox" label="หัวข้อการกรองข้อมูล" name="" :options="{
                            1: '1',
                            2: '2',
                            3: '3',
                          }" />

                        </div>

                        <div class="section">

                          <FormKit type="radio" label="หัวข้อการกรองข้อมูล" name="" :options="{
                            1: '1',
                            2: '2',
                            3: '3',
                          }" />

                        </div>

                        <div class="section">

                          <FormKit type="select" label="จังหวัด" name="" placeholder="ระบุคำค้นหา" :options="{
                            1: '1',
                            2: '2',
                            3: '3'
                          }" />

                          <FormKit type="text" label="รหัสไปรษณีย์" name="" placeholder="ระบุคำค้นหา"
                            autocomplete="off" />

                        </div>

                        <div class="section">

                          <FormKit type="text" label="สถานะ" name="" placeholder="ระบุคำค้นหา" autocomplete="off" />

                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </FormKit>

        <div id="transaction-stats" class="card-stat-stack">

          <div class="card-stat is-active">
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

          <div class="card-stat">
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

          <div class="card-stat is-success is-active">
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
                  <h5 class="topic">ไม่สำเร็จ</h5>
                  <span class="value">2</span>
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

        <div class="card">
          <div class="card-body card-table">

            <table id="datatables" class="table table-transaction nowrap" data-order='[[ 2, "asc" ]]'>
              <thead>
                <tr>
                  <th data-orderable="false"></th>
                  <th data-orderable="false"></th>
                  <th>เลขที่คำสั่งซื้อ</th>
                  <th data-orderable="false">ข้อมูลรถ</th>
                  <th>จำนวนเงิน (บาท)</th>
                  <th data-orderable="false">ผู้เอาประกัน</th>
                  <th data-orderable="false">รายการ</th>
                  <th class="meta-head" data-orderable="false">รูปแบบการทำรายการ</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="dropdown">
                      <a class="btn btn-ellipsis dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"><span class="icon-edit">ทำรายการต่อ</span></a></li>
                        <li><a class="dropdown-item" href="#"><span class="icon-payment">ชำระเงิน</span></a></li>
                        <li><a class="dropdown-item" href="#"><span class="icon-tracking">ติดตามสถานะ</span></a></li>
                        <li><a class="dropdown-item" href="#"><span class="icon-policy">ดูข้อมูลกรมธรรม์</span></a></li>
                        <li>
                          <hr class="dropdown-divider">
                        </li>
                        <li><a class="dropdown-item" href="#"><span class="icon-refund">ยกเลิกและคืนส่วนลด</span></a>
                        </li>
                      </ul>
                    </div>
                  </td>
                  <td class="has-child"></td>
                  <td class="order">#200300033675<time datetime="2023-05-05 08:08">2023-05-05 08:08</time></td>
                  <td class="license">ก-9999 (ป้ายแดง)<span>MG MG3 ปี 2018</span></td>
                  <td class="amount">645.21<span>ส่วนลด 0.00</span></td>
                  <td class="name">ปฐมพงศ์ สังคจิตต์<span>089-xxx-x478</span></td>
                  <td class="description">ประกันภัยชั้น 1 รถยนต์<span>สำหรับรถส่วนบุคคล</span></td>
                  <td>
                    <div class="meta">
                      <span class="badge meta-online" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ online"><em>On</em></span>
                      <span class="badge meta-offline" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ offline"><em>Off</em></span>
                      <span class="badge meta-new" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานใหม่"><em>N</em></span>
                      <span class="badge meta-renew" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานต่ออายุ"><em>R</em></span>
                      <span class="badge meta-company" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทิพยประกันภัย"><em>TIP</em></span>
                      <span class="badge meta-company" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ไทยศรี"><em>ERGO</em></span>
                      <span class="badge meta-product" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="พ.ร.บ."><em>พรบ</em></span>
                      <span class="badge meta-product" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ประกันภัย ประเภท 1"><em>ป.1</em></span>
                      <span class="badge meta-product" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ประกันภัย ประเภท 3+"><em>ป.3+</em></span>
                      <span class="badge meta-qr" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย QR"><em>QR</em></span>
                      <span class="badge meta-card" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย บัตรเครดิต/บัตรเดบิต"><em>บัตรเครดิต/บัตรเดบิต</em></span>
                      <span class="badge meta-installment" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย บัตรเครดิต/บัตรเดบิต ผ่อน 6 เดือน"><em>/ 6</em></span>
                      <span class="badge meta-pledge" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย วงเงินมัดจำ"><em>วงเงินมัดจำ</em></span>
                      <span class="badge meta-fulldiscount" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="หักส่วนลดเต็มจำนวน"><em>หักเต็ม</em></span>
                      <span class="badge meta-partialdiscount" data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip" data-bs-title="หักส่วนลดบางส่วน"><em>หักบางส่วน</em></span>
                      <span class="badge meta-fullpay" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระเบี้ยเต็มจำนวน"><em>จ่ายเต็ม</em></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="dropdown">
                      <a class="btn btn-ellipsis dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"><span class="icon-tracking">ติดตามสถานะ</span></a></li>
                      </ul>
                    </div>
                  </td>
                  <td class="has-child"></td>
                  <td class="order">#200300034435<time datetime="2022-02-05 02:08">2022-02-05 02:08</time></td>
                  <td class="license">นก-9876<span>HONDA BRV ปี 2020</span></td>
                  <td class="amount">645.21<span>ส่วนลด 0.00</span></td>
                  <td class="name">วิทยา อภิมหาบุณย์<span>089-xxx-x464</span></td>
                  <td class="description">ประกันภัยชั้น 3 รถยนต์<span>สำหรับรถรับจ้าง</span></td>
                  <td>
                    <div class="meta">
                      <span class="badge meta-online" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ online"><em>On</em></span>
                      <span class="badge meta-new" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานใหม่"><em>N</em></span>
                      <span class="badge meta-company" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ไทยศรี"><em>ERGO</em></span>
                      <span class="badge meta-product" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="พ.ร.บ."><em>พรบ</em></span>
                      <span class="badge meta-qr" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย QR"><em>QR</em></span>
                      <span class="badge meta-partialdiscount" data-bs-toggle="tooltip"
                        data-bs-custom-class="meta-tooltip" data-bs-title="หักส่วนลดบางส่วน"><em>หักบางส่วน</em></span>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="dropdown">
                      <a class="btn btn-ellipsis dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"><span class="icon-edit">ทำรายการต่อ</span></a></li>
                      </ul>
                    </div>
                  </td>
                  <td></td>
                  <td class="order">#220700017966<time datetime="2023-03-25 10:23">2023-03-25 10:23</time></td>
                  <td class="license">9กต-3420<span>MG MG3 ปี 2018</span></td>
                  <td class="amount">645.21<span>ส่วนลด 93.00</span></td>
                  <td class="name">ปฐมพงศ์ สังคจิตต์<span>089-xxx-x478</span></td>
                  <td class="description">พ.ร.บ. รถยนต์<span>สำหรับรถส่วนบุคคล</span></td>
                  <td>
                    <div class="meta">
                      <span class="badge meta-online" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ online"><em>On</em></span>
                      <span class="badge meta-renew" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานต่ออายุ"><em>R</em></span>
                      <span class="badge meta-company" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ซมโปะประกันภัย"><em>SJNK</em></span>
                      <span class="badge meta-product" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ประกันภัย ประเภท 1"><em>ป.1</em></span>
                      <span class="badge meta-installment" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย บัตรเครดิต/บัตรเดบิต ผ่อน 12 เดือน"><em>/ 12</em></span>
                      <span class="badge meta-fullpay" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระเบี้ยเต็มจำนวน"><em>จ่ายเต็ม</em></span>
                    </div>
                  </td>
                </tr>
                <tr class="is-open">
                  <td>
                    <div class="dropdown">
                      <a class="btn btn-ellipsis dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        <i class="fa-solid fa-ellipsis-vertical"></i>
                      </a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="#"><span class="icon-payment">ชำระเงิน</span></a></li>
                        <li><a class="dropdown-item" href="#"><span class="icon-tracking">ติดตามสถานะ</span></a></li>
                      </ul>
                    </div>
                  </td>
                  <td class="has-child"></td>
                  <td class="order">#210700947101<time datetime="2023-03-25 10:23">2023-04-12 11:06</time></td>
                  <td class="license">4กท-4720<span>TOYOTA INNOVA ปี 2015</span></td>
                  <td class="amount">1,899.25<span>ส่วนลด 245.07</span></td>
                  <td class="name">พัชราภรณ์ โภชนะวนิชย์<span>089-xxx-x077</span></td>
                  <td class="description">พ.ร.บ. รถยนต์<span>สำหรับรถส่วนบุคคล</span></td>
                  <td>
                    <div class="meta">
                      <span class="badge meta-offline" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทำรายการแบบ offline"><em>Off</em></span>
                      <span class="badge meta-renew" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="งานต่ออายุ"><em>R</em></span>
                      <span class="badge meta-company" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ทิพยประกันภัย"><em>TIP</em></span>
                      <span class="badge meta-product" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ประกันภัย ประเภท 3+"><em>ป.3+</em></span>
                      <span class="badge meta-pledge" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="ชำระด้วย วงเงินมัดจำ"><em>วงเงินมัดจำ</em></span>
                      <span class="badge meta-fulldiscount" data-bs-toggle="tooltip" data-bs-custom-class="meta-tooltip"
                        data-bs-title="หักส่วนลดเต็มจำนวน"><em>หักเต็ม</em></span>
                    </div>
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

<script lang="ts" setup>
// Define Variables
// Loading state after form submiting
const isLoading = ref(false)

// Submitted state after submit
const submitted = ref(false)

let values = reactive({})

// Submit form event
const submitSearch = async (formData: any) => {

  // Add waiting time for debug
  await new Promise((r) => setTimeout(r, 1000))

}

// Define layout
const layout = "monito"

// Define meta seo
useHead({
  title: "History ประวัติการทำรายการ",
  meta: [{ name: "description", content: "History ประวัติการทำรายการ" }],
  bodyAttrs: {
    class: "page-history category-datatable single-transaction",
  },
})
</script>