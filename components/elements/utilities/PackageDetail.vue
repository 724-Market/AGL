<template>

  <div class="pricing-detail">

    <div class="pricing-highlight"></div>

    <table class="table-pricing-detail" v-if="packageDetail.ProductMainPlan">
      <colgroup>
        <col class="first-column">
        <col class="last-column">
      </colgroup>
      <thead>
        <tr>
          <td></td>
          <th scope="col">
            <div class="package-header">
              <h4 class="package-title">{{ packageDetail.ProductMainPlan.Title }}</h4>
              <p v-if="packageDetail.ProductMainPlan.IsRecommend" class="package-badge"><span
                  class="badge-warning">คุ้มมากกก</span></p>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="headgroup">
          <th scope="row"></th>
          <td>
            <h5 class="package-name"><span>{{ packageDetail.ProductMainPlan.Name }}</span></h5>
            <p class="package-excerpt">{{ packageDetail.ProductMainPlan.Details }}</p>
            <!-- <button type="button" class="btn-gray btn-action" title="สมัครใช้งานแพ็กเกจนี้">สมัครใช้งานแพ็กเกจนี้</button> -->
          </td>
        </tr>

        <tr>
          <th scope="colgroup" colspan="2" class="group-title">รายการสินค้า</th>
        </tr>
        <tr v-for="item in packageDetail.ProductFeature">
          <th scope="row" class="group-item">{{ item.Name }}</th>
          <td class="check-list">
            <span v-if="item.IsActive == 1" class="active"><i class="icon"></i><b>มี</b></span>
            <span v-else class="inactive"><i class="icon"></i><b>ไม่มี</b></span>
          </td>
        </tr>

        <tr>
          <th scope="colgroup" colspan="2" class="group-title">สิทธิพิเศษต่างๆ ที่จะได้รับ</th>
        </tr>
        <tr v-for="item in packageDetail.ProductBenefit">
          <th scope="row" class="group-item">{{ item.Name }}</th>
          <td class="check-list">
            <span v-if="item.IsActive == 1" class="active"><i class="icon"></i><b>มี</b></span>
            <span v-else class="inactive"><i class="icon"></i><b>ไม่มี</b></span>
          </td>
        </tr>
      </tbody>
    </table>

  </div>

</template>

<script setup lang="ts">
/////////////////////////////////////////
// Define props for the component
const props = defineProps(['packageDetail'])

</script>