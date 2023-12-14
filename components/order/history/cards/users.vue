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
                <template v-if="usersLimitRes?.CurrentCount && usersLimitRes?.CurrentCount < usersLimitRes?.MaxCount">
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
import {
    UserLimitRes
} from "~/shared/entities/user-entity";

// Import store
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
// using pinia
import { storeToRefs } from "pinia";
//define store
const storeAuth = useStoreUserAuth();
// define getter in store
const { AuthenInfo } = storeToRefs(storeAuth);
const router = useRouter();
const isLoading = ref(false);
const usersLimitRes: globalThis.Ref<UserLimitRes | undefined> = ref();

const props = defineProps({
  userLimit:Object,

});

const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    isLoading.value = true;
    //await loadUsersLimit();
    if(props.userLimit)
    {
      const _userLimitRes = props.userLimit as UserLimitRes
      usersLimitRes.value = _userLimitRes
    }
    isLoading.value = false;
  } else {
    router.push("/login");
  }
});

watch(
  ()=>props.userLimit,
  ()=>{
    if(props.userLimit)
    {
      const _userLimitRes = props.userLimit as UserLimitRes
      usersLimitRes.value = _userLimitRes
    }
  }
)

</script>