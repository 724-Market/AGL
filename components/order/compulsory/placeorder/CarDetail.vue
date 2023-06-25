<template>
  <div class="card">
    <div class="card-body">
      <div class="accordion" id="accordion-car-detail">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapse-car-detail"
              aria-expanded="true"
              aria-controls="collapse-car-detail"
            >
              รายละเอียดรถ
            </button>
          </h2>
          <div
            id="collapse-car-detail"
            class="accordion-collapse collapse show"
            data-bs-parent="#accordion-car-detail"
          >
            <div class="accordion-body">
              <div class="form-placeorder">
                <div class="row">
                  <div class="col">
                    <FormKit
                      type="text"
                      label="ทะเบียนรถ"
                      id="CarLicense"
                      name="CarLicense"
                      placeholder="เลขป้ายทะเบียนรถ"
                      v-model="carLicenseText"
                      @change="handleCarLicenseChange"
                      :validation="[['required'], ['length', 0, 7]]"
                      :validation-messages="{
                        required: 'กรุณาใส่ข้อมูล',
                        length: 'ทะเบียนรถควรมีม่เกิน 7 ตัว',
                      }"
                      autocomplete="false"
                    />
                  </div>
                  <div class="col">
                    <FormKit
                      type="select"
                      label="จังหวัดของทะเบียนรถ"
                      name="CarLicenseProvince"
                      placeholder="จังหวัดบนป้ายทะเบียนรถ"
                      :options="carProvince"
                      :value="carProvince.value"
                      v-model="carProvinceText"
                      @change="handleCarProvinceChange"
                      validation="required"
                      :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <div class="form-hide-label">
                      <FormKit
                        type="checkbox"
                        label="ป้ายแดง"
                        name="CarLicenseClassifier"
                        v-model="carLicenseClassifierText"
                        @change="handleCarLicenseClassifierChange"
                        :options="{
                          temporary: 'ป้ายแดง',
                        }"
                      />
                    </div>
                  </div>
                </div>

                <div class="row">
                  <div class="col-sm-4 col-lg-3">
                    <FormKit
                      type="select"
                      label="สีรถ"
                      name="CarColor"
                      placeholder="สีของรถ"
                      :options="carColor"
                      :value="carColor.value"
                      v-model="carColorText"
                      @change="handleCarColorChange"
                      validation="required"
                      :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }"
                    />
                  </div>
                  <div class="col-sm-8 col-lg-5">
                    <FormKit
                      type="text"
                      label="เลขตัวถัง"
                      name="CarBodyNumber"
                      placeholder="ตัวอย่าง: 1FTLP62W4Axxxxxx"
                      maxlength="17"
                      v-model="carBodyNumberText"
                      @change="handlecarBodyNumberChange"
                      :validation="[
                        ['required'],
                        ['matches', /^(?=.*?[A-Z])(?=.*?[0-9]).*$/],
                        ['length', 17, 17],
                      ]"
                      :validation-messages="{
                        required: 'กรุณาใส่ข้อมูล',
                        matches: 'รูปแบบของเลขตัวถังไม่ถูกต้อง',
                        length: 'เลขตัวถังควรมี 17 หลัก',
                      }"
                      autocomplete="false"
                    />
                  </div>
                  <div class="col-sm-12 col-lg-4">
                    <FormKit
                      type="text"
                      label="เลขเครื่องยนต์"
                      name="CarEngineNumber"
                      v-model="carEngineNumberText"
                      @change="handleCarEngineNumberChange"
                      placeholder="ตัวอย่าง: 724XXX"
                      autocomplete="false"
                    />
                  </div>
                </div>

                <div class="row">
                  <div class="col">
                    <FormKit
                      type="file"
                      label="เอกสารประกอบ (สำเนาเล่มรถยนต์)"
                      name="CarLicenseFile"
                      accept=".pdf,.jpg,.png"
                      help="รองรับไฟล์นามสกุล pdf, jpg, png เท่านั้น"
                      v-model="CarLicenseFileText"
                      @change="handleFileChange"
                      :src="base64FileString"
                      :validation="
                        SubCarModel == 'unknown' || SubCarModel == 'other'
                          ? 'required'
                          : ''
                      "
                      :validation-messages="{ required: 'กรุณาอัปโหลดไฟล์เอกสาร' }"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { SelectOption } from "~/shared/entities/select-option";
import { IInformation } from "~~/shared/entities/information-entity";
import { CarDetailsExtension } from "~~/shared/entities/placeorder-entity";

const emit = defineEmits(['checkCarDetail'])

const props = defineProps({
  carProvince: Array<SelectOption>,
  carColor: Array<SelectOption>,
  info: {
    type: Object as () => IInformation,
  },
  carDetailCache: {
    type: Object as () => CarDetailsExtension,
  },
});

// const SubCarModel: globalThis.Ref<String> = ref("")
var SubCarModel: string = ""
const carDetailCache: globalThis.Ref<CarDetailsExtension | undefined> = ref()

var carLicenseText: string = ""
var carLicenseValue: string = ""

const carProvince: globalThis.Ref<SelectOption[]> = ref([])
var carProvinceText: string = ""

var carLicenseClassifierText: globalThis.Ref<string> = ref("")
var carLicenseClassifierValue: boolean = false

const carColor: globalThis.Ref<SelectOption[]> = ref([])
var carColorText: string = ""

var carBodyNumberText: string = ""
var carBodyNumberValue: string = ""

var carEngineNumberText: string = ""
var carEngineNumberValue: string = ""

var CarLicenseFileText: string = ""
var base64FileString: string = ""

const onLoad = onMounted(async () => {
  if(props.carProvince)
  {
    carProvince.value = props.carProvince
  }
  if(props.carColor){
    carColor.value = props.carColor
  }
  if(props.info){
    SubCarModel = props.info.SubCarModel
  }
  if(props.carDetailCache){
    carDetailCache.value = props.carDetailCache
  }

  if(carDetailCache.value){
    carLicenseText = carDetailCache.value.License
    carProvinceText = carDetailCache.value.LicenseProvinceID
    carLicenseClassifierText.value = carDetailCache.value.IsRedLicense ? 'temporary' : ''
    carColorText = carDetailCache.value.ColorID
    carBodyNumberText = carDetailCache.value.BodyNo
    carEngineNumberText = carDetailCache.value.EngineNo
    carLicenseText = carDetailCache.value.License
    CarLicenseFileText = ''
    base64FileString = carDetailCache.value.LicenseFileID
  }
  // console.log('SubCarModel', SubCarModel)
});

watch(carLicenseClassifierText, async (newValue) => {
  await handleCarLicenseClassifierChange(newValue);
});

const handleCarLicenseChange = async (event: any) => {
  carLicenseValue = event.target.value
  await handleCheckCarDetail()
}

const handleCarProvinceChange = async (event: any) => {
  await handleCheckCarDetail()
}

const handleCarLicenseClassifierChange = async (event: string) => {
  carLicenseClassifierValue = event[0] === undefined ? false : true;
  await handleCheckCarDetail()
}

const handleCarColorChange = async (event: any) => {
  await handleCheckCarDetail()
}

const handlecarBodyNumberChange = async (event: any) => {
  carBodyNumberValue = event.target.value
  await handleCheckCarDetail()
}

const handleCarEngineNumberChange = async (event: any) => {
  carEngineNumberValue = event.target.value
  await handleCheckCarDetail()
}

const handleFileChange = async (event: any) => {
  let file = event.target.files[0]
  base64FileString = await convertFileToBase64(file)
  await handleCheckCarDetail()
}

const convertFileToBase64 = async (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Data = reader.result as string;
      const base64String = base64Data.split(',')[1];
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
}

const handleCheckCarDetail = async () => {
  let carDetail: CarDetailsExtension = {
    License: carLicenseValue,
    BodyNo: carBodyNumberValue,
    EngineNo: carEngineNumberValue,
    ColorID: carColorText,
    LicenseProvinceID: carProvinceText,
    LicenseFileID: base64FileString,
    IsRedLicense: carLicenseClassifierValue
  }

  emit('checkCarDetail', carDetail)
}

watch(
  ()=>props.carProvince,
  ()=>{
    if(props.carProvince && props.carProvince.length>0){
      carProvince.value = props.carProvince
    }
  }
)
watch(
  ()=>props.carColor,
  ()=>{
    if(props.carColor && props.carColor.length>0){
      carColor.value = props.carColor
    }
  }
)
watch(
  ()=>props.carDetailCache,
  ()=>{
    if(props.carDetailCache){
      carDetailCache.value = props.carDetailCache
      carLicenseText = carDetailCache.value.License
      carProvinceText = carDetailCache.value.LicenseProvinceID
      carLicenseClassifierText.value = carDetailCache.value.IsRedLicense ? 'temporary' : ''
      carLicenseClassifierValue = carDetailCache.value.IsRedLicense
      carColorText = carDetailCache.value.ColorID
      carBodyNumberText = carDetailCache.value.BodyNo
      carEngineNumberText = carDetailCache.value.EngineNo
      CarLicenseFileText = ''
      base64FileString = carDetailCache.value.LicenseFileID

      handleCheckCarDetail()
    }
  }
)
</script>
