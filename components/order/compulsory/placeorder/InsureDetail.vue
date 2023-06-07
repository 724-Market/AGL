<template>
              <div class="card">
            <div class="card-body">

              <div class="accordion" id="accordion-insured-information">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapse-insured-information" aria-expanded="true"
                      aria-controls="collapse-insured-information">ข้อมูลผู้เอาประกันภัย</button>
                  </h2>
                  <div id="collapse-insured-information" class="accordion-collapse collapse show"
                    data-bs-parent="#accordion-insured-information">
                    <div class="accordion-body">

                      <div class="form-placeorder">

                        <section class="insured-type">
                          <FormKit type="radio" label="ประเภทผู้เอาประกันภัย" name="InsuredType" :options="{
                            person: 'บุคคลธรรมดา',
                            company: 'นิติบุคคล',
                          }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                            options-class="option-block" />
                        </section>

                        <aside class="insured-classifier">
                          <section>
                            <FormKit type="radio" label="ลักษณะ" name="InsuredClassifier" :options="{
                              thai: 'คนไทย',
                              foreigner: 'คนต่างชาติ',
                            }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                              options-class="option-block" />
                          </section>

                          <section class="insured-thai-information">
                            <h3>ชื่อผู้เอาประกันภัย (บุคคลธรรมดา : คนไทย)</h3>

                            <div class="row">
                              <div class="col-sm-4 col-lg-3">
                                <FormKit type="select" label="คำนำหน้า" name="Title" placeholder="คำนำหน้า" :options="{
                                  mr: 'นาย',
                                  mrs: 'นาง',
                                  ms: 'นางสาว',
                                  others: 'ไม่ระบุ',
                                }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                              </div>
                              <div class="col-sm-8 col-lg-4">
                                <FormKit type="text" label="ชื่อ" name="FirstName" placeholder="ชื่อ"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-md-12 col-lg-5">
                                <FormKit type="text" label="นามสกุล" name="LastName" placeholder="นามสกุล"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="date" label="วันเดือนปีเกิด" name="ฺBirthDate" placeholder="วัน/เดือน/ปี"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <ElementsFormIdCard />
                              </div>
                              <div class="col-6">
                                <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" placeholder="098765XXXX"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="email" label="อีเมล" name="Email" placeholder="xxxxxx@email.com"
                                  autocomplete="false" />
                              </div>
                            </div>

                          </section>

                          <section class="insured-foreigner-information">
                            <h3>ชื่อผู้เอาประกันภัย (บุคคลธรรมดา : คนต่างชาติ)</h3>

                            <div class="row">
                              <div class="col-sm-4 col-lg-3">
                                <FormKit type="select" label="Title" name="Title" placeholder="Title" :options="{
                                  mr: 'mr',
                                  mrs: 'mrs',
                                  ms: 'ms',
                                  others: 'other',
                                }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                              </div>
                              <div class="col-sm-8 col-lg-4">
                                <FormKit type="text" label="Firstname" name="FirstName" placeholder="Firstn-ame"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-md-12 col-lg-5">
                                <FormKit type="text" label="Lastname" name="LastName" placeholder="Lastname"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="date" label="Birthdate" name="BirthDate" placeholder="ฺBirthdate"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <ElementsFormPassport />
                              </div>
                              <div class="col-6">
                                <FormKit type="text" label="Phone Number" name="PhoneNumber" placeholder="098765XXXX"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="email" label="Email" name="Email" placeholder="xxxxxx@email.com"
                                  autocomplete="false" />
                              </div>
                            </div>

                          </section>

                        </aside>

                        <aside class="company-classifier">
                          <section>
                            <FormKit type="radio" label="ลักษณะ" name="CompanyClassifier" :options="{
                              headoffice: 'สำนักงานใหญ่',
                              branch: 'สาขา',
                            }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                              options-class="option-block" />
                          </section>

                          <section class="insured-headoffice-information">
                            <h3>ชื่อผู้เอาประกันภัย (นิติบุคคล : สำนักงานใหญ่)</h3>

                            <div class="row">
                              <div class="col-sm-4 col-lg-3">
                                <FormKit type="select" label="ประเภทกิจการ" name="CompanyType" placeholder="ประเภทกิจการ"
                                  :options="{
                                    company: 'บริษัทจำกัด',
                                    public: 'บริษัทจำกัด (มหาชน)',
                                    partnership: 'ห้างหุ้นส่วนจำกัด',
                                  }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                              </div>
                              <div class="col-sm-8 col-lg-5">
                                <FormKit type="text" label="ชื่อกิจการ" name="CompanyName" placeholder="ชื่อกิจการ"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-md-12 col-lg-4">
                                <FormKit type="text" label="เลขประจำตัวผู้เสียภาษี" name="TaxId"
                                  placeholder="เลขประจำตัวผู้เสียภาษี" validation="required"
                                  :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" placeholder="098765XXXX"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="email" label="อีเมล" name="Email" placeholder="xxxxxx@email.com"
                                  autocomplete="false" />
                              </div>
                            </div>

                          </section>

                          <section class="insured-branch-information">
                            <h3>ชื่อผู้เอาประกันภัย (นิติบุคคล : สาขา)</h3>

                            <div class="row">
                              <div class="col-sm-4 col-lg-3">
                                <FormKit type="select" label="ประเภทกิจการ" name="CompanyType" placeholder="ประเภทกิจการ"
                                  :options="{
                                    company: 'บริษัทจำกัด',
                                    public: 'บริษัทจำกัด (มหาชน)',
                                    partnership: 'ห้างหุ้นส่วนจำกัด',
                                  }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                              </div>
                              <div class="col-sm-8 col-lg-5">
                                <FormKit type="text" label="ชื่อกิจการ" name="CompanyName" placeholder="ชื่อกิจการ"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-md-12 col-lg-4">
                                <FormKit type="text" label="เลขประจำตัวผู้เสียภาษี" name="TaxId"
                                  placeholder="เลขประจำตัวผู้เสียภาษี" validation="required"
                                  :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="text" label="รหัสสาขา" name="BranchCode" placeholder="รหัสสาขา"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="text" label="ชื่อสาขา" name="BranchName" placeholder="ชื่อสาขา"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" placeholder="098765XXXX"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="email" label="อีเมล" name="Email" placeholder="xxxxxx@email.com"
                                  autocomplete="false" />
                              </div>
                            </div>

                          </section>

                        </aside>

                        <section class="insured-address">
                          <h3>ที่อยู่ผู้เอาประกันภัย</h3>

                          <div class="row">
                            <ElementsFormAddress />
                          </div>

                        </section>

                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
</template>
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
</style>