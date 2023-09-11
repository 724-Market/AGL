
<template>
  <div class="dropdown" v-if="$props.row">
    <a
      class="btn btn-ellipsis dropdown-toggle"
      role="button"
      title="เครื่องมือจัดการเพิ่มเติม"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <i class="fa-solid fa-ellipsis-vertical"></i>
    </a>
    <ul class="dropdown-menu">
      <li v-if="props.row.Status == 'Draft'">
        <a class="dropdown-item" title="ทำรายการต่อ"
          ><span class="icon-edit" :data-id="$props.row.OrderNo">ทำรายการต่อ</span></a
        >
      </li>
      <li v-if="props.row.Status == 'Pending'">
        <a class="dropdown-item"  title="ชำระเงิน"
          ><span class="icon-payment" :data-id="$props.row.OrderNo">ชำระเงิน</span></a
        >
      </li>
      <li v-if="props.row.Status == 'Delivery' || props.row.Status == 'Process'">
        <a class="dropdown-item"  title="ติดตามสถานะ"
          ><span class="icon-tracking" :data-id="$props.row.OrderNo">ติดตามสถานะ</span></a
        >
      </li>
      <li v-if="props.row.Status == 'Success'">
        <a class="dropdown-item" title="รายละเอียดกรมธรรม์"
          ><span class="icon-policy" :data-id="$props.row.OrderNo">รายละเอียดกรมธรรม์</span></a
        >
      </li>
      <li v-if="props.row.Status == 'Success'">
        <a class="dropdown-item"  title="ดาวน์โหลดกรมธรรม์"
          ><span class="icon-download-file" :data-url="$props.row.PolicyURL">ดาวน์โหลดกรมธรรม์</span></a
        >
      </li>
      <li>
        <hr class="dropdown-divider" />
      </li>
      <li v-if="props.row.Status == 'Cancel' && props.row.IsCancel && props.row.IsCancelComplete">
        <a class="dropdown-item" title="ติดต่อเจ้าหน้าที่"
          ><span class="icon-help">ติดต่อเจ้าหน้าที่</span></a
        >
      </li>
      <li v-if="props.row.Status == 'Draft'">
        <a class="dropdown-item"  title="ลบแบบร่างนี้"
          ><span class="icon-trash" :data-id="$props.row.OrderNo">ลบแบบร่างนี้</span></a
        >
      </li>
    </ul>
  </div>
  <!-- <OrderHistoryModalContactStaff
    @close-modal="handleCloasModal"
    :show="showModalStaff"
  ></OrderHistoryModalContactStaff> -->
  <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
</template>
<script setup lang="ts">
import { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";
import {
  OrderDetailRequest,
  StatusGroupResponse,
  SubHistoryRequest,
  HistoryResponse,
  HistorySearch,
} from "~/shared/entities/order-entity";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";

const props = defineProps({
  row: {
    type: Object as () => HistoryResponse,
  },
});

const isLoading = ref(false);
const storeOrder = useStorePlaceorder();
const router = useRouter();

const showModalStaff = ref(false);

// const onLoad = onMounted(async () => {
//   const menuEdit = document.querySelector('.icon-edit')
//   menuEdit.addEventListener('click',async () => {
//     alert('test')
//   })
// });

// const resume = async (OrderNo: string) => {
//   //ทำรายการต่อ
//   alert("resume");
//   isLoading.value = true;
//   let req: OrderDetailRequest = {
//     OrderNo: OrderNo,
//   };
//   let order: PlaceOrderRequest = {};
//   var getData = await useRepository().order.summary(req);
//   if (
//     getData.apiResponse.Status &&
//     getData.apiResponse.Status == "200" &&
//     getData.apiResponse.Data &&
//     getData.apiResponse.Data.length > 0
//   ) {
//     if (
//       order.Customer &&
//       order.Customer.LegalPersonProfile &&
//       getData.apiResponse.Data[0].Order
//     ) {
//       order.Customer.LegalPersonProfile.CustomerID =
//         getData.apiResponse.Data[0].Order.Customer.LegalPersonProfile.CustomerID;
//     }
//     if (
//       order.Customer &&
//       order.Customer.PersonProfile &&
//       getData.apiResponse.Data[0].Order
//     ) {
//       order.Customer.PersonProfile.CustomerID =
//         getData.apiResponse.Data[0].Order.Customer.PersonProfile.CustomerID;
//     }
//     if (
//       order.Customer &&
//       order.Customer.DefaultAddress &&
//       getData.apiResponse.Data[0].Order
//     ) {
//       order.Customer.DefaultAddress.AddressID =
//         getData.apiResponse.Data[0].Order.Customer.DefaultAddress.AddressID;
//     }
//     if (
//       order.Customer &&
//       order.Customer.DeliveryAddress &&
//       getData.apiResponse.Data[0].Order &&
//       getData.apiResponse.Data[0].Order.Customer.DeliveryAddress
//     ) {
//       order.Customer.DeliveryAddress.AddressID =
//         getData.apiResponse.Data[0].Order.Customer.DeliveryAddress.AddressID;
//     }
//     if (
//       order.Customer &&
//       order.Customer.TaxInvoiceAddress &&
//       getData.apiResponse.Data[0].Order &&
//       getData.apiResponse.Data[0].Order.Customer.TaxInvoiceAddress
//     ) {
//       order.Customer.TaxInvoiceAddress.AddressID =
//         getData.apiResponse.Data[0].Order.Customer.TaxInvoiceAddress.AddressID;
//     }
//     if (
//       order.Customer &&
//       order.Customer.TaxInvoiceDeliveryAddress &&
//       getData.apiResponse.Data[0].Order &&
//       getData.apiResponse.Data[0].Order.Customer.TaxInvoiceDeliveryAddress
//     ) {
//       order.Customer.TaxInvoiceDeliveryAddress.AddressID =
//         getData.apiResponse.Data[0].Order.Customer.TaxInvoiceDeliveryAddress.AddressID;
//     }

//     storeOrder.setOrder(order);
//   }
//   router.push("/order/compulsory/payment");
//   isLoading.value = false;
// }

// const pay = async (OrderNo: string) => {
//   //ชำระเงิน
//   alert("pay");
//   router.push(`/order/compulsory/summary?OrderNo=${OrderNo}`);
// }

// const trackStatus = async (OrderNo: string) => {
//   //ติดตามสถานะ
//   alert("trackStatus " + OrderNo);
// }

// const policyDetail = async () => {
//   //รายละเอียดกรมธรรม์
//   alert("policyDetail");
// }

// const download = async (url: string) => {
//   //ดาวโหลดกรมธรรม์
//   alert("download");
//   window.open(url, "_blank");
// }

// const contactStaff = async () => {
//   //ติดต่อเจ้าหน้าที่
//   alert("contactStaff");
//   showModalStaff.value = false;
//   showModalStaff.value = true;
// }

// const deleteDraft = async (OrderNo: string) => {
//   //ลบแบบร่างนี้
//   alert("deleteDraft");
//   isLoading.value = true;
//   let req: OrderDetailRequest = {
//     OrderNo: OrderNo,
//   };
//   var response = await useRepository().order.delete(req);
//   if (response.apiResponse.Status && response.apiResponse.Status == "200") {
//     if (response.apiResponse.Data) {
//       console.log("Delete Msg", response.apiResponse.Data);
//       // await onSearch()
//     }
//   }
//   isLoading.value = false;
// }

// const handleCloasModal = async (refresh: Boolean) => {
//   showModalStaff.value = false;
// }
</script>
