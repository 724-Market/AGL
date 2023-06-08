<template>
  <div class="text-center d-flex justify-content-center">
    <div class="pagination p1">
      <ul>
        <a href="#" @click="previousPage" :class="{ disabled: currentPage === 1 }"
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
        <a href="#" :class="{ disabled: currentPage === totalPages }" @click="nextPage"
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
  totalPages: {
    type: Number,
    required: true,
  },
  redirectUrl: {
    type: String,
    required: true,
  },
});

const router = useRouter();
const previousPage = () => {
  if (props.currentPage > 1) {
    router.push(props.redirectUrl + "?current-page=" + (props.currentPage - 1));
  }
};
const nextPage = () => {
  if (props.currentPage < props.totalPages) {
    router.push(props.redirectUrl + "?current-page=" + (props.currentPage + 1));
    // this.$emit("page-change", props.currentPage + 1);
  }
};
const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    router.push(props.redirectUrl + "?current-page=" + page);
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
