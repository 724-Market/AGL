<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">
    <!-- Content -->
    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">
      <div class="row">
        <div class="col-lg-8 col-xl-9">
          <div class="card">
            <div class="card-header">
              <h3 class="card-title">ระบุข้อมูลรถยนต์</h3>
            </div>
            <div class="card-body">
              <div :class="statusMessageType" v-if="statusMessage">
                {{ statusMessage }}
              </div>

              <div class="form-inline">
                <ElementsFormRadioCarUse v-model="carUseText" />
              </div>

              <div class="form-inline">
                <FormKit type="select" label="ประเภทรถยนต์" name="CarType" placeholder="เลือกข้อมูล" :options="carType"
                  :value="carType.value" v-model="carTypeText" @change="handleCarTypeChange()" validation="required"
                  :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                <!-- <ElementsFormSelectCarType :options="carType" :value="carType.value" v-model="carTypeText"
                  @change="handleCarTypeChange" /> -->
              </div>

              <div class="form-inline">
                <FormKit type="select" label="ขนาดรถยนต์" name="CarSize" placeholder="เลือกข้อมูล" :options="carSize"
                  :value="carSize.value" v-model="carSizeText" @change="handleCarSizeChange" validation="required"
                  :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
              </div>

              <div class="form-inline">
                <FormKit type="select" label="ปีที่จดทะเบียน" name="CarYear" placeholder="เลือกข้อมูล" :options="carYesrs"
                  :value="carYesrs.value" v-model="carYesrsText" @change="handleCarYesrsChange" validation="required"
                  :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
              </div>

              <div class="form-inline">
                <FormKit type="select" label="ยี่ห้อรถ" name="CarBrand" placeholder="เลือกข้อมูล" :options="carBrand"
                  :value="carBrand.value" v-model="carBrandText" @change="handleCarBrandChange" validation="required"
                  :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
              </div>

              <div class="form-inline">
                <FormKit type="select" label="รุ่นรถ" name="CarModel" placeholder="เลือกข้อมูล" :options="carModel"
                  :value="carModel.value" v-model="carModelText" @change="handleCarModelChange" validation="required"
                  :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
              </div>

              <div class="form-inline">
                <FormKit type="select" label="รุ่นย่อย" name="SubCarModel" placeholder="เลือกข้อมูล"
                  :options="subcarModel" :value="subcarModel.value" v-model="subcarModelText"
                  @change="handleSubcarModelChange" validation="required"
                  :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
              </div>

              <div class="form-inline" v-if="subcarModelText == 'other'">
                <FormKit type="text" label="รุ่นย่อย (ระบุด้วยตนเอง)" name="customSubCarModel" placeholder="กรอกข้อมูล"
                  v-model="customSubCarModel" @change="handleCustomSubcarModelChange" />
              </div>

              <div class="form-inline" v-if="subcarModelText != 'unknown'">
                <FormKit type="text" label="ขนาดเครื่องยนต์" name="CarCC" placeholder="ระบุ cc ของเครื่องยนต์"
                  disabled="true" v-model="carCC" />
              </div>
            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">เลือกวันคุ้มครอง</h3>
            </div>
            <div class="card-body">
              <div :class="statusMessageType" v-if="statusMessage">
                {{ statusMessage }}
              </div>

              <div class="form-inline">
                <FormKit type="radio" label="เลือกวันคุ้มครอง" name="EffectiveType" :options="{
                  FULLYEAR: 'คุ้มครอง 1 ปี',
                  NOTFULLYEAR: 'เลือกวันคุ้มครองเอง',
                }" v-model="effectiveType" @input="handleEffectiveTypeChange" validation="required"
                  :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" options-class="option-block-inline" />
              </div>
              <div class="form-inline">
                <!-- <FormKit type="datepicker" label="เริ่มต้น" name="EffectiveDate" 
                  placeholder="วัน/เดือน/ปี ค.ศ." format="DD/MM/YYYY" picker-only
                  :min-date="effectiveMinDate" :max-date="effectiveMaxDate" v-model="effectiveDateText"
                  validation="required" :validation-messages="{ required: 'กรุณากรอกข้อมูล' }" /> -->
                <FormKit type="datepicker" label="เริ่มต้น" name="EffectiveDate" 
                  placeholder="วัน/เดือน/ปี ค.ศ." format="DD/MM/YYYY" picker-only
                  validation="required" :validation-messages="{ required: 'กรุณากรอกข้อมูล' }" />
              </div>
              <div class="form-inline">
                <!-- <FormKit type="datepicker" label="สิ้นสุด" name="ExpireDate" 
                  placeholder="วัน/เดือน/ปี ค.ศ" format="DD/MM/YYYY" picker-only 
                  :min-date="expireMinDate" :max-date="expireMaxDate" v-model="expireDateText"
                  :disabled="effectiveType == 'FULLYEAR' || effectiveDateText == ''" 
                  validation="required" :validation-messages="{ required: 'กรุณากรอกข้อมูล' }" /> -->
                <FormKit type="datepicker" label="สิ้นสุด" name="ExpireDate" 
                  placeholder="วัน/เดือน/ปี ค.ศ" format="DD/MM/YYYY" picker-only 
                  validation="required" :validation-messages="{ required: 'กรุณากรอกข้อมูล' }" />
              </div>

              <p class="text-center">
                จำนวนวันเอาประกัน <span class="text-info">{{ insuranceDay }} วัน</span>
              </p>
            </div>
          </div>
        </div>

        <!-- Sidebar -->
        <div class="col-lg-4 col-xl-3">
          <aside class="card">
            <div class="card-header">
              <h3 class="card-title">รายการที่เลือก</h3>
            </div>

            <OrderChecklist :list="checklist" />
          </aside>

          <FormKit type="submit" label="ไปเลือกแพ็กเกจ" name="order-submit" id="order-submit"
            :classes="{ input: 'btn-primary', outer: 'form-actions' }" :disabled="checklist[0].className != 'current' || checklist[1].className != 'current'
              " :loading="isLoading" />
        </div>
      </div>
    </FormKit>
    <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { SelectOption } from "~/shared/entities/select-option";
import {
  IUseCarResponse,
  ICarTypeResponse,
  ICarCategoryResponse,
  ICarBrandResponse,
  ICarModelResponse,
  ISubCarModelResponse,
  IInformation,
} from "~/shared/entities/information-entity";
import { defineEventHandler } from "~/server/api/setting.post";
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth";
import { useStoreInformation } from "~/stores/order/storeInformation";
import { storeToRefs } from "pinia";
import { IChecklist } from "~/shared/entities/checklist-entity";
import { info } from "console";

// Define Store
const storeAuth = useStoreUserAuth();
const { AuthenInfo } = storeToRefs(storeAuth);

const store = useStoreInformation();
const { CarInfo } = storeToRefs(store);

// Define Variables
// Loading state after form submiting
const isLoading = ref(true);

// Submitted state after submit
const submitted = ref(false);

const router = useRouter();

// Response status for notice user
const statusMessage = ref();
const statusMessageType = ref();

const CoverageExpireDateFullYearMaxDay: number =
  defineEventHandler.compulsory.CoverageExpireDateFullYearMaxDay;
const coverageExpireDateNotFullYearMinDay: number =
  defineEventHandler.compulsory.CoverageExpireDateNotFullYearMinDay;
const coverageExpireDateNotFullYearMaxDay: number =
  defineEventHandler.compulsory.CoverageExpireDateNotFullYearMaxDay;

var checklistCarData: globalThis.Ref<String> = ref(""); //current
var checklistCoverageDate: globalThis.Ref<String> = ref("");

var carDetail: String = "";
var carUse: globalThis.Ref<SelectOption[]> = ref([]);
var carUseText: globalThis.Ref<String> = ref("PERSONAL");
var carType: globalThis.Ref<SelectOption[]> = ref([]);
var carTypeText = ref("");
var carSize: globalThis.Ref<SelectOption[]> = ref([]);
var carSizeText = ref("");
var carYesrs: globalThis.Ref<SelectOption[]> = ref([]);
var carYesrsText = ref("");
var carBrand: globalThis.Ref<SelectOption[]> = ref([]);
var carBrandText = ref("");
var carModel: globalThis.Ref<SelectOption[]> = ref([]);
var carModelText = ref("");
const otherSubcarModel: String[] = ["other", "unknown"];
var subcarModel: globalThis.Ref<SelectOption[]> = ref([]);
var subcarModelText = ref("");
var customSubCarModel: globalThis.Ref<String> = ref("");
var carCC: globalThis.Ref<String> = ref("");

var effectiveType: globalThis.Ref<String> = ref("FULLYEAR");

const dateNow: Date = new Date();
const effectiveMinDate: String = dateNow.toLocaleDateString("en-CA"); // en-CA or sv => yyyy-MM-dd
const effectiveMaxDate: String = new Date(
  dateNow.setDate(dateNow.getDate() + defineEventHandler.compulsory.CoverageFuture)
).toLocaleDateString("en-CA");

var selectDate: Date;
var effectiveDateText: globalThis.Ref<String | undefined> = ref(undefined);
var expireDate: Date;
var expireDateText: globalThis.Ref<String> = ref("");
var expireMinDate: String = "";
var expireMaxDate: String = "";

var insuranceDay: globalThis.Ref<number> = ref(365);

const checklist: globalThis.Ref<IChecklist[]> = ref([
  {
    id: "1",
    className: "",
    desc: "ข้อมูลรถยนต์",
  },
  {
    id: "2",
    className: "",
    desc: "วันคุ้มครอง",
  },
]);

let values = reactive({});

// Page Load Event Load CarYear, CarUse, Call Api Default CarType And Check Data In Store
const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    await loadcarYesr("");
    await loadCarUse();
    await handleRadioCarUseChange("PERSONAL", "");

    // const info = sessionStorage.getItem("useStoreInformation") ?
    //   JSON.parse(sessionStorage.getItem("useStoreInformation") || "") as IInformation : undefined
    const info = CarInfo.value;
    if (info.CarUse != "") {
      carUseText.value = info.CarUse;
      await handleRadioCarUseChange(info.CarUse, info.CarType);
      await loadCarSize(info.CarType, info.CarSize);
      await loadcarYesr(info.CarYear);
      await loadCarBrand(info.CarYear, info.CarBrand);
      await loadCarModel(info.CarBrand, info.CarModel);
      await loadSubcarModel(info.CarModel, info.SubCarModel);

      if (info.customSubCarModel != "") customSubCarModel.value = info.customSubCarModel;
      carCC.value = info.CarCC;
      checklist.value[0].className = "current";

      let today = new Date();
      let effectiveDateCheck = new Date(info.EffectiveDate);
      console.log("check EffectiveDate", effectiveDateCheck > today);
      if (effectiveDateCheck >= today) {
        selectDate = new Date(info.EffectiveDate);
        effectiveType.value = info.EffectiveType;
        effectiveDateText.value = info.EffectiveDate;
        expireDateText.value = info.ExpireDate;
        insuranceDay.value = info.InsuranceDay ?? 0;
        checklist.value[1].className = "current";
      }
    }
  } else {
    isLoading.value = false;
    router.push("/login");
  }
});
// Event Handle CarUse Change Call Api Cartype
const handleRadioCarUseChange = async (event: String, optionText: string) => {
  if (event != undefined && (event == "PERSONAL" || event == "HIRE" || event == "RENT")) {
    isLoading.value = true;
    checklist.value[0].className = "";
    if (carUse.value.length == 0) await loadCarUse();
    carType.value = [];
    carSize.value = [];
    carBrand.value = [];
    carModel.value = [];
    subcarModel.value = [];

    carYesrsText.value = "";
    carTypeText.value = "";
    carSizeText.value = "";
    carBrandText.value = "";
    carModelText.value = "";
    subcarModelText.value = "";
    carCC.value = "";

    let carTypeList: SelectOption[] = [];
    let req = {
      UseCarCode: carUse.value.find((e) => e.value == event)?.value,
      UseCarName: carUse.value.find((e) => e.value == event)?.label,
    };
    const response = await useRepository().master.cartype(req);
    response.apiResponse.Data?.forEach((obj: ICarTypeResponse) => {
      let car: SelectOption = {
        label: obj.Name,
        value: obj.Code,
      };
      carTypeList.push(car);
    });

    carType.value = carTypeList;
    if (optionText != "") carTypeText.value = optionText;
    // console.log("carType", carType.value)
    isLoading.value = false;
  }
};

// Event Handle CarType Change Call function loadCarSize
const handleCarTypeChange = async () => {
  await loadCarSize(carTypeText.value, "");
};

// Event Handle CarSize Change Clear Data Under Self
const handleCarSizeChange = async (event: any) => {
  isLoading.value = true;
  carSizeText.value = event.target.value;
  checklist.value[0].className = "";

  carBrand.value = [];
  carModel.value = [];
  subcarModel.value = [];

  carYesrsText.value = "";
  carBrandText.value = "";
  carModelText.value = "";
  subcarModelText.value = "";
  customSubCarModel.value = "";
  carCC.value = "";
  isLoading.value = false;
};

// Event Handle CarYesrs Change Call function loadCarBrand
const handleCarYesrsChange = async (event: any) => {
  await loadCarBrand(event.target.value, "");
};

// Event Handle CarBrand Change Call function loadCarModel
const handleCarBrandChange = async (event: any) => {
  await loadCarModel(event.target.value, "");
};

// Event Handle CarModel Change Call function loadSubcarModel
const handleCarModelChange = async (event: any) => {
  await loadSubcarModel(event.target.value, "");
};

// Event Handle SubcarModel Change Set Value To CarCC And CarDetail
const handleSubcarModelChange = async (event: any) => {
  carCC.value = "";
  if (!otherSubcarModel.includes(event.target.value)) {
    carCC.value = event.target.value.toString().split("|")[1];
  }
  await checkFromCar();
};

// Event Handle CustomSubcarModel Change Set Value To CarDetail
const handleCustomSubcarModelChange = async (event: any) => {
  //carDetail = `${carDetail} ${event.target.value}`;
};

// Event Handle EffectiveType Change Set Value To ExpireDate And Calculate Min, Max ExpireDate
const handleEffectiveTypeChange = async (event: any) => {
  switch (event) {
    case "FULLYEAR":
      if (selectDate != undefined) await setExpireDate(CoverageExpireDateFullYearMaxDay);
      setInsuranceDay(CoverageExpireDateFullYearMaxDay);
      break;
    case "NOTFULLYEAR":
      if (selectDate != undefined) {
        let expireMinDateText = new Date(selectDate);
        expireMinDateText.setDate(
          expireMinDateText.getDate() + coverageExpireDateNotFullYearMinDay
        );
        expireMinDate = expireMinDateText.toLocaleDateString("en-CA");

        let expireMaxDateText = new Date(selectDate);
        expireMaxDateText.setDate(
          expireMaxDateText.getDate() + coverageExpireDateNotFullYearMaxDay
        );
        expireMaxDate = expireMaxDateText.toLocaleDateString("en-CA");

        if (CarInfo.value.InsuranceDay) setInsuranceDay(CarInfo.value.InsuranceDay ?? 0);
        else setInsuranceDay(CoverageExpireDateFullYearMaxDay);
      } else {
        setInsuranceDay(0);
      }
  }
};

/* Event Handle EffectiveDate Change Set Value To EffectiveDate, ExpireDate 
And Calculate Min, Max ExpireDate And Call Function checkFromDate */
const handleEffectiveDateChange = async (value: string) => {
  console.log("handleEffectiveDateChange", value)
  if (value && value != "") {
    selectDate = new Date(value);
    effectiveDateText.value = selectDate.toLocaleDateString("en-CA");
    switch (effectiveType.value) {
      case "FULLYEAR":
        await setExpireDate(CoverageExpireDateFullYearMaxDay);
        break;
      case "NOTFULLYEAR":
        await setExpireDate(coverageExpireDateNotFullYearMinDay);

        let expireMinDateText = new Date(selectDate);
        expireMinDateText.setDate(
          expireMinDateText.getDate() + coverageExpireDateNotFullYearMinDay
        );
        expireMinDate = expireMinDateText.toLocaleDateString("en-CA");

        let expireMaxDateText = new Date(selectDate);
        expireMaxDateText.setDate(
          expireMaxDateText.getDate() + coverageExpireDateNotFullYearMaxDay
        );
        expireMaxDate = expireMaxDateText.toLocaleDateString("en-CA");

        setInsuranceDay(coverageExpireDateNotFullYearMinDay);
    }
  } else {
    effectiveDateText.value = "";
    expireDateText.value = "";
  }
  await checkFromDate();
};

// Event Handle ExpireDate Change Set Value To ExpireDate And Call Function checkFromDate
const handleExpireDateChange = async (value: string) => {
  if (value && value != "") {
    expireDateText.value = new Date(value).toLocaleDateString("en-CA");
    let efDate = new Date(effectiveDateText.value.toString());
    let exDate = new Date(value);
    let differenceMs = exDate.getTime() - efDate.getTime();
    let differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    setInsuranceDay(differenceDays);
  } else {
    expireDateText.value = "";
  }
  await checkFromDate();
};

// Function For Set ExpireDate
const setExpireDate = async (dateCount: number) => {
  expireDate = new Date(selectDate);
  if (dateCount < 365) expireDate.setDate(expireDate.getDate() + dateCount);
  else expireDate.setFullYear(expireDate.getFullYear() + 1);
  expireDateText.value = expireDate.toLocaleDateString("en-CA");
};

const setInsuranceDay = async (dateCount: number) => {
  insuranceDay.value = dateCount;
};

// Function For Calculate And Set CarYear
const loadcarYesr = async (optionText: String) => {
  let yesrNow = dateNow.getFullYear() + 543;
  let carYesrsList: SelectOption[] = [];
  for (let i = 0; i < 20; i++) {
    let year: SelectOption = {
      label: `${yesrNow - i} (${yesrNow - i - 543})`,
      value: `${yesrNow - i}`,
    };
    carYesrsList.push(year);
  }
  carYesrs.value = carYesrsList;
  if (optionText != "") carYesrsText.value = optionText.toString();
};

// Function For Call Api Get usecar
const loadCarUse = async () => {
  isLoading.value = true;
  let carUseList: SelectOption[] = [];
  const response = await useRepository().master.usecar();
  response.apiResponse.Data?.forEach((obj: IUseCarResponse, index: number) => {
    let car: SelectOption = {
      label: obj.UseCarName,
      value: obj.UseCarCode,
    };
    carUseList.push(car);
  });
  carUse.value = carUseList;
  isLoading.value = false;
};

// Function For Call Api Get carcategory
const loadCarSize = async (params: String, optionText: String) => {
  isLoading.value = true;
  checklist.value[0].className = "";

  carSize.value = [];
  carBrand.value = [];
  carModel.value = [];
  subcarModel.value = [];

  carSizeText.value = "";
  carYesrsText.value = "";
  carBrandText.value = "";
  carModelText.value = "";
  subcarModelText.value = "";
  customSubCarModel.value = "";
  carCC.value = "";

  let carSizeList: SelectOption[] = [];
  let req = {
    UseCarCode: carUseText.value,
    CarTypeCode: params,
  };
  const response = await useRepository().master.carcategory(req);
  response.apiResponse.Data?.forEach((obj: ICarCategoryResponse) => {
    let car: SelectOption = {
      label: obj.CarSize,
      value: obj.ID,
    };
    carSizeList.push(car);
  });
  if (optionText != "") carSizeText.value = optionText.toString();
  carSize.value = carSizeList;
  isLoading.value = false;
};

// Function For Call Api Get carbrand
const loadCarBrand = async (params: String, optionText: String) => {
  isLoading.value = true;
  checklist.value[0].className = "";

  carBrand.value = [];
  carModel.value = [];
  subcarModel.value = [];

  carBrandText.value = "";
  carModelText.value = "";
  subcarModelText.value = "";
  customSubCarModel.value = "";
  carCC.value = "";

  let carBrandList: SelectOption[] = [];
  let req = {
    CarTypeCode: carTypeText,
    CarCategoryID: carSizeText.value,
    CarSalesYear: `${Number(params) - 543}`,
  };
  const response = await useRepository().master.carbrand(req);
  response.apiResponse.Data?.forEach((obj: ICarBrandResponse) => {
    let car: SelectOption = {
      label: obj.Name,
      value: obj.ID,
    };
    carBrandList.push(car);
  });
  carBrand.value = carBrandList;
  if (optionText != "") carBrandText.value = optionText.toString();
  // console.log("carBrand", carBrand.value)
  isLoading.value = false;
};

// Function For Call Api Get carmodel
const loadCarModel = async (params: String, optionText: String) => {
  isLoading.value = true;
  checklist.value[0].className = "";



  carModel.value = [];
  subcarModel.value = [];

  carModelText.value = "";
  subcarModelText.value = "";
  customSubCarModel.value = "";
  carCC.value = "";

  let carModelList: SelectOption[] = [];
  let req = {
    CarBrandID: params,
    CarCategoryID: carSizeText.value,
    CarSalesYear: `${Number(carYesrsText.value) - 543}`,
  };
  const response = await useRepository().master.carmodel(req);
  response.apiResponse.Data?.forEach((obj: ICarModelResponse) => {
    let car: SelectOption = {
      label: obj.Name,
      value: obj.ID,
    };
    carModelList.push(car);
  });
  carModel.value = carModelList;
  if (optionText != "") carModelText.value = optionText.toString();
  // console.log("carModel", carModel.value)
  isLoading.value = false;
};

// Function For Call Api Get subcarmodel
const loadSubcarModel = async (params: String, optionText: String) => {



  isLoading.value = true;
  checklist.value[0].className = "";

  subcarModel.value = [];

  subcarModelText.value = "";
  customSubCarModel.value = "";
  carCC.value = "";

  let subCarModelList: SelectOption[] = [
    { label: "อื่นๆ", value: "other" },
    { label: "ไม่ทราบรุ่นย่อย", value: "unknown" },
  ];
  let req = {
    CarBrandID: carBrandText.value,
    CarModelID: params,
    CarSalesYear: `${Number(carYesrsText.value) - 543}`,
  };
  const response = await useRepository().master.subcarmodel(req);
  response.apiResponse.Data?.forEach((obj: ISubCarModelResponse) => {
    let car: SelectOption = {
      label: obj.Name,
      value: `${obj.ID}|${obj.CarCC}`,
    };
    subCarModelList.push(car);
  });
  subcarModel.value = subCarModelList;
  if (optionText != "") subcarModelText.value = optionText.toString();
  // console.log("subcarModel", subcarModel.value)
  isLoading.value = false;
};

// Function For Check Form Car Data For CheckList
const checkFromCar = async () => {
  if (
    carTypeText.value != "" &&
    carSizeText.value != "" &&
    carYesrsText.value != "" &&
    carBrandText.value != "" &&
    carModelText.value != ""
  ) {
    checklist.value[0].className = "current";
  } else {
    checklist.value[0].className = "";
  }
};

// Function For Check Form CoverageDate Data For CheckList
const checkFromDate = async () => {
  if (effectiveDateText.value != "" && expireDateText.value != "") {
    checklist.value[1].className = "current";
  } else {
    checklist.value[1].className = "";
  }
};
// function Get carDetail
const getCarDetail = async () => {
  carDetail = "";
  if (carBrandText.value && carBrandText.value != "") {
    carDetail = carBrand.value.find((e) => e.value == carBrandText.value)?.label ?? "";
  }
  if (carModelText.value && carModelText.value != "") {
    carDetail =
      `${carDetail} ` + carModel.value.find((e) => e.value == carModelText.value)?.label ?? "";
  }
  if (subcarModelText.value && subcarModelText.value != "") {
    if (!otherSubcarModel.includes(subcarModelText.value)) {
      carDetail = `${carDetail} ${subcarModel.value.find((e) => e.value == subcarModelText.value)?.label
        }`;
    }
  }
  if (carYesrsText.value && carYesrsText.value != "") {
    carDetail = `${carDetail} ${Number(carYesrsText.value) - 543}`;
  }


};
// Define watch For Radio CarUse Change
watch(carUseText, async (newCarUse) => {
  await handleRadioCarUseChange(newCarUse, "");
});
watch(effectiveDateText, async(effectiveDateNew,effectiveDate)=>{
  if(effectiveDateNew)
  {
    await handleEffectiveDateChange(effectiveDateNew.toString())
  }
  
})
watch(expireDateText, async(expireDateNew,expireDateText)=>{
  if(expireDateNew)
  {await handleExpireDateChange(expireDateNew.toString())}
  
})
// Submit form event
const submitOrder = async (formData: any) => {
  await getCarDetail();
  let informationData = formData as IInformation;
  informationData.InsuranceDay = insuranceDay.value;
  informationData.CarDetail = `${carDetail}`;
  store.setInformation(informationData);

  // set state menu
  useStateMenu().setStateMenu(2);

  const router = useRouter();
  router.push("/order/compulsory/packages");
};
 
// Define layout
const layout = "monito";
const layoutClass = "page-monito";
const showPageSteps = true;
const showPageHeader = true;

// Define page meta
const pageTitle = "กรอกข้อมูล";
const pageCategory = "แจ้งงาน พ.ร.บ.";
const pageDescription = "กรอกข้อมูลและรายละเอียดของรถยนต์ที่ต้องการซื้อ พ.ร.บ.";

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-order category-compulsory single-information",
  },
});
</script>
