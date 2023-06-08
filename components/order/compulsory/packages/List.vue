<template>
  <ElementsModalAlert v-if="isError" :message="messageError" />
  <div class="card" v-for="item in packageList" v-bind:key="item.RefCompanyID" v-else>
    <div class="card-body">
      <div class="package-item">
        <figure class="brand">
          <img :src="getCompanyPath(item.PackageResult[0].CompanyImage)" alt="" />
        </figure>

        <div class="detail">
          <h4 class="topic">
            พ.ร.บ. สำหรับรถยนต์นั่ง{{ item.PackageResult[0].UseCarName }}
          </h4>
          <div class="tags">
            <span class="badge">{{ item.CompanyName }}</span>
            <span class="badge-bg-success" v-if="item.IsOnlineActive"
              ><i class="fa-solid fa-bolt"></i>ได้กรมธรรม์ทันที</span
            >
            <span class="badge-bg-orange" v-else
              ><i class="fa-solid fa-clock-four"></i>ได้กรมธรรม์ 1-3 วันทำการ</span
            >
            <span class="badge-secondary"
              ><i class="fa-regular fa-memo-circle-check"></i>พร้อมใบกำกับภาษี</span
            >
          </div>
          <div class="more">
            <a
              class="fa-icon"
              href="#"
              data-bs-toggle="modal"
              data-bs-target="#ModalCoverage"
              >คลิกดูรายละเอียด</a
            >
          </div>
        </div>

        <div class="price">
          <span class="actual-price">{{
            getCurrency(item.PackageResult[0].PriceACT)
          }}</span>
          <span class="promotion"
            >ค่าส่งเสริมการขาย
            {{ getCurrency(item.PackageResult[0].AgentComDiscount) }} บาท</span
          >
        </div>

        <div class="action">
          <a class="btn-primary" @click="getPackageItem(item)"> เลือกแพ็กเกจนี้ </a>
          <span v-show="item.CountOfPolicy > 0"
            >ขายแล้ว {{ item.CountOfPolicy }} งาน</span
          >
        </div>
      </div>
    </div>
  </div>
  <PagingList
    :current-page="currentPage"
    :total-pages="totalPages"
    :redirect-url="redirectUrl"
  ></PagingList>
</template>

<script setup lang="ts">
import { IChecklist } from "~/shared/entities/checklist-entity";
import { IPackageResponse,Paging } from "~/shared/entities/packageList-entity";

const emit = defineEmits(["changeChecklist","changeSelect"])
const props = defineProps({
    checklist:{
        type:Array<IChecklist>,
        default: Array<IChecklist>,
    },
    isError:{
        type:Boolean,
        default: Boolean
    },
    messageError:{
        type:String,
        default: String
    },
    packageList:{
         type:Array<IPackageResponse>,
        default: Array<IPackageResponse>,
    },
    pages:{
        type:Object,
        default:Object,
    }
})
const totalPages = ref(0)
const currentPage = ref(0)
const redirectUrl = ref("")
const checklist: globalThis.Ref<IChecklist[]> = ref([
  {
    id: "1",
    className: "",
    desc: "เลือกแพ็กเกจ",
  },
]);
const packageList: globalThis.Ref<IPackageResponse[]> = ref([]);
const packageSelect: globalThis.Ref<IPackageResponse | undefined> = ref();
const isSelect: globalThis.Ref<Boolean> = ref(false);


const onLoad = onMounted(()=>{
    // init data
    isSelect.value = false;
    if(props.checklist){
        checklist.value =props.checklist
    }
    if(props.packageList){
        packageList.value = props.packageList
    }
    if(props.pages){
        const _props = props.pages as Paging
        totalPages.value = _props.TotalRecord
        currentPage.value = _props.Page
        redirectUrl.value = _props.RedirectUrl
    }
})

watch(
    () => props.packageList,
    () => {
        console.log('packageList value changed', props.packageList)
        if (props.packageList.length>0) {
            packageList.value = props.packageList
        }

    }
)

watch(
    () => props.checklist,
    () => {
        console.log('checklist value changed', props.checklist)
        if (props.checklist.length>0) {
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
            totalPages.value = _props.TotalRecord
            currentPage.value = _props.Page
            redirectUrl.value = _props.RedirectUrl
        }

    }
)

// event hanlder function additional
const getCompanyPath = (CompanyImage: string): string => {
  const image = useUtility().getCompanyImage() + CompanyImage.replace("LOGO", "logo");
  console.log(image);
  return image;
};
const getCurrency = (currency: number): string => {
  const formatCurrency = useUtility().getCurrency(currency);
  console.log(formatCurrency);
  return formatCurrency;
};
const getPackageItem = (item: IPackageResponse) => {
  isSelect.value = true;
  emit("changeSelect",true)
  packageSelect.value = item;

  if (!packageSelect.value) {

    checklist.value[0].className = "";
    emit("changeChecklist",checklist.value)
  } else {
    checklist.value[0].className = "current";
    emit("changeChecklist",checklist.value)
  }
};
</script>
