<template>
  <NuxtLayout :name="layout">

    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">

      <div class="row">
        <div class="col-lg-8 col-xl-9">

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

          <div class="card">
            <div class="card-body">

              <div class="accordion" id="accordion-shipping">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapse-shipping" aria-expanded="true"
                      aria-controls="collapse-shipping">วิธีการรับกรมธรรม์</button>
                  </h2>
                  <div id="collapse-shipping" class="accordion-collapse collapse show"
                    data-bs-parent="#accordion-shipping">
                    <div class="accordion-body">

                      <div class="notice-info"><i class="fa-regular fa-circle-info"></i>ส่งกรมธรรม์ทางอีเมล
                        หรือสามารถดาวน์โหลดได้จากระบบ</div>

                      <div class="notice-warning"><i
                          class="fa-regular fa-circle-info"></i>ควรเลือกกระดาษให้ตรงกับบริษัทประกันที่ซื้อ
                        และรายการกระดาษจะถูกหักออกจากคลัง หลังจากกดพิมพ์กรมธรรม์</div>

                      <div class="form-placeorder">

                        <section class="shipping-type">

                          <div class="form-hide-label">
                            <ElementsFormRadioShippingPolicy />
                          </div>

                        </section>

                        <aside class="shipping-email-pdf col-md-12 col-lg-4">
                          <FormKit type="email" label="อีเมลสำหรับรับไฟล์กรมธรรม์" name="Email"
                            placeholder="xxxxxx@email.com" validation="required"
                            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
                        </aside>

                        <aside class="shipping-print">
                          <p>จำนวนกระดาษ <span>ทิพยประกันภัย</span> คงเหลือ <span>5</span> ใบ</p>
                        </aside>

                        <section class="shipping-method">
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

                        <section class="shipping-address">
                          <h3>ที่อยู่สำหรับจัดส่ง</h3>
                          <div class="form-hide-label">
                            <FormKit type="radio" label="รายชื่อที่อยู่" :options="[
                              { label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน', help: '724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160', value: 'insured' },
                              { label: 'เปลี่ยนที่อยู่ใหม่', value: 'addnew', attrs: { addnewaddress: true } },
                            ]" options-class="option-block-stack" />
                          </div>

                          <aside class="new-shipping-address inner-section">
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

          <div class="card">
            <div class="card-body">

              <div class="accordion" id="accordion-tax-invoice">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapse-tax-invoice" aria-expanded="true"
                      aria-controls="collapse-tax-invoice">ใบกำกับภาษี</button>
                  </h2>
                  <div id="collapse-tax-invoice" class="accordion-collapse collapse show"
                    data-bs-parent="#accordion-tax-invoice">
                    <div class="accordion-body">

                      <div class="notice-success"><i
                          class="fa-regular fa-memo-circle-check"></i>มีใบกำกับภาษีแนบท้ายอยู่กับไฟล์กรมธรรม์แล้ว</div>

                      <div class="notice-warning"><i
                          class="fa-regular fa-circle-info"></i>ไม่มีใบกำกับภาษีแนบท้ายในไฟล์กรมธรรม์
                        หากต้องการ ต้องกดออกใบกำกับภาษี</div>

                      <div class="form-placeorder">

                        <div class="placeorder-action">
                          <a href="#" class="btn btn-preview-tax"><i
                              class="fa-solid fa-file-pdf"></i>ดูตัวอย่างใบกำกับภาษีที่แนบ</a>
                        </div>

                        <section class="basic-tax-address">
                          <div class="form-hide-label">
                            <FormKit type="radio" label="รายชื่อที่อยู่" :options="[
                              { label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน', help: '724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160', value: 'insured' },
                              { label: 'แก้ไขใบกำกับภาษี', value: 'addnew', attrs: { addnewaddress: true } },
                            ]" options-class="option-block-stack" />
                          </div>

                          <aside class="new-basic-tax-address inner-section">
                            <h4>แก้ไขใบกำกับภาษี</h4>

                            <div class="row">
                              <div class="col-6">
                                <FormKit type="text" label="ตั้งชื่อเรียกรายการนี้" name="NewLabelAddress"
                                  placeholder="เพื่อให้ง่ายต่อการเรียกใช้งานครั้งต่อไป" validation="required"
                                  :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="text" label="หมายเลขโทรศัพท์" name="NewPhoneNumber"
                                  placeholder="098765XXXX" validation="required"
                                  :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
                              </div>
                              <div class="col-sm-4 col-lg-3">
                                <FormKit type="select" label="คำนำหน้าผู้รับ" name="NewTitle" placeholder="คำนำหน้า"
                                  :options="{
                                    mr: 'นาย',
                                    mrs: 'นาง',
                                    ms: 'นางสาว',
                                    others: 'ไม่ระบุ',
                                  }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                              </div>
                              <div class="col-sm-8 col-lg-4">
                                <FormKit type="text" label="ชื่อผู้รับ" name="NewFirstName" placeholder="ชื่อ"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-md-12 col-lg-5">
                                <FormKit type="text" label="นามสกุลผู้รับ" name="NewLastName" placeholder="นามสกุล"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>

                              <ElementsFormAddress />

                            </div>

                            <button class="btn-primary btn-save">บันทึกข้อมูล</button>

                          </aside>

                        </section>

                        <div class="placeorder-action">
                          <div class="form-hide-label">
                            <FormKit type="checkbox" label="ต้องการออกใบกำกับภาษี" :options="{
                              request: 'ออกใบกำกับภาษี'
                            }" />
                          </div>
                        </div>

                        <section class="request-tax-address">
                          <div class="form-hide-label">
                            <FormKit type="radio" label="รายชื่อที่อยู่" :options="[
                              { label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน', help: '724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160', value: 'insured' },
                              { label: 'แก้ไขใบกำกับภาษี', value: 'addnew', attrs: { addnewaddress: true } },
                            ]" options-class="option-block-stack" />
                          </div>

                          <aside class="new-request-tax-address inner-section">
                            <h4>แก้ไขใบกำกับภาษี</h4>

                            <div class="row">
                              <div class="col-6">
                                <FormKit type="text" label="ตั้งชื่อเรียกรายการนี้" name="NewLabelAddress"
                                  placeholder="เพื่อให้ง่ายต่อการเรียกใช้งานครั้งต่อไป" validation="required"
                                  :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
                              </div>
                              <div class="col-6">
                                <FormKit type="text" label="หมายเลขโทรศัพท์" name="NewPhoneNumber"
                                  placeholder="098765XXXX" validation="required"
                                  :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
                              </div>
                              <div class="col-sm-4 col-lg-3">
                                <FormKit type="select" label="คำนำหน้าผู้รับ" name="NewTitle" placeholder="คำนำหน้า"
                                  :options="{
                                    mr: 'นาย',
                                    mrs: 'นาง',
                                    ms: 'นางสาว',
                                    others: 'ไม่ระบุ',
                                  }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                              </div>
                              <div class="col-sm-8 col-lg-4">
                                <FormKit type="text" label="ชื่อผู้รับ" name="NewFirstName" placeholder="ชื่อ"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>
                              <div class="col-md-12 col-lg-5">
                                <FormKit type="text" label="นามสกุลผู้รับ" name="NewLastName" placeholder="นามสกุล"
                                  validation="required" :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }"
                                  autocomplete="false" />
                              </div>

                              <ElementsFormAddress />

                            </div>

                            <button class="btn-primary btn-save">บันทึกข้อมูล</button>

                          </aside>
                        </section>

                        <div class="shippped-tax-type">

                          <div class="form-hide-label">
                            <ElementsFormRadioShippedPolicy />
                          </div>

                        </div>

                        <section class="shipped-tax-address">
                          <div class="form-hide-label">
                            <FormKit type="radio" label="รายชื่อที่อยู่" :options="[
                              { label: 'ชื่อ-ที่อยู่เดียวกันกับผู้เอาประกัน', help: '724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160', value: 'insured' },
                              { label: 'เปลี่ยนที่อยู่ใหม่', value: 'addnew', attrs: { addnewaddress: true } },
                            ]" options-class="option-block-stack" />
                          </div>

                          <aside class="new-shipped-tax-address inner-section">
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

        </div>

        <div class="col-lg-4 col-xl-3">

          <aside class="card">
            <div class="card-header">
              <h3 class="card-title">รายการที่เลือก</h3>
            </div>
            <div class="card-body">

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
                    <span class="badge-secondary"><i class="fa-regular fa-memo-circle-check"></i>พร้อมใบกำกับภาษี</span>
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

              <OrderCart v-if="packageSelect && packageSelect.CompanyName != ''" :is-online="packageSelect.IsOnlineActive"
                :company-name="packageSelect.CompanyName"
                :company-image="getCompanyPath(packageSelect.PackageResult[0].CompanyImage)"
                :price="getCurrency(packageSelect.PackageResult[0].PriceACT)" :price-discount="getCurrency(packageSelect.PackageResult[0].PriceACTDiscount)
                  " :car-name="packageSelect.PackageResult[0].UseCarName" />

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