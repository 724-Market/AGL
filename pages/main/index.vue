<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">


    <div class="row">
      <div class="col col-main">

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">รายละเอียด</h3>
          </div>
          <div class="card-body">

            <div v-for="(value, key) in affiliateProductPlanDetails" :key="key">
              {{ key }} : {{ value }}
            </div>

          </div>
        </div>

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">แพ็คเก็จ</h3>
          </div>
          <div class="card-body">

            <div v-for="(value, key) in affiliateProductPlanList" :key="key">
              {{ value.Plan.ID }}
              <br>
              <template v-for="(value2, key2) in value.Benefit" :key="key2">
                <li>{{ value2.Name }}</li>
              </template>
              <hr>
            </div>

          </div>
        </div>

      </div>
    </div>

    <ElementsDialogLoading :isShowLoading="isShowLoading" :loadingLogo="loadingLogo" :loadingText="loadingText" />

    <ElementsDialogModal :isShowModal="isShowModal" :modal-type="modalType" :modal-title="modalTitle"
        :modal-text="modalText" :modal-button="modalButton" @on-close-modal="handleCloseModal" />

    <ElementsDialogModaltest :resp="resp" />

  </NuxtLayout>
</template>

<script setup lang="ts">

// Define import

const affiliateProductPlanList = ref()
const affiliateProductPlanDetails = ref()

/////////////////////////////////////////
// Modal Loading
const isShowLoading = ref(false)
const loadingLogo = ref(false)
const loadingText = ref(false)

/////////////////////////////////////////
// Modal Dialog
const isShowModal = ref(false)
const modalType = ref('')
const modalTitle = ref('')
const modalText = ref('')
const modalButton = ref('')
let resp = ref<any>({})

// Function to handle close modal events
const handleCloseModal = async () => {
  isShowModal.value = false
}

const serverModal = async (serverCheck: any) => {
  resp = serverCheck
}

const dialogModal = async (serverCheck: any) => {
  resp = useUtility().responseCheck2(serverCheck)
}

onMounted(async () => {
  isShowLoading.value = true
  await loadAffiliateProductList()
  await loadAffiliateProductPlan('EBE5C549694847E7AE579AB5135312C2','00177311')
  dialogModal(['danger','error123456',null,'รับทราบจ้าาาา123456'])
  isShowLoading.value = false
})

const loadAffiliateProductList = async () => {

  const response = await useRepository().affiliate.getAffiliateProductPlanList()
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status == 'pass') {
    affiliateProductPlanList.value = response.apiResponse.Data
  }

  if (resultCheck.status == 'error') {
    //resultCheck.modalTitle = 'xxxxx'
    serverModal(resultCheck)
  }

  if (resultCheck.status == 'server-error') {
    serverModal(resultCheck)
  }

}

const loadAffiliateProductPlan = async (ProductPlanID: string, AgentID: string) => {

  const affiliateProductPlanlReq = {
    ProductPlanID: ProductPlanID,
    AgentID: AgentID
  }

  const response = await useRepository().affiliate.getAffiliateProductPlan(affiliateProductPlanlReq)
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status == 'pass') {
    affiliateProductPlanDetails.value = response.apiResponse.Data
  }

  if (resultCheck.status == 'error') {
    //resultCheck.modalTitle = 'xxxxx'
    serverModal(resultCheck)
  }

  if (resultCheck.status == 'server-error') {
    serverModal(resultCheck)
  }

}


/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = 'layout-monito'
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = 'หน้าหลัก'
const pageCategory = 'แดชบอร์ด'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-register single-register template-login'
  }
})
</script>