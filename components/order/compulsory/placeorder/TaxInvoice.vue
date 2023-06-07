<template>
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

</template>