<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <div class="row">
      <div class="col col-main">

        <ElementsUtilitiesUserProfileBar :agent-info="AgentInfo" />

        <MainStatCards />

        <ElementsUtilitiesPackagesCards :planList="affiliateProductPlanList" @on-select-package="handleSelectPackage" />

        <div class="card">
          <div class="card-header">
            <h3 class="card-title">แพ็คเก็จ</h3>
          </div>
          <div class="card-body">

            <div v-for="(value, key) in affiliateProductPlanList" :key="key">
              <div><b><u>Title : {{ value.Plan.Title }}</u></b></div>
              <div>ID : {{ value.Plan.ID }}</div>
              <div>Code : {{ value.Plan.Code }}</div>
              <div>Name : {{ value.Plan.Name }}</div>
              <div>Details : {{ value.Plan.Details }}</div>
              <div>Price : {{ value.Plan.Price }}</div>
              <div>PeriodDay : {{ value.Plan.PeriodDay }}</div>
              <div>PeriodMinute : {{ value.Plan.PeriodMinute }}</div>
              <div>Sequence : {{ value.Plan.Sequence }}</div>
              <div>Tier : {{ value.Plan.Tier }}</div>
              <div>MinModelAgentNo : {{ value.Plan.MinModelAgentNo }}</div>
              <div>IsMain : {{ value.Plan.IsMain }}</div>
              <div>IsPublic : {{ value.Plan.IsPublic }}</div>
              <div>IsActive : {{ value.Plan.IsActive }}</div>
              <div>IsRecommend : {{ value.Plan.IsRecommend }}</div>
              <div>IsLicenseRequire : {{ value.Plan.IsLicenseRequire }}</div>
              <div>IsOneTime : {{ value.Plan.IsOneTime }}</div>
              <br>
              <b>Feature</b>
              <br>
              <template v-for="(value2, key2) in value.Feature" :key="key2">
                <li>{{ value2.Name }}</li>
              </template>
              <b>Benefit</b>
              <br>
              <template v-for="(value3, key3) in value.Benefit" :key="key3">
                <li>{{ value3.Name }}</li>
              </template>
              <br>
              <b>
                <button type="button" class="btn-info" @click="selectPlan(value.Plan.ID)">เลือก</button>
              </b>
              <br>
              ------------------------------
              <br>
            </div>

          </div>
        </div>

      </div>
    </div>

    <ElementsDialogLoading :propsLoading="loadingProps" />

    <ElementsDialogModal :isShowModal="isShowModal" :modal-type="modalType" :modal-title="modalTitle"
      :modal-text="modalText" :modal-button="modalButton" @on-close-modal="handleCloseModal" />

  </NuxtLayout>
</template>

<script setup lang="ts">

const router = useRouter();

// Define import
const affiliateProductPlanList = ref()
const affiliateProductPlanDetails = ref()
const AgentInfo = useUtility().getSession('AgentInfo') 

/////////////////////////////////////////
// Modal Loading
const loadingProps = ref({})
const openLoadingDialog = (isShowLoading = true, showLogo = false, showText = false) => {
  loadingProps.value = useUtility().createLoadingProps(isShowLoading, showLogo, showText)
}

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

/////////////////////////////////////////
// Define emit function from emit events on package component
const emit = defineEmits(['onSelectPackage'])

// Function to handle select package events
const handleSelectPackage = (payload: any) => {

  openLoadingDialog(true)

  const { planId, planCode } = payload

  new Promise((r) => setTimeout(r, 3000))

  alert(`Selected: Plan ID - ${planId}, Plan Code - ${planCode}`)

  openLoadingDialog(false)
}

/////////////////////////////////////////
// Mounted
onMounted(async () => {
  openLoadingDialog(true)
  await loadAffiliateProductList()
  openLoadingDialog(false)
})

/////////////////////////////////////////
const loadAffiliateProductList = async () => {

  const response = await useRepository().affiliate.getAffiliateProductPlanList()
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status == 'pass') {
    affiliateProductPlanList.value = response.apiResponse.Data
  }

  if (resultCheck.status == 'error') {
    //resultCheck.modalTitle = 'xxxxx'
    //serverModal(resultCheck)
  }

  if (resultCheck.status == 'server-error') {
    //serverModal(resultCheck)
  }

}

const selectPlan = async (id: string) => {
  if (id) {
    useUtility().getSession('AgentSelectPlan')
    router.push({ path: '/main/select-plan/' + id })
  }
}

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = ''
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = false

// Define page meta
const pageTitle = 'หน้าหลัก'
const pageCategory = 'หน้าหลัก'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-main single-main'
  }
})
</script>