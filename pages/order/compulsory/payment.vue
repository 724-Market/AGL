<template>
  <NuxtLayout :name="layout">

    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">

      <div class="row">
        <div class="col-lg-8 col-xl-9">

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">วิธีการชำระเงิน</h3>
            </div>
            <div class="card-body">

              <section class="payment-methods">

                <ElementsFormRadioPaymentMethods />

              </section>

              <section class="discount-methods">

                <ElementsFormRadioDiscountMethods />

              </section>

              <section class="custom-discount inner-section">
                <h5 class="discount-text">ส่วนลดที่สามารถใช้ได้ 160 บาท</h5>

                <div class="discount-range">

                  <div class="prefix">0 บาท</div>

                  <FormKit type="range" label="ใช้ส่วนลด" min="0" max="160" step="0.01" value="0" tooltip="true" />

                  <div class="suffix">160 บาท</div>

                </div>

              </section>

            </div>
          </div>

        </div>

        <div class="col-lg-4 col-xl-3">

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

            <div class="card-body">

              <div class="card-table summary-table">
                <table class="table no-striped">
                  <thead>
                    <tr>
                      <th scope="col">รายการ</th>
                      <th scope="col" class="text-end">ราคา (บาท)</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr class="spacer">
                      <td colspan="2"></td>
                    </tr>
                    <tr class="product">
                      <th scope="row">พ.ร.บ. สำหรับรถยนต์นั่งส่วนบุคคล<span>พ.ร.บ. • ทิพยประกันภัย</span></th>
                      <td class="text-end price">645.21</td>
                    </tr>
                    <tr class="product">
                      <th scope="row">Family Man<span>ประกันภัยรถยนต์ ชั้น 1 • กรุงเทพประกันภัย</span></th>
                      <td class="text-end price">7,500.00</td>
                    </tr>
                    <tr class="shipping">
                      <th scope="row">ค่าจัดส่ง<span>กรมธรรม์ + ใบกำกับภาษี • โดย DHL Express</span></th>
                      <td class="text-end price">50.00</td>
                    </tr>
                    <tr class="fee">
                      <th scope="row">ค่าธรรมเนียม<span>บัตรเครดิต/บัตรเดบิต</span></th>
                      <td class="text-end price">15.32</td>
                    </tr>
                    <tr class="spacer">
                      <td colspan="2"></td>
                    </tr>
                    <tr class="subtotal">
                      <th scope="row">รวมราคา</th>
                      <td class="text-end price">8,210.53</td>
                    </tr>
                    <tr class="discount">
                      <th scope="row">หักส่วนลด</th>
                      <td class="text-end price">-110.53</td>
                    </tr>
                    <tr class="coupon">
                      <th scope="row">ใช้คูปองส่วนลด</th>
                      <td class="text-end price">-100.00</td>
                    </tr>
                    <tr class="spacer">
                      <td colspan="2"></td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td scope="col">รวมยอดที่ต้องชำระ</td>
                      <td scope="col" class="text-end price">8,000.00</td>
                    </tr>
                  </tfoot>
                </table>
              </div>

            </div>

            <OrderChecklist :list="checklist" />

          </aside>

          <FormKit type="submit" label="ไปดูสรุปรายการ" name="order-submit" id="order-submit"
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