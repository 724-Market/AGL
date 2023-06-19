<template>
    <div class="card">
            <div class="card-body">

              <div class="accordion" id="accordion-car-detail">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                      data-bs-target="#collapse-car-detail" aria-expanded="true"
                      aria-controls="collapse-car-detail">รายละเอียดรถ</button>
                  </h2>
                  <div id="collapse-car-detail" class="accordion-collapse collapse show"
                    data-bs-parent="#accordion-car-detail">
                    <div class="accordion-body">

                      <div class="form-placeorder">

                        <div class="row">
                          <div class="col">
                            <FormKit type="text" label="ทะเบียนรถ" id="CarLicense" name="CarLicense" placeholder="เลขป้ายทะเบียนรถ"
                              v-model="carLicenseText" @change="handleCarLicenseChange"
                              :validation="[['required'],
                                            ['length', 6, 7]]"
                              :validation-messages="{ required: 'กรุณาใส่ข้อมูล', length: 'ทะเบียนรถควรมีอย่างน้อย 6 แต่ไม่เกิน 7 ตัว' }"
                              autocomplete="false" />
                          </div>
                          <div class="col">
                            <FormKit type="select" label="จังหวัดของทะเบียนรถ" name="CarLicenseProvince" placeholder="จังหวัดบนป้ายทะเบียนรถ" 
                              :options="carProvince" :value="carProvince.value" v-model="carProvinceText" @change="handleCarProvinceChange"
                              validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                          </div>
                        </div>

                        <div class="row">
                          <div class="col">
                            <div class="form-hide-label">
                              <FormKit type="checkbox" label="ป้ายแดง" name="CarLicenseClassifier" :options="{
                                temporary: 'ป้ายแดง',
                              }" />
                            </div>
                          </div>
                        </div>

                        <div class="row">
                          <div class="col-sm-4 col-lg-3">
                            <FormKit type="select" label="สีรถ" name="CarColor" placeholder="สีของรถ" 
                              :options="carColor" :value="carColor.value" v-model="carColorText" @change="handleCarColorChange"
                              validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                          </div>
                          <div class="col-sm-8 col-lg-5">
                            <FormKit type="text" label="เลขตัวถัง" name="CarBodyNumber" placeholder="ตัวอย่าง: 1FTLP62W4Axxxxxx" 
                              v-model="carBodyNumberText" @change="handlecarBodyNumberChange"
                              :validation="[['required'],
                                            ['matches', /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).*$/],
                                            ['length', 17]]"
                              :validation-messages="{ required: 'กรุณาใส่ข้อมูล', 
                                                      matches: 'รูปแบบของเลขตัวถังไม่ถูกต้อง', 
                                                      length: 'เลขตัวถังควรมี 17 หลัก' }"
                               autocomplete="false" />
                          </div>
                          <div class="col-sm-12 col-lg-4">
                            <FormKit type="text" label="เลขเครื่องยนต์" name="CarEngineNumber"
                              placeholder="ตัวอย่าง: 724XXX" autocomplete="false" />
                          </div>
                        </div>

                        <div class="row">
                          <div class="col">
                            <FormKit type="file" label="เอกสารประกอบ (สำเนาเล่มรถยนต์)" name="CarLicenseFile"
                              accept=".pdf,.jpg,.png" help="รองรับไฟล์นามสกุล pdf, jpg, png เท่านั้น" 
                              v-model="CarLicenseFileText" @change="handleFileChange"
                              :validation="SubCarModel === 'unknown' || SubCarModel === 'other' ? 'required' : ''" 
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

const emit = defineEmits(['checkCarDetail'])

const props = defineProps({
  carProvince: Array<SelectOption>,
  carColor: Array<SelectOption>,
  info: {
    type: Object as () => IInformation,
  },
});

var isCheck: globalThis.Ref<Boolean> = ref(false)
var SubCarModel: globalThis.Ref<String> = ref("")

var carLicenseText: String = ""
const carProvince: globalThis.Ref<SelectOption[]> = ref([])
var carProvinceText: String = ""
const carColor: globalThis.Ref<SelectOption[]> = ref([])
var carColorText: String = ""
var carBodyNumberText: String = ""
var CarLicenseFileText: String = ""

const onLoad = onMounted(async () => {
if(props.carProvince)
{
  carProvince.value = props.carProvince
}

if(props.carColor){
  carColor.value = props.carColor
}
 
if(props.info){
  SubCarModel.value = props.info.SubCarModel
}
});

const handleCarLicenseChange = async (event: any) => {
  console.log('event', event.target.value)
  await handleCheckCarDetail()
}

const handleCarProvinceChange = async (event: any) => {
  console.log('event', event.target.value)
  await handleCheckCarDetail()
}

const handleCarColorChange = async (event: any) => {
  console.log('event', event.target.value)
  await handleCheckCarDetail()
}

const handlecarBodyNumberChange = async (event: any) => {
  console.log('event', event.target.value)
  await handleCheckCarDetail()
}

const handleFileChange = async (event: any) => {
  let file = event.target.files[0]
  const base64String = await convertFileToBase64(file)
  console.log('base64String', base64String)

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
  if (carLicenseText != '' && carProvinceText != '' && carColorText != '' && carBodyNumberText != '') {
    if(SubCarModel.value === 'unknown' || SubCarModel.value === 'other'){
      if(CarLicenseFileText != '') isCheck.value = true
      else isCheck.value = false
    }
    else isCheck.value = true
  }
  else {
    isCheck.value = false
  }
  console.log('isCheck.value', isCheck.value)
  emit('checkCarDetail', isCheck.value)
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


</script>