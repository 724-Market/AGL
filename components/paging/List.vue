<template>
  <div class="clearfix">
    <div class="row">
      <div class="col-lg-4 col-xl-4 col-sm-6">
        <div class="hint-text">
          <span class="fw-bol">แสดง : </span>
          <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>5</option>
            <option>10</option>
            <option>15</option>
            <option>20</option>
          </select>
          <span> จากทั้งหมด {{ totalRecord }} รายการ</span>
        </div>
      </div>
      <div class="col-sm-6 col-lg-8 col-xl-8 d-flex justify-content-end">
        <!-- <div class="hint-text">แสดง : <b>5</b> จากทั้งหมด {{ totalRecord }} รายการ</div> -->
        <ul class="pagination">
          <li class="page-item disabled"><a class="btn btn-light  btn-sm"><i class="fa-sharp fa-solid fa-arrow-left"></i>
            ก่อนหน้า</a></li>
          <li class="page-item active"><a href="#" class="page-link"><span class="text-center">1</span></a></li>
          <li class="page-item"><a href="#" class="page-link">2</a></li>
          <li class="page-item"><a href="#" class="page-link">3</a></li>
          <li class="page-item"><a href="#" class="page-link">4</a></li>
          <li class="page-item"><a href="#" class="page-link">5</a></li>
          <li class="page-item"><a href="#" class="page-link">...</a></li>
          <li class="page-item"><a href="#" class="page-link">12</a></li>
          <li class="page-item">
            <a class="btn btn-light  btn-sm"><i class="fa-sharp fa-solid fa-arrow-right"></i> หน้าถัดไป</a>
          </li>
        </ul>
      </div>
    </div>


  </div>
  <!-- <div class="text-center d-flex justify-content-center">
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
  </div> -->
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
const totalPages: globalThis.Ref<number[]> = ref([]);
const router = useRouter();
const onLoad = onMounted(() => {
  if (window.location.pathname) {
    redirect.value = window.location.pathname
  }
  console.log(redirect.value)
  CalculateTotalPage()
});

watch(
  () => props.totalRecord,
  (totalRecord) => {
    CalculateTotalPage()
  }
)

const CalculateTotalPage = () => {
  console.log(props.currentPage, props.totalRecord, props.lengthPage)
  const total_pages = Math.ceil(props.totalRecord / props.lengthPage);
  const array = []
  for (let i = 1; i <= total_pages; i++) {
    array.push(i)
  }
  if (array.length == 0) {
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
/* .show-entries {
  margin-top: 2px;
} */


.pagination li a {
  text-decoration: none;
  border: none;
  font-family: 'Prompt';
  font-style: normal;
  font-weight: 500;
  font-size: 15.11px;
  padding: 0.5rem 0.5rem !important;
  letter-spacing: 0.01em;
  /* gray 900 */

  color: #343A40 !important;
  margin-left: 6px !important;
  line-height: 35px;
  /* border-radius: 30px !important; */
  text-align: center;
  border-radius: 4px !important;
  width: 38px;
  height: 50px;
}

.pagination li a.btn {
  width: 117px;
  background: #FFFFFF !important;
  /* gray 300 */

  border: 1px solid #DEE2E6 !important;
  border-radius: 6px !important;
}

.pagination li a:hover {
  color: #666;
  text-decoration: none;
}

.pagination li a:hover.btn {
  background-color: #fff !important;
  border-color: #343a40 !important;
  color: #343a40 !important;
  text-decoration: none !important;
}

.pagination li.active a {
  background: #E9ECEF;
  text-decoration: none;
}

.pagination li.active a:hover {
  background: #E9ECEF;
}

.pagination li.disabled i {
  color: #ccc;
}

.pagination li i {
  font-size: 16px;
  padding-top: 6px
}

.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}</style>
