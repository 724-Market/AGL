<template>
    <div class="user-dropdown">
        <a class="user-profile monito-dropdown dropdown-toggle" href="#" role="button" title="เครื่องมือจัดการส่วนผู้ใช้งาน"
            data-bs-toggle="dropdown" aria-expanded="false">
            <div class="user-info">
                <figure class="avatar">
                    <!-- img(src="/uploads/team-5.jpg", alt="") -->
                </figure>
                <div class="info">
                    <!-- <h5 class="name">{{ props.agentInfo.AgentProfile.UpdateUser }}</h5> -->
                    <h5 class="name">AM012213344</h5>
                    <span class="level"><i class="fa-duotone fa-sparkles"></i> {{ agentLevel }}</span>
                </div>
            </div>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
            <li class="announcement">ช่วงนี้ฝนตกบ่อย ดูแลสุขภาพด้วยนะครับ</li>
            <!-- <li :class="['announcement', affiliateExpireClass]">สมาชิกจะสิ้นสุด {{ useUtility().formatDate(props.agentInfo.PlanProduct.Main[0].ExpireDate, "ShortDate") }} <a href="#">คลิกเพื่อต่ออายุสมาชิก</a></li> -->
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
// Import
import { getActivePinia } from "pinia"

const props = defineProps(['agentInfo'])

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

// Computed property to determine the class base on ModelAgent
const agentLevel = computed(() => {
  if (!props.agentInfo || !props.agentInfo.AgentProfile) return 'Unknown Level'

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

// Computed property to determine the class based on PlanProduct ExpireDate
const affiliateExpireClass = computed(() => {
  const expireDate = props.agentInfo?.PlanProduct?.Main[0]?.ExpireDate
  if (!expireDate) return ''
  
  const givenDateString = useUtility().formatDate(expireDate, "YYYY-MM-DD");
  const givenDate = new Date(givenDateString);
  const today = new Date();
  const differenceInMilliseconds = givenDate.getTime() - today.getTime();
  const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));

  return differenceInDays < 30 ? 'is-warning' : 'info'
})
</script>