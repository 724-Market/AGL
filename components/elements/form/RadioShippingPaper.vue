<template>
    <FormKit type="radio" label="วิธีการรับกระดาษ" name="ShippingPaper" 
    :options="props.option"
    validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block" />
</template>

<style scoped>
.formkit-inner:has(.formkit-input[value="WALKIN" i])::before {
    font: var(--fa-font-solid);
    content: "\f1ad";
}

.formkit-inner:has(.formkit-input[value="DELIVERY" i])::before {
    font: var(--fa-font-solid);
    content: "\f674";
}
</style>

<script setup lang="ts">
import { RadioOption } from "~/shared/entities/select-option";

const props = defineProps({
  option: {
    type: Object as () => RadioOption[],
  }
})
</script>