<template>
    <div class="card-footer">

        <nav aria-label="breadcrumb">
            <ol class="breadcrumb vertical fa-divider fa-icon" v-if="list && list.length>0">
                <p>{{ isTaxInclude }}</p>
                <!-- <li :class="item.className"><em><i class="fa-solid fa-circle-check" v-for="item in list" v-bind:key="item.id"></i>{{item.desc}}</em></li> -->
                <!-- <li :class="item.className"  v-for="item in list" :key="item.id"><em><i class="fa-solid fa-circle-check"></i>{{item.desc}}</em></li> -->
                <li :class="item.className" v-for="item in modifiedList" :key="item.id">
                    <em>
                        <i class="fa-solid fa-circle-check"></i>{{ item.desc }}
                    </em>
                </li>
            </ol>
        </nav>
    </div>
</template>
<script setup lang="ts">
import type { IChecklist } from "~~/shared/entities/checklist-entity";

const emit = defineEmits(['changeCheckSave'])

const props = defineProps({
    isTaxInclude: Boolean,
    list:{
        type:Array<IChecklist>,
        default: Array<IChecklist>,
    }

})
const checklist:globalThis.Ref<IChecklist[]>   = ref([])
const onLoad = onMounted( () => {
    
    //console.log(JSON.stringify(props.list))
    
})

const modifiedList = computed(() => {
  if (props.isTaxInclude) {
    return props.list;
  } else {
    // Exclude the last item if isTaxInclude is false
    return props.list.slice(0, -1);
  }
});
watch(
    props.list,
    ()=>{
        //console.log(JSON.stringify(props.list))
        if(props.list.length>0)
        {
            
            const filter = props.list.filter(x=>x.className=='current')
            const check = filter.length == props.list.length
            console.log(filter,check)
            emit('changeCheckSave',check)
        }
    }
)
</script>