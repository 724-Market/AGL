<template>
  <div class="card">
    <div class="card-body">
      <div class="accordion" id="accordion-tax-invoice">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-tax-invoice"
              aria-expanded="true"
              aria-controls="collapse-tax-invoice"
            >
              ใบกำกับภาษี
            </button>
          </h2>
          <div
            id="collapse-tax-invoice"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordion-tax-invoice"
          >
            <div class="accordion-body">
              <div class="notice-success" v-if="isIncludeTax == '1'">
                <i class="fa-regular fa-memo-circle-check"></i
                >มีใบกำกับภาษีแนบท้ายอยู่กับไฟล์กรมธรรม์แล้ว
              </div>

              <div class="notice-warning" v-else>
                <i class="fa-regular fa-circle-info"></i
                >ไม่มีใบกำกับภาษีแนบท้ายในไฟล์กรมธรรม์ หากต้องการ ต้องกดออกใบกำกับภาษี
              </div>

              <div class="form-placeorder">
                <div class="placeorder-action">
                  <a href="#" class="btn btn-preview-tax"
                    ><i class="fa-solid fa-file-pdf"></i>ดูตัวอย่างใบกำกับภาษีที่แนบ</a
                  >
                </div>

                <section class="basic-tax-address" v-if="isIncludeTax == '1'">
                  <div class="form-hide-label">
                    <FormKit
                      type="radio"
                      label="รายชื่อที่อยู่"
                      :options="[
                        {
                          label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน',
                          help: insureFullAddress,
                          //'724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160',
                          value: 'insured',
                        },
                        {
                          label: 'แก้ไขใบกำกับภาษี',
                          value: 'addnew',
                          attrs: { addnewaddress: true },
                        },
                      ]"
                      options-class="option-block-stack"
                    />
                  </div>

                  <aside class="new-basic-tax-address inner-section">
                    <h4>แก้ไขใบกำกับภาษี</h4>

                    <div class="row">
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="ตั้งชื่อเรียกรายการนี้"
                          name="NewLabelAddress"
                          placeholder="เพื่อให้ง่ายต่อการเรียกใช้งานครั้งต่อไป"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="NewPhoneNumber"
                          placeholder="098765XXXX"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-sm-4 col-lg-3">
                        <FormKit
                          type="select"
                          label="คำนำหน้าผู้รับ"
                          name="NewTitle"
                          placeholder="คำนำหน้า"
                          :options="{
                            mr: 'นาย',
                            mrs: 'นาง',
                            ms: 'นางสาว',
                            others: 'ไม่ระบุ',
                          }"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-4">
                        <FormKit
                          type="text"
                          label="ชื่อผู้รับ"
                          name="NewFirstName"
                          placeholder="ชื่อ"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-md-12 col-lg-5">
                        <FormKit
                          type="text"
                          label="นามสกุลผู้รับ"
                          name="NewLastName"
                          placeholder="นามสกุล"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>

                      <ElementsFormAddress
                        :addr-province="addrProvince"
                        :addr-district="addrDistrict"
                        :addr-sub-district="addrSubDistrict"
                        :addr-zip-code="addrZipCode"
                        @change-province="handlerChangeProvince"
                        @change-district="handlerChangeDistrict"
                        @change-sub-district="handlerChangeSubDistrict"
                        @change-full-address="handlerChangeFullAddress"
                      />
                    </div>

                    <button class="btn-primary btn-save">บันทึกข้อมูล</button>
                  </aside>
                </section>

                <div class="placeorder-action" v-hide="isIncludeTax == '1'">
                  <div class="form-hide-label">
                    <FormKit
                      type="checkbox"
                      label="ต้องการออกใบกำกับภาษี"
                      v-model="requestIncludeTax"
                      :options="{
                        request: 'ออกใบกำกับภาษี',
                      }"
                    />
                  </div>
                </div>
                <section class="request-tax-address" v-if="requestIncludeTax.length > 0">
                  <div class="form-hide-label">
                    <FormKit
                      type="radio"
                      label="รายชื่อที่อยู่"
                      :options="[
                        {
                          label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน',
                          help:
                            '724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160',
                          value: 'insured',
                        },
                        {
                          label: 'แก้ไขที่อยู่จัดส่งใบกำกับภาษี',
                          value: 'addnew',
                          attrs: { addnewaddress: true },
                        },
                      ]"
                      options-class="option-block-stack"
                    />
                  </div>

                  <aside class="new-request-tax-address inner-section">
                    <h4>แก้ไขที่อยู่จัดส่งใบกำกับภาษี</h4>

                    <div class="row">
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="ตั้งชื่อเรียกรายการนี้"
                          name="NewLabelAddress"
                          placeholder="เพื่อให้ง่ายต่อการเรียกใช้งานครั้งต่อไป"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-6">
                        <FormKit
                          type="text"
                          label="หมายเลขโทรศัพท์"
                          name="NewPhoneNumber"
                          placeholder="098765XXXX"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-sm-4 col-lg-3">
                        <FormKit
                          type="select"
                          label="คำนำหน้าผู้รับ"
                          name="NewTitle"
                          placeholder="คำนำหน้า"
                          :options="{
                            mr: 'นาย',
                            mrs: 'นาง',
                            ms: 'นางสาว',
                            others: 'ไม่ระบุ',
                          }"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                        />
                      </div>
                      <div class="col-sm-8 col-lg-4">
                        <FormKit
                          type="text"
                          label="ชื่อผู้รับ"
                          name="NewFirstName"
                          placeholder="ชื่อ"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>
                      <div class="col-md-12 col-lg-5">
                        <FormKit
                          type="text"
                          label="นามสกุลผู้รับ"
                          name="NewLastName"
                          placeholder="นามสกุล"
                          validation="required"
                          :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                          autocomplete="false"
                        />
                      </div>

                      <ElementsFormAddress
                        :addr-province="addrProvince"
                        :addr-district="addrDistrict"
                        :addr-sub-district="addrSubDistrict"
                        :addr-zip-code="addrZipCode"
                        @change-province="handlerChangeProvince"
                        @change-district="handlerChangeDistrict"
                        @change-sub-district="handlerChangeSubDistrict"
                        @change-full-address="handlerChangeFullAddress"
                      />
                    </div>

                    <button class="btn-primary btn-save">บันทึกข้อมูล</button>
                  </aside>
                </section>

                <div class="shippped-tax-type" v-show="shippingPolicy == 'postal'">
                  <div class="form-hide-label">
                    <ElementsFormRadioShippedPolicy v-model="shippedPolicy" />
                  </div>
                </div>

                <section
                  class="shipped-tax-address"
                  v-if="shippingPolicy == 'postal' && shippedPolicy == 'separately'"
                >
                  <div class="form-hide-label">
                    <FormKit
                      type="radio"
                      label="รายชื่อที่อยู่"
                      :options="[
                        {
                          label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน',
                          help: insureFullAddress,
                          //'724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160',
                          value: 'insured',
                        },
                        {
                          label: 'เปลี่ยนที่อยู่ใหม่',
                          value: 'addnew',
                          attrs: { addnewaddress: true },
                        },
                      ]"
                      options-class="option-block-stack"
                    />
                  </div>

                  <aside class="new-shipped-tax-address inner-section">
                    <h3>วิธีการจัดส่ง</h3>
                  <div class="row">
                    <div class="col-6">
                      <FormKit type="select" label="ช่องทางการจัดส่ง" name="ShippedMethod"
                        placeholder="ช่องทางการจัดส่ง" :options="delivery" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                    </div>

                    <div class="col-6">
                      <FormKit type="text" label="ค่าจัดส่ง" name="ShippedFee" placeholder="ค่าจัดส่ง"
                        value="50 บาท" readonly />
                    </div>
                  </div>
                    <h4>ที่อยู่จัดส่งใหม่</h4>
                    <div class="row">
                      <ElementsFormNewAddress
                        :addr-province="addrProvince"
                        :addr-district="addrDistrict"
                        :addr-sub-district="addrSubDistrict"
                        :addr-zip-code="addrZipCode"
                        @change-province="handlerChangeProvince"
                        @change-district="handlerChangeDistrict"
                        @change-sub-district="handlerChangeSubDistrict"
                        @change-full-address="handlerChangeFullAddress"
                      />
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
</template>
<script setup lang="ts">
import { DefaultAddress } from "~/shared/entities/placeorder-entity"
import { SelectOption } from "~/shared/entities/select-option"

const emit = defineEmits(['changeProvince','changeDistrict','changeSubDistrict'])

const props = defineProps({
  prefix:Array<SelectOption>,
  delivery:Array<SelectOption>,
  addrProvince: Array<SelectOption>,
  addrDistrict: Array<SelectOption>,
  addrSubDistrict: Array<SelectOption>,
  addrZipCode:String,
  insureFullAddress:String,
  isIncludeTax:String,//1,0
  shippingPolicy:String // email,pdf,postal
})

const prefix: globalThis.Ref<SelectOption[]> = ref([])
  const delivery: globalThis.Ref<SelectOption[]> = ref([])
const addrProvince: globalThis.Ref<SelectOption[]> = ref([])
const addrDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrSubDistrict: globalThis.Ref<SelectOption[]> = ref([])
const addrZipCode = ref('')
const insureFullAddress: globalThis.Ref<String> = ref('')

const shippedPolicy = ref('') //together,separately
const requestIncludeTax = ref([])

const onLoad = onMounted(async () => {

    if(props.prefix){
        prefix.value = props.prefix
    }
    if(props.delivery){
      delivery.value = props.delivery
    }
    if (props.addrProvince) {
        addrProvince.value = props.addrProvince
    }
    if (props.addrDistrict) {
        addrDistrict.value = props.addrDistrict
    }
    if (props.addrSubDistrict) {
        addrSubDistrict.value = props.addrSubDistrict
    }
    if (props.addrZipCode) {
        addrZipCode.value = props.addrZipCode
    }
    if(props.insureFullAddress)
    {
      insureFullAddress.value = props.insureFullAddress
    }

});
// handler function for emit
const handlerChangeProvince = (e: string)=>{
  if(e){
    console.log(e)
    emit('changeProvince',e)
  }
}
const handlerChangeDistrict = (e: string)=>{
  if(e){
    emit('changeDistrict',e)
  }
}
const handlerChangeSubDistrict = (e: string)=>{
  if(e){
    emit('changeSubDistrict',e)
  }
}
const handlerChangeFullAddress = (addr:string,ObjectAddress:DefaultAddress)=>{
  if(addr && ObjectAddress){
    //TODO implement coding new address
    console.log(addr,ObjectAddress)
    //emit('changeFullAddress',addr,ObjectAddress)
  }
}

//watching props pass data
watch(
    () => props.addrProvince,
    () => {
        if (props.addrProvince && props.addrProvince.length > 0) {
            addrProvince.value = props.addrProvince
        }
    }
)
watch(
    () => props.addrDistrict,
    () => {
        if (props.addrDistrict && props.addrDistrict.length > 0) {
            addrDistrict.value = props.addrDistrict
        }
    }
)
watch(
    () => props.addrSubDistrict,
    () => {
        if (props.addrSubDistrict && props.addrSubDistrict.length > 0) {
            addrSubDistrict.value = props.addrSubDistrict
        }
    }
)
watch(
    () => props.addrZipCode,
    () => {
        if (props.addrZipCode && props.addrZipCode.length > 0) {
            addrZipCode.value = props.addrZipCode
        }
    }
)
watch(
    () => props.prefix,
    () => {
        if (props.prefix && props.prefix.length > 0) {
            prefix.value = props.prefix
        }
    }
)
watch(
    () => props.delivery,
    () => {
        if (props.delivery && props.delivery.length > 0) {
          delivery.value = props.delivery
        }
    }
)
</script>
<style scoped>
.new-basic-tax-address,
.new-request-tax-address,
.new-shipped-tax-address {
  display: none;
}

.basic-tax-address:has(.formkit-input[value="addnew" i]:checked) .new-basic-tax-address,
.request-tax-address:has(.formkit-input[value="addnew" i]:checked)
  .new-request-tax-address,
.shipped-tax-address:has(.formkit-input[value="addnew" i]:checked)
  .new-shipped-tax-address {
  display: block;
}
</style>
