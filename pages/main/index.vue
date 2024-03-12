<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <div class="row">
      <div class="col col-main">

        <ElementsUtilitiesUserProfileBar />

        <div id="checkpoints" class="card-checkpoint-stack">

          <ElementsCheckpointCheckPointOTP />

          <ElementsCheckpointCheckPointBankAccount />

          <ElementsCheckpointCheckPointNonLifeLicense />

          <ElementsCheckpointCheckPointEKYC />

        </div>

        <ElementsUtilitiesPackagesCards :planList="affiliateProductPlanList" @on-select-package="handleSelectPackage" />

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
  router.push({ path: '/main/select-plan/' + planId })

  // new Promise((r) => setTimeout(r, 3000))
  // alert(`Selected: Plan ID - ${planId}, Plan Code - ${planCode}`)
  // openLoadingDialog(false)

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