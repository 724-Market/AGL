<template>
  <FormKit type="radio" label="การใช้ส่วนลด" name="DiscountMethods" :options="discountMethodsOption"
    validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block" />
</template>

<script lang="ts" setup>
import type { Max } from "~/shared/entities/payment-entity";
import type { RadioOption } from "~/shared/entities/select-option";

const props = defineProps({
  max: {
    type: Object as () => Max,
  }
})

const discountMethodsOption: globalThis.Ref<RadioOption[]> = ref([
  {
    label: 'หักส่วนลดเต็มจำนวน',
    value: 'fulldiscount',
    help: `ลดได้ - บาท`
  },
  {
    label: 'หักส่วนลดบางส่วน',
    value: 'partialdiscount',
    help: `ลดได้สูงสุด - บาท`,
  },
  {
    label: 'ชำระเบี้ยเต็มจำนวน',
    value: 'fullpay',
    help: `ไม่ใช้ส่วนลด`,
  }
])
const max: globalThis.Ref<Max | undefined> = ref()

const onLoad = onMounted(async () => {
  if (props.max) {
    max.value = props.max
  }
})

const setDiscountMethodsOption = async (max: Max | undefined) => {
  if (max != undefined) {
    if (max.ZeroCommission != undefined && max.SomeCommission != undefined) {
      discountMethodsOption.value = [
        {
          label: 'หักส่วนลดเต็มจำนวน',
          value: 'fulldiscount',
          help: `ลดได้ ${max.ZeroCommission ?? '-'} บาท`,
          attrs: { disabled: max.ZeroCommission == undefined ? true : false }
        },
        {
          label: 'หักส่วนลดบางส่วน',
          value: 'partialdiscount',
          help: `ลดได้สูงสุด ${max.SomeCommission ?? '-'} บาท`,
          attrs: { disabled: max.SomeCommission == undefined ? true : false }
        },
        {
          label: 'ชำระเบี้ยเต็มจำนวน',
          value: 'fullpay',
          help: `ไม่ใช้ส่วนลด`,
        }
      ]
    } else if (max.ZeroCommission != undefined && max.SomeCommission == undefined) {
      discountMethodsOption.value = [
        {
          label: 'หักส่วนลดเต็มจำนวน',
          value: 'fulldiscount',
          help: `ลดได้ ${max.ZeroCommission ?? '-'} บาท`,
          attrs: { disabled: max.ZeroCommission == undefined ? true : false }
        },
        {
          label: 'ชำระเบี้ยเต็มจำนวน',
          value: 'fullpay',
          help: `ไม่ใช้ส่วนลด`,
        }
      ]
    } else if (max.ZeroCommission == undefined && max.SomeCommission != undefined) {
      discountMethodsOption.value = [
        {
          label: 'หักส่วนลดบางส่วน',
          value: 'partialdiscount',
          help: `ลดได้สูงสุด ${max.SomeCommission ?? '-'} บาท`,
          attrs: { disabled: max.SomeCommission == undefined ? true : false }
        },
        {
          label: 'ชำระเบี้ยเต็มจำนวน',
          value: 'fullpay',
          help: `ไม่ใช้ส่วนลด`,
        }
      ]
    } else {
      discountMethodsOption.value = [
        {
          label: 'ชำระเบี้ยเต็มจำนวน',
          value: 'fullpay',
          help: `ไม่ใช้ส่วนลด`,
        }
      ]
    }
  }
}

watch(max, async (newMax) => {
  await setDiscountMethodsOption(newMax)
})

watch(
  () => props.max,
  async () => {
    if (props.max) {
      max.value = props.max
    }
  }
)
</script>