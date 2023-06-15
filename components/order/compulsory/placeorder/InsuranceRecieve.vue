<template>
  <div class="card">
    <div class="card-body">

      <div class="accordion" id="accordion-shipping">
        <div class="accordion-item">

          <h2 class="accordion-header">
            <button class="accordion-button" type="button" data-bs-toggle="collapse"
              data-bs-target="#collapse-shipping" aria-expanded="true"
              aria-controls="collapse-shipping">วิธีการรับกรมธรรม์
            </button>
          </h2>

          <div id="collapse-shipping" class="accordion-collapse collapse show" data-bs-parent="#accordion-shipping">
            <div class="accordion-body">

              <div class="notice-info">
                <i class="fa-regular fa-circle-info"></i>
                ส่งกรมธรรม์ทางอีเมลหรือสามารถดาวน์โหลดได้จากระบบ
              </div>

              <div class="notice-warning">
                <i class="fa-regular fa-circle-info"></i>
                ควรเลือกกระดาษให้ตรงกับบริษัทประกันที่ซื้อและรายการกระดาษจะถูกหักออกจากคลัง หลังจากกดพิมพ์กรมธรรม์
              </div>

              <div class="form-placeorder">
                <section class="shipping-type">
                  <div class="form-hide-label">
                    <ElementsFormRadioShippingPolicy v-model="shippingPolicyText" />
                  </div>
                </section>

                <aside v-if="isPdfShipping" class="shipping-email-pdf col-md-12 col-lg-4">
                  <FormKit type="email" label="อีเมลสำหรับรับไฟล์กรมธรรม์" name="Email"
                    placeholder="xxxxxx@email.com" validation="required"
                    :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
                </aside>

                <aside v-if="isPrintShipping" class="shipping-print">
                  <p>จำนวนกระดาษ <span>{{companyName}}</span> คงเหลือ <span>{{paperBalance}}</span> ใบ</p>
                </aside>

                <section v-if="isPostalShipping" class="shipping-method">
                  <h3>วิธีการจัดส่ง</h3>
                  <div class="row">
                    <div class="col-6">
                      <FormKit type="select" label="ช่องทางการจัดส่ง" name="ShippingMethod"
                        placeholder="ช่องทางการจัดส่ง" :options="{
                          dhl: 'DHL Express',
                          kerry: 'Kerry'
                        }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                    </div>

                    <div class="col-6">
                      <FormKit type="text" label="ค่าจัดส่ง" name="ShippingFee" placeholder="ค่าจัดส่ง"
                        value="50 บาท" readonly />
                    </div>
                  </div>
                </section>

                <section v-if="isPostalShipping" class="shipping-address">
                  <h3>ที่อยู่สำหรับจัดส่ง</h3>
                  <div class="form-hide-label">
                    <FormKit type="radio" label="รายชื่อที่อยู่" name="PostalAddressPolicy" v-model="postalAddressPolicyText" 
                      :options="[
                        { label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน', value: 'insured', help: '724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160' },
                        { label: 'เปลี่ยนที่อยู่ใหม่', value: 'addnew', attrs: { addnewaddress: true } },
                      ]" options-class="option-block-stack" />
                  </div>

                  <aside v-if="isAddnew" class="new-shipping-address inner-section">
                    <h4>ที่อยู่จัดส่งใหม่</h4>

                    <div class="row">
                      <ElementsFormNewAddress />
                    </div>

                    <button class="btn-primary btn-save">บันทึกข้อมูล</button>
                  </aside>
                </section>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
  <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
</template>

<style scoped>
.shipping-email-pdf,
.shipping-print,
.shipping-method,
.shipping-address,
.new-shipping-address {
  display: block;
}
</style>

<script setup lang="ts">
import { IInformation } from "~~/shared/entities/information-entity";
import { IPackageResponse } from "~/shared/entities/packageList-entity";

const isLoading = ref(false);

var info: IInformation;
var packages: IPackageResponse;
var companyName: globalThis.Ref<String> = ref("")
var paperBalance: globalThis.Ref<Number> = ref(0)

var shippingPolicyText: globalThis.Ref<String> = ref("")
var isPdfShipping: globalThis.Ref<boolean> = ref(false)
var isPrintShipping: globalThis.Ref<boolean> = ref(false)
var isPostalShipping: globalThis.Ref<boolean> = ref(false)

var postalAddressPolicyText: globalThis.Ref<String> = ref("")
var isInsured: globalThis.Ref<boolean> = ref(false)
var isAddnew: globalThis.Ref<boolean> = ref(false)

const onLoad = onMounted(async () => {
  // isLoading.value = true
  const jsonPackage = sessionStorage.getItem("useStorePackage") || "";
  packages = JSON.parse(jsonPackage) as IPackageResponse;
  companyName.value = packages?.CompanyName
  paperBalance.value = packages?.PaperBalance ?? 0
  // isLoading.value = false
});

watch(shippingPolicyText, async (newShippingPolicy) => {
  await handleRadioShippingPolicyChange(newShippingPolicy);
});

const handleRadioShippingPolicyChange = async (event: String) => {
  switch (event) {
    case "pdf":
      isPdfShipping.value = true
      isPrintShipping.value = false
      isPostalShipping.value = false
      isInsured.value = true
      break;
    case "print": 
      isPdfShipping.value = false
      isPrintShipping.value = true
      isPostalShipping.value = false
      isInsured.value = true
      break;
    case "postal": 
      isPdfShipping.value = false
      isPrintShipping.value = false
      isPostalShipping.value = true
      break;
  }
}

watch(postalAddressPolicyText, async (newAddressPolicy) => {
  await handleRadioPostalAddressPolicyChange(newAddressPolicy);
});

const handleRadioPostalAddressPolicyChange = async (event: String) => {
  switch (event) {
    case "insured":
      isInsured.value = true
      isAddnew.value = false
      break;
    case "addnew": 
      isInsured.value = false
      isAddnew.value = true
      break;
  }
}

</script>