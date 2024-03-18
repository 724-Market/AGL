<template>
    <div class="card">
        <h5 class="card-title">ดาวน์โหลดกรมธรรม์</h5>
        <div class="downloadable">
          <p>กรมธรรม์ภาคบังคับ (พ.ร.บ.)</p>
          <a class="btn-info" href="#" title="กรมธรรม์ภาคบังคับ (พ.ร.บ.)"><i class="fa-solid fa-file-shield"></i>TH 1102-103-2485676</a>
        </div>

        <div class="accordion" id="accordion-summary" v-if="orderGet">
            <div class="accordion-item">
                <h3 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panel-summary-1" aria-expanded="true" aria-controls="panel-summary-1">
                        ข้อมูลผู้เอาประกันภัย
                    </button>
                </h3>
                <div id="panel-summary-1" class="accordion-collapse collapse show">
                    <div class="accordion-body">
                        <section class="summary-list">
                            <div class="summary-item">
                                <h4 class="topic">ผู้เอาประกันภัย</h4>
                                <p>
                                    {{ orderGet.AssuredDetails.Prefix }}
                                    {{ orderGet.AssuredDetails.FirstName }}
                                    {{ orderGet.AssuredDetails.LastName }}
                                </p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">เลขที่บัตรประชาชน</h4>
                                <p>{{ orderGet.AssuredDetails.IDCard }}</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">วันเดือนปีเกิด</h4>
                                <p>
                                  {{ useUtility().formatDate(orderGet.AssuredDetails.BirthDate, "FullDate") }} ({{
                                        getAge(orderGet.AssuredDetails.BirthDate)
                                    }}
                                    ปี)
                                </p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">อีเมล</h4>
                                <p>{{ orderGet.AssuredDetails.Email }}</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">เบอร์มือถือ</h4>
                                <p>{{ orderGet.AssuredDetails.AddressPhoneNumber }}</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">ที่อยู่</h4>
                                <p>
                                    {{ getFullAddress() }}
                                </p>
                            </div>

                        </section>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h3 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panel-summary-2" aria-expanded="false" aria-controls="panel-summary-2">
                        ข้อมูลรถที่ทำประกันภัย
                    </button>
                </h3>
                <div id="panel-summary-2" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <section class="summary-list">
                            <div class="summary-item">
                                <h4 class="topic">รถยนต์</h4>
                                <p>
                                    {{ orderGet.CarDetails.CarBrand }} รุ่น
                                    {{ orderGet.CarDetails.CarModel }} รุ่นย่อย
                                    {{ orderGet.CarDetails.SubCarModel ?? "ไม่ทราบ" }} ปี
                                    {{ orderGet.CarDetails.CarYear }} ({{
                                        orderGet.CarDetails.CarColor
                                    }})
                                </p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">ลักษณะการใช้งาน</h4>
                                <p>{{ orderGet.InsureDetails.UseCarName }}</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">เลขทะเบียนรถยนต์</h4>
                                <p v-if="orderGet.CarDetails.IsRedLicense">
                                    {{ orderGet.CarDetails.CarLicense }} (ป้ายแดง)
                                </p>
                                <p v-else>{{ orderGet.CarDetails.CarLicense }}</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">ทะเบียนจังหวัด</h4>
                                <p>{{ orderGet.CarDetails.LicenseProvince }}</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">เลขตัวถังรถยนต์</h4>
                                <p>{{ orderGet.CarDetails.NumBody }}</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">เลขเครื่องยนต์</h4>
                                <p>{{ orderGet.CarDetails.NumEngine }}</p>
                            </div>

                        </section>
                    </div>
                </div>
            </div>
            <div class="accordion-item">
                <h3 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panel-summary-3" aria-expanded="false" aria-controls="panel-summary-3">
                        ข้อมูลประกันภัย
                    </button>
                </h3>
                <div id="panel-summary-3" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <section class="summary-list">
                            <div class="summary-item">
                                <h4 class="topic">บริษัทรับประกันภัย</h4>
                                <p>{{ orderGet.InsureDetails.CompanyName }}</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">ประเภทสินค้า</h4>
                                <p v-if="orderGet.InsureDetails.OrderType == 'Compulsory'">
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
                                  {{ useUtility().formatDate(orderGet.InsureDetails.ActiveStartDate, "ShortDate") }} -
                                  {{ useUtility().formatDate(orderGet.InsureDetails.ActiveEndDate, "ShortDate") }} ({{
                                        getDayOfYear()
                                    }}
                                    วัน)
                                </p>
                            </div>

                        </section>
                    </div>
                </div>
            </div>
            <div class="accordion-item" v-if="orderGet.DeliveryPolicyDetails">
                <h3 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panel-summary-4" aria-expanded="false" aria-controls="panel-summary-4">
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
                                <p v-if="orderGet.DeliveryPolicyDetails.AddressEmail">
                                    {{ orderGet.DeliveryPolicyDetails.AddressEmail }}</p>
                                <p v-else>-</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">ชื่อผู้รับ</h4>
                                <p>
                                    {{ orderGet.DeliveryPolicyDetails.AddressFirstName }}
                                    {{ orderGet.DeliveryPolicyDetails.AddressLastName }}
                                </p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">ที่อยู่จัดส่ง</h4>
                                <p v-if="orderGet.DeliveryPolicyDetails">
                                    {{ getFullAddressDelivery() }}
                                </p>
                                <p v-else>-</p>
                            </div>

                        </section>
                    </div>
                </div>
            </div>
            <div class="accordion-item" v-if="orderGet.IsTaxInvoice">
                <h3 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panel-summary-5" aria-expanded="false" aria-controls="panel-summary-5">
                        ข้อมูลจัดส่งใบกำกับภาษี
                    </button>
                </h3>
                <div id="panel-summary-5" class="accordion-collapse collapse">
                    <div class="accordion-body">
                        <section class="summary-list" v-if="orderGet.IsTaxInvoice">
                            <div class="summary-item">
                                <h4 class="topic">ออกใบกำกับภาษีให้</h4>
                                <p>
                                    {{ orderGet.TaxInvoiceDetails.AddressFirstName }}
                                    {{ orderGet.TaxInvoiceDetails.AddressLastName }}
                                </p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">เลขประจำตัวผู้เสียภาษี</h4>
                                <p>{{ orderGet.TaxInvoiceDetails.AddressTaxID }}</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">อีเมล</h4>
                                <p>{{ orderGet.TaxInvoiceDetails.AddressEmail }}</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">เบอร์มือถือ</h4>
                                <p>{{ orderGet.TaxInvoiceDetails.AddressPhoneNumber }}</p>
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
                                <p v-if="orderGet.DeliveryTaxInvoiceDetails">
                                    {{ orderGet.DeliveryTaxInvoiceDetails.AddressFirstName
                                    }}{{ orderGet.DeliveryTaxInvoiceDetails.AddressLastName }}
                                </p>
                                <p v-else>-</p>
                            </div>
                            <div class="summary-item">
                                <h4 class="topic">ที่อยู่จัดส่ง</h4>
                                <p v-if="orderGet.DeliveryTaxInvoiceDetails">
                                    {{ getFullAddressDeliveryTaxInvoice() }}
                                </p>
                                <p v-else>-</p>
                            </div>

                        </section>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { OrderDetails } from "~/shared/entities/order-entity"

// Loading state after
const props = defineProps({
    orderGet: {
        type: Object as () => OrderDetails
    }
})


const getDayOfYear = (): string => {
  let days = 0;
  if (props.orderGet) {
    const startDate = new Date(props.orderGet?.InsureDetails.ActiveStartDate);
    const endDate = new Date(props.orderGet?.InsureDetails.ActiveEndDate);
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
  if (props.orderGet) {
    if (props.orderGet?.AssuredDetails.No.length > 0) {
      fullAddress += props.orderGet?.AssuredDetails.No + " ";
    }
    if (props.orderGet?.AssuredDetails.Moo.length > 0) {
      fullAddress += "หมู่ที่ " + props.orderGet?.AssuredDetails.Moo + " ";
    }
    if (props.orderGet?.AssuredDetails.Building.length > 0) {
      fullAddress += props.orderGet?.AssuredDetails.Building + " ";
    }
    if (props.orderGet?.AssuredDetails.Alley.length > 0) {
      fullAddress += "ซอย " + props.orderGet?.AssuredDetails.Alley + " ";
    }
    if (props.orderGet?.AssuredDetails.Road.length > 0) {
      fullAddress += "ถนน " + props.orderGet?.AssuredDetails.Road + " ";
    }
    if (props.orderGet?.AssuredDetails.SubDistrictName.length > 0) {
      fullAddress += props.orderGet?.AssuredDetails.SubDistrictName + " ";
    }
    if (props.orderGet?.AssuredDetails.DistrictName.length > 0) {
      fullAddress += props.orderGet?.AssuredDetails.DistrictName + " ";
    }
    if (props.orderGet?.AssuredDetails.ProvinceName.length > 0) {
      fullAddress += props.orderGet?.AssuredDetails.ProvinceName + " ";
    }
    if (props.orderGet?.AssuredDetails.ZipCode.length > 0) {
      fullAddress += "รหัสไปรษณีย์ " + props.orderGet?.AssuredDetails.ZipCode + " ";
    }
  }
  return fullAddress;
};
const getFullAddressDelivery = (): string => {
  let fullAddress = "";
  if (props.orderGet) {
    if (props.orderGet?.DeliveryPolicyDetails.No.length > 0) {
      fullAddress += props.orderGet?.DeliveryPolicyDetails.No + " ";
    }
    if (props.orderGet?.DeliveryPolicyDetails.Moo.length > 0) {
      fullAddress += "หมู่ที่ " + props.orderGet?.DeliveryPolicyDetails.Moo + " ";
    }
    if (props.orderGet?.DeliveryPolicyDetails.Building.length > 0) {
      fullAddress += props.orderGet?.DeliveryPolicyDetails.Building + " ";
    }
    if (props.orderGet?.DeliveryPolicyDetails.Alley.length > 0) {
      fullAddress += "ซอย " + props.orderGet?.DeliveryPolicyDetails.Alley + " ";
    }
    if (props.orderGet?.DeliveryPolicyDetails.Road.length > 0) {
      fullAddress += "ถนน " + props.orderGet?.DeliveryPolicyDetails.Road + " ";
    }
    if (props.orderGet?.DeliveryPolicyDetails.SubDistrictName.length > 0) {
      fullAddress += props.orderGet?.DeliveryPolicyDetails.SubDistrictName + " ";
    }
    if (props.orderGet?.DeliveryPolicyDetails.DistrictName.length > 0) {
      fullAddress += props.orderGet?.DeliveryPolicyDetails.DistrictName + " ";
    }
    if (props.orderGet?.DeliveryPolicyDetails.ProvinceName.length > 0) {
      fullAddress += props.orderGet?.DeliveryPolicyDetails.ProvinceName + " ";
    }
    if (props.orderGet?.DeliveryPolicyDetails.ZipCode.length > 0) {
      fullAddress +=
        "รหัสไปรษณีย์ " + props.orderGet?.DeliveryPolicyDetails.ZipCode + " ";
    }
  }
  return fullAddress;
};
const getFullAddressTaxInvoice = (): string => {
  let fullAddress = "";
  if (props.orderGet?.TaxInvoiceDetails) {
    if (props.orderGet?.TaxInvoiceDetails.No.length > 0) {
      fullAddress += props.orderGet?.TaxInvoiceDetails.No + " ";
    }
    if (props.orderGet?.TaxInvoiceDetails.Moo.length > 0) {
      fullAddress += "หมู่ที่ " + props.orderGet?.TaxInvoiceDetails.Moo + " ";
    }
    if (props.orderGet?.TaxInvoiceDetails.Building.length > 0) {
      fullAddress += props.orderGet?.TaxInvoiceDetails.Building + " ";
    }
    if (props.orderGet?.TaxInvoiceDetails.Alley.length > 0) {
      fullAddress += "ซอย " + props.orderGet?.TaxInvoiceDetails.Alley + " ";
    }
    if (props.orderGet?.TaxInvoiceDetails.Road.length > 0) {
      fullAddress += "ถนน " + props.orderGet?.TaxInvoiceDetails.Road + " ";
    }
    if (props.orderGet?.TaxInvoiceDetails.SubDistrictName.length > 0) {
      fullAddress += props.orderGet?.TaxInvoiceDetails.SubDistrictName + " ";
    }
    if (props.orderGet?.TaxInvoiceDetails.DistrictName.length > 0) {
      fullAddress += props.orderGet?.TaxInvoiceDetails.DistrictName + " ";
    }
    if (props.orderGet?.TaxInvoiceDetails.ProvinceName.length > 0) {
      fullAddress += props.orderGet?.TaxInvoiceDetails.ProvinceName + " ";
    }
    if (props.orderGet?.TaxInvoiceDetails.ZipCode.length > 0) {
      fullAddress += "รหัสไปรษณีย์ " + props.orderGet?.TaxInvoiceDetails.ZipCode + " ";
    }
  }
  return fullAddress;
};
const getFullAddressDeliveryTaxInvoice = (): string => {
  let fullAddress = "";
  if (props.orderGet && props.orderGet?.DeliveryTaxInvoiceDetails) {
    if (props.orderGet?.DeliveryTaxInvoiceDetails.No) {
      fullAddress += props.orderGet?.DeliveryTaxInvoiceDetails.No + " ";
    }
    if (props.orderGet?.DeliveryTaxInvoiceDetails.Moo.length > 0) {
      fullAddress += "หมู่ที่ " + props.orderGet?.DeliveryTaxInvoiceDetails.Moo + " ";
    }
    if (props.orderGet?.DeliveryTaxInvoiceDetails.Building.length > 0) {
      fullAddress += props.orderGet?.DeliveryTaxInvoiceDetails.Building + " ";
    }
    if (props.orderGet?.DeliveryTaxInvoiceDetails.Alley.length > 0) {
      fullAddress += "ซอย " + props.orderGet?.DeliveryTaxInvoiceDetails.Alley + " ";
    }
    if (props.orderGet?.DeliveryTaxInvoiceDetails.Road.length > 0) {
      fullAddress += "ถนน " + props.orderGet?.DeliveryTaxInvoiceDetails.Road + " ";
    }
    if (props.orderGet?.DeliveryTaxInvoiceDetails.SubDistrictName.length > 0) {
      fullAddress += props.orderGet?.DeliveryTaxInvoiceDetails.SubDistrictName + " ";
    }
    if (props.orderGet?.DeliveryTaxInvoiceDetails.DistrictName.length > 0) {
      fullAddress += props.orderGet?.DeliveryTaxInvoiceDetails.DistrictName + " ";
    }
    if (props.orderGet?.DeliveryTaxInvoiceDetails.ProvinceName.length > 0) {
      fullAddress += props.orderGet?.DeliveryTaxInvoiceDetails.ProvinceName + " ";
    }
    if (props.orderGet?.DeliveryTaxInvoiceDetails.ZipCode.length > 0) {
      fullAddress +=
        "รหัสไปรษณีย์ " + props.orderGet?.DeliveryTaxInvoiceDetails.ZipCode + " ";
    }
  }
  return fullAddress;
};
const getDeliveryText = (): string => {
  let text = "";
  if (props.orderGet) {
    if (
      props.orderGet?.DeliveryMethod1.MethodType == "EXCLUDE" &&
      props.orderGet?.DeliveryMethod1.DeliveryType == "PAPER"
    ) {
      text = "รับกรมธรรม์ตัวจริงทางทางหน้าร้าน";
    } else if (
      props.orderGet?.DeliveryMethod1.MethodType == "EXCLUDE" &&
      props.orderGet?.DeliveryMethod1.DeliveryType == "ELECTRONIC"
    ) {
      text = "รับกรมธรรม์ตัวจริงทางอีเมล์";
    } else if (
      props.orderGet?.DeliveryMethod1.MethodType == "ALL_AT_ONCE" &&
      props.orderGet?.DeliveryMethod1.DeliveryType == "DELIVERY"
    ) {
      text =
        "รับกรมธรรม์ตัวจริงทางไปรษณีย์ (" +
        props.orderGet?.DeliveryMethod1.DeliveryChannelType +
        ")";
    } else if (
      props.orderGet?.DeliveryMethod1.MethodType == "POLICY" &&
      props.orderGet?.DeliveryMethod1.DeliveryType == "DELIVERY"
    ) {
      text =
        "รับกรมธรรม์ตัวจริงทางไปรษณีย์ (" +
        props.orderGet?.DeliveryMethod1.DeliveryChannelType +
        ")";
    }
  }
  return text;
};
const getDeliveryTextTaxInvoice = (): string => {
  let text = "";
  if (props.orderGet) {
    if (
      props.orderGet?.DeliveryMethod1.MethodType == "ALL_AT_ONCE" &&
      props.orderGet?.DeliveryMethod1.DeliveryType == "DELIVERY"
    ) {
      text = "จัดส่งพร้อมกรมธรรม์";
    } else {
      text =
        "รับใบกำกับภาษีตัวจริงทางไปรษณีย์ (" +
        props.orderGet?.DeliveryMethod2.DeliveryChannelType +
        ")";
    }
  }
  return text;
};
</script>
