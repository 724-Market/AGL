<template>
  <div class="card-profile-bar">
    <div class="card-body">

      <div class="profile-bar">
        <div class="user-info">
          <figure class="avatar">
            <!-- <img src="/uploads/team-5.jpg" alt="" /> -->
          </figure>
          <div class="info">
            <h3 class="name">{{ props.agentInfo.AgentProfile.UpdateUser }}</h3>
            <span class="level"><i class="fa-duotone fa-sparkles"></i> {{ agentLevel }}</span>
            <ul class="profile-meta">
              <!-- <li>{{ props.agentInfo.PlanProduct.Main[0].ProductPlanName }}</li> -->
              <li>AM012311334</li>
              <!-- <li>• หมดอายุ {{ useUtility().formatDate(props.agentInfo.PlanProduct.Main[0].ExpireDate, "D MMM BBBB") }}</li> -->
              <li>• หมดอายุ 19 มีนาคม 2567</li>
              <li class="link">( <a href="#" title="ต่ออายุ">ต่ออายุ</a> | <a href="#" title="อัปเกรด">อัปเกรด</a> )
              </li>
            </ul>
          </div>
          <aside class="profile-bar-notice notice-warning">
            <div class="notice-text">กรุณาส่งหลักฐาน เพื่อยืนยันใบอนุญาตนายหน้าประกันวินาศภัย</div>
            <div class="notice-action"><a href="#" class="btn-warning" title="ดำเนินการต่อ">ดำเนินการต่อ</a></div>
          </aside>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps(['agentInfo'])

// Computed property to determine the class based on ModelAgent
const agentLevel = computed(() => {
  switch (props.agentInfo.AgentProfile.ModelAgent) {
    case '1':
      return 'Level I'
    case '2':
      return 'Level II'
    case '3':
      return 'Level III'
    case '4':
      return 'Level IV'
    default:
      return 'Level V'
  }
})
</script>