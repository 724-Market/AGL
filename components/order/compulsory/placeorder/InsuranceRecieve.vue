<template>
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
</template>