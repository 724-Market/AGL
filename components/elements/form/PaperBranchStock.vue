<template>
    <div class="form-placeorder">

        <section class="shippped-branch">

            <div class="row">

                <div class="col-sm-12 col-md-6">
                    <FormKit type="select" label="ภาค" name="Zone" placeholder="เลือกภาค" :options="{
                        north: 'ภาคเหนือ',
                        central: 'ภาคกลาง',
                        south: 'ภาคใต้',
                    }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                </div>
                <div class="col-sm-12 col-md-6">
                    <FormKit type="select" label="สาขา" namr="Branch" placeholder="เลือกสาขา" :options="{
                        headoffice: 'สำนักงานใหญ่',
                        rama9: 'พระรามเก้า',
                        bangbon: 'บางบอน',
                    }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                </div>

            </div>

            <aside class="branch-papers-stock inner-section">
                <div class="notice-info">กระดาษในคลัง <b>สาขาพระรามเก้า</b></div>

                <div class="row">
                    <div class="col-md-5">
                        <FormKit type="select" label="ชนิดกระดาษ" name="PaperType" placeholder="เลือกชนิดกระดาษ" :options="{
                            compulsory: 'พ.ร.บ.',
                            voluntary: 'ประเภท',
                        }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                    </div>
                    <div class="col-md-7">
                        <FormKit type="select" label="บริษัทประกันภัย" name="Company" placeholder="เลือกบริษัทประกันภัย"
                            :options="{
                                all: 'บริษัทประกันภัยทั้งหมด',
                                tip: 'ทิพยะ',
                                tmw: 'เออโก้',
                                vib: 'วิริยะ',
                                bki: 'กรุงเทพ',
                            }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                    </div>
                </div>
            </aside>

        </section>

    </div>
</template>

<script setup lang="ts">
</script>