<template>
  <div class="card">
    <div class="card-body">

      <h2 class="text-center" style="margin-bottom: 0.5em">เลือกแพ็กเกจที่เหมาะกับคุณ</h2>
      <p class="text-center" style="margin-bottom: 3em; width: min(100%, 640px); margin-inline: auto">
        สร้างร้านค้าออนไลน์ที่ทันสมัยและเป็นอิสระของแบรนด์คุณเอง ขายได้ทุกช่องทาง จัดการง่าย Sync
        ข้อมูลสินค้าและออเดอร์โดยอัตโนมัติ</p>

      <div class="pricing-table -card-style">
        <div class="pricing-card">
          <div class="package-header">
            <h4 class="package-title">แพ็กเกจเริ่มต้น</h4>
          </div>
          <p class="package-excerpt">เหมาะสำหรับผู้เริ่มต้นใช้งาน เรียนรู้และพัฒนาทักษะ พร้อมจะขยับสู่ระดับถัดไป</p>
          <h5 class="package-name"><span>ฟรี</span></h5>
          <a href="#" class="btn-gray btn-action" title="สมัครเลย">สมัครเลย</a>
          <div class="package-detail">
            <h6 class="topic">รายการสินค้า</h6>
            <ul class="check-list">
              <li class="inactive">ขายประกัน</li>
              <li>ขายทัวร์</li>
              <li>ขายรถมือสอง</li>
              <li>ขายการเงินการลงทุน</li>
            </ul>
          </div>
          <div class="package-detail">
            <h6 class="topic">สิทธิพิเศษต่างๆ ที่จะได้รับ</h6>
            <ul>
              <li>ส่วนลดซื้อสินค้าใช้เอง</li>
            </ul>
          </div>
        </div>

        <div class="pricing-card is-current">
          <div class="package-header">
            <h4 class="package-title">แพ็กเกจคุ้มค่าที่สุด</h4>
            <p class="package-badge"><span class="badge-warning">นิยมมาก</span></p>
          </div>
          <p class="package-excerpt">ดีที่สุดสำหรับพ่อค้าแม่ค้าออนไลน์ที่มีการเติบโต พร้อมขยายสาขาช่องทางการขาย</p>
          <h5 class="package-name"><span>ทดลองใช้ 30 วัน</span></h5>
          <a href="#" class="btn-primary btn-action" title="ใช้งานอยู่"><i class="fa-solid fa-check"></i>ใช้งานอยู่</a>
          <div class="package-detail">
            <h6 class="topic">รายการสินค้า</h6>
            <ul class="check-list">
              <li>ขายประกัน</li>
              <li>ขายทัวร์</li>
              <li>ขายรถมือสอง</li>
              <li>ขายการเงินการลงทุน</li>
            </ul>
          </div>
          <div class="package-detail">
            <h6 class="topic">สิทธิพิเศษต่างๆ ที่จะได้รับ</h6>
            <ul>
              <li>ส่วนลดซื้อสินค้าใช้เอง</li>
              <li>ค่าส่งเสริมการขาย</li>
              <li>ค่าแนะนำ</li>
              <li>ค่าสายงาน</li>
            </ul>
          </div>
        </div>

        <div class="pricing-card is-recommend">
          <div class="package-header">
            <h4 class="package-title">แพ็กเกจยอดนิยม</h4>
          </div>
          <p class="package-excerpt">เหมาะและดีที่สุดสำหรับนายหน้าที่ต้องการเครื่องมือที่สมบูรณ์แบบ ปลดทุกข้อจำกัดจัดเต็ม
            Max</p>
          <h5 class="package-name"><span>990 บาท</span><small>/ปี</small></h5>
          <a href="#" class="btn-secondary btn-action" title="อัปเกรดแพ็กเกจ"><i
              class="fa-regular fa-rocket-launch fa-beat fa-xs"></i>อัปเกรดแพ็กเกจ</a>
          <div class="package-detail">
            <h6 class="topic">รายการสินค้า</h6>
            <ul class="check-list">
              <li>ขายประกัน</li>
              <li>ขายทัวร์</li>
              <li>ขายรถมือสอง</li>
              <li>ขายการเงินการลงทุน</li>
            </ul>
          </div>
          <div class="package-detail">
            <h6 class="topic">สิทธิพิเศษต่างๆ ที่จะได้รับ</h6>
            <ul>
              <li>ส่วนลดซื้อสินค้าใช้เอง</li>
              <li>ค่าส่งเสริมการขาย</li>
              <li>ค่าแนะนำ</li>
              <li>ค่าสายงาน</li>
            </ul>
          </div>
        </div>

      </div>

    </div>
  </div>

  <div class="card">
    <div class="card-body">

      <h2 class="text-center" style="margin-bottom: 0.5em">จาก API</h2>
      <div class="pricing-table -card-style">

        <template v-for="(item, planIndex) in planList" :key="planIndex">
          <div :class="['pricing-card', recommendClass(item.Plan.IsRecommend)]" :data-plan-id="item.Plan.ID"
            :data-plan-code="item.Plan.Code">

            <div class="package-header">
              <h4 class="package-title">{{ item.Plan.Title }}</h4>
              <p v-if="item.Plan.IsRecommend" class="package-badge"><span class="badge-warning">คุ้มมากกก</span></p>
            </div>

            <p class="package-excerpt">{{ item.Plan.Details }}</p>
            <h5 class="package-name"><span>{{ item.Plan.Name }}</span></h5>

            <button v-if="item.Plan.IsRecommend" type="button" class="btn-secondary btn-action" title="อัปเกรดแพ็กเกจ"
              @click="selectPackage(item.Plan.ID, item.Plan.Code)"><i
                class="fa-regular fa-rocket-launch fa-beat fa-xs"></i>อัปเกรดแพ็กเกจ</button>
            <button v-else type="button" class="btn-gray btn-action" title="สมัครใช้งานแพ็กเกจนี้"
              @click="selectPackage(item.Plan.ID, item.Plan.Code)">สมัครใช้งานแพ็กเกจนี้</button>

            <div class="package-detail">
              <h6 class="topic">รายการสินค้า</h6>
              <ul class="check-list">
                <li v-for="(feature, featureIndex) in item.Feature" :key="featureIndex"
                  :class="featureClass(feature.IsActive)">
                  {{ feature.Name }}
                </li>
              </ul>
            </div>

            <div class="package-detail">
              <h6 class="topic">สิทธิพิเศษต่างๆ ที่จะได้รับ</h6>
              <ul>
                <li v-for="(benefit, benefitIndex) in item.Benefit" :key="benefitIndex"
                  :class="benefitClass(benefit.IsActive)">
                  {{ benefit.Name }}
                </li>
              </ul>
            </div>
          </div>
        </template>

      </div>

    </div>
  </div>
</template>

<script setup>
/////////////////////////////////////////
// Define emit function to emit events on package
const emit = defineEmits(['onSelectPackage'])

// Function to emit the 'onSelectPackage' event with payload
const selectPackage = (planId, planCode) => emit('onSelectPackage', { planId, planCode })

/////////////////////////////////////////
// Define props for the component
const props = defineProps({
  planList: Array
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