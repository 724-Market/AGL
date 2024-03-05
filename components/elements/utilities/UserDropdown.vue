<template>
    <div class="user-dropdown">
        <a class="user-profile monito-dropdown dropdown-toggle" href="#" role="button" title="เครื่องมือจัดการส่วนผู้ใช้งาน"
            data-bs-toggle="dropdown" aria-expanded="false">
            <div class="user-info">
                <figure class="avatar">
                    <!-- img(src="/uploads/team-5.jpg", alt="") -->
                </figure>
                <div class="info">
                    <h5 class="name">{{ props.agentInfo.AgentProfile.UpdateUser }}</h5>
                    <span class="level"><i class="fa-duotone fa-sparkles"></i> {{ agentLevel }}</span>
                </div>
            </div>
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
            <li class="announcement">ช่วงนี้ฝนตกบ่อย ดูแลสุขภาพด้วยนะครับ</li>
            <li :class="['announcement', affiliateExpireClass]">สมาชิกจะสิ้นสุด {{ useUtility().formatDate(props.agentInfo.PlanProduct.Main[0].ExpireDate, "ShortDate") }} <a href="#">คลิกเพื่อต่ออายุสมาชิก</a></li>
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

// Given date string
const givenDateString = useUtility().formatDate(props.agentInfo.PlanProduct.Main[0].ExpireDate, "YYYY-MM-DD");

// Convert the given date string to a Date object
const givenDate = new Date(givenDateString);

// Get today's date
const today = new Date();

// Calculate the difference in milliseconds
const differenceInMilliseconds = givenDate.getTime() - today.getTime();

// Convert milliseconds to days
const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));


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

// Computed property to determine the class based on modalType
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

// Computed property to determine the class based on modalType
const affiliateExpireClass = computed(() => {
  if (differenceInDays < 30) {  
      return 'is-warning'
  } else {
      return 'info'
  }
})
</script>