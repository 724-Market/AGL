<template>
  <!--  Sidenav -->
  <nav
    class="sidenav navbar fixed-left navbar-expand"
    id="sidenav-main"
    v-if="!layoutMinimalStyle"
  >
    <div class="scrollbar-inner">
      <header class="sidenav-header">
        <!--  Brand -->
        <div class="navbar-brand">
          <NuxtLink to="/dashboard" title="กลับไปหน้าแดชบอร์ด"
            >กลับไปหน้าแดชบอร์ด</NuxtLink
          >
        </div>

        <!--  Sidenav toggler -->
        <div class="sidenav-toggler-wrapper">
          <a id="btn-sidenav-close" class="sidenav-toggler" href="#" title="เมนู">
            <div class="sidenav-toggler-inner">
              <div class="sidenav-toggler-line"></div>
            </div>
          </a>
        </div>
      </header>

      <ElementsMonitoSidenav />
    </div>
  </nav>

  <div class="sidenav-backdrop" v-if="!layoutMinimalStyle"></div>

  <!-- Main content-->
  <main class="main-content" id="panel">
    <!--  Topbar -->
    <div class="navbar-top" v-if="!layoutMinimalStyle">
      <div class="container-fluid">
        <div class="row">
          <ElementsMonitoTopbar />
        </div>
      </div>
    </div>

    <!--  Header -->
    <header class="site-header">
      <div class="container-fluid">
        <div class="row">
          <ElementsMonitoHeader
            :page-title="pageTitle"
            :page-category="pageCategory"
            :show-page-steps="showPageSteps"
            :show-page-header="showPageHeader"
            :show-logo-header="showLogoHeader"
          />
        </div>
      </div>
    </header>

    <!--  Page content -->
    <article class="site-content">
      <div class="container-fluid">
        <slot />
      </div>
    </article>

    <!-- Footer -->
    <footer class="site-footer" v-if="!layoutMinimalStyle">
      <div class="container-fluid">
        <div class="row">
          <ElementsMonitoFooter />
        </div>
      </div>
    </footer>
    <ElementsDialogConfirm
      v-if="isConfirm"
      :modal-show="isConfirm"
      :modal-type="ModalType.Warning"
      :modal-title="'ยืนยันการต่อเวลาใช้งานระบบ'"
      :modal-text="textConfirm"
      @on-confirm-modal="onConfirm"
      @on-close-modal="onCloseConfirm"
    />
  </main>
</template>

<script setup lang="ts">
import { ModalType } from "~/shared/entities/enum-entity";
import { useStoreUserAuth } from "~/stores/user/storeUserAuth";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import { useStorePaymentGet } from "~/stores/order/storePaymentGet";
import { useStorePayment } from "~/stores/order/storePayments";
import { useStorePaymentGateway } from "~/stores/order/storePaymentGateway";
import { useStorePackage } from "~/stores/order/storePackage";
import { useStorePackageList } from "~/stores/order/storePackageList";
import { useStoreStateOrder } from "~/stores/order/storeStateOrder";
const textConfirm = ref(
  'เหลือเวลาการใช้งาน 2 นาที ท่านต้องการจะต่อเวลาใช้งานระบบ เพื่อยื่นแบบแสดงรายการต่อหรือไม่ ถ้าต้องการให้กดปุ่ม "ใช่"'
);
const isConfirm = ref(false);
const placeorder = useStorePlaceorder();
const information = useStoreInformation();
const packages = useStorePackage();
const packageList = useStorePackageList();
const orderSummary = useStoreOrderSummary();
const payment = useStorePayment();
const paymentGateway = useStorePaymentGateway();

const paymentGat = useStorePaymentGet();

const state = useStoreStateOrder();
const store = useStoreUserAuth();

// Props from page setup
const props = defineProps({
  pageTitle: String,
  pageCategory: String,
  layoutClass: String,
  showPageSteps: Boolean,
  showPageHeader: Boolean,
  showLogoHeader: Boolean,
});

// Layout style
const layoutMinimalStyle = ref(false);

// Function get token
const getToken = async () => {
  const token = await useUtility().getToken();
  const expireTime = useTokenManage().getExpireSecondTime(token);
  // return to expiry time milliseconds
  if (expireTime > 0) {
    // คำนวณ expire Date ของ token ก่อน 5 นาที
    const reduceTime = expireTime - (2 * 60 * 1000);
    // showModalConfirm()
    if (reduceTime > 0) {
      setTimeout(showModalConfirm, reduceTime);
    } else {
      showModalConfirm();
    }
    //setTimeout(getToken, 1000 * 60)
  }
};
const showModalConfirm = () => {
  isConfirm.value = true;
};
const onConfirm = async () => {
  const { AuthenInfo } = storeToRefs(store);
  const refresToken = AuthenInfo.value ? AuthenInfo.value.refresh_token : "";
  if (refresToken && refresToken != "") {
    const data = await store.refreshToken(refresToken);
    if (data) {
      useUtility().setCookie("access_token", data?.accessToken ?? "", 1);
      useUtility().setCookie("refresh_token", data?.refresh_token ?? "", 1);
    }
  }
  isConfirm.value = false;
  window.location.reload();
};
const onCloseConfirm = async () => {
  isConfirm.value = false;
  await clearStore();
  setTimeout((window.location.href = "/agent/login"), 500);
};
const clearStore = async () => {
  placeorder.clearOrder();
  information.clearInformation();
  orderSummary.clearOrderSummary();
  packages.clearPackage();
  packageList.clearPackageList();
  payment.clearPayment();
  paymentGateway.clearPaymenGateway();
  paymentGat.clearPaymentGet();
  state.clearState();
  store.clearAuth();
};
// Mounted
onMounted(async () => {
  //setTimeout(getToken, 1000 * 60);
  await getToken();

  // Apply layout style
  if (props.layoutClass === "-monito-minimal") {
    layoutMinimalStyle.value = true;
  } else {
    layoutMinimalStyle.value = false;
  }

  // Close sidenav by default
  document.body.classList.remove("sidenav-show");

  const sideNavOpen = document.getElementById("btn-sidenav-open");
  const sideNavClose = document.getElementById("btn-sidenav-close");

  sideNavOpen?.addEventListener("click", (e) => {
    document.body.classList.add("sidenav-show");
    e.preventDefault();
  });

  sideNavClose?.addEventListener("click", (e) => {
    document.body.classList.remove("sidenav-show");
    e.preventDefault();
  });
});

// Define head
useHead({
  bodyAttrs: {
    class: props.layoutClass,
  },
});
</script>
