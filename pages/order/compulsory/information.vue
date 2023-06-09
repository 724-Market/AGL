<template>
  <NuxtLayout :name="layout">
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
                <ElementsFormSelectCarType :options="carType" :value="carType.value" v-model="carTypeText"
                  @change="handleCarTypeChange" />
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
                <FormKit type="date" label="เริ่มต้น" name="EffectiveDate" placeholder="dd/mm/yyyy"
                  :min="effectiveMinDate" :max="effectiveMaxDate" v-model="effectiveDateText"
                  @change="handleEffectiveDateChange" validation="required"
                  :validation-messages="{ required: 'กรุณากรอกข้อมูล' }" />
              </div>
              <div class="form-inline">
                <FormKit type="date" label="สิ้นสุด" name="ExpireDate" placeholder="dd/mm/yyyy" :min="expireMinDate"
                  :max="expireMaxDate" :disabled="effectiveType == 'FULLYEAR' || effectiveDateText == ''"
                  v-model="expireDateText" @change="handleExpireDateChange" validation="required"
                  :validation-messages="{ required: 'กรุณากรอกข้อมูล' }" />
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

            <div class="card-body">

              <OrderCartCar 
                :carDetail="carDetailForCart" 
                :insuranceDay="insuranceDayForCart"
                :effectiveDate="effectiveDateForCart"
                :expireDate="expireDateForCart"
                :carUse="carUseForCart"
                :carLabel="carLabelForCart">
              </OrderCartCar>
            </div>

            <OrderChecklist :list="checklist" v-if="checklist && checklist.length > 0" />

          </aside>

          <FormKit type="submit" label="ไปเลือกแพ็กเกจ" name="order-submit" id="order-submit"
            :classes="{ input: 'btn-primary', outer: 'form-actions' }"
            :disabled="checklist[0].className != 'current' || checklist[1].className != 'current'" :loading="isLoading" />

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
import { useStoreInformation } from "~/stores/order/storeInformation";
import { storeToRefs } from "pinia";
import { IChecklist } from "~/shared/entities/checklist-entity";

const carDetailForCart: String = 'TOYOTA Yaris 1.2 Smart Auto 2019' // TODO: Mock Up Cart
const insuranceDayForCart: Number = 365 // TODO: Mock Up Cart
const effectiveDateForCart: String = '02/02/2023' // TODO: Mock Up Cart
const expireDateForCart: String = '02/02/2024' // TODO: Mock Up Cart
const carUseForCart: String = 'รถให้เช่า' // TODO: Mock Up Cart
const carLabelForCart: String = 'ป้ายแดง' // TODO: Mock Up Cart

// Define Store
const store = useStoreInformation();
const { InformationInfo } = storeToRefs(store);

// Define Variables
// Loading state after form submiting
const isLoading = ref(true);

// Submitted state after submit
const submitted = ref(false);

// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

const dateNow: Date = new Date()
const CoverageExpireDateFullYearMaxDay: number = defineEventHandler.compulsory.CoverageExpireDateFullYearMaxDay
const coverageExpireDateNotFullYearMinDay: number = defineEventHandler.compulsory.CoverageExpireDateNotFullYearMinDay
const coverageExpireDateNotFullYearMaxDay: number = defineEventHandler.compulsory.CoverageExpireDateNotFullYearMaxDay

var checklistCarData: globalThis.Ref<String> = ref("") //current
var checklistCoverageDate: globalThis.Ref<String> = ref("")

var carDetail: String = ""
var carUse: globalThis.Ref<SelectOption[]> = ref([])
var carUseText: globalThis.Ref<String> = ref("PERSONAL")
var carType: globalThis.Ref<SelectOption[]> = ref([])
var carTypeText: String = ""
var carSize: globalThis.Ref<SelectOption[]> = ref([])
var carSizeText: String = ""
var carYesrs: globalThis.Ref<SelectOption[]> = ref([])
var carYesrsText: String = ""
var carBrand: globalThis.Ref<SelectOption[]> = ref([])
var carBrandText: String = ""
var carModel: globalThis.Ref<SelectOption[]> = ref([])
var carModelText: String = ""
const otherSubcarModel: String[] = ['other', 'unknown']
var subcarModel: globalThis.Ref<SelectOption[]> = ref([])
var subcarModelText: String = ""
var customSubCarModel: globalThis.Ref<String> = ref("")
var carCC: globalThis.Ref<String> = ref("")

var effectiveType: globalThis.Ref<String> = ref("FULLYEAR")

var selectDate: Date
var effectiveDateText: globalThis.Ref<String> = ref("")
const effectiveMinDate: String = dateNow.toLocaleDateString("en-CA") // en-CA or sv => yyyy-MM-dd 
const effectiveMaxDate: String = new Date(dateNow.setDate(dateNow.getDate() + defineEventHandler.compulsory.CoverageFuture)).toLocaleDateString("en-CA")

var expireDate: Date
var expireDateText: globalThis.Ref<String> = ref("")
var expireMinDate: String = ""
var expireMaxDate: String = ""

var insuranceDay: globalThis.Ref<number> = ref(365)

const checklist: globalThis.Ref<IChecklist[]> = ref([
  {
    id: '1',
    className: '',
    desc: 'ข้อมูลรถยนต์'
  },
  {
    id: '2',
    className: '',
    desc: 'วันคุ้มครอง'
  }
])
let values = reactive({})

// Page Load Event Load CarYear, CarUse, Call Api Default CarType And Check Data In Store
const onLoad = onMounted(async () => {
  // isLoading.value = true
  await loadcarYesr('')
  await loadCarUse()
  await handleRadioCarUseChange('PERSONAL', '')

  const info = sessionStorage.getItem("useStoreInformation") ?
    JSON.parse(sessionStorage.getItem("useStoreInformation") || "") as IInformation : undefined
  console.log('information', info)
  if (info) {
    carUseText.value = info.CarUse
    await handleRadioCarUseChange(info.CarUse, info.CarType)
    await loadCarSize(info.CarType, info.CarSize)
    await loadcarYesr(info.CarYear)
    await loadCarBrand(info.CarYear, info.CarBrand)
    await loadCarModel(info.CarBrand, info.CarModel)
    await loadSubcarModel(info.CarModel, info.SubCarModel)

    if (info.customSubCarModel != '') customSubCarModel.value = info.customSubCarModel
    carCC.value = info.CarCC

    selectDate = new Date(info.EffectiveDate)
    effectiveType.value = info.EffectiveType
    effectiveDateText.value = info.EffectiveDate
    expireDateText.value = info.ExpireDate

    checklist.value[0].className = 'current'
    checklist.value[1].className = 'current'
   
  }
  // isLoading.value = false
  // console.log("Loading = ",isLoading.value)
});

// Define watch For Radio CarUse Change
watch(carUseText, async (newCarUse) => {
  await handleRadioCarUseChange(newCarUse, "");
});

// Event Handle CarUse Change Call Api Cartype
const handleRadioCarUseChange = async (event: String, optionText: String) => {
  if (event != undefined && (event == "PERSONAL" || event == "HIRE" || event == "RENT")) {
    isLoading.value = true
    checklist.value[0].className = ''
    if (carUse.value.length == 0) await loadCarUse();
    carType.value = [];
    carSize.value = [];
    carBrand.value = [];
    carModel.value = [];
    subcarModel.value = [];

    carYesrsText = "";
    carTypeText = "";
    carSizeText = "";
    carBrandText = "";
    carModelText = "";
    subcarModelText = "";
    carCC.value = "";

    let carTypeList: SelectOption[] = [];
    const response = await useCallApi().post<ICarTypeResponse[]>({
      URL: "/Master/cartype/list",
      UseCarCode: carUse.value.find((e) => e.value == event)?.value,
      UseCarName: carUse.value.find((e) => e.value == event)?.label,
    });
    response.apiResponse.Data?.forEach((obj: ICarTypeResponse) => {
      let car: SelectOption = {
        label: obj.Name,
        value: obj.Code,
      };
      carTypeList.push(car);
    });
    carType.value = carTypeList;
    if (optionText != "") carTypeText = optionText;
    // console.log("carType", carType.value)
    isLoading.value = false
    console.log("Loading = ",isLoading.value)
  }
};

// Event Handle CarType Change Call function loadCarSize
const handleCarTypeChange = async (event: any) => {
  await loadCarSize(event.target.value, "");
};

// Event Handle CarSize Change Clear Data Under Self
const handleCarSizeChange = async (event: any) => {
  isLoading.value = true
  carSizeText = event.target.value
  checklist.value[0].className = ''

  carBrand.value = []
  carModel.value = []
  subcarModel.value = []

  carYesrsText = ''
  carBrandText = ''
  carModelText = ''
  subcarModelText = ''
  customSubCarModel.value = ''
  carCC.value = ''
  isLoading.value = false
}

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
  carCC.value = ''
  if (!otherSubcarModel.includes(event.target.value)) {
    carDetail = `${carDetail} ${subcarModel.value.find((e) => e.value == event.target.value)?.label}`
    carCC.value = event.target.value.toString().split("|")[1]
  }
  else if (event.target.value == 'unknown') {
    carDetail = `${carDetail} ${carModel.value.find((e) => e.value == carModelText)?.label}`
  }
  await checkFromCar()
}

// Event Handle CustomSubcarModel Change Set Value To CarDetail
const handleCustomSubcarModelChange = async (event: any) => {
  carDetail = `${carDetail} ${event.target.value}`;
};

// Event Handle EffectiveType Change Set Value To ExpireDate And Calculate Min, Max ExpireDate
const handleEffectiveTypeChange = async (event: any) => {
  switch (event) {
    case "FULLYEAR":
      if (selectDate != undefined) await setExpireDate(CoverageExpireDateFullYearMaxDay);
      // insuranceDay.value = CoverageExpireDateFullYearMaxDay;
      setInsuranceDay(CoverageExpireDateFullYearMaxDay)
      break;
    case "NOTFULLYEAR": 
      if (selectDate != undefined) {
        // await setExpireDate(coverageExpireDateNotFullYearMinDay); // TODO Bug ExpireDate Here
        let expireMinDateText = new Date(selectDate);
        expireMinDateText.setDate(expireMinDateText.getDate() + coverageExpireDateNotFullYearMinDay);
        expireMinDate = expireMinDateText.toLocaleDateString("en-CA");

        let expireMaxDateText = new Date(selectDate);
        expireMaxDateText.setDate(expireMaxDateText.getDate() + coverageExpireDateNotFullYearMaxDay);
        expireMaxDate = expireMaxDateText.toLocaleDateString("en-CA");

        // insuranceDay.value = CoverageExpireDateFullYearMaxDay;
        setInsuranceDay(CoverageExpireDateFullYearMaxDay)
      }
      else {
        // insuranceDay.value = 0;
        setInsuranceDay(0)
      }
  }
};

/* Event Handle EffectiveDate Change Set Value To EffectiveDate, ExpireDate 
And Calculate Min, Max ExpireDate And Call Function checkFromDate */
const handleEffectiveDateChange = async (event: any) => {
  selectDate = new Date(event.target.value)
  effectiveDateText.value = selectDate.toLocaleDateString("en-CA")
  switch (effectiveType.value) {
    case "FULLYEAR":
      await setExpireDate(CoverageExpireDateFullYearMaxDay);
      break;
    case "NOTFULLYEAR":
      await setExpireDate(coverageExpireDateNotFullYearMinDay)

      let expireMinDateText = new Date(selectDate)
      expireMinDateText.setDate(expireMinDateText.getDate() + coverageExpireDateNotFullYearMinDay)
      expireMinDate = expireMinDateText.toLocaleDateString("en-CA")

      let expireMaxDateText = new Date(selectDate)
      expireMaxDateText.setDate(expireMaxDateText.getDate() + coverageExpireDateNotFullYearMaxDay)
      expireMaxDate = expireMaxDateText.toLocaleDateString("en-CA")

      // insuranceDay.value = coverageExpireDateNotFullYearMinDay;
      setInsuranceDay(coverageExpireDateNotFullYearMinDay)
  }
  await checkFromDate()
}

// Event Handle ExpireDate Change Set Value To ExpireDate And Call Function checkFromDate
const handleExpireDateChange = async (event: any) => {
  expireDateText.value = new Date(event.target.value).toLocaleDateString("en-CA")
  
  let efDate = new Date(effectiveDateText.value.toString())
  let exDate = new Date(event.target.value)
  let differenceMs = exDate.getTime() - efDate.getTime()
  let differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24))
  // insuranceDay.value = differenceDays
  setInsuranceDay(differenceDays)

  await checkFromDate()
}

// Function For Set ExpireDate
const setExpireDate = async (dateCount: number) => {
  expireDate = new Date(selectDate);
  if (dateCount < 365) expireDate.setDate(expireDate.getDate() + dateCount)
  else expireDate.setFullYear(expireDate.getFullYear() + 1)
  expireDateText.value = expireDate.toLocaleDateString("en-CA")

  // expireDate = expireDate.toLocaleDateString("en-US", { // yyyy/MM/dd
  //   year: "numeric",
  //   month: "2-digit",
  //   day: "2-digit",
  // })
};

const setInsuranceDay = async (dateCount: number) => {
  insuranceDay.value = dateCount
};

// Function For Calculate And Set CarYear
const loadcarYesr = async (optionText: String) => {
  let yesrNow = dateNow.getFullYear() + 543
  let carYesrsList: SelectOption[] = [];
  for (let i = 0; i < 20; i++) {
    let year: SelectOption = {
      label: `${yesrNow - i}`,
      value: `${yesrNow - i}`,
    };
    carYesrsList.push(year);
  }
  carYesrs.value = carYesrsList;
  if (optionText != "") carYesrsText = optionText;
};

// Function For Call Api Get usecar
const loadCarUse = async () => {
  isLoading.value = true
  let carUseList: SelectOption[] = []
  const response = await useCallApi().post<IUseCarResponse[]>({
    URL: "/Master/usecar/list",
  });
  response.apiResponse.Data?.forEach((obj: IUseCarResponse, index: number) => {
    let car: SelectOption = {
      label: obj.UseCarName,
      value: obj.UseCarCode,
    };
    carUseList.push(car);
  });
  carUse.value = carUseList;
  isLoading.value = false
};

// Function For Call Api Get carcategory
const loadCarSize = async (params: String, optionText: String) => {
  isLoading.value = true
  checklist.value[0].className = ''

  carSize.value = []
  carBrand.value = []
  carModel.value = []
  subcarModel.value = []

  carSizeText = ''
  carYesrsText = ''
  carBrandText = ''
  carModelText = ''
  subcarModelText = ''
  customSubCarModel.value = ''
  carCC.value = ''

  let carSizeList: SelectOption[] = []
  const response = await useCallApi().post<ICarCategoryResponse[]>({
    URL: "/Master/carcategory/list",
    UseCarCode: carUseText,
    CarTypeCode: params,
  });
  response.apiResponse.Data?.forEach((obj: ICarCategoryResponse) => {
    let car: SelectOption = {
      label: obj.CarSize,
      value: obj.ID,
    };
    carSizeList.push(car);
  });
  if (optionText != "") carSizeText = optionText;
  carSize.value = carSizeList;
  isLoading.value = false
};

// Function For Call Api Get carbrand
const loadCarBrand = async (params: String, optionText: String) => {
  isLoading.value = true
  checklist.value[0].className = ''

  carBrand.value = []
  carModel.value = []
  subcarModel.value = []

  carBrandText = ''
  carModelText = ''
  subcarModelText = ''
  customSubCarModel.value = ''
  carCC.value = ''

  let carBrandList: SelectOption[] = [];
  const response = await useCallApi().post<ICarBrandResponse[]>({
    URL: "/Master/carbrand/list",
    CarTypeCode: carTypeText,
    CarCategoryID: carSizeText,
    CarSalesYear: `${Number(params) - 543}`,
  });
  response.apiResponse.Data?.forEach((obj: ICarBrandResponse) => {
    let car: SelectOption = {
      label: obj.Name,
      value: obj.ID,
    };
    carBrandList.push(car);
  });
  carBrand.value = carBrandList;
  if (optionText != "") carBrandText = optionText;
  // console.log("carBrand", carBrand.value)
  isLoading.value = false
};

// Function For Call Api Get carmodel
const loadCarModel = async (params: String, optionText: String) => {
  isLoading.value = true
  checklist.value[0].className = ''

  carDetail = carBrand.value.find((e) => e.value == params)?.label ?? ''

  carModel.value = [];
  subcarModel.value = [];

  carModelText = ''
  subcarModelText = ''
  customSubCarModel.value = ''
  carCC.value = ''

  let carModelList: SelectOption[] = [];
  const response = await useCallApi().post<ICarModelResponse[]>({
    URL: "/Master/carmodel/list",
    CarBrandID: params,
    CarCategoryID: carSizeText,
    CarSalesYear: `${Number(carYesrsText) - 543}`,
  });
  response.apiResponse.Data?.forEach((obj: ICarModelResponse) => {
    let car: SelectOption = {
      label: obj.Name,
      value: obj.ID,
    };
    carModelList.push(car);
  });
  carModel.value = carModelList;
  if (optionText != "") carModelText = optionText;
  // console.log("carModel", carModel.value)
  isLoading.value = false
};

// Function For Call Api Get subcarmodel
const loadSubcarModel = async (params: String, optionText: String) => {
  isLoading.value = true
  checklist.value[0].className = ''

  subcarModel.value = []

  subcarModelText = ''
  customSubCarModel.value = ''
  carCC.value = ''

  let subCarModelList: SelectOption[] = [
    { label: 'อื่นๆ', value: 'other' },
    { label: 'ไม่ทราบรุ่นย่อย', value: 'unknown' }
  ]
  const response = await useCallApi().post<ISubCarModelResponse[]>({
    URL: "/Master/subcarmodel/list",
    CarBrandID: carBrandText,
    CarModelID: params,
    CarSalesYear: `${Number(carYesrsText) - 543}`,
  });
  response.apiResponse.Data?.forEach((obj: ISubCarModelResponse) => {
    let car: SelectOption = {
      label: obj.Name,
      value: `${obj.ID}|${obj.CarCC}`,
    };
    subCarModelList.push(car);
  });
  subcarModel.value = subCarModelList;
  if (optionText != "") subcarModelText = optionText;
  // console.log("subcarModel", subcarModel.value)
  isLoading.value = false
};

// Function For Check Form Car Data For CheckList
const checkFromCar = async () => {
  if (carTypeText != '' && carSizeText != '' && carYesrsText != '' && carBrandText != '' && carModelText != '') {
    checklist.value[0].className = 'current'
  }
  else {
    checklist.value[0].className = ''
  }
}

// Function For Check Form CoverageDate Data For CheckList
const checkFromDate = async () => {
  // console.log('check effectiveDateText', effectiveDateText.value)
  // console.log('check expireDateText', expireDateText.value)
  if (effectiveDateText.value != '' && expireDateText.value != '') {
    checklist.value[1].className = 'current'
  }
  else {
    checklist.value[1].className = ''
  }
}

// Submit form event
const submitOrder = async (formData: any) => {
  store.clearInformation();

  let infarmationData = formData as IInformation;
  infarmationData.CarDetail = `${carDetail} ${Number(infarmationData.CarYear) - 543}`;
  store.setInformation(infarmationData);
  // console.log("infarmationData", infarmationData)

  const router = useRouter();
  router.push("/order/compulsory/packages");
};

// Define layout
const layout = "monito";

// Define meta seo
useHead({
  title: "Compulsory กรอกข้อมูล",
  meta: [{ name: "description", content: "Compulsory กรอกข้อมูล" }],
  bodyAttrs: {
    class: "page-order category-compulsory single-information",
  },
});
</script>
