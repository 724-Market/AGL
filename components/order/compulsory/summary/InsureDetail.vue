<template>
  <div class="accordion" id="accordion-summary" v-if="orderDetail">
    <div class="accordion-item">
      <h3 class="accordion-header">
        <button
          class="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panel-summary-1"
          aria-expanded="true"
          aria-controls="panel-summary-1"
        >
          ข้อมูลผู้เอาประกันภัย
        </button>
      </h3>
      <div id="panel-summary-1" class="accordion-collapse collapse show">
        <div class="accordion-body">
          <section class="summary-list">
            <div class="summary-item">
              <h4 class="topic">ผู้เอาประกันภัย</h4>
              <p>
                {{ orderDetail.AssuredDetails.Prefix }}
                {{ orderDetail.AssuredDetails.FirstName }}
                {{ orderDetail.AssuredDetails.LastName }}
              </p>
            </div>
            <div class="summary-item">
              <h4 class="topic">เลขที่บัตรประชาชน</h4>
              <p>{{ orderDetail.AssuredDetails.IDCard }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">วันเดือนปีเกิด</h4>
              <p>
                {{ getBirthDate(orderDetail.AssuredDetails.BirthDate) }} ({{
                  getAge(orderDetail.AssuredDetails.BirthDate)
                }}
                ปี)
              </p>
            </div>
            <div class="summary-item">
              <h4 class="topic">อีเมล</h4>
              <p>{{ orderDetail.AssuredDetails.Email }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">เบอร์โทรศัพท์</h4>
              <p>{{ orderDetail.AssuredDetails.PhoneNumber }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ที่อยู่</h4>
              <p>
                {{ getFullAddress() }}
              </p>
            </div>

            <div class="summary-action">
              <button class="btn" @click="ActionEditData('placeorder#InsureDetail')">
                แก้ไขข้อมูล
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h3 class="accordion-header">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panel-summary-2"
          aria-expanded="false"
          aria-controls="panel-summary-2"
        >
          ข้อมูลรถที่ทำประกันภัย
        </button>
      </h3>
      <div id="panel-summary-2" class="accordion-collapse collapse">
        <div class="accordion-body">
          <section class="summary-list">
            <div class="summary-item">
              <h4 class="topic">รถยนต์</h4>
              <p>
                {{ orderDetail.CarDetails.CarBrand }} รุ่น
                {{ orderDetail.CarDetails.CarModel }} รุ่นย่อย
                {{ orderDetail.CarDetails.SubCarModel ?? "ไม่ทราบ" }} ปี
                {{ orderDetail.CarDetails.CarYear }} ({{
                  orderDetail.CarDetails.CarColor
                }})
              </p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ลักษณะการใช้งาน</h4>
              <p>{{ orderDetail.InsureDetails.UseCarName }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">เลขทะเบียนรถยนต์</h4>
              <p v-if="orderDetail.CarDetails.IsRedLicense">
                {{ orderDetail.CarDetails.CarLicense }} (ป้ายแดง)
              </p>
              <p v-else>{{ orderDetail.CarDetails.CarLicense }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ทะเบียนจังหวัด</h4>
              <p>{{ orderDetail.CarDetails.LicenseProvince }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">เลขตัวถังรถยนต์</h4>
              <p>{{ orderDetail.CarDetails.NumBody }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">เลขเครื่องยนต์</h4>
              <p>{{ orderDetail.CarDetails.NumEngine }}</p>
            </div>

            <div class="summary-action">
              <button class="btn" @click="ActionEditData('information')">
                แก้ไขข้อมูล
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h3 class="accordion-header">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panel-summary-3"
          aria-expanded="false"
          aria-controls="panel-summary-3"
        >
          ข้อมูลประกันภัย
        </button>
      </h3>
      <div id="panel-summary-3" class="accordion-collapse collapse">
        <div class="accordion-body">
          <section class="summary-list">
            <div class="summary-item">
              <h4 class="topic">บริษัทรับประกันภัย</h4>
              <p>{{ orderDetail.InsureDetails.CompanyName }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ประเภทสินค้า</h4>
              <p v-if="orderDetail.InsureDetails.InsureType == 'Compulsory'">
                พ.ร.บ. สำหรับรถยนต์นั่งส่วนบุคคล
              </p>
              <p v-else>พ.ร.บ. สำหรับรถยนต์นั่งส่วนบุคคล</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">การซ่อม</h4>
              <p>ซ่อมห้าง</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">กรมธรรม์คุ้มครอง</h4>
              <p>
                {{ getFormatDate(orderDetail.InsureDetails.ActiveStartDate) }} -
                {{ getFormatDate(orderDetail.InsureDetails.ActiveEndDate) }} ({{
                  getDayOfYear()
                }}
                วัน)
              </p>
            </div>

            <div class="summary-action">
              <button class="btn" @click="ActionEditData('packages')">แก้ไขข้อมูล</button>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h3 class="accordion-header">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panel-summary-4"
          aria-expanded="false"
          aria-controls="panel-summary-4"
        >
          ข้อมูลจัดส่งกรมธรรม์
        </button>
      </h3>
      <div id="panel-summary-4" class="accordion-collapse collapse">
        <div class="accordion-body">
          <section class="summary-list">
            <div class="summary-item">
              <h4 class="topic">วิธีการรับกรมธรรม์</h4>
              <p>{{ getDeliveryText() }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">อีเมลรับกรมธรรม์</h4>
              <p>{{ orderDetail.DeliveryPolicyDetails.AddressEmail }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ชื่อผู้รับ</h4>
              <p>
                {{ orderDetail.DeliveryPolicyDetails.AddressFirstName }}
                {{ orderDetail.DeliveryPolicyDetails.AddressLastName }}
              </p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ที่อยู่จัดส่ง</h4>
              <p v-if="orderDetail.DeliveryPolicyDetails">
                {{ getFullAddressDelivery() }}
              </p>
              <p v-else>-</p>
            </div>

            <div class="summary-action">
              <button class="btn" @click="ActionEditData('placeorder#InsuranceRecieve')">
                แก้ไขข้อมูล
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
    <div class="accordion-item">
      <h3 class="accordion-header">
        <button
          class="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#panel-summary-5"
          aria-expanded="false"
          aria-controls="panel-summary-5"
        >
          ข้อมูลจัดส่งใบกำกับภาษี
        </button>
      </h3>
      <div id="panel-summary-5" class="accordion-collapse collapse">
        <div class="accordion-body">
          <section class="summary-list" v-if="orderDetail.IsTaxInvoice">
            <div class="summary-item">
              <h4 class="topic">ออกใบกำกับภาษีให้</h4>
              <p>
                {{ orderDetail.TaxInvoiceDetails.AddressFirstName }}
                {{ orderDetail.TaxInvoiceDetails.AddressLastName }}
              </p>
            </div>
            <div class="summary-item">
              <h4 class="topic">เลขประจำตัวผู้เสียภาษี</h4>
              <p>{{ orderDetail.TaxInvoiceDetails.AddressTaxID }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">อีเมล</h4>
              <p>{{ orderDetail.TaxInvoiceDetails.AddressEmail }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">เบอร์โทรศัพท์</h4>
              <p>{{ orderDetail.TaxInvoiceDetails.AddressPhoneNumber }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ที่อยู่</h4>
              <p>
                {{ getFullAddressTaxInvoice() }}
              </p>
            </div>
            <div class="summary-item">
              <h4 class="topic">วิธีการรับใบกำกับภาษี</h4>
              <p>{{ getDeliveryTextTaxInvoice() }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ชื่อผู้รับ</h4>
              <p v-if="orderDetail.DeliveryTaxInvoiceDetails">
                {{ orderDetail.DeliveryTaxInvoiceDetails.AddressFirstName
                }}{{ orderDetail.DeliveryTaxInvoiceDetails.AddressLastName }}
              </p>
              <p v-else>-</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ที่อยู่จัดส่ง</h4>
              <p v-if="orderDetail.DeliveryTaxInvoiceDetails">
                {{ getFullAddressDeliveryTaxInvoice() }}
              </p>
              <p v-else>-</p>
            </div>

            <div class="summary-action">
              <button class="btn" @click="ActionEditData('placeorder#TaxInvoice')">
                แก้ไขข้อมูล
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { OrderDetails } from "~/shared/entities/order-entity";
import { useStoreOrderSummary } from "~/stores/order/storeOrderSummary";
import { storeToRefs } from "pinia";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { useStorePlaceorder } from "~/stores/order/storePlaceorder";
import { PlaceOrderRequest } from "~/shared/entities/placeorder-entity";
import { IInformation } from "~/shared/entities/information-entity";
//define store
const store = useStoreOrderSummary();

const infomation = useStoreInformation();
const placeorder = useStorePlaceorder();
// define getter in store
const { OrderSummaryInfo } = storeToRefs(store);
const orderDetail: globalThis.Ref<OrderDetails | undefined> = ref();

const props = defineProps({
  orderDetail: {
    type: Object as () => OrderDetails,
  },
});
const getDayOfYear = (): string => {
  let days = 0;
  if (orderDetail.value) {
    const startDate = new Date(orderDetail.value.InsureDetails.ActiveStartDate);
    const endDate = new Date(orderDetail.value.InsureDetails.ActiveEndDate);
    const diff = Math.abs(startDate.getTime() - endDate.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));
    days = diffDays - 1;
  }

  return days.toFixed(0);
};
const getFormatDate = (date: string): string => {
  const formatDate = useUtility().formatDate(date, "DD/MM/BBBB");

  return formatDate;
};
const getBirthDate = (birthdate: string): string => {
  const formatDate = useUtility().formatDate(birthdate, "D MMMM BBBB");
  return formatDate;
};
const getAge = (birthdate: string): string => {
  const date = new Date();
  const birth = birthdate.split("-");
  const age = date.getFullYear() - parseInt(birth[0]);

  return age.toFixed(0);
};
const getFullAddress = (): string => {
  let fullAddress = "";
  if (orderDetail && orderDetail.value) {
    if (orderDetail.value.AssuredDetails.No.length > 0) {
      fullAddress += orderDetail.value.AssuredDetails.No + " ";
    }
    if (orderDetail.value.AssuredDetails.Moo.length > 0) {
      fullAddress += "หมู่ที่ " + orderDetail.value.AssuredDetails.Moo + " ";
    }
    if (orderDetail.value.AssuredDetails.Building.length > 0) {
      fullAddress += orderDetail.value.AssuredDetails.Building + " ";
    }
    if (orderDetail.value.AssuredDetails.Alley.length > 0) {
      fullAddress += "ซอย " + orderDetail.value.AssuredDetails.Alley + " ";
    }
    if (orderDetail.value.AssuredDetails.Road.length > 0) {
      fullAddress += "ถนน " + orderDetail.value.AssuredDetails.Road + " ";
    }
    if (orderDetail.value.AssuredDetails.SubDistrictName.length > 0) {
      fullAddress += orderDetail.value.AssuredDetails.SubDistrictName + " ";
    }
    if (orderDetail.value.AssuredDetails.DistrictName.length > 0) {
      fullAddress += orderDetail.value.AssuredDetails.DistrictName + " ";
    }
    if (orderDetail.value.AssuredDetails.ProvinceName.length > 0) {
      fullAddress += orderDetail.value.AssuredDetails.ProvinceName + " ";
    }
    if (orderDetail.value.AssuredDetails.ZipCode.length > 0) {
      fullAddress += "รหัสไปรษณีย์ " + orderDetail.value.AssuredDetails.ZipCode + " ";
    }
  }
  return fullAddress;
};
const getFullAddressDelivery = (): string => {
  let fullAddress = "";
  if (orderDetail && orderDetail.value) {
    if (orderDetail.value.DeliveryPolicyDetails.No.length > 0) {
      fullAddress += orderDetail.value.DeliveryPolicyDetails.No + " ";
    }
    if (orderDetail.value.DeliveryPolicyDetails.Moo.length > 0) {
      fullAddress += "หมู่ที่ " + orderDetail.value.DeliveryPolicyDetails.Moo + " ";
    }
    if (orderDetail.value.DeliveryPolicyDetails.Building.length > 0) {
      fullAddress += orderDetail.value.DeliveryPolicyDetails.Building + " ";
    }
    if (orderDetail.value.DeliveryPolicyDetails.Alley.length > 0) {
      fullAddress += "ซอย " + orderDetail.value.DeliveryPolicyDetails.Alley + " ";
    }
    if (orderDetail.value.DeliveryPolicyDetails.Road.length > 0) {
      fullAddress += "ถนน " + orderDetail.value.DeliveryPolicyDetails.Road + " ";
    }
    if (orderDetail.value.DeliveryPolicyDetails.SubDistrictName.length > 0) {
      fullAddress += orderDetail.value.DeliveryPolicyDetails.SubDistrictName + " ";
    }
    if (orderDetail.value.DeliveryPolicyDetails.DistrictName.length > 0) {
      fullAddress += orderDetail.value.DeliveryPolicyDetails.DistrictName + " ";
    }
    if (orderDetail.value.DeliveryPolicyDetails.ProvinceName.length > 0) {
      fullAddress += orderDetail.value.DeliveryPolicyDetails.ProvinceName + " ";
    }
    if (orderDetail.value.DeliveryPolicyDetails.ZipCode.length > 0) {
      fullAddress +=
        "รหัสไปรษณีย์ " + orderDetail.value.DeliveryPolicyDetails.ZipCode + " ";
    }
  }
  return fullAddress;
};
const getFullAddressTaxInvoice = (): string => {
  let fullAddress = "";
  if (orderDetail && orderDetail.value && orderDetail.value.TaxInvoiceDetails) {
    if (orderDetail.value.TaxInvoiceDetails.No.length > 0) {
      fullAddress += orderDetail.value.TaxInvoiceDetails.No + " ";
    }
    if (orderDetail.value.TaxInvoiceDetails.Moo.length > 0) {
      fullAddress += "หมู่ที่ " + orderDetail.value.TaxInvoiceDetails.Moo + " ";
    }
    if (orderDetail.value.TaxInvoiceDetails.Building.length > 0) {
      fullAddress += orderDetail.value.TaxInvoiceDetails.Building + " ";
    }
    if (orderDetail.value.TaxInvoiceDetails.Alley.length > 0) {
      fullAddress += "ซอย " + orderDetail.value.TaxInvoiceDetails.Alley + " ";
    }
    if (orderDetail.value.TaxInvoiceDetails.Road.length > 0) {
      fullAddress += "ถนน " + orderDetail.value.TaxInvoiceDetails.Road + " ";
    }
    if (orderDetail.value.TaxInvoiceDetails.SubDistrictName.length > 0) {
      fullAddress += orderDetail.value.TaxInvoiceDetails.SubDistrictName + " ";
    }
    if (orderDetail.value.TaxInvoiceDetails.DistrictName.length > 0) {
      fullAddress += orderDetail.value.TaxInvoiceDetails.DistrictName + " ";
    }
    if (orderDetail.value.TaxInvoiceDetails.ProvinceName.length > 0) {
      fullAddress += orderDetail.value.TaxInvoiceDetails.ProvinceName + " ";
    }
    if (orderDetail.value.TaxInvoiceDetails.ZipCode.length > 0) {
      fullAddress += "รหัสไปรษณีย์ " + orderDetail.value.TaxInvoiceDetails.ZipCode + " ";
    }
  }
  return fullAddress;
};
const getFullAddressDeliveryTaxInvoice = (): string => {
  let fullAddress = "";
  if (orderDetail && orderDetail.value && orderDetail.value.DeliveryTaxInvoiceDetails) {
    if (orderDetail.value.DeliveryTaxInvoiceDetails.No) {
      fullAddress += orderDetail.value.DeliveryTaxInvoiceDetails.No + " ";
    }
    if (orderDetail.value.DeliveryTaxInvoiceDetails.Moo.length > 0) {
      fullAddress += "หมู่ที่ " + orderDetail.value.DeliveryTaxInvoiceDetails.Moo + " ";
    }
    if (orderDetail.value.DeliveryTaxInvoiceDetails.Building.length > 0) {
      fullAddress += orderDetail.value.DeliveryTaxInvoiceDetails.Building + " ";
    }
    if (orderDetail.value.DeliveryTaxInvoiceDetails.Alley.length > 0) {
      fullAddress += "ซอย " + orderDetail.value.DeliveryTaxInvoiceDetails.Alley + " ";
    }
    if (orderDetail.value.DeliveryTaxInvoiceDetails.Road.length > 0) {
      fullAddress += "ถนน " + orderDetail.value.DeliveryTaxInvoiceDetails.Road + " ";
    }
    if (orderDetail.value.DeliveryTaxInvoiceDetails.SubDistrictName.length > 0) {
      fullAddress += orderDetail.value.DeliveryTaxInvoiceDetails.SubDistrictName + " ";
    }
    if (orderDetail.value.DeliveryTaxInvoiceDetails.DistrictName.length > 0) {
      fullAddress += orderDetail.value.DeliveryTaxInvoiceDetails.DistrictName + " ";
    }
    if (orderDetail.value.DeliveryTaxInvoiceDetails.ProvinceName.length > 0) {
      fullAddress += orderDetail.value.DeliveryTaxInvoiceDetails.ProvinceName + " ";
    }
    if (orderDetail.value.DeliveryTaxInvoiceDetails.ZipCode.length > 0) {
      fullAddress +=
        "รหัสไปรษณีย์ " + orderDetail.value.DeliveryTaxInvoiceDetails.ZipCode + " ";
    }
  }
  return fullAddress;
};
const getDeliveryText = (): string => {
  let text = "";
  if (orderDetail && orderDetail.value) {
    if (
      orderDetail.value.DeliveryMethod1.MethodType == "EXCLUDE" &&
      orderDetail.value.DeliveryMethod1.DeliveryType == "PAPER"
    ) {
      text = "รับกรมธรรม์ตัวจริงทางทางหน้าร้าน";
    } else if (
      orderDetail.value.DeliveryMethod1.MethodType == "EXCLUDE" &&
      orderDetail.value.DeliveryMethod1.DeliveryType == "ELECTRONIC"
    ) {
      text = "รับกรมธรรม์ตัวจริงทางอีเมล์";
    } else if (
      orderDetail.value.DeliveryMethod1.MethodType == "ALL_AT_ONCE" &&
      orderDetail.value.DeliveryMethod1.DeliveryType == "DELIVERY"
    ) {
      text =
        "รับกรมธรรม์ตัวจริงทางไปรษณีย์ (" +
        orderDetail.value.DeliveryMethod1.DeliveryChannelType +
        ")";
    } else if (
      orderDetail.value.DeliveryMethod1.MethodType == "POLICY" &&
      orderDetail.value.DeliveryMethod1.DeliveryType == "DELIVERY"
    ) {
      text =
        "รับกรมธรรม์ตัวจริงทางไปรษณีย์ (" +
        orderDetail.value.DeliveryMethod1.DeliveryChannelType +
        ")";
    }
  }
  return text;
};
const getDeliveryTextTaxInvoice = (): string => {
  let text = "";
  if (orderDetail && orderDetail.value) {
    if (
      orderDetail.value.DeliveryMethod1.MethodType == "ALL_AT_ONCE" &&
      orderDetail.value.DeliveryMethod1.DeliveryType == "DELIVERY"
    ) {
      text = "จัดส่งพร้อมกรมธรรม์";
    } else {
      text =
        "รับใบกำกับภาษีตัวจริงทางไปรษณีย์ (" +
        orderDetail.value.DeliveryMethod2.DeliveryChannelType +
        ")";
    }
  }
  return text;
};
const getCarDetail = (): string => {
  let carDetail = "";
  if (props.orderDetail) {
    carDetail = `${props.orderDetail.CarDetails.CarBrand} ${props.orderDetail.CarDetails.CarModel} ${props.orderDetail.CarDetails.SubCarModel}  ${props.orderDetail.CarDetails.CarYear}`;
  }
  return carDetail;
};
const ActionEditData = (url: string) => {
  const router = useRouter();
  if (OrderSummaryInfo.value && OrderSummaryInfo.value.Order) {
    const order = OrderSummaryInfo.value.Order;
    if (url.includes("placeorder")) {
      const req: PlaceOrderRequest = {
        OrderNo: order.CarDetails.OrderNo,
        Package: order.Package,
        CarDetailsExtension: order.CarDetailsExtension,
        Customer: order.Customer,
        DeliveryMethod1: order.DeliveryMethod1,
        DeliveryMethod2: order.DeliveryMethod2,
        IsTaxInvoice: order.IsTaxInvoice,
      };
      placeorder.setOrder(req);
    } else if (url.includes("information") || url.includes("packages")) {
      const req: IInformation = {
        CarBrand: order.CarDetails.CarBrand,
        CarCC: order.CarDetails.CarCC.toFixed(0),
        CarDetail: getCarDetail(),
        CarModel: order.CarDetails.CarModel,
        CarSize: order.CarDetails.CarType,
        CarType: order.Package.CarTypeCode,
        CarUse: order.Package.UseCarCode,
        CarYear: order.CarDetails.CarYear.toFixed(0),
        customSubCarModel: "",
        EffectiveDate: order.Package.EffectiveDate,
        EffectiveType: order.Package.EffectiveType,
        ExpireDate: order.Package.ExpireDate,
        SubCarModel: order.CarDetails.SubCarModel,
        InsuranceDay: 0,
      };
      infomation.setInformation(req);
    }
  }

  router.push("/order/compulsory/" + url);
};
const onLoad = onMounted(() => {
  if (props.orderDetail) {
    orderDetail.value = props.orderDetail;
  }
});
</script>
