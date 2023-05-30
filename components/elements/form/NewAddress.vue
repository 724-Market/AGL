<template>
    <div class="col-6">
        <FormKit type="text" label="ตั้งชื่อเรียกรายการนี้" name="LabelAddress"
            placeholder="เพื่อให้ง่ายต่อการเรียกใช้งานครั้งต่อไป" validation="required"
            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
    </div>
    <div class="col-6">
        <FormKit type="text" label="หมายเลขโทรศัพท์" name="PhoneNumber" placeholder="098765XXXX" validation="required"
            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
    </div>
    <div class="col-sm-4 col-lg-3">
        <FormKit type="select" label="คำนำหน้าผู้รับ" name="Title" placeholder="คำนำหน้า" :options="{
            mr: 'นาย',
            mrs: 'นาง',
            ms: 'นางสาว',
            others: 'ไม่ระบุ',
        }" validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
    </div>
    <div class="col-sm-8 col-lg-4">
        <FormKit type="text" label="ชื่อผู้รับ" name="FirstName" placeholder="ชื่อ" validation="required"
            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
    </div>
    <div class="col-md-12 col-lg-5">
        <FormKit type="text" label="นามสกุลผู้รับ" name="LastName" placeholder="นามสกุล" validation="required"
            :validation-messages="{ required: 'กรุณาใส่ข้อมูล' }" autocomplete="false" />
    </div>

    <ElementsFormAddress />
</template>