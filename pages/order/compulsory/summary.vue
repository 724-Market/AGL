<template>
  <NuxtLayout :name="layout">

    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">

      <div class="row">
        <div class="col-lg-7">

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">สรุปข้อมูลประกันภัย</h3>
            </div>

            <div class="card-body">

              <div class="notice-warning">
                <i class="fa-regular fa-circle-info"></i> ข้อมูลมีผลต่อความคุ้มครอง
                กรุณาตรวจสอบความถูกต้องของข้อมูลก่อนชำระเงิน
                <br><b><u>ไม่รับคืนเงินทั้งสิ้น ทุกกรณี</u></b>
              </div>

            </div>

            <div class="accordion" id="accordion-summary">
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panel-summary-1" aria-expanded="true" aria-controls="panel-summary-1">
                    ข้อมูลผู้เอาประกันภัย
                  </button>
                </h3>
                <div id="panel-summary-1" class="accordion-collapse collapse show">
                  <div class="accordion-body">
                    <section class="summary-list">
                      <div class="summary-item">
                        <h4 class="topic">ผู้เอาประกันภัย</h4>
                        <p>นาย ปฐมพงศ์ สังคจิตต์</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">เลขที่บัตรประชาชน</h4>
                        <p>3909900987654</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">วันเดือนปีเกิด</h4>
                        <p>2520-12-03 (45 ปี)</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">อีเมล</h4>
                        <p>p.inhumba@gmail.com</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">เบอร์โทรศัพท์</h4>
                        <p>0890435478</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">ที่อยู่</h4>
                        <p>6/74 หมู่ 4 หมู่บ้านรุ้งตะวัน ตำบลคลองโยง อำเภอพุทธมณฑล จังหวัดนครปฐม 73170</p>
                      </div>

                      <div class="summary-action">
                        <a class="btn" href="#">แก้ไขข้อมูล</a>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panel-summary-2" aria-expanded="false" aria-controls="panel-summary-2">
                    ข้อมูลรถที่ทำประกันภัย
                  </button>
                </h3>
                <div id="panel-summary-2" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <section class="summary-list">
                      <div class="summary-item">
                        <h4 class="topic">รถยนต์</h4>
                        <p>MG รุ่น MG3 รุ่นย่อย D ปี 2018 (สีน้ำเงิน)</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">ลักษณะการใช้งาน</h4>
                        <p>รับจ้าง</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">เลขทะเบียนรถยนต์</h4>
                        <p>7กฮ - 7724 (ป้ายแดง)</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">ทะเบียนจังหวัด</h4>
                        <p>กรุงเทพมหานคร</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">เลขตัวถังรถยนต์</h4>
                        <p>TWG847NFU83</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">เลขเครื่องยนต์</h4>
                        <p>7238GUGDE2358</p>
                      </div>

                      <div class="summary-action">
                        <a class="btn" href="#">แก้ไขข้อมูล</a>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panel-summary-3" aria-expanded="false" aria-controls="panel-summary-3">
                    ข้อมูลประกันภัย
                  </button>
                </h3>
                <div id="panel-summary-3" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <section class="summary-list">
                      <div class="summary-item">
                        <h4 class="topic">บริษัทรับประกันภัย</h4>
                        <p>บริษัท คุ้มภัยประกันภัย จำกัด (มหาชน)</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">ประเภทสินค้า</h4>
                        <p>พ.ร.บ. สำหรับรถยนต์นั่งส่วนบุคคล</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">การซ่อม</h4>
                        <p>ซ่อมห้าง</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">กรมธรรม์คุ้มครอง</h4>
                        <p>01/01/2562 - 01/01/2563 (365 วัน)</p>
                      </div>

                      <div class="summary-action">
                        <a class="btn" href="#">แก้ไขข้อมูล</a>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panel-summary-4" aria-expanded="false" aria-controls="panel-summary-4">
                    ข้อมูลจัดส่งกรมธรรม์
                  </button>
                </h3>
                <div id="panel-summary-4" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <section class="summary-list">
                      <div class="summary-item">
                        <h4 class="topic">วิธีการรับกรมธรรม์</h4>
                        <p>รับกรมธรรม์ตัวจริงทางไปรษณีย์ (DHL Express)</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">อีเมลรับกรมธรรม์</h4>
                        <p>p.inhumba@gmail.com</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">ชื่อผู้รับ</h4>
                        <p>นาย ปฐมพงศ์ สังคจิตต์</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">ที่อยู่จัดส่ง</h4>
                        <p>6/74 หมู่ 4 หมู่บ้านรุ้งตะวัน ตำบลคลองโยง อำเภอพุทธมณฑล จังหวัดนครปฐม 73170</p>
                      </div>

                      <div class="summary-action">
                        <a class="btn" href="#">แก้ไขข้อมูล</a>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h3 class="accordion-header">
                  <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                    data-bs-target="#panel-summary-5" aria-expanded="false" aria-controls="panel-summary-5">
                    ข้อมูลจัดส่งใบกำกับภาษี
                  </button>
                </h3>
                <div id="panel-summary-5" class="accordion-collapse collapse">
                  <div class="accordion-body">
                    <section class="summary-list">
                      <div class="summary-item">
                        <h4 class="topic">ออกใบกำกับภาษีให้</h4>
                        <p>บริษัท 724 มาร์เก็ต จำกัด (สาขาพระรามเก้า 0009)</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">เลขประจำตัวผู้เสียภาษี</h4>
                        <p>3909900987654</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">อีเมล</h4>
                        <p>p.inhumba@gmail.com</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">เบอร์โทรศัพท์</h4>
                        <p>0890435478</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">ที่อยู่</h4>
                        <p>724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">วิธีการรับใบกำกับภาษี</h4>
                        <p>รับกรมธรรม์ตัวจริงทางไปรษณีย์ (DHL Express)</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">ชื่อผู้รับ</h4>
                        <p>นาย ปฐมพงศ์ สังคจิตต์</p>
                      </div>
                      <div class="summary-item">
                        <h4 class="topic">ที่อยู่จัดส่ง</h4>
                        <p>6/74 หมู่ 4 หมู่บ้านรุ้งตะวัน ตำบลคลองโยง อำเภอพุทธมณฑล จังหวัดนครปฐม 73170</p>
                      </div>

                      <div class="summary-action">
                        <a class="btn" href="#">แก้ไขข้อมูล</a>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        <div class="col-lg-5">

          <aside class="card">
            <div class="card-body">

              <div class="status-list">
                <figure class="status-icon">
                  <div class="icon order success"></div>
                </figure>
                <h4 class="title">รายละเอียดคำสั่งซื้อ</h4>
                <div class="status-item text-info text-big">
                  <h5 class="topic">หมายเลขคำสั่งซื้อ</h5>
                  <p>7B2303094767564</p>
                </div>
                <div class="status-item text-success">
                  <h5 class="topic">วันที่ทำรายการ</h5>
                  <p>14 มี.ค. 2566 17:34</p>
                </div>
                <div class="status-item text-danger">
                  <h5 class="topic">ยอดชำระทั้งหมด</h5>
                  <p>8,000.00 บาท</p>
                </div>
                <div class="status-item text-warning">
                  <h5 class="topic">สถานะ</h5>
                  <p>รอชำระเงิน</p>
                </div>
              </div>

              <div class="status-list">
                <figure class="status-icon">
                  <div class="icon qr warning"></div>
                </figure>
                <h4 class="title">ชำระเงินด้วย QR</h4>
                <div class="status-item text-blue text-big">
                  <h5 class="topic">ยอดรวมที่ต้องชำระ</h5>
                  <p>8,000.00 บาท</p>
                </div>

                <div class="status-info">
                  <div class="notice-info">
                    <i class="fa-regular fa-circle-info"></i> ค่าธรรมเนียม 5 บาท
                  </div>
                  <div class="status-action">
                    <a class="btn" href="#" title="เปลี่ยนช่องทางการชำระเงิน">เปลี่ยนช่องทางการชำระเงิน</a>
                  </div>
                </div>
              </div>

              <div class="status-list">
                <figure class="status-icon">
                  <div class="icon cards warning"></div>
                </figure>
                <h4 class="title">ชำระเงินด้วย บัตรเครดิต/บัตรเดบิต</h4>
                <div class="status-item text-blue text-big">
                  <h5 class="topic">ยอดรวมที่ต้องชำระ</h5>
                  <p>8,000.00 บาท</p>
                </div>

                <div class="status-info">
                  <div class="status-action">
                    <a class="btn" href="#" title="เปลี่ยนช่องทางการชำระเงิน">เปลี่ยนช่องทางการชำระเงิน</a>
                  </div>
                </div>
              </div>

              <div class="status-list">
                <figure class="status-icon">
                  <div class="icon pledge danger"></div>
                </figure>
                <h4 class="title">ชำระเงินด้วย วงเงินมัดจำ</h4>
                <div class="status-item text-blue text-big">
                  <h5 class="topic">ยอดรวมที่ต้องชำระ</h5>
                  <p>8,000.00 บาท</p>
                </div>
                <div class="status-item">
                  <h5 class="topic">ยอดเงินในวงเงินมัดจำ</h5>
                  <p>500.00 บาท</p>
                </div>

                <div class="status-info">
                  <div class="notice-danger">
                    <i class="fa-regular fa-circle-xmark"></i> วงเงินมัดจำไม่เพียงพอ
                  </div>
                  <div class="status-action">
                    <a class="btn btn-primary" href="#" title="เติมเงินมัดจำ">เติมเงินมัดจำ</a>
                    <a class="btn" href="#" title="เปลี่ยนช่องทางการชำระเงิน">เปลี่ยนช่องทางการชำระเงิน</a>
                  </div>
                </div>
              </div>

            </div>

            <div class="card-footer">

              <div class="form-hide-label">
                <FormKit type="checkbox" value="pdpa" name="PDPA"
                  label="ยอมรับเงื่อนไขความคุ้มครองและข้อยกเว้นการทำประกัน และรับทราบนโยบายคุ้มครองข้อมูลส่วนบุคคล"
                  validation="required" :validation-messages="{ required: 'กรุณาคลิกยอมรับเงื่อนไขและนโยบายฯ' }" />
              </div>

            </div>
          </aside>

          <FormKit type="submit" label="ไปต่อ" name="order-submit" id="order-submit"
            :classes="{ input: 'btn-primary', outer: 'form-actions' }" :disabled="submitted" :loading="isLoading" />

          <NuxtLink to="payment" class="btn btn-back">ย้อนกลับ</NuxtLink>

        </div>
      </div>

    </FormKit>

  </NuxtLayout>
</template>

<script lang="ts" setup>
// Define import
import { IInformation } from "~~/shared/entities/information-entity";
import { IPackageRequest, IPackageResponse } from "~~/shared/entities/packageList-entity";
// Import store
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStorePackageList } from "~/stores/order/storePackageList";

// using pinia
import { storeToRefs } from "pinia";
import { IChecklist } from "~~/shared/entities/checklist-entity";

// Define Variables
// Loading state after form submiting
const isLoading = ref(false)

// Submitted state after submit
const submitted = ref(false)

// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

const packageList: globalThis.Ref<IPackageResponse[]> = ref([]);
const packageSelect: globalThis.Ref<IPackageResponse | undefined> = ref();
const isSelect: globalThis.Ref<Boolean> = ref(false);

let values = reactive({})

const checklist: globalThis.Ref<IChecklist[]> = ref([
  {
    id: '1',
    className: '',
    desc: 'เลือกช่องทางการชำระเงิน'
  },
  {
    id: '2',
    className: '',
    desc: 'เลือกการใช้ส่วนลด'
  }
])

// Submit form event
const submitOrder = async (formData: any) => {

  // Add waiting time for debug
  await new Promise((r) => setTimeout(r, 1000))

}

// Define layout
const layout = "monito"

// Define meta seo
useHead({
  title: "Compulsory สรุปข้อมูล",
  meta: [{ name: "description", content: "Compulsory สรุปข้อมูล" }],
  bodyAttrs: {
    class: "page-order category-compulsory single-summary",
  },
})
</script>