<template>

  <div class="pricing-detail">

    <div class="pricing-highlight"></div>

    <table class="table-pricing-detail">
      <colgroup>
        <col class="first-column">
        <col class="last-column">
      </colgroup>
      <thead>
        <tr>
          <td></td>
          <th scope="col">
            <div class="package-header">
              <h4 class="package-title">{{ planDetail.Title }}</h4>
              <p v-if="planDetail.IsRecommend" class="package-badge"><span class="badge-warning">คุ้มมากกก</span></p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="headgroup">
          <th scope="row"></th>
          <td>
            <h5 class="package-name"><span>{{ planDetail.Name }}</span></h5>
            <p class="package-excerpt">{{ planDetail.Details }}</p>
            <!-- <button type="button" class="btn-gray btn-action" title="สมัครใช้งานแพ็กเกจนี้">สมัครใช้งานแพ็กเกจนี้</button> -->
          </td>
        </tr>
        <tr>
          <th scope="colgroup" colspan="2" class="group-title">รายการสินค้า</th>
        </tr>
        <tr>
          <th scope="row" class="group-item">ประกัน<span>* ต้องมีใบอนุญาต</span></th>
          <td class="check-list"><span class="inactive"><i class="icon"></i><b>ไม่มี</b></span></td>
        </tr>
        <tr>
          <th scope="row" class="group-item">แพคเกจทัวร์</th>
          <td class="check-list"><span class="active"><i class="icon"></i><b>มี</b></span></td>
        </tr>
        <tr>
          <th scope="row" class="group-item">รถมือสอง</th>
          <td class="check-list"><span class="active"><i class="icon"></i><b>มี</b></span></td>
        </tr>
        <tr>
          <th scope="row" class="group-item">การลงทุน</th>
          <td class="check-list"><span class="active"><i class="icon"></i><b>มี</b></span></td>
        </tr>
        <tr>
          <th scope="colgroup" colspan="2" class="group-title">สิทธิพิเศษต่างๆ ที่จะได้รับ</th>
        </tr>
        <tr>
          <th scope="row" class="group-item">ค่าส่งเสริมการขาย</th>
          <td class="check-list"><span class="inactive"><i class="icon"></i><b>ไม่มี</b></span></td>
        </tr>
        <tr>
          <th scope="row" class="group-item">ค่าแนะนำ</th>
          <td class="check-list"><span class="active"><i class="icon"></i><b>มี</b></span></td>
        </tr>
        <tr>
          <th scope="row" class="group-item">ค่าสายงาน</th>
          <td class="check-list"><span class="active"><i class="icon"></i><b>มี</b></span></td>
        </tr>
      </tbody>
    </table>

  </div>

</template>

<script setup lang="ts">
/////////////////////////////////////////
// Define emit function to emit events on package
// const emit = defineEmits(['onSelectPackage'])

// Function to emit the 'onSelectPackage' event with payload
// const selectPackage = (planId, planCode) => emit('onSelectPackage', { planId, planCode })

/////////////////////////////////////////
// Define props for the component
// const planSummary = ref()
const props = defineProps({
  planDetail: Array,
  planBenefit: Object,
  planFeature: Object,
  planSummary: Array
})

/////////////////////////////////////////
// Compute the class based on the value of Feature IsActive
const featureClass = (IsActive) => {
  switch (String(IsActive)) {
    case '1':
      return 'active';
    case '0':
      return 'inactive';
    default:
      return '';
  }
}

// Compute the class based on the value of Benefit IsActive
const benefitClass = (IsActive) => {
  switch (String(IsActive)) {
    case '1':
      return 'active';
    case '0':
      return 'inactive'
    default:
      return '';
  }
}

// Compute the class based on the value of IsRecommend
const recommendClass = (IsRecommend) => {
  switch (IsRecommend) {
    case true:
      return 'is-recommend'
    case false:
      return ''
    default:
      return ''
  }
}

</script>