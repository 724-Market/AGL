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
                  <!-- <div class="col">
                    <label for="CarLicense"> ทะเบียนรถ </label>
                    <FormKit
                      type="text"
                      id="CarLicense"
                      name="CarLicense"
                      placeholder="เลขป้ายทะเบียนรถ"
                      v-model="carLicenseText"
                      @change="handleCarLicenseChange"
                      :validation="[['required'], ['length', 0, 7]]"
                      :validation-messages="{
                        required: 'กรุณาใส่ข้อมูล',
                        length: 'ทะเบียนรถควรมีไม่เกิน 7 ตัว',
                      }"
                      autocomplete="off"
                    />
                  </div> -->
                  <div class="col">
                    <label for="CarLicense"> เลขทะเบียนรถ </label>
                    <FormKit
                      type="text"
                      id="CarLicense"
                      name="CarLicense"
                      placeholder="ตัวอย่าง : 1กข"
                      v-model="carLicenseText"
                      @change="handleCarLicenseChange"
                      maxlength="3"
                      :validation="[
                        ['required'], 
                        ['length', 2, 3]
                      ]"
                      :validation-messages="{
                        required: 'กรุณาใส่ข้อมูล',
                        length: 'ตัวอักษรควรมีอย่างน้อย 2 ตัว และไม่เกิน 3 ตัว',
                      }"
                      autocomplete="off"
                    />
                  </div>
                  <div class="col">
                    <label for="CarLicense"> &nbsp; </label>
                    <FormKit
                      type="text"
                      id="CarLicense2"
                      name="CarLicense2"
                      placeholder="ตัวอย่าง : 1234"
                      v-model="carLicense2Text"
                      @change="handleCarLicense2Change"
                      :validation="[
                        ['required'], 
                        ['length', 0, 4],
                        ['matches', /^[0-9]+$/]
                      ]"
                      :validation-messages="{
                        required: 'กรุณาใส่ข้อมูล',
                        matches: 'เลขทะเบียนรถควรเป็นตัวเลขเท่านั้น',
                        length: 'ทะเบียนรถควรมีไม่เกิน 4 ตัว',
                      }"
                      autocomplete="off"
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
                      autocomplete="off"
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
                      autocomplete="off"
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
                      :validation="
                        SubCarModel == 'unknown' || SubCarModel == 'other'
                          ? 'required'
                          : ''
                      "
                      :validation-visibility="
                        SubCarModel == 'unknown' || SubCarModel == 'other'
                          ? 'live'
                          : ''
                      "
                      :validation-messages="{ required: 'กรุณาอัปโหลดไฟล์เอกสาร' }"
                    />
                  </div>
                  <div
                    v-if="FileName != '-' && Base64File != ''"
                    class="d-flex justify-content-end"
                  >
                    <div class="m-1">
                      <button
                        type="button"
                        class="btn btn-warning"
                        @click="handleDowloadFile"
                      >
                        {{ FileName }}
                      </button>
                    </div>
                  </div>
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
import type { RadioOption, SelectOption } from "~/shared/entities/select-option";
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

var carLicense2Text = ref("");
var carLicense2Value: string = ""

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

var FileName: string = "-"
var Base64File: string = ""
var FileNameList = ref([]);

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
    carLicenseText.value = carDetailCache.value.License.replace(/-/g, '');
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

// const handleCarLicenseChange = async (event: any) => {
//   carLicenseValue  = event.target.value;

//   // Find the position of the last consonant ('z') License format xyz-xxxx
//   const lastConsonantIndex = carLicenseValue.split('').reverse().join('').search(/[ก-ฮ]/g);
  
//   // Calculate the index from the end
//   const lastIndexFromEnd = carLicenseValue.length - lastConsonantIndex - 1;

//   // Insert '-' after the last consonant if found
//   if (lastConsonantIndex !== -1) {
//     carLicenseValue = carLicenseValue.slice(0, lastIndexFromEnd + 1) + '-' + carLicenseValue.slice(lastIndexFromEnd + 1);
//   }
  
//   // Use carLicenseValue for further processing or set it as needed
//   await handleCheckCarDetail();
// };

const handleCarLicense2Change = async (event: any) => {
  carLicense2Value = event.target.value
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
  if(base64FileString && base64FileString!="")
  {
    let uploadFileReq: UploadFileRequest = {
      UploadType: 'CarLicense',
      Base64: base64FileString,
      FileNameWithExtension: file.name.toString()
  }
  const response = await useRepository().file.upload(uploadFileReq)
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if(response.apiResponse.Data){
      LicenseFileID = response.apiResponse.Data[0]?.ID ?? ''
    }
  } else {
    // messageError.value = response.apiResponse.ErrorMessage ?? '';
  }
  await handleCheckCarDetail()
  }

  isLoading.value = false;
}

const convertFileToBase64 = async (file: File): Promise<string> => {
  if(file)
  {
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
    if(file)
    {
      reader.readAsDataURL(file)
    }

  })
  }
  else{
    return ''
  }

}

const getFile = async (fileId: string) => {
  isLoading.value = true;
  const response = await useRepository().file.get(fileId)
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
    if(response.apiResponse.Data){
      FileName = `${response.apiResponse.Data?.Name}${response.apiResponse.Data?.Extension}` ?? ''
      Base64File = response.apiResponse.Data?.Base64 ?? ''
    }
  } else {
    // messageError.value = response.apiResponse.ErrorMessage ?? "";
  }
  isLoading.value = false;
}

const handleDowloadFile = async (fileId: string) => {
  isLoading.value = true;
  const mimeType: RadioOption[] = [
    {
        label: 'jpeg',
        value: 'image/jpeg'
    },
    {
        label: 'pdf',
        value: 'application/pdf'
    },
  ]
  let fileType = mimeType.find(o => o.label == FileName.split('.')[1].toLowerCase())?.value
  const base64Response = fetch(`data:${fileType};base64,${Base64File}`)
  base64Response.then(res => {
    res.blob().then(blob => {
      // Create a URL for the blob
      const blobUrl = URL.createObjectURL(blob);

      // Create an anchor (<a>) element
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = FileName; // Set the file name

      // Append the link to the body (required for Firefox)
      document.body.appendChild(link);

      // Simulate a click on the link to start the download
      link.click();

      // Clean up by revoking the Object URL and removing the link
      URL.revokeObjectURL(link.href);
      document.body.removeChild(link);
    });
  }).catch(error => {
      console.error('Error downloading the file:', error);
  });
  isLoading.value = false;
}


const handleCheckCarDetail = async () => {
  let carDetail: CarDetailsExtension = {
    License: `${carLicenseValue}-${carLicense2Value}`,
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
  ()=>props.info,
  ()=>{
    if(props.info){
    SubCarModel = props.info.SubCarModel
  }
  }
)
watch(
  ()=>props.carDetailCache,
  ()=>{
    if(props.carDetailCache){
      carDetailCache.value = props.carDetailCache
      // carLicenseText.value = carDetailCache.value.License.replace(/-/g, '');
      carLicenseText.value = carDetailCache.value.License.split('-')[0]
      carLicense2Text.value = carDetailCache.value.License.split('-')[1]
      carLicenseValue = carDetailCache.value.License.split('-')[0]
      carLicense2Value = carDetailCache.value.License.split('-')[1]

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
