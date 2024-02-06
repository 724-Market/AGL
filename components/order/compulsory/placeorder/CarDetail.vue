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
                    <label for="CarLicense">
                      <span class="text-danger">*</span>
                      ทะเบียนรถ 
                    </label>
                    <FormKit
                      type="text"
                      id="CarLicense"
                      name="CarLicense"
                      placeholder="เลขป้ายทะเบียนรถ"
                      v-model="carLicenseText"
                      @change="handleCarLicenseChange"
                      :validation="[['required'], ['length', 0, 7]]"
                      validation-visibility="live"
                      :validation-messages="{
                        required: 'กรุณาใส่ข้อมูล',
                        length: 'ทะเบียนรถควรมีไม่เกิน 7 ตัว',
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
                      <!-- <FormKit
                        type="checkbox"
                        label="ป้ายแดง"
                        name="CarLicenseClassifier"
                        v-model="carLicenseClassifierText"
                        @change="handleCarLicenseClassifierChange"
                        :options="{
                          temporary: 'ป้ายแดง',
                        }"
                      /> -->
                      <FormKit
                        type="checkbox"
                        label="ป้ายแดง"
                        name="CarLicenseClassifier"
                        v-model="carLicenseClassifierText"
                        @change="handleCarLicenseClassifierChange"
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
                  <span>{{FileName}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <ElementsModalLoading :loading="isLoading"></ElementsModalLoading>
</template>

<script setup lang="ts">
import { defineEventHandler } from "~/server/api/setting.post";
import type { SelectOption } from "~/shared/entities/select-option";
import type { IInformation } from "~~/shared/entities/information-entity";
import type { CarDetailsExtension } from "~~/shared/entities/placeorder-entity";
import type { UploadFileRequest, UploadFileResponse } from "~~/shared/entities/file-entity";

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

const isLoading = ref(false);

// const SubCarModel: globalThis.Ref<String> = ref("")
var SubCarModel: string = ""
const carDetailCache: globalThis.Ref<CarDetailsExtension | undefined> = ref()

var carLicenseText = ref("");
var carLicenseValue: string = ""

const carProvince: globalThis.Ref<SelectOption[]> = ref([])
var carProvinceText = ref("");

var carLicenseClassifierText: globalThis.Ref<boolean> = ref(false)
var carLicenseClassifierValue: boolean = false

const carColor: globalThis.Ref<SelectOption[]> = ref([])
var carColorText = ref("");

var carBodyNumberText = ref("");
var carBodyNumberValue: string = ""

var carEngineNumberText = ref("");
var carEngineNumberValue: string = ""

var CarLicenseFileText = ref("");
var LicenseFileID: string = ""

var FileName: string = "--"
var Base64File: string = ""

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
    carLicenseText.value = carDetailCache.value.License
    carProvinceText.value = carDetailCache.value.LicenseProvinceID
    carLicenseClassifierText.value = carDetailCache.value.IsRedLicense 
    carColorText.value = carDetailCache.value.ColorID
    carBodyNumberText.value = carDetailCache.value.BodyNo
    carEngineNumberText.value = carDetailCache.value.EngineNo
    CarLicenseFileText.value = ''
    LicenseFileID = carDetailCache.value.LicenseFileID
    if(LicenseFileID != ''){
      getFile(LicenseFileID);
    }
  }
})

watch(carLicenseClassifierText, async (newValue) => {
  await handleCarLicenseClassifierChange(newValue);
})

const handleCarLicenseChange = async (event: any) => {
  carLicenseValue = event.target.value
  await handleCheckCarDetail()
}

const handleCarProvinceChange = async (event: any) => {
  await handleCheckCarDetail()
}

const handleCarLicenseClassifierChange = async (event: boolean) => {
  // carLicenseClassifierValue = event[0] === undefined ? false : true;
  carLicenseClassifierValue = event
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
  isLoading.value = true;
  let file = event.target.files[0]
  let base64FileString = await convertFileToBase64(file)
  let uploadFileReq: UploadFileRequest = {
    Base64: base64FileString,
    FileNameWithExtension: file.name.toString()
  }
  const response = await useRepository().file.upload(uploadFileReq)
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if(response.apiResponse.Data){
      LicenseFileID = response.apiResponse.Data[0]?.ID ?? ''
    }
  } else {
    // messageError.value = response.apiResponse.ErrorMessage ?? "";
  }
  await handleCheckCarDetail()
  isLoading.value = false;
}

const convertFileToBase64 = async (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const base64Data = reader.result as string
      const base64String = base64Data.split(',')[1]
      resolve(base64String);
    }

    reader.onerror = (error) => {
      reject(error);
    }

    reader.readAsDataURL(file)
  })
}

const getFile = async (fileId: string) => {
  isLoading.value = true;
  const response = await useRepository().file.get(fileId)
  console.log('response', response)
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if(response.apiResponse.Data){
      FileName = response.apiResponse.Data?.FileNameWithExtension ?? ''
      Base64File = response.apiResponse.Data?.Base64 ?? ''
      console.log('FileName', FileName)
      console.log('Base64File', Base64File)
    }
  } else {
    // messageError.value = response.apiResponse.ErrorMessage ?? "";
  }
  isLoading.value = false;
}

const handleCheckCarDetail = async () => {
  console.log('LicenseFileID', LicenseFileID)
  let carDetail: CarDetailsExtension = {
    License: carLicenseValue,
    BodyNo: carBodyNumberValue,
    EngineNo: carEngineNumberValue,
    ColorID: carColorText.value,
    LicenseProvinceID: carProvinceText.value,
    LicenseFileID: LicenseFileID,
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
      carLicenseText.value = carDetailCache.value.License
      carLicenseValue = carDetailCache.value.License

      carProvinceText.value = carDetailCache.value.LicenseProvinceID

      carLicenseClassifierText.value = carDetailCache.value.IsRedLicense 
      carLicenseClassifierValue = carDetailCache.value.IsRedLicense

      carColorText.value = carDetailCache.value.ColorID

      carBodyNumberText.value = carDetailCache.value.BodyNo
      carBodyNumberValue = carDetailCache.value.BodyNo

      carEngineNumberText.value = carDetailCache.value.EngineNo
      carEngineNumberValue = carDetailCache.value.EngineNo

      CarLicenseFileText.value = ''
      LicenseFileID = carDetailCache.value.LicenseFileID
      if(LicenseFileID != ''){
        
        getFile(LicenseFileID);
      }

      handleCheckCarDetail()
    }
  }
)
</script>
