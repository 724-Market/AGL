<template>
  <ElementsModalAlert v-if="isError" :is-error="isError" :message="messageError" :reload="false" />
  <div class="card" v-for="item in packageList" v-bind:key="item.RefCompanyID" v-else>
    <div class="card-body">

      <div class="package-item-new">
        <div class="detail">
          <figure class="brand">
            <img :src="getCompanyPath(item.PackageResult[0].CompanyImage)" alt="" />
          </figure>
          <div class="topic">
            <!-- <h4 class="title">
              พ.ร.บ. สำหรับ{{ item.CarTypeName }}{{ item.PackageResult[0].UseCarName }}
            </h4> -->
            <h4 class="title">
              พ.ร.บ. {{ item.PackageResult[0].CompanyName }}
            </h4>
            <div class="more">
              <a class="fa-icon" href="#" data-bs-toggle="modal" data-bs-target="#ModalCoverage">คลิกดูรายละเอียด</a>
            </div>
          </div>
        </div>

        <div class="tags">
          <span class="badge">{{ item.CompanyCode }}</span>
          <span class="badge-bg-success" v-if="item.IsOnlineActive"><i
              class="fa-solid fa-bolt"></i>ได้กรมธรรม์ทันที</span>
          <span class="badge-bg-orange" v-else><i class="fa-solid fa-clock-four"></i>ได้กรมธรรม์ 1-3 วันทำการ</span>
          <span class="badge-secondary" v-if="item.IsTaxInclude"><i
              class="fa-regular fa-memo-circle-check"></i>พร้อมใบกำกับภาษี</span>
        </div>

        <div class="action">
          <div class="price">
            <span class="actual-price">{{
              getCurrency(item.PackageResult[0].PriceACT)
            }}</span>
            <span class="promotion">ค่าส่งเสริมการขาย
              {{ getCurrency(item.PackageResult[0].AgentComDiscount) }} บาท</span>
          </div>
          <a class="btn-primary" @click="getPackageItem(item)"> เลือกแพ็กเกจนี้ </a>
          <span v-show="item.CountOfPolicy > 0">ขายแล้ว {{ item.CountOfPolicy }} งาน</span>
        </div>
      </div>

    </div>
  </div>

  <!-- <PagingList :current-page="currentPage" :length-page="lengthPage" :total-record="totalRecord" @change-page="handlerChangePage"></PagingList> -->

  <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
</template>

<script setup lang="ts">
import type { IChecklist } from "~/shared/entities/checklist-entity";
import type { IPackageResponse, Paging } from "~/shared/entities/packageList-entity";

const emit = defineEmits(["changeChecklist", "changeSelect", "changePage"])
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: Boolean
  },
  checklist: {
    type: Array<IChecklist>,
    default: Array<IChecklist>,
  },
  isError: {
    type: Boolean,
    default: Boolean
  },
  messageError: {
    type: String,
    default: String
  },
  packageList: {
    type: Array<IPackageResponse>,
    default: Array<IPackageResponse>,
  },
  pages: {
    type: Object,
    default: Object,
  }
})
const totalRecord = ref(0)
const currentPage = ref(1)
const lengthPage = ref(5)
const redirectUrl = ref("")
const checklist: globalThis.Ref<IChecklist[]> = ref([
  {
    id: "1",
    className: "",
    desc: "เลือกแพ็กเกจ",
  },
]);
const packageList: globalThis.Ref<IPackageResponse[]> = ref([]);

const isSelect: globalThis.Ref<Boolean> = ref(false);


const onLoad = onMounted(() => {
  // init data
  isSelect.value = false;
  if (props.checklist) {
    checklist.value = props.checklist
  }
  if (props.packageList) {
    packageList.value = props.packageList
  }
  if (props.pages) {
    const _props = props.pages as Paging
    totalRecord.value = _props.TotalRecord
    lengthPage.value = _props.Length
    currentPage.value = _props.Page
    redirectUrl.value = _props.RedirectUrl
  }
})

watch(
  () => props.packageList,
  () => {
    //console.log('packageList value changed', props.packageList)
    if (props.packageList.length > 0) {
      packageList.value = props.packageList
    }

  }
)

watch(
  () => props.checklist,
  () => {
    //console.log('checklist value changed', props.checklist)
    if (props.checklist.length > 0) {
      checklist.value = props.checklist
    }

  }
)

watch(
  () => props.pages,
  () => {
    console.log('pages value changed', props.pages)
    if (props.pages) {
      const _props = props.pages as Paging
      totalRecord.value = _props.TotalRecord
      lengthPage.value = _props.Length
      currentPage.value = _props.Page
      redirectUrl.value = _props.RedirectUrl
    }

  }
)
watch(
  () => props.isLoading,
  () => {
    //console.log('loading value changed', props.isLoading)


  }
)
// event hanlder function additional
const getCompanyPath = (CompanyImage: string): string => {
  const image = useUtility().getCompanyImage() + CompanyImage.replace("LOGO", "logo");

  return image;
};
const getCurrency = (currency: number): string => {
  const formatCurrency = useUtility().getCurrency(currency);

  return formatCurrency;
};
const getPackageItem = (item: IPackageResponse) => {
  isSelect.value = true;

  emit("changeSelect", true, item)

  checklist.value[0].className = "current";
  emit("changeChecklist", checklist.value)
};

// hanlder page function
const handlerChangePage = (page: number, lengPage: number) => {
  emit("changePage", page, lengPage)
}
</script>
