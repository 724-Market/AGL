<template>
  <div class="selected-item">
    <figure class="brand">
      <i class="fa-duotone fa-file-shield"></i>
    </figure>

    <div class="detail">
      <h4 class="topic">ผู้เอาประกันภัยและกรมธรรม์</h4>
      <div class="info">
        <p class="description">{{ fullName }}</p>
      </div>
    </div>

    <div class="meta">
      <div class="tags">
        <span class="badge"><i :class="classNameCustomerType"></i>{{ CustomerType }}</span>
        <span class="badge-info"
          ><i :class="classNameDeliveryType"></i>{{ DeliveryType }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { CustomerOrderRequest } from "~/shared/entities/placeorder-entity";

const fullName = ref("");
const CustomerType = ref("");
const DeliveryType = ref("");
const classNameCustomerType = ref("");
const classNameDeliveryType = ref("");

const props = defineProps({
  insureDetail: {
    type: Object as () => CustomerOrderRequest,
  },
  deliveryType: String,
});

const onLoad = onMounted(() => {
  setInsureDetail();
});
const setInsureDetail = () => {
  CustomerType.value = "";
  DeliveryType.value = "";
  classNameCustomerType.value = "";
  classNameDeliveryType.value = "";

  if (props.insureDetail) {
    if (props.insureDetail.IsPerson && props.insureDetail.PersonProfile) {
      fullName.value =
        props.insureDetail.PersonProfile.FirstName +
        " " +
        props.insureDetail.PersonProfile.LastName;
      CustomerType.value = "บุคคลธรรมดา";
      classNameCustomerType.value = "fa-solid fa-people-simple";
    } else if (props.insureDetail.LegalPersonProfile) {
      fullName.value =
        props.insureDetail.LegalPersonProfile.ContactFirstName +
        " " +
        props.insureDetail.LegalPersonProfile.ContactLastName;
      CustomerType.value = "นิติบุคคล";
      classNameCustomerType.value = "fa-solid fa-buildings";
    }

    if (props.deliveryType) {
      if (props.deliveryType == "pdf") {
        DeliveryType.value = "รับเป็นไฟล์ PDF";
        classNameDeliveryType.value = "fa-solid fa-file-pdf";
      } else if (props.deliveryType == "print") {
        DeliveryType.value = "พิมพ์ลงกระดาษมัดจำ";
        classNameDeliveryType.value = "fa-solid fa-print";
      } else if (props.deliveryType == "postal") {
        DeliveryType.value = "จัดส่งตัวจริง";
        classNameDeliveryType.value = "fa-solid fa-truck-fast";
      }
    }
  }
};
watch(
  () => props.insureDetail,
  () => {
    setInsureDetail();
  }
);
watch(
  () => props.deliveryType,
  () => {
    setInsureDetail();
  }
);
</script>
