<template>
    <div class="card">
            <div class="card-body">

              <div class="accordion" id="accordion-car-detail">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapse-car-detail" aria-expanded="true"
                      aria-controls="collapse-car-detail">รายละเอียดรถ</button>
                  </h2>
                  <div id="collapse-car-detail" class="accordion-collapse collapse show"
                    data-bs-parent="#accordion-car-detail">
                    <div class="accordion-body">

                      <div class="form-placeorder">

                        <div class="row">
                          <div class="col">
                            <FormKit type="text" label="ทะเบียนรถ" id="CarLicense" name="CarLicense" placeholder="เลขป้ายทะเบียนรถ"
                              :validation="[['required'],
                                            ['length', 6, 7]]"
                              :validation-messages="{ required: 'กรุณาใส่ข้อมูล', length: 'ทะเบียนรถควรมีอย่างน้อย 6 แต่ไม่เกิน 7 ตัว' }"
                              autocomplete="false" />
                          </div>
                          <div class="col">
                            <FormKit type="select" label="จังหวัดของทะเบียนรถ" name="CarLicenseProvince" placeholder="จังหวัดบนป้ายทะเบียนรถ" 
                              :options="carProvince" :value="carProvince.value" v-model="carProvinceText"
                              validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                          </div>
                        </div>

                        <div class="row">
                          <div class="col">
                            <div class="form-hide-label">
                              <FormKit type="checkbox" label="ป้ายแดง" name="CarLicenseClassifier" :options="{
                                temporary: 'ป้ายแดง',
                              }" />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-4 col-lg-3">
                            <FormKit type="select" label="สีรถ" name="CarColor" placeholder="สีของรถ" 
                              :options="carColor" :value="carColor.value" v-model="carColorText"
                              validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                          </div>
                          <div class="col-sm-8 col-lg-5">
                            <FormKit type="text" label="เลขตัวถัง" name="CarBodyNumber" placeholder="ตัวอย่าง: 1FTLP62W4Axxxxxx" 
                              :validation="[['required'],
                                            ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/],
                                            ['length', 17]]"
                              :validation-messages="{ required: 'กรุณาใส่ข้อมูล', 
                                                      matches: 'รูปแบบของเลขตัวถังไม่ถูกต้อง', 
                                                      length: 'เลขตัวถังควรมี 17 หลัก' }"
                               autocomplete="false" />
                          </div>
                          <div class="col-sm-12 col-lg-4">
                            <FormKit type="text" label="เลขเครื่องยนต์" name="CarEngineNumber"
                              placeholder="ตัวอย่าง: 724XXX" autocomplete="false" />
                          </div>
                        </div>

                        <div class="row">
                          <div class="col">
                            <FormKit type="file" label="เอกสารประกอบ (สำเนาเล่มรถยนต์)" name="CarLicenseFile"
                              accept=".pdf,.jpg,.png" help="รองรับไฟล์นามสกุล pdf, jpg, png เท่านั้น"
                              :validation="SubCarModel === 'unknown' || SubCarModel === 'other' ? 'required' : ''" 
                              :validation-messages="{ required: 'กรุณาอัปโหลดไฟล์เอกสาร' }" 
                              />
                          </div>
                        </div>

                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          
</template>

<script setup lang="ts">
import { SelectOption } from "~/shared/entities/select-option";

const props = defineProps({
  carProvince: Array<SelectOption>,
  carColor: Array<SelectOption>,
});


var SubCarModel: globalThis.Ref<String> = ref("")

var carProvince: globalThis.Ref<SelectOption[]> = ref([])
var carProvinceText: String = ""
var carColor: globalThis.Ref<SelectOption[]> = ref([])
var carColorText: String = ""

const onLoad = onMounted(async () => {
if(props.carProvince)
{
  carProvince.value = props.carProvince
}

if(props.carColor){
  carColor.value = props.carColor
}
 
});

</script>