<template>
  <div class="card-stat">
    <div class="stat-wrapper has-info">

      <div class="stat-header">
        <h5 class="topic">จำนวนผู้ช่วย</h5>
        <span class="value"> {{ usersLimitRes?.CurrentCount }}<small>/{{ usersLimitRes?.MaxCount }}</small></span>
      </div>

      <div class="stat-action">
        <figure class="figure">
          <i class="fa-duotone fa-users"></i>
        </figure>
      </div>

      <div class="stat-info">
        <template v-if="usersLimitRes?.CurrentCount < usersLimitRes?.MaxCount">
          <NuxtLink class="btn-secondary" to="/users/create">
            <i class="fa-solid fa-user-plus"></i>เพิ่มผู้ช่วย
          </NuxtLink>
        </template>
        <template v-else>
          <span class="btn-secondary disabled">
            <i class="fa-solid fa-user-plus"></i>เพิ่มผู้ช่วย
          </span>
        </template>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
// Define import
import type { UserLimitRes } from "~/shared/entities/user-entity"
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth"
import { storeToRefs } from "pinia"

// Define variables
const storeAuth = useStoreUserAuth()
const { AuthenInfo } = storeToRefs(storeAuth)
const router = useRouter()
const isLoading = ref(false)
const usersLimitRes: globalThis.Ref<UserLimitRes | undefined> = ref()

// Define props
const props = defineProps({
  userLimit: Object,
})

// on Mounted
const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    isLoading.value = true
    if (props.userLimit) {
      const _userLimitRes = props.userLimit as UserLimitRes
      usersLimitRes.value = _userLimitRes
    }
    isLoading.value = false
  } else {
    router.push("/login")
  }
})

// Watch
watch(
  () => props.userLimit,
  () => {
    if (props.userLimit) {
      const _userLimitRes = props.userLimit as UserLimitRes
      usersLimitRes.value = _userLimitRes
    }
  }
)
</script>