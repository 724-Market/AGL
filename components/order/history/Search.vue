<template>
    <FormKit type="form" @submit="submitSearch" :actions="false" id="form-search" form-class="form-search form-theme"
        :incomplete-message="false">
        <div class="card">
          <div class="card-body">
            <div class="search-box">
              <!-- <FormKit type="select" label="ค้นหาจาก" name="SearchCategory" placeholder="หมวดหมู่การค้นหา" 
                :options="searchOption" v-model="SearchCategory"
                validation="required" :validation-messages="{ required: 'กรุณาเลือกหมวดหมู่' }" /> -->
              <FormKit type="select" label="ค้นหาจาก" name="SearchCategory" placeholder="หมวดหมู่การค้นหา" 
                :options="searchOption" v-model="SearchCategory"
                :validation="[['required'],
                              ['matches', /^$|/]
                              ]" :validation-messages="{
                              required: 'กรุณาเลือกหมวดหมู่', matches: 'กรุณาเลือกหมวดหมู่2'
              }"/>

              <FormKit type="text" label="คำค้นหา" name="SearchText" placeholder="ระบุคำค้นหา" v-model="searchText"
                validation="required" :validation-messages="{ required: 'กรุณาใส่คำค้นหา'}" autocomplete="off" />

              <FormKit type="submit" label="ค้นหา" name="search-submit" id="search-submit" :classes="{
                input: 'btn-primary btn-search',
                outer: 'form-actions',
              }" :disabled="submitted" :loading="isLoading" />
            </div>

            <div class="accordion search-advance-box" id="accordion-search-advance">
              <div class="accordion-item">
                    <h5 class="accordion-header">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                        data-bs-target="#panel-search-advance" aria-expanded="false" aria-controls="panel-search-advance">
                        ค้นหาขั้นสูง
                    </button>
                    </h5>

                    <div id="panel-search-advance" class="accordion-collapse collapse">
                        <div class="accordion-body">
                            <div class="advance-section">
                            <div class="section">
                                <FormKit type="checkbox" label="หัวข้อการกรองข้อมูล" name="" :options="{
                                1: '1',
                                2: '2',
                                3: '3',
                                }" />
                            </div>

                            <div class="section">
                                <FormKit type="radio" label="หัวข้อการกรองข้อมูล" name="" :options="{
                                1: '1',
                                2: '2',
                                3: '3',
                                }" />
                            </div>

                            <div class="section">
                                <FormKit type="select" label="จังหวัด" name="" placeholder="ระบุคำค้นหา" :options="{
                                1: '1',
                                2: '2',
                                3: '3'
                                }" />
                                <FormKit type="text" label="รหัสไปรษณีย์" name="" placeholder="ระบุคำค้นหา"
                                autocomplete="off" />
                            </div>

                            <div class="section">
                                <FormKit type="text" label="สถานะ" name="" placeholder="ระบุคำค้นหา" autocomplete="off" />
                            </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
    </FormKit>

    <aside class="search-result">
        <div class="notice-info">
            แสดงรายการจากผลการค้นหา "{{searchText}}" จาก {{SearchCategoryShow}}
            <button type="button" class="btn-info" @click="clearSearch()"><i class="fa-solid fa-eraser"></i>ล้างค่าการค้นหา</button>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { SelectOption } from "~/shared/entities/select-option";
import { 
  HistorySearch
} from "~/shared/entities/order-entity";

const emit = defineEmits(['searchHistory'])

var searchOption: globalThis.Ref<SelectOption[]> = ref([
  { label: 'หมวดหมู่การค้นหา', value: '', attrs: { disabled: true }  },
  { label: 'หมายเลขโทรศัพท์', value: 'tel' },
  { label: 'ข้อมูลรถ', value: 'car' },
  { label: 'เลขที่คำสั่งซื้อ', value: 'invoice' },
]);
var SearchCategory = ref('')
var searchText = ref('')
const historySearch: globalThis.Ref<HistorySearch | undefined> = ref()

var SearchCategoryShow= ref('')

watch(SearchCategory, async (newCategory) => {
  let category = searchOption.value.find(w => w.value == newCategory);
  SearchCategoryShow.value = category?.label ?? ''
});

const clearSearch = async () => {
  SearchCategory.value = ''
  searchText.value = ''
}

const submitSearch = async (formData: any) => {
  let historySearch: HistorySearch = {
    SearchCategory: formData.SearchCategory,
    SearchText: formData.SearchText
  }
  emit('searchHistory', historySearch)
}
</script>