<template>
  <NuxtLayout :name="layout">

    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">

      <div class="row">
        <div class="col-lg-7">

          <OrderCompulsoryPaymentMethod></OrderCompulsoryPaymentMethod>

        </div>

        <div class="col-lg-5">

          <aside class="card">
            <div class="card-body">

              <div class="accordion" id="accordion-summary-cart">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#summary-cart" aria-expanded="false"
                      aria-controls="summary-cart">รายการที่เลือก</button>
                  </h2>
                  <div id="summary-cart" class="accordion-collapse collapse" data-bs-parent="#accordion-summary-cart">
                    <div class="accordion-body">

                      <div class="selected-item">
                        <figure class="brand">
                          <i class="fa-duotone fa-car"></i>
                        </figure>

                        <div class="detail">
                          <h4 class="topic">TOYOTA Yaris 1.2 Smart Auto 2019</h4>
                          <div class="info">
                            <p class="description">คุ้มครอง 345 วัน<span>04/05/2566–05/08/2567</span></p>
                          </div>
                        </div>

                        <div class="meta">
                          <div class="tags">
                            <span class="badge"><i class="fa-solid fa-car-circle-bolt"></i>รถให้เช่า</span>
                            <span class="badge-bg-danger"><i class="fa-solid fa-sparkles"></i>ป้ายแดง</span>
                          </div>
                        </div>
                      </div>

                      <div class="selected-item">
                        <figure class="brand">
                          <img src="https://724.co.th/image/logo_insurance_company/logo_TIP.png" alt="">
                        </figure>

                        <div class="detail">
                          <h4 class="topic">พ.ร.บ. สำหรับรถยนต์นั่งส่วนบุคคล</h4>
                          <div class="info">
                            <span class="price">645.21</span>
                            <p class="description">ค่าส่งเสริมการขาย 1,135.49 บาท</p>
                          </div>
                        </div>

                        <div class="meta">
                          <div class="tags">
                            <span class="badge-bg-success"><i class="fa-solid fa-bolt"></i>ได้กรมธรรม์ทันที</span>
                            <span class="badge-secondary"><i
                                class="fa-regular fa-memo-circle-check"></i>พร้อมใบกำกับภาษี</span>
                          </div>
                        </div>
                      </div>

                      <div class="selected-item">
                        <figure class="brand">
                          <i class="fa-duotone fa-file-shield"></i>
                        </figure>

                        <div class="detail">
                          <h4 class="topic">ผู้เอาประกันภัยและกรมธรรม์</h4>
                          <div class="info">
                            <p class="description">นายปฐมพงศ์ สังคจิตต์</p>
                          </div>
                        </div>

                        <div class="meta">
                          <div class="tags">
                            <span class="badge"><i class="fa-solid fa-people-simple"></i>บุคคลธรรมดา</span>
                            <span class="badge-info"><i class="fa-solid fa-truck-fast"></i>จัดส่งตัวจริง</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

              <OrderCart v-if="packageSelect && packageSelect.CompanyName != ''" :is-online="packageSelect.IsOnlineActive"
                :company-name="packageSelect.CompanyName"
                :company-image="getCompanyPath(packageSelect.PackageResult[0].CompanyImage)"
                :price="getCurrency(packageSelect.PackageResult[0].PriceACT)" :price-discount="getCurrency(packageSelect.PackageResult[0].PriceACTDiscount)
                  " :car-name="packageSelect.PackageResult[0].UseCarName" />

            </div>

            <div class="card-body card-table">

              <OrderCompulsoryPaymentSummaryDiscount></OrderCompulsoryPaymentSummaryDiscount>

            </div>

            <OrderChecklist :list="checklist" />

          </aside>

          <FormKit type="submit" label="ไปต่อ" name="order-submit" id="order-submit"
            :classes="{ input: 'btn-primary', outer: 'form-actions' }" :disabled="submitted" :loading="isLoading" />

          <NuxtLink to="packages" class="btn btn-back">ย้อนกลับ</NuxtLink>

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
  title: "Compulsory วิธีชำระเงิน",
  meta: [{ name: "description", content: "Compulsory วิธีชำระเงิน" }],
  bodyAttrs: {
    class: "page-order category-compulsory single-payment",
  },
})
</script>

