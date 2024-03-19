<template>
    <div class="card-shortcut is-success">
        <div class="shortcut-wrapper is-stack">
            <div class="shortcut-figure">
                <figure class="figure">
                    <i class="fa-duotone fa-scroll fa-swap-opacity"></i>
                </figure>
            </div>
            <div class="shortcut-info">
                <h5 class="topic">มูลค่ากระดาษที่ใช้ได้ <small>(บาท)</small></h5>
                <span class="value">{{ useUtility().getCurrency(AMCreditAvailable, 2) }}</span>
            </div>
            <div class="shortcut-action">
                <button type="button" class="btn-white btn-open-papers" v-if="!isHidden"><i
                        class="fa-solid fa-layer-group"></i>คลังกระดาษ</button>
                <NuxtLink class="btn-secondary" to="/papers/exchange"><i
                        class="fa-solid fa-file-circle-plus"></i>แลกกระดาษ
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

const isHidden = ref(true)

/////////////////////////////////////////
// Use stores
const agentInfoStore = useAgentInfoStore()
const { AMCreditAvailable } = storeToRefs(agentInfoStore)

</script>