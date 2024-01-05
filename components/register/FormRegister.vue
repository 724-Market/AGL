<template>

    <div class="card">
        <div class="card-body">

            <div class="accordion" id="accordion-user-secret">
                <div class="accordion-item">
                    <h2 class="accordion-header">
                        <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapse-user-secret" aria-expanded="true"
                            aria-controls="collapse-user-secret">ข้อมูลส่วนตัว</button>
                    </h2>
                    <div id="collapse-user-secret" class="accordion-collapse collapse show"
                        data-bs-parent="#accordion-user-secret">
                        <div class="accordion-body">

                            <div class="form-placeorder">

                                <div class="row">
                                    <div class="col-md-6">
                                        <FormKit type="text" label="ชื่อ" name="FirstName" value="xxx"
                                            placeholder="ระบุชื่อ" validation="required" :validation-messages="{
                                                required: 'กรุณาใส่ชื่อ'
                                            }" autocomplete="off" />
                                    </div>
                                    <div class="col-md-6">
                                        <FormKit type="text" label="นามสกุล" name="LastName" value="xxx"
                                            placeholder="ระบุนามสกุล" validation="required" :validation-messages="{
                                                required: 'กรุณาใส่นามสกุล'
                                            }" autocomplete="off" />
                                    </div>
                                    <div class="col-md-6">
                                        <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" value="0111111111"
                                            maxlength="10" placeholder="ตัวอย่าง 0987654321"
                                            validation="required|+length:10|number" :validation-messages="{
                                                required: 'กรุณาใส่หมายเลขโทรศัพท์',
                                                length: 'หมายเลขโทรศัพท์มีจำนวน 10 หลัก',
                                                number: 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
                                            }" autocomplete="off" />
                                    </div>
                                    <div class="col-md-6">
                                        <FormKit type="email" label="อีเมล" name="Email" value="xxx@xxx.com"
                                            placeholder="ตัวอย่าง abc@email.com" validation="required|email"
                                            :validation-messages="{
                                                required: 'กรุณาใส่อีเมล',
                                                email: 'รูปแบบอีเมลไม่ถูกต้อง'
                                            }" autocomplete="off" />
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

                <div class="accordion" id="accordion-user-secret">
                    <div class="accordion-item">
                        <h2 class="accordion-header">
                            <button class="accordion-button" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapse-user-secret" aria-expanded="true"
                                aria-controls="collapse-user-secret">ที่อยู่ปัจจุบันที่สามารถติดต่อและจัดส่งเอกสาร</button>
                        </h2>
                        <div id="collapse-user-secret" class="accordion-collapse collapse show"
                            data-bs-parent="#accordion-user-secret">
                            <div class="accordion-body">

                                <div class="form-placeorder">

                                    <div class="row">
                                        <div class="col-md-6">
                                            <FormKit type="text" label="ชื่อ" name="FirstName" value="xxx"
                                                placeholder="ระบุชื่อ" validation="required" :validation-messages="{
                                                    required: 'กรุณาใส่ชื่อ'
                                                }" autocomplete="off" />
                                        </div>
                                        <div class="col-md-6">
                                            <FormKit type="text" label="นามสกุล" name="LastName" value="xxx"
                                                placeholder="ระบุนามสกุล" validation="required" :validation-messages="{
                                                    required: 'กรุณาใส่นามสกุล'
                                                }" autocomplete="off" />
                                        </div>
                                        <div class="col-md-6">
                                            <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" value="0111111111"
                                                maxlength="10" placeholder="ตัวอย่าง 0987654321"
                                                validation="required|+length:10|number" :validation-messages="{
                                                    required: 'กรุณาใส่หมายเลขโทรศัพท์',
                                                    length: 'หมายเลขโทรศัพท์มีจำนวน 10 หลัก',
                                                    number: 'กรุณาใส่เฉพาะตัวเลขเท่านั้น',
                                                }" autocomplete="off" />
                                        </div>
                                        <div class="col-md-6">
                                            <FormKit type="email" label="อีเมล" name="Email" value="xxx@xxx.com"
                                                placeholder="ตัวอย่าง abc@email.com" validation="required|email"
                                                :validation-messages="{
                                                    required: 'กรุณาใส่อีเมล',
                                                    email: 'รูปแบบอีเมลไม่ถูกต้อง'
                                                }" autocomplete="off" />
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
</script>