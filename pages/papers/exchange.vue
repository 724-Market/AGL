<template>
  <NuxtLayout
    :name="layout"
    :layout-class="`${layoutClass}`"
    :page-title="pageTitle"
    :page-category="pageCategory"
    :show-page-steps="showPageSteps"
    :show-page-header="showPageHeader"
  >
    <FormKit
      type="form"
      :actions="false"
      id="form-order"
      form-class="form-order form-theme"
      :incomplete-message="false"
    >
      <div class="row">
        <div class="col col-main">
          <PapersExchangeHowToGetPaper
            @shipping-type-change="onChangeShippingPaperType"
            @change-delivery-channel="onChangeDeliveryChannel"
            @check-address="handleCheckAddress"
            :delivery-chanel="deliveryChanels"
            :shipping-paper-type="deliveryPaperTypes"
            :payment-fee-limit="paymentFeeLimit"
            :is-submit="isSubmit"
          ></PapersExchangeHowToGetPaper>

          <ElementsFormPaperBranchStock
            v-if="type != ''"
            @area-change="onChangePaperArea"
            @ware-house-change="onChangeWareHouse"
            @product-sub-change="onChangeProductSubcategory"
            @product-company-change="onChangeProductCompany"
            :area="paperAreas"
            :ware-house="warehouses"
            :product-sub-category="productsubcategorys"
            :product-company="productCompanys"
            :shipping-type="type"
          >
          </ElementsFormPaperBranchStock>

          <PapersExchangeListPapers
            v-if="productSearchMatch"
            :product-company="textProductCompany"
            :product-match-list="productSearchMatch"
            @on-select-match="onSelectMatch"
          ></PapersExchangeListPapers>
        </div>

        <div class="col col-sidebar">
          <PapersExchangeSlideBar
            :check-list="checklist"
            :match-all-list="productSearchMatchAll"
            :exchange-data="exchangeData"
            :shipping-fee="ShippingFee"
            :shipping-method="ShippingMethod"
            :payment-fee-limit="paymentFeeLimit"
            :delivery-type="type"
            :addr-agent="addrAgent"
            @on-loading="onLoading"
            @on-handle-error="handleError"
          ></PapersExchangeSlideBar>
        </div>
      </div>
    </FormKit>

    <ElementsDialogPaperstock />

    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>

    <ElementsDialogEmptycart />
  </NuxtLayout>
</template>

<script setup lang="ts">
import type {
  IDeliveryResponse,
  DeliveryPaperRes,
} from "~/shared/entities/delivery-entity";
import type {
  AreaListRes,
  ExchangeDataSummary,
  PaymentFeeLimitReq,
  PaymentFeeLimitRes,
  ProductcompanyAreaListReq,
  ProductcompanyAreaListRes,
  ProductsubcategoryAreaListReq,
  ProductsubcategoryAreaListRes,
  SearchMatchReq,
  SearchMatchRes,
  WarehouseAreaListReq,
  WarehouseAreaListRes,
  DeliveryAddressReq,
} from "~/shared/entities/paper-entity";
import { storeToRefs } from "pinia";
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStoreSearchMatchCompulsory } from "~~/stores/paper/storeSearchMatchCompulsory";
import { useStoreSearchMatchInsurance } from "~~/stores/paper/storeSearchMatchInsurance";
import type { IChecklist } from "~/shared/entities/checklist-entity";
import { useStoreExchangeDataInfo } from "~/stores/paper/storeExchangeDataInfo";

const deliveryChanels: globalThis.Ref<IDeliveryResponse[] | undefined> = ref();
const deliveryPaperTypes: globalThis.Ref<DeliveryPaperRes[] | undefined> = ref();
const paymentFeeLimit: globalThis.Ref<PaymentFeeLimitRes[] | undefined> = ref();
const addrAgent: globalThis.Ref<DeliveryAddressReq | undefined> = ref();

const paperAreas: globalThis.Ref<AreaListRes[] | undefined> = ref();
const warehouses: globalThis.Ref<WarehouseAreaListRes[] | undefined> = ref();
const productsubcategorys: globalThis.Ref<
  ProductsubcategoryAreaListRes[] | undefined
> = ref();
const productCompanys: globalThis.Ref<ProductcompanyAreaListRes[] | undefined> = ref();
const productSearchMatchAll: globalThis.Ref<SearchMatchRes[] | undefined> = ref();
const productSearchMatch: globalThis.Ref<SearchMatchRes[] | undefined> = ref();
const ShippingMethod = ref("");
const ShippingFee = ref("");
const isSubmit = ref(false);
const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);

//define store
const storeCredit = useStoreCreditBalance()

const storeSearchMatchCompulsory = useStoreSearchMatchCompulsory();
const { MatchCompulsoryInfo } = storeToRefs(storeSearchMatchCompulsory);

const storeSearchMatchInsurance = useStoreSearchMatchInsurance();
const { MatchInsuranceInfo } = storeToRefs(storeSearchMatchInsurance);

const storeExchange = useStoreExchangeDataInfo();
const isLoading = ref(false);
const submitted = ref(false);

const statusMessage = ref();
const statusMessageType = ref();

const router = useRouter();

var type = ref("");
var area = ref("");
var wareHouse = ref("");

const checklist: globalThis.Ref<IChecklist[]> = ref([
  {
    id: "1",
    className: "",
    desc: "วิธีการรับกระดาษ",
  },
  {
    id: "2",
    className: "",
    desc: "เลือกกระดาษ",
  },
]);
const exchangeData: globalThis.Ref<ExchangeDataSummary[]> = ref([]);
const textProductSubCategory = ref("");
const textProductCategory = ref("");
const textProductCompany = ref("");
const classNameExchange = ref("");
const onLoad = onMounted(async () => {
  await usePagePaper().onClearExchangePaper();
  if (AuthenInfo.value) {
    // await loadDeliveryChanel();
    await loadDeliveryPaperType();
    await loadPledgeCreditBalance()
  } else {
    router.push("/login");
  }
});

const loadDeliveryChanel = async () => {
  isLoading.value = true;
  var res = await useRepository().delivery.channel();
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      deliveryChanels.value = res.apiResponse.Data;
    }
  }
  isLoading.value = false;
};

const loadDeliveryPaperType = async () => {
  isLoading.value = true;
  var res = await useRepository().delivery.DeliveryPaperChannel();
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      deliveryPaperTypes.value = res.apiResponse.Data;
    }
  }
  isLoading.value = false;
};

const loadPledgeCreditBalance = async () => {
  const response = await useRepository().pledge.getCreditBalance();
  const resultCheck = useUtility().responseCheck(response)
  if (resultCheck.status === 'pass') {
        if (Array.isArray(response.apiResponse.Data)) {
          storeCredit.setCreditBalance(response.apiResponse.Data[0])
        }
  } else {
    // data not found
  }
  
};

const onChangeShippingPaperType = async (deliveryType: string) => {
  isLoading.value = true;

  type.value = deliveryType;

  if (deliveryType == "DELIVERY") {
    let req: PaymentFeeLimitReq = {
      DeliveryType: deliveryType,
    };
    var res = await useRepository().paper.getPaymentDeliveryFeeLimitReq(req);
    if (res.apiResponse.Status && res.apiResponse.Status == "200") {
      if (res.apiResponse.Data) {
        paymentFeeLimit.value = res.apiResponse.Data;
      }
    }
    await onChangePaperArea("");
    type.value = "";
    checklist.value[0].className = "";
  } else if (deliveryType == "WALKIN") {
    await loadPaperArea();
    checklist.value[0].className = "current";
    // clear data after change delivery type
    await usePagePaper().onClearExchangePaper();
    ShippingMethod.value = "";
    ShippingFee.value = "";
  } else {
    console.log('onChangeShippingPaperType deliveryType', deliveryType)
    type.value = "DELIVERY";
  }
  await clearStore();

  isLoading.value = false;
};

const onChangeDeliveryChannel = async (
  ShippingMethodText: string,
  ShippingFeeText: string
) => {
  console.log(ShippingMethodText, ShippingFeeText);
  ShippingMethod.value = ShippingMethodText;
  ShippingFee.value = ShippingFeeText;
};
const loadPaperArea = async () => {
  isLoading.value = true;
  var res = await useRepository().paper.getarea();
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      paperAreas.value = res.apiResponse.Data;
    }
  }
  isLoading.value = false;
};

const onChangePaperArea = async (areaId: string) => {
  await clearStore();
  isLoading.value = true;
  area.value = areaId;
  let req: WarehouseAreaListReq = {
    AreaID: areaId,
    Type: type.value == "DELIVERY" ? "BASE" : "",
  };
  var res = await useRepository().paper.getWarehouseArea(req);
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      warehouses.value = res.apiResponse.Data;
    }
  }

  checklist.value[1].className = "";
  isLoading.value = false;
};

const onChangeWareHouse = async (wareHouseId: string, areaId: string) => {
  await clearStore();
  isLoading.value = true;
  wareHouse.value = wareHouseId;
  if (areaId) area.value = areaId;
  let req: ProductsubcategoryAreaListReq = {
    AreaID: areaId ? areaId : area.value,
    WarehouseID: wareHouseId,
  };
  var res = await useRepository().paper.getProductsubcategoryWarehouse(req);
  if (res.apiResponse.Status && res.apiResponse.Status == "200") {
    if (res.apiResponse.Data) {
      productsubcategorys.value = res.apiResponse.Data;
    }
  }

  checklist.value[1].className = "";
  isLoading.value = false;
};

const onChangeProductSubcategory = async (
  productSubCategory: string,
  productCategory: string
) => {
  textProductCategory.value = productCategory;
  textProductSubCategory.value = productSubCategory;
  isLoading.value = true;

  let reqProductcompany: ProductcompanyAreaListReq = {
    AreaID: area.value,
    WarehouseID: wareHouse.value,
    ProductCategory: productCategory,
    ProductSubCategory: productSubCategory,
  };
  var resCompanySub = await useRepository().paper.getProductcompanySubcategory(
    reqProductcompany
  );
  if (resCompanySub.apiResponse.Status && resCompanySub.apiResponse.Status == "200") {
    if (resCompanySub.apiResponse.Data) {
      productCompanys.value = resCompanySub.apiResponse.Data;
    }
  }

  let reqSearchMatch: SearchMatchReq = {
    AreaID: area.value,
    WarehouseID: wareHouse.value,
    ProductCategory: productCategory,
    ProductSubCategory: productSubCategory,
  };
  if (productSubCategory == "Compulsory" || productSubCategory == "พ.ร.บ.") {
    console.log("MatchCompulsoryInfo.value", MatchCompulsoryInfo.value);
    if (
      MatchCompulsoryInfo.value &&
      MatchCompulsoryInfo.value.Data &&
      MatchCompulsoryInfo.value.Data.length > 0
    ) {
      console.log("MatchCompulsoryInfo.value.Data", MatchCompulsoryInfo.value.Data);
      const MatchCompulsoryAll = MatchCompulsoryInfo.value.Data.map((item, index) => {
        let data = item;
        data.Amount = 1;
        return item;
      });
      productSearchMatchAll.value = MatchCompulsoryInfo.value.Data;
    } else {
      console.log("elseeeeee")
      productSearchMatchAll.value = (
        await storeSearchMatchCompulsory.getSearchMatch(reqSearchMatch)
      ).Data;

      // Default Amount 1
      if (productSearchMatchAll.value) {
        productSearchMatchAll.value = productSearchMatchAll.value.map((item, index) => {
          let data = item;
          data.Amount = 1;
          data.ProductOnHandAmountTotal = data.ProductOnHandAmount
          return item;
        });
      }
    }
  } else if (productSubCategory == "Insurance") {
    if (
      MatchInsuranceInfo.value &&
      MatchInsuranceInfo.value.Data &&
      MatchInsuranceInfo.value.Data.length > 0
    ) {
      productSearchMatchAll.value = MatchInsuranceInfo.value.Data;
    } else {
      productSearchMatchAll.value = (
        await storeSearchMatchInsurance.getSearchMatch(reqSearchMatch)
      ).Data;
    }
  }

  productSearchMatch.value = productSearchMatchAll.value;

  isLoading.value = false;
};

const onChangeProductCompany = async (productCompany: string) => {
  isLoading.value = true;
  textProductCompany.value = productCompany;
  // if (storeExchange.$state.length > 0 && storeExchange.$state) {
  //   const paperListtoStore = usePagePaper().getPaperList(
  //     productSearchMatchAll.value ?? []
  //   );
  //   productSearchMatch.value = paperListtoStore.filter((obj) => {
  //     return obj.ProductCompany == productCompany || productCompany == "-";
  //   });
  // } else {
  //   productSearchMatch.value = productSearchMatchAll.value?.filter((obj) => {
  //     return obj.ProductCompany == productCompany || productCompany == "-";
  //   });
  // }
  productSearchMatch.value = productSearchMatchAll.value
  console.log("productSearchMatch.value", productSearchMatch.value);

  isLoading.value = false;
};

const onSelectMatch = async (item: SearchMatchRes) => {
  await usePagePaper().onSelectExchangePaper(item);
  onLoadExchangetoStore();
};
const onLoadExchangetoStore = () => {
  exchangeData.value = [];
  exchangeData.value = storeExchange.$state;
  if (exchangeData.value && exchangeData.value.length > 0) {
    checklist.value[1].className = "current";
  }
};

const clearStore = async () => {
  await storeSearchMatchCompulsory.clearSearchMatch();
  await usePagePaper().onClearExchangePaper();
  onLoadExchangetoStore();
  //await storeSearchMatchInsurance.clearSearchMatch()
  productSearchMatchAll.value = [];
  productSearchMatch.value = [];
  exchangeData.value = [];
};

const handleCheckAddress = async (AddressReq: DeliveryAddressReq) => {
  console.log("AddressReq", AddressReq);
  addrAgent.value = AddressReq;
  if (AddressReq && ShippingMethod.value) {
    if (
      AddressReq.PhoneNumber.length > 0 &&
      AddressReq.FirstName.length > 0 &&
      AddressReq.LastName.length > 0 &&
      AddressReq.No.length > 0 &&
      AddressReq.ProvinceID.length > 0 &&
      AddressReq.DistrictID.length > 0 &&
      AddressReq.SubDistrictID.length > 0
    ) {
      isSubmit.value = true;
      checklist.value[0].className = "current";
    } else {
      isSubmit.value = false;
      checklist.value[0].className = "";
    }
  } else if (AddressReq) {
    if (
      AddressReq.PhoneNumber.length > 0 &&
      AddressReq.FirstName.length > 0 &&
      AddressReq.LastName.length > 0 &&
      AddressReq.No.length > 0 &&
      AddressReq.ProvinceID.length > 0 &&
      AddressReq.DistrictID.length > 0 &&
      AddressReq.SubDistrictID.length > 0
    ) {
      isSubmit.value = true;
      checklist.value[0].className = "";
    } else {
      isSubmit.value = false;
      checklist.value[0].className = "";
    }
  } else {
    isSubmit.value = false;
    checklist.value[0].className = "";
  }
};
const handleError = async () => {
  let reqSearchMatch: SearchMatchReq = {
    AreaID: area.value,
    WarehouseID: wareHouse.value,
    ProductCategory: textProductCategory.value,
    ProductSubCategory: textProductSubCategory.value,
  };
  productSearchMatchAll.value = (
    await storeSearchMatchCompulsory.getSearchMatch(reqSearchMatch)
  ).Data;

  productSearchMatch.value = productSearchMatchAll.value?.filter((obj) => {
    return (
      obj.ProductCompany == textProductCompany.value || textProductCompany.value == "-"
    );
  });
};
const onLoading = (loading: boolean) => {
  isLoading.value = loading;
};
// checklist validate exchange list
watch(
  () => storeExchange.$state,
  () => {
    classNameExchange.value = usePagePaper().setClassExchangeList();
    if (storeExchange.$state.length > 0) {
      checklist.value[1].className = "current";
    } else {
      checklist.value[1].className = "";
    }
  },
  { deep: true }
);
// // Submit form event
// const submitOrder = async () => {
//   // Add waiting time for debug
//   await new Promise((r) => setTimeout(r, 1000));
// };

// Define layout
const layout = "monito";
const layoutClass = "layout-monito";
const showPageSteps = false;
const showPageHeader = true;

// Define page meta
const pageTitle = "เลือกกระดาษ";
const pageCategory = "แลกกระดาษ";
const pageDescription = "";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    //class: "page-papers single-exchange",
    class: computed(() => {
      const className = `page-papers single-exchange ${classNameExchange.value}`;
      return className;
    }),
  },
});
</script>
