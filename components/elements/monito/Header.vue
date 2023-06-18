<template>
    <div class="col">
        <div class="header">

            <nav aria-label="breadcrumb">
                <ol class="breadcrumb dot counter">
                    <li v-for="item in menus" :key="item.step" :class="getClassName(step,item)" :aria-current="step==item.step ? 'page' : undefined"><NuxtLink :to="item.url" v-if="step!=item.step">{{ item.name }}</NuxtLink><em v-else>{{item.name}}</em></li>
                </ol>
            </nav>

        </div>
    </div>
</template>
<script lang="ts" setup>
const step = ref(0)
const menus = ref([
    {step:1,url:'/order/compulsory/information',name:'กรอกข้อมูล'},
    {step:2,url:'/order/compulsory/packages',name:'เลือกแพคเกจ'},
    {step:3,url:'/order/compulsory/placeorder',name:'ข้อมูลสั่งซื้อ'},
    {step:4,url:'#',name:'วิธีชำระเงิน'},
    {step:5,url:'#',name:'สรุปรายการ'}
])
const onLoad = onMounted( () => {
    const menu_step = useUtility().getStepMenuFromUri()
    step.value = menu_step
    
})
const getClassName = (step:number,item:any):string=>{
    let className=""
    if(step>=item.step){
        if(step == item.step) className="current"
        else className="visited"
    }
    return className
}
</script>