<template>
  <div class="clearfix">
    <div class="row">
      <div class="col-lg-4 col-xl-4 col-sm-6">
        <div class="hint-text">
          <span class="fw-bol">แสดง : </span>
          <select v-model="lengthPage" @change="changeLengthPage">
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
      <div class="col-sm-6 col-lg-8 col-xl-8 d-flex justify-content-end" v-if="currentPage">
        <!-- <div class="hint-text">แสดง : <b>5</b> จากทั้งหมด {{ totalRecord }} รายการ</div> -->
        <ul class="pagination">
          <li class="page-item" @click="previousPage" v-show="currentPage.value > 1"><a class="btn btn-light btn-sm"><i
                class="fa-sharp fa-solid fa-arrow-left"></i>
              ก่อนหน้า</a></li>
          <li :class="{ 'page-item': true, 'active': page.value === currentPage.value }" v-for="page in totalPages"
            :key="page.id" @click="goToPage(page)"><a href="#" class="page-link"><span class="text-center">{{ page.text
            }}</span></a></li>
          <li class="page-item" @click="nextPage" v-show="currentPage.value < totalPages.length">
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
import { Pages } from '~/shared/entities/pages-entity';


const emit = defineEmits(["ChangePage"])
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
const lengthPage = ref(0)
const currentPage: globalThis.Ref<Pages | null> = ref(null);
const redirect = ref('')
const totalPages: globalThis.Ref<Pages[]> = ref([]);
const router = useRouter();

const onLoad = onMounted(() => {
  if (window.location.pathname) {
    redirect.value = window.location.pathname

  }

  currentPage.value = {
    id: props.currentPage.toString(),
    start: props.currentPage + 1,
    value: props.currentPage,
    text: props.currentPage.toString(),
  }
  lengthPage.value = props.lengthPage

  //console.log(props.currentPage)
  CalculateTotalPage()
});

watch(
  () => props.totalRecord,
  (totalRecord) => {
    CalculateTotalPage()
  }
)
watch(
  () => props.lengthPage,
  (totalRecord) => {
    lengthPage.value = props.lengthPage
  }
)
const CalculateTotalPageMore = () => {
  const maxPageCount = 7
  // const pageMore = 7
  // const totalRecord = 100
  if (currentPage.value) {
    //console.log(currentPage.value, props.totalRecord, props.lengthPage)
    const total_pages = Math.ceil(props.totalRecord / lengthPage.value);
    const array: Pages[] = []
    array.push({
      id: '1',
      start: 0,
      text: '1',
      value: 1
    })

    //console.log(currentPage.value.start)
    for (let i = currentPage.value.start; i <= currentPage.value.start + maxPageCount; i++) {
      if (i <= total_pages) {
        // กรณียังมีหน้าถัดไปเหลืออยู่
        if (i == maxPageCount + currentPage.value.start) {
          if (array[array.length - 1].value < total_pages) {
            array.push({
              id: i.toString(),
              start: i,
              text: '...',
              value: -1
            })
          }
          // แสดงหน้าสุดท้าย
          array.push({
            id: total_pages.toString(),
            start: 0,
            text: total_pages.toString(),
            value: total_pages
          })
        }
        else {
          array.push({
            id: i.toString(),
            start: 0,
            text: i.toString(),
            value: i
          })
        }

      }
    }

    totalPages.value = array
  }
  //console.log(totalPages.value)
}
const CalculateTotalPage = () => {
  const maxPageCount = 8
  const pageMore = 7
  //const totalRecord = 100
  if (currentPage.value) {
    //console.log(currentPage.value, props.totalRecord, props.lengthPage)
    const total_pages = Math.ceil(props.totalRecord / lengthPage.value);
    const array: Pages[] = []
    for (let i = 1; i <= maxPageCount; i++) {
      if (i <= total_pages) {
        // แสดง more page
      if (i == pageMore) {
        array.push({
          id: i.toString(),
          start: (currentPage.value.start + pageMore) - 1,
          text: "...",
          value: -1
        })
        // กำหนดหน้าสุดท้าย
      } else if (i == maxPageCount) {

        array.push({
          id: total_pages.toString(),
          start: 0,
          text: total_pages.toString(),
          value: total_pages
        })
      }
      // แสดงหน้าปกติ
      else {
        array.push({
          id: i.toString(),
          start: 0,
          text: i.toString(),
          value: i
        })
      }
      }
      


    }
    // กำหนด page default
    if (array.length == 0) {
      array.push({
        id: '1',
        start: 0,
        text: '1',
        value: 1
      })
    }
    totalPages.value = array
  }
  //console.log(totalPages.value)
}
const previousPage = () => {
  if (currentPage.value) {
    if (currentPage.value.value > 1) {
      const p = currentPage.value.value - 1
      const page: Pages = {
        id: p.toString(),
        start: 0,
        text: p.toString(),
        value: p
      }
      currentPage.value = page
      goToPage(currentPage.value)

    }
  }

};
const nextPage = () => {
  if (currentPage.value) {
    if (currentPage.value.value < totalPages.value.length) {
      const p = currentPage.value.value + 1
      const page: Pages = {
        id: p.toString(),
        start: 0,
        text: p.toString(),
        value: p
      }
      currentPage.value = page
      goToPage(currentPage.value)
    }
  }


};
const goToPage = (page: Pages) => {
  currentPage.value = page
  emit("ChangePage", currentPage.value.value, lengthPage.value)
  if (currentPage.value.start < 1) {
    CalculateTotalPage()
  }
  else {
    CalculateTotalPageMore()
  }
};
const changeLengthPage = (payload: Event) => {
  if (currentPage.value) {
    goToPage(currentPage.value)
    emit("ChangePage", currentPage.value.value, lengthPage.value)
  }

}
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
}
</style>
