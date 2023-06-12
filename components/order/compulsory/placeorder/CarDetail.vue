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
                            <FormKit type="text" label="ทะเบียนรถ" name="CarLicense" placeholder="เลขป้ายทะเบียนรถ"
                              validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                              autocomplete="false" />
                          </div>
                          <div class="col">
                            <FormKit type="select" label="จังหวัดของทะเบียนรถ" name="CarLicenseProvince"
                              placeholder="จังหวัดบนป้ายทะเบียนรถ" :options="{
                                1: 'กทม',
                                2: 'กรุงเทพ',
                                3: 'กรุงเทพฯ',
                                4: 'กรุงเทพมหานคร',
                                5: 'นครพนมเปญ',
                              }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
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
                            <FormKit type="select" label="สีรถ" name="CarColor" placeholder="สีของรถ" :options="{
                              1: 'ขาว',
                              2: 'ดำ',
                              3: 'เทา',
                              4: 'บรอนด์',
                            }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                          </div>
                          <div class="col-sm-8 col-lg-5">
                            <FormKit type="text" label="เลขตัวถัง" name="CarBodyNumber"
                              placeholder="ตัวอย่าง: 1FTLP62W4Axxxxxx" validation="required"
                              :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
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
                              validation="required" :validation-messages="{ required: 'กรุณาอัปโหลดไฟล์เอกสาร' }" />
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

</script>