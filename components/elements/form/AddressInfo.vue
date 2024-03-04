<template>
    <div class="formkit-outer" v-bind:data-invalid="addressDataNotValidation === true ? 'true' : null">
        <div class="formkit-wrapper">
            <label class="formkit-label">ที่อยู่</label>
            <div class="formkit-inner">
                <div class="formkit-input address-info">
                    {{ addressData.No ? ('เลขที่ ' + addressData.No) : '' }}
                    {{ addressData.Moo ? ('หมู่ ' + addressData.Moo) : '' }}
                    {{ addressData.Place ? ('หมู่บ้าน/คอนโด ' + addressData.Place) : '' }}
                    {{ addressData.Room ? ('ห้อง ' + addressData.Room) : '' }}
                    {{ addressData.Building ? ('ตึก/อาคาร ' + addressData.Building) : '' }}
                    {{ addressData.Floor ? ('ชั้น ' + addressData.Floor) : '' }}
                    {{ addressData.Alley ? ('ซอย' + addressData.Alley) : '' }}
                    {{ addressData.Branch ? ('ตรอก/แยก ' + addressData.Branch) : '' }}
                    {{ addressData.Road ? ('ถนน' + addressData.Road) : '' }}
                    {{ addressData.SubDistrictLabel ?? '' }}
                    {{ addressData.DistrictLabel ?? '' }}
                    {{ addressData.ProvinceLabel ? ('จังหวัด' + addressData.ProvinceLabel) : '' }}
                    {{ addressData.postalCode ?? '' }}
                </div>
            </div>
        </div>
        <ul class="formkit-messages" v-if="addressDataNotValidation">
            <li class="formkit-message">กรุณาใส่ที่อยู่</li>
        </ul>
    </div>
</template>

<script setup>
/////////////////////////////////////////
// Define props for the component
const props = defineProps(['addressData', 'addressDataNotValidation'])

</script>