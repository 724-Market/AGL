<template>
  <div class="text-center d-flex justify-content-center">
    <div class="pagination p1">
      <ul>
        <a href="#" @click="previousPage" v-show="currentPage>1"
          ><li>{{ "<" }}</li></a
        >
        <a
          href="#"
          v-for="page in totalPages"
          :key="page"
          :class="{ 'is-active': page === currentPage }"
          @click="goToPage(page)"
          ><li>{{ page }}</li></a
        >
        <a href="#" @click="nextPage" v-show="currentPage < totalPages.length"
          ><li>{{ ">" }}</li></a
        >
      </ul>
    </div>
  </div>
</template>
<script setup lang="ts">
const props = defineProps({
  currentPage: {
    type: Number,
    required: true,
  },
  lengthPage: {
    type: Number,
    required: true,
  },
  totalRecord: {
    type: Number,
    required: true,
  },
});
const redirect = ref('')
const totalPages:globalThis.Ref<number[]> = ref([]);
const router = useRouter();
const onLoad = onMounted(() => {
  if(window.location.pathname){
    redirect.value = window.location.pathname
  }
  console.log(redirect.value)
  CalculateTotalPage()
});

watch(
  ()=>props.totalRecord,
  (totalRecord)=>{
    CalculateTotalPage()
  }
)

const CalculateTotalPage = ()=>{
  console.log(props.currentPage,props.totalRecord,props.lengthPage)
  const total_pages = Math.ceil(props.totalRecord / props.lengthPage);
  const array = []
  for(let i=1;i<=total_pages;i++){
    array.push(i)
  }
  if(array.length==0){
    array.push(1)
  }
  totalPages.value = array
}
const previousPage = () => {
  if (props.currentPage > 1) {
    router.push(redirect.value + "?currentPage=" + (props.currentPage - 1));
    
  }
};
const nextPage = () => {
  if (props.currentPage < totalPages.value.length) {
    router.push(redirect.value + "?currentPage=" + (props.currentPage + 1));
    // this.$emit("page-change", props.currentPage + 1);
  }
};
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value.length) {
    router.push(redirect.value + "?currentPage=" + page);
    //this.$emit("page-change", page);
  }
};
</script>
<style scope>
/* GENERAL STYLES */

.pagination {
  padding: 30px 0;
}

.pagination ul {
  margin: 0;
  padding: 0;
  list-style-type: none;
}

.pagination a {
  display: inline-block;
  padding: 10px 18px;
  color: #222;
}
/* ONE */
.p1 a {
  width: 40px;
  height: 40px;
  line-height: 40px;
  padding: 0;
  text-align: center;
  font-weight: bold;
}
.p1 a.is-active {
  background-color: #2ecc71;
  border-radius: 100%;
  color: #fff;
  font-weight: bold;
}
</style>
