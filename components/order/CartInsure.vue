<template>
  <div
    class="selected-item"
    v-if="
      (props.isPerson == true && props.personProfile) ||
      (props.isPerson == false && props.legalPersonProfile)
    "
  >
    <figure class="brand">
      <i class="fa-duotone fa-file-shield"></i>
    </figure>

    <div class="detail">
      <h4 class="topic">ผู้เอาประกันภัยและกรมธรรม์</h4>
      <div class="info">
        <p class="description">
          {{ getFullName(props.isPerson, props.personProfile, props.legalPersonProfile) }}
        </p>
      </div>
    </div>
    <div class="meta">
      <div class="tags">
        <span class="badge">
          <i class="fa-solid fa-people-simple" v-if="props.isPerson == true"></i>
          <i class="'fa-solid fa-buildings" v-else></i>
          {{
            getCustomerType(props.isPerson, props.personProfile, props.legalPersonProfile)
          }}</span
        >
        <span class="badge-info"
          ><i :class="classNameDeliveryType"></i>{{ DeliveryType }}</span
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
const fullName = ref("");
const CustomerType = ref("");
const DeliveryType = ref("");
const classNameCustomerType = ref("");
const classNameDeliveryType = ref("");

const props = defineProps({
  personProfile: Object,
  legalPersonProfile: Object,
  isPerson: Boolean,
  deliveryType: String,
  companyType: Object,
});

const onLoad = onMounted(async () => {
  await setInsureDetail();
});

const getFullName = (
  isPerson: boolean,
  personProfile: any,
  legalPersonProfile: any
): string => {
  let fullName = "";
  if (isPerson && personProfile) {
    const prefix = props.companyType?.find(
      (item: any) => item.value === props.personProfile?.PrefixID
    );
    if (prefix) {
      fullName =
        prefix.label + " " + personProfile.FirstName + " " + personProfile.LastName;
    } else {
      fullName = personProfile.FirstName + " " + personProfile.LastName;
    }
  } else if (legalPersonProfile) {
    const labelType = props.companyType?.find(
      (item: any) => item.value === props.legalPersonProfile?.PrefixID
    );
    //labelType.label = useUtility().getCompanyType(labelType);
    if (labelType) {
      // Check if labelType is not undefined
      fullName =
        useUtility().getCompanyType(labelType.label) +
        " " +
        legalPersonProfile.ContactFirstName;
    } else {
      fullName = legalPersonProfile?.PrefixID + " " + legalPersonProfile.ContactFirstName; // Fallback to PrefixID if labelType is undefined
    }
  }
  return fullName;
};
const getCustomerType = (
  isPerson: boolean,
  personProfile: any,
  legalPersonProfile: any
): string => {
  let CustomerType = "";
  if (isPerson == true) {
    CustomerType = "บุคคลธรรมดา";
  } else if (isPerson == false) {
    CustomerType = "นิติบุคคล";
  }
  return CustomerType;
};
const getCustomerTypeClass = (isPerson: boolean): boolean => {
  if (isPerson) {
    return true;
  } else {
    return false;
  }
};
const setInsureDetail = async () => {
  CustomerType.value = "";
  DeliveryType.value = "";
  classNameCustomerType.value = "";
  classNameDeliveryType.value = "";

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
};
watch(
  () => props.isPerson,
  () => {
    setInsureDetail();
  }
);
watch(
  () => props.personProfile,
  () => {
    setInsureDetail();
  }
);
watch(
  () => props.legalPersonProfile,
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
