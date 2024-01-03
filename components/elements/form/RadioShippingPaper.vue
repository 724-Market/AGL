<template>
  <FormKit type="radio" label="วิธีการรับกระดาษ" name="ShippingPaper" :options="props.option" validation="required"
    :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block" />
</template>

<style scoped>
.formkit-inner:has(.formkit-input[value="walkin" i])::before {
  font: var(--fa-font-solid);
  content: "\f1ad";
}

.formkit-inner:has(.formkit-input[value="delivery" i])::before {
  font: var(--fa-font-solid);
  content: "\f48b";
}
</style>

<script setup lang="ts">
import type { RadioOption } from "~/shared/entities/select-option";

const props = defineProps({
  option: {
    type: Object as () => RadioOption[],
  }
})
</script>