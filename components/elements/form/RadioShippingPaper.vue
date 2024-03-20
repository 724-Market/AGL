<template>
  <FormKit type="radio" label="วิธีการรับกระดาษ" name="ShippingPaper" :options="props.option" validation="required"
    :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block" />
</template>

<script setup lang="ts">
import type { RadioOption } from "~/shared/entities/select-option";

const props = defineProps({
  option: {
    type: Object as () => RadioOption[],
  }
})
</script>