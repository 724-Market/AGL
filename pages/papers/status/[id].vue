<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <div class="row">
      <div class="col col-main">
        <div class="has-sticky">

          <ElementsUtilitiesTracking v-if="orderTrack" :order-track="orderTrack" :index-sequence="sequenceIndex"
            :index-current="currentIndex" :is-showchild="isShowChild" />

        </div>
      </div>

      <div class="col col-sidebar">
        <section class="site-sidebar is-sticky">

          <PapersOrderDetail :order-get="orderGet"
          :order-address="getOrderAddress" 
          v-if="orderGet" />

          <PapersSuborder :order-get="orderGet" :ordersub-feedelivery="ordersubFeeDel" :order-sub="orderSubAll"
            v-if="orderSubAll" @on-confirm-received="handleConfirmReceived"
            @on-cancel-papers-order="handleCancelPapersOrder" />

          <NuxtLink class="btn-back btn-gray" to="/papers">ย้อนกลับ</NuxtLink>

        </section>
      </div>

    </div>

    <ElementsDialogLoading :propsLoading="loadingProps" />

    <ElementsDialogModal :isShowModal="isShowModal" :modal-type="modalType" :modal-title="modalTitle"
      :modal-text="modalText" :modal-button="modalButton" @on-close-modal="handleCloseModal" />

    <ElementsDialogCancelPapersOrder :orderId="orderId" :isShowCancel="isShowCancel" :get-remark-list="getRemarkList"
      @on-submit-cancel="handleSubmitCancel" @on-close-cancel="handleCloseCancel" />

  </NuxtLayout>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia"
import type { DeliveryAddressRes, OrderListReq, OrderListRes, SubOrderListRes, RemarkListRes, RemarkListReq } from "~/shared/entities/paper-entity"
import type { TrackOrderReq, TrackOrderRes } from "~/shared/entities/track-entity"
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth"

// Define Variables
const orderGet: globalThis.Ref<OrderListRes | undefined> = ref()
const getOrderAddress: globalThis.Ref<DeliveryAddressRes | undefined> = ref();
const orderSub: globalThis.Ref<SubOrderListRes[] | undefined> = ref([])
const orderTrack: globalThis.Ref<TrackOrderRes[] | undefined> = ref([])
const ordersubFeeDel: globalThis.Ref<SubOrderListRes[] | undefined> = ref([])
const orderSubAll: globalThis.Ref<SubOrderListRes[] | undefined> = ref([])

let sequenceIndex: number = 0
let currentIndex: number = 0
let isShowChild: boolean

const storeAuth = useStoreUserAuth()
const { AuthenInfo } = storeToRefs(storeAuth)

const getRemarkList: globalThis.Ref<RemarkListRes[] | undefined> = ref([])

const route = useRoute()
const router = useRouter()

const orderId = ref('')

/////////////////////////////////////////
// Loading state after form submiting
const isLoading = ref(false)

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
const modalRedirectPath = ref('')

// Function to handle close modal events
const handleCloseModal = async () => {
  if (modalRedirectPath.value) {
    router.push({ path: modalRedirectPath.value })
  }
  else {
    isShowModal.value = false
  }
}

// Function show message modal events
const serverModal = async (serverCheck: any) => {
  isShowModal.value = true
  modalType.value = serverCheck.modalType
  modalTitle.value = serverCheck.modalTitle
  modalText.value = serverCheck.modalText
  modalButton.value = serverCheck.modalButton
}

/////////////////////////////////////////
// Cancel Dialog
const isShowCancel = ref(false)

/////////////////////////////////////////
// Define emit function to emit events on all status action
const emit = defineEmits(['onConfirmReceived', 'onCancelPapersOrder', 'onSubmitCancel', 'onCloseCancel'])

// Function to handle confirm received events
const handleConfirmReceived = async () => {

  openLoadingDialog(true)

  const req: OrderListReq = {
    OrderNo: orderId.value
  }

  const response = await useRepository().paper.confirmReceiveOrder(req)
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status === 'pass') {
    await reloadPage()
  }
  else if (resultCheck.status === 'error') {
    resultCheck.modalType = 'warning'
    serverModal(resultCheck)
    openLoadingDialog(false)
  }
  else if (resultCheck.status === 'server-error') {
    serverModal(resultCheck)
  }

  openLoadingDialog(false)
}

// Function to handle cancel papers order events (open Cancel Dialog only)
const handleCancelPapersOrder = async () => {

  openLoadingDialog(true)

  const req: RemarkListReq = {
    Type: "PAPER_ORDER_USER"
  }

  const response = await useRepository().paper.remark(req)
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status === 'pass') {
    getRemarkList.value = response.apiResponse.Data
    isShowCancel.value = true
    openLoadingDialog(false)
  }
  else if (resultCheck.status === 'error') {
    resultCheck.modalType = 'warning'
    serverModal(resultCheck)
    openLoadingDialog(false)
  }
  else if (resultCheck.status === 'server-error') {
    serverModal(resultCheck)
  }

  openLoadingDialog(false)
}

// Function to handle close cancel events from Cancel Dialog
const handleCloseCancel = async () => {
  isShowCancel.value = false
}

// Function to handle submit cancel events from Cancel Dialog
const handleSubmitCancel = async () => {
  isShowCancel.value = false
  await reloadPage()
}

/////////////////////////////////////////
// Function `reloadPage`
const reloadPage = async () => {

  openLoadingDialog(true)

  await loadOrderDetail(orderId.value)
  await loadSubDetail(orderId.value)

  openLoadingDialog(false)
}

/////////////////////////////////////////
// on Mounted
onMounted(async () => {

  if (AuthenInfo.value) {

    openLoadingDialog(true)

    // Handle the possibility of route.params.id being an array
    orderId.value = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id ?? ''

    await loadTrackOrderPaper(orderId.value)
    await loadOrderDetail(orderId.value)
    await loadSubDetail(orderId.value)

    openLoadingDialog(false)

  } else {

    router.push("/login")

  }
})

const loadTrackOrderPaper = async (orderNo: string) => {
  isLoading.value = true

  const treq: TrackOrderReq = {
    ReferenceID: orderNo,
  }
  const resTrackOrder = await useRepository().track.getOrderPaper(treq)
  if (
    resTrackOrder.apiResponse.Status &&
    resTrackOrder.apiResponse.Status == "200" &&
    resTrackOrder.apiResponse.Data
  ) {
    orderTrack.value = resTrackOrder.apiResponse.Data
    //Rever child//

    currentIndex = resTrackOrder.apiResponse.Data.findIndex(
      item => item && item.IsCurrent === true
    )
    if (currentIndex !== -1) {
      const currentItem = resTrackOrder.apiResponse.Data[currentIndex]
      if (currentItem && currentItem.Parent) {
        const currentIndex2 = currentItem.Child?.findIndex(
          item => item && (item.StatusCode === 'Success' || item.StatusCode === 'CancelByUser' || item.StatusCode === 'CancelByAdmin'))
        if (currentIndex2 !== -1) {
          sequenceIndex = currentIndex
          isShowChild = true
        } else if (currentIndex !== 0) {
          sequenceIndex = currentIndex - 1
          isShowChild = false
        } else {
          sequenceIndex = currentIndex
          isShowChild = false
        }
      }


    } else {
      console.log("No item with IsCurrent: true found")
    }
  }

  isLoading.value = false
}

const loadSubDetail = async (orderNo: string) => {
  const req: OrderListReq = {
    OrderNo: orderNo,
  }
  const resPSubOrder = await useRepository().paper.getSubOrderList(req)
  if (
    resPSubOrder.apiResponse.Status &&
    resPSubOrder.apiResponse.Status == "200" &&
    resPSubOrder.apiResponse.Data
  ) {
    orderSub.value = resPSubOrder.apiResponse.Data
    ordersubFeeDel.value = orderSub.value.filter((order: SubOrderListRes) => order.UseType === 'DeliveryFee')
    orderSubAll.value = orderSub.value.filter((order: SubOrderListRes) => order.UseType !== 'DeliveryFee')
  } else {
    alert(resPSubOrder.apiResponse.Status)
  }


}

/////////////////////////////////////////
// Get order detail
const loadOrderDetail = async (orderNo: string) => {

  const req: OrderListReq = {
    OrderNo: orderNo
  }

  const response = await useRepository().paper.getOrder(req)
  const resultCheck = useUtility().responseCheck(response)

  if (resultCheck.status === 'pass') {
    if (Array.isArray(response.apiResponse.Data)) {
      orderGet.value = response.apiResponse.Data[0].Order
      getOrderAddress.value = response.apiResponse.Data[0].DeliveryAddress;
    }
  }
  else if (resultCheck.status === 'error') {
    resultCheck.modalType = 'warning'
    serverModal(resultCheck)
  }
  else if (resultCheck.status === 'server-error') {
    serverModal(resultCheck)
  }

}

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = 'layout-monito'
const showPageSteps = false
const showPageHeader = true
const showLogoHeader = false

// Define page meta
const pageTitle = 'ติดตามสถานะ'
const pageCategory = 'แลกกระดาษ'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-papers single-status template-timeline'
  }
})
</script>