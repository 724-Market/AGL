<template>
  <NuxtLayout :name="layout">

    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">

      <div class="row">
        <div class="col-lg-8 col-xl-9">
          <!-- # # # # # # # # # # # # # # # # # # # # # รายละเอียดรถ # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderCarDetail></OrderCompulsoryPlaceorderCarDetail>

          <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลผู้เอาประกันภัย # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderInsureDetail></OrderCompulsoryPlaceorderInsureDetail>

          <!-- # # # # # # # # # # # # # # # # # # # # # วิธีการรับกรมธรรม์ # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderInsuranceRecieve></OrderCompulsoryPlaceorderInsuranceRecieve>

          <!-- # # # # # # # # # # # # # # # # # # # # # ใบกำกับภาษี # # # # # # # # # # # # # # # # # # # # #-->
          <OrderCompulsoryPlaceorderTaxInvoice></OrderCompulsoryPlaceorderTaxInvoice>
        </div>

        <!-- # # # # # # # # # # # # # # # # # # # # # Right Slide Bar # # # # # # # # # # # # # # # # # # # # #-->
        <div class="col-lg-4 col-xl-3">

          <aside class="card">
            <div class="card-header">
              <h3 class="card-title">รายการที่เลือก</h3>
            </div>
            <div class="card-body">
              <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลรถ # # # # # # # # # # # # # # # # # # # # #-->
              <OrderCartCar></OrderCartCar>

              <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลแพคเกจ # # # # # # # # # # # # # # # # # # # # #-->
              <OrderCartPackage></OrderCartPackage>
              <!-- # # # # # # # # # # # # # # # # # # # # # ข้อมูลผู้เอาประกัน # # # # # # # # # # # # # # # # # # # # #-->
              <OrderCartInsure></OrderCartInsure>


            </div>

            <OrderChecklist :list="checklist" />

          </aside>

          <FormKit type="submit" label="ไปเลือกวิธีการชำระเงิน" name="order-submit" id="order-submit"
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
    desc: 'รายละเอียดรถ'
  },
  {
    id: '2',
    className: '',
    desc: 'ข้อมูลผู้เอาประกันภัย'
  },
  {
    id: '3',
    className: '',
    desc: 'วิธีการรับกรมธรรม์'
  },
  {
    id: '4',
    className: '',
    desc: 'ใบกำกับภาษี'
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
  title: "Compulsory ข้อมูลสั่งซื้อ",
  meta: [{ name: "description", content: "Compulsory ข้อมูลสั่งซื้อ" }],
  bodyAttrs: {
    class: "page-order category-compulsory single-placeholder",
  },
})
</script>

<style scoped>
.insured-classifier,
.company-classifier,
.insured-thai-information,
.insured-foreigner-information,
.insured-headoffice-information,
.insured-branch-information {
  display: none;
}

.insured-type:has(.formkit-input[value="person" i]:checked)~.insured-classifier,
.insured-type:has(.formkit-input[value="company" i]:checked)~.company-classifier,
.insured-classifier:has(.formkit-input[value="thai" i]:checked) .insured-thai-information,
.insured-classifier:has(.formkit-input[value="foreigner" i]:checked) .insured-foreigner-information,
.company-classifier:has(.formkit-input[value="headoffice" i]:checked) .insured-headoffice-information,
.company-classifier:has(.formkit-input[value="branch" i]:checked) .insured-branch-information {
  display: block;
}

.shipping-email-pdf,
.shipping-print,
.shipping-method,
.shipping-address,
.new-shipping-address {
  display: none;
}

.shipping-type:has(.formkit-input[value="pdf" i]:checked)~.shipping-email-pdf,
.shipping-type:has(.formkit-input[value="print" i]:checked)~.shipping-print,
.shipping-type:has(.formkit-input[value="print" i]:checked)~.notice-shipping-print,
.shipping-type:has(.formkit-input[value="postal" i]:checked)~.shipping-method,
.shipping-type:has(.formkit-input[value="postal" i]:checked)~.shipping-address,
.shipping-address:has(.formkit-input[value="addnew" i]:checked) .new-shipping-address {
  display: block;
}

.new-basic-tax-address,
.new-request-tax-address,
.new-shipped-tax-address {
  display: none;
}

.basic-tax-address:has(.formkit-input[value="addnew" i]:checked) .new-basic-tax-address,
.request-tax-address:has(.formkit-input[value="addnew" i]:checked) .new-request-tax-address,
.shipped-tax-address:has(.formkit-input[value="addnew" i]:checked) .new-shipped-tax-address {
  display: block;
}
</style>