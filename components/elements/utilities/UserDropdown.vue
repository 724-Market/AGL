<template>
  <div class="user-dropdown">
    <a class="user-profile monito-dropdown dropdown-toggle" href="#" role="button" title="เครื่องมือจัดการส่วนผู้ใช้งาน"
      data-bs-toggle="dropdown" aria-expanded="false">
      <div class="user-info">
        <figure class="avatar">
          <!-- img(src="/uploads/team-5.jpg", alt="") -->
        </figure>
        <div class="info">
          <h3 class="name">{{ AMNo }}</h3>
          <span class="level"><i class="fa-duotone fa-sparkles"></i> {{ AMLevel }}</span>
        </div>
      </div>
    </a>
    <ul class="dropdown-menu dropdown-menu-end">
      <li class="announcement">ช่วงนี้ฝนตกบ่อย ดูแลสุขภาพด้วยนะครับ</li>
      <li class="announcement is-warning">สมาชิกจะสิ้นสุด 19 มกราคม 2567 <a href="#">คลิกเพื่อต่ออายุสมาชิก</a></li>
      <li><a class="dropdown-item" href="#"><span class="icon-user">ข้อมูลสมาชิก</span></a></li>
      <li><a class="dropdown-item" href="#"><span class="icon-gears">การตั้งค่า</span></a></li>
      <li><a class="dropdown-item" href="#"><span class="icon-gift">สิทธิพิเศษสำหรับคุณ</span></a></li>
      <li>
        <hr class="dropdown-divider">
      </li>
      <li><a class="dropdown-item" href="#"><span class="icon-calendar-star">กิจกรรม</span></a></li>
      <li><a class="dropdown-item" href="#"><span class="icon-badge-percent">โปรโมชั่น</span></a></li>
      <li>
        <hr class="dropdown-divider">
      </li>
      <li><a class="dropdown-item" href="#"><span class="icon-life-ring">แนะนำการใช้งาน</span></a></li>
      <li><a class="dropdown-item" href="#"><span class="icon-help">ติดต่อเจ้าหน้าที่</span></a></li>
      <li>
        <hr class="dropdown-divider">
      </li>
      <li><a class="dropdown-item" href="#"><span class="icon-book-law">ข้อกำหนดและเงื่อนไข</span></a></li>
      <li><a class="dropdown-item" href="#"><span class="icon-user-lock">นโยบายคุ้มครองข้อมูลส่วนบุคคล</span></a></li>
      <li>
        <hr class="dropdown-divider">
      </li>
      <li><a class="dropdown-item" href="#" @click="logout"><span class="icon-run">ออกจากระบบ</span></a></li>
    </ul>
  </div>
</template>

<script setup>
/////////////////////////////////////////
// Import stores
import { useAgentProfileStore } from '~/stores/user/agentProfile'

// Use stores
const agentProfileStore = useAgentProfileStore()
await useAsyncData(agentProfileStore.fetch)
const { AMType, AMId, AMNo, AMLevel, isAMAffiliate } = storeToRefs(agentProfileStore)

/////////////////////////////////////////
// Import
import { getActivePinia } from "pinia"

// Define router
const router = useRouter()

// Function to handle logout
const logout = (event) => {
  event.preventDefault() // Prevent the default behavior of the anchor tag

  // Perform logout operations, clear tokens, user data, etc.
  // Reset Pinia store
  getActivePinia()._s.forEach(store => {
    store.$reset() // Reset the store's state
    store.$dispose() // Dispose of the store instance
    sessionStorage.removeItem(store.$id) // Remove sessionStorage of the store instance

    // Remove sessionStorage
    sessionStorage.removeItem('useStoreNoticePayment')
    sessionStorage.removeItem('useStorePayment')
    sessionStorage.removeItem('useStorePackageList')
    sessionStorage.removeItem('useStoreFeeLimit')
    sessionStorage.removeItem('AgentInfo')

    // Remove localStorage
    localStorage.removeItem('useStoreInformation')
  })

  // Redirect to the login page after logout
  router.push('/agent/login')
}
</script>