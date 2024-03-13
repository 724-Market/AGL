<template>
  <div class="card-profile-bar">
    <div class="card-body">

      <div class="profile-bar">
        <div class="user-info">
          <figure class="avatar">
            <!-- <img src="/uploads/team-5.jpg" alt="" /> -->
          </figure>
          <div class="info">
            <h3 class="name">{{ AMNo }}</h3>
            <span class="level"><i class="fa-duotone fa-sparkles"></i> {{ AMLevel }}</span>
            <span class="affiliate is-active" v-if="isAMAffiliate"><i
                class="fa-duotone fa-badge-check fa-swap-opacity"></i> Affiliate</span>
            <span class="affiliate" v-else><i class="fa-duotone fa-badge-check"></i> Affiliate</span>
            <ul class="profile-meta">
              <li>{{ AMPlanName }}</li>
              <li>• หมดอายุ {{ useUtility().formatDate(AMPlanExpire, 'ShortDate') }}</li>
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
/////////////////////////////////////////
// Use stores
const agentInfoStore = useAgentInfoStore()
const { AMNo, AMLevel, isAMAffiliate, AMPlanName, AMPlanExpire } = storeToRefs(agentInfoStore)
</script>