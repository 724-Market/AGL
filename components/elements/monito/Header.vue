<template>
    <div class="col">
        <div class="header">

            <header class="head-logo" v-if="showLogoHeader">
                <div class="logo">
                    <NuxtLink to="/" title="724 Market">724 Market</NuxtLink>
                </div>
            </header>

            <header class="head-group" v-if="showPageHeader">
                <h1 class="page-title">{{ props.pageTitle }}</h1>
                <nav aria-label="breadcrumb">
                    <ol class="breadcrumb fa-divider">
                        <li class="visited">
                            <NuxtLink to="/main" title="หน้าหลัก">หน้าหลัก</NuxtLink>
                        </li>
                        <li><em>{{ props.pageCategory }}</em></li>
                    </ol>
                </nav>
            </header>

            <nav aria-label="breadcrumb" v-if="showPageSteps">
                <ol class="breadcrumb dot counter">
                    <li v-for="item in menus" :key="item.step" :class="getClassName(step, item)"
                        :aria-current="step == item.step ? 'page' : undefined">
                        <!-- <NuxtLink :to="item.url" v-if="item.step <= step">{{ item.name }}</NuxtLink> -->
                        <NuxtLink :to="item.url" v-if="item.step <= step" @click="clickStep(item.step, item.url)">{{
                            item.name }}</NuxtLink>
                        <em v-else>{{ item.name }}</em>
                    </li>
                </ol>
            </nav>

        </div>
    </div>
</template>

<script lang="ts" setup>
// Props from page setup
const props = defineProps({
    pageTitle: String,
    pageCategory: String,
    showPageSteps: Boolean,
    showPageHeader: Boolean,
    showLogoHeader: Boolean
})
const router = useRouter();
const step = ref(0)
const menus = ref([
    { step: 1, url: '/order/compulsory/information', name: 'กรอกข้อมูล' },
    { step: 2, url: '/order/compulsory/packages', name: 'เลือกแพ็คเกจ' },
    { step: 3, url: '/order/compulsory/placeorder', name: 'ข้อมูลสั่งซื้อ' },
    { step: 4, url: '/order/compulsory/payment', name: 'วิธีชำระเงิน' },
    { step: 5, url: '/order/compulsory/summary', name: 'สรุปรายการ' }
])
const onLoad = onMounted(() => {
    const menu_step = useStateMenu().getStepMenuFromUri()
    step.value = menu_step

    // validate State 
    //useStateMenu().checkStateMenu(menu_step)
})
const getClassName = (step: number, item: any): string => {
    let className = ""
    if (step >= item.step) {
        if (step == item.step) className = "current"
        else className = "visited"
    }
    return className
}
const clickStep = async (step: number, url: string) => {
    useStateMenu().setStateMenu(step);
    router.push(url);
}
</script>