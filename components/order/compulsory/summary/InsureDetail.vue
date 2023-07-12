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
                {{ orderDetail.AssuredDetails.LastName }}}
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
              <p>{{ orderDetail.AssuredDetails.Email }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ที่อยู่</h4>
              <p>
                {{ getFullAddress() }}
              </p>
            </div>

            <div class="summary-action">
              <a class="btn" href="#">แก้ไขข้อมูล</a>
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
                {{ orderDetail.CarDetails.CarModel }} รุ่นย่อย {{ orderDetail.CarDetails.SubCarModel ?? "ไม่ทราบ" }} ปี
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
              <a class="btn" href="#">แก้ไขข้อมูล</a>
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
              <a class="btn" href="#">แก้ไขข้อมูล</a>
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
              <p>{{ orderDetail.AssuredDetails.AddressEmail }}</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ชื่อผู้รับ</h4>
              <p> {{ orderDetail.AssuredDetails.FirstName }}  {{ orderDetail.AssuredDetails.LastName }} </p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ที่อยู่จัดส่ง</h4>
              <p v-if="orderDetail.DeliveryPolicyDetails">
                6/74 หมู่ 4 หมู่บ้านรุ้งตะวัน ตำบลคลองโยง อำเภอพุทธมณฑล จังหวัดนครปฐม
                73170
              </p>
              <p v-else>-</p>
            </div>

            <div class="summary-action">
              <a class="btn" href="#">แก้ไขข้อมูล</a>
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
              <p>บริษัท 724 มาร์เก็ต จำกัด (สาขาพระรามเก้า 0009)</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">เลขประจำตัวผู้เสียภาษี</h4>
              <p>3909900987654</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">อีเมล</h4>
              <p>p.inhumba@gmail.com</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">เบอร์โทรศัพท์</h4>
              <p>0890435478</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ที่อยู่</h4>
              <p>
                724 อาคารรุ่งโรจน์ ซอย พระราม9/11 แขวงห้วยขวาง เขตห้วยขวาง กรุงเทพ 10160
              </p>
            </div>
            <div class="summary-item">
              <h4 class="topic">วิธีการรับใบกำกับภาษี</h4>
              <p>รับกรมธรรม์ตัวจริงทางไปรษณีย์ (DHL Express)</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ชื่อผู้รับ</h4>
              <p>นาย ปฐมพงศ์ สังคจิตต์</p>
            </div>
            <div class="summary-item">
              <h4 class="topic">ที่อยู่จัดส่ง</h4>
              <p>
                6/74 หมู่ 4 หมู่บ้านรุ้งตะวัน ตำบลคลองโยง อำเภอพุทธมณฑล จังหวัดนครปฐม
                73170
              </p>
            </div>

            <div class="summary-action">
              <a class="btn" href="#">แก้ไขข้อมูล</a>
            </div>
          </section>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { OrderDetails } from "~/shared/entities/order-entity";

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

const getDeliveryText = (): string => {
  let text = "";
  if (orderDetail && orderDetail.value) {
    if (
      orderDetail.value.DeliveryMethod1.MethodType == "EXCLUDE" &&
      orderDetail.value.DeliveryMethod1.DeliveryType == "PAPER"
    ) {
      text='รับกรมธรรม์ตัวจริงทางทางหน้าร้าน'
    } else if (
      orderDetail.value.DeliveryMethod1.MethodType == "EXCLUDE" &&
      orderDetail.value.DeliveryMethod1.DeliveryType == "ELECTRONIC"
    ) {
      text='รับกรมธรรม์ตัวจริงทางอีเมล์'
    } else if (
      orderDetail.value.DeliveryMethod1.MethodType == "ALL_AT_ONCE" &&
      orderDetail.value.DeliveryMethod1.DeliveryType == "DELIVERY"
    ) {
      text='รับกรมธรรม์ตัวจริงทางไปรษณีย์ ('+orderDetail.value.DeliveryMethod1.DeliveryChannelType+')'
    } else if (
      orderDetail.value.DeliveryMethod1.MethodType == "POLICY" &&
      orderDetail.value.DeliveryMethod1.DeliveryType == "DELIVERY"
    ) {
      text='รับกรมธรรม์ตัวจริงทางไปรษณีย์ ('+orderDetail.value.DeliveryMethod1.DeliveryChannelType+')'
    }
  }
  return text;
};
const onLoad = onMounted(() => {
  if (props.orderDetail) {
    orderDetail.value = props.orderDetail;
  }
});
</script>
