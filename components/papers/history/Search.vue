<template>
  <FormKit
    type="form"
    :actions="false"
    id="form-search"
    form-class="form-search form-theme"
    :incomplete-message="false"
  >
    <div class="card">
      <div class="card-body">
        <div class="search-box">
          <FormKit
            type="select"
            label="ค้นหาจาก"
            name="SearchCategory"
            placeholder="หมวดหมู่การค้นหา"
            :options="searchOption"
            v-model="searchCategory"
          />
          <!-- :validation="[['required'], ['matches', /^$|/]]"
            :validation-messages="{
              required: 'กรุณาเลือกหมวดหมู่',
              matches: 'กรุณาเลือกหมวดหมู่2',
            }" -->
          <FormKit
            type="text"
            label="คำค้นหา"
            name="SearchText"
            placeholder="ระบุคำค้นหา"
            v-model="searchText"
            @keydown.enter.prevent="submitSearch"
            autocomplete="off"
          />
          <!-- validation="required"
            :validation-messages="{ required: 'กรุณาใส่คำค้นหา' }" -->
          <button
            type="button"
            label="ค้นหา"
            name="search-submit"
            id="search-submit"
            class="btn btn-primary btn-search-fix"
            
            @click="submitSearch"
          >
            ค้นหา
          </button>
        </div>

        <div class="accordion search-advance-box" id="accordion-search-advance">
          <div class="accordion-item">
            <h5 class="accordion-header">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panel-search-advance"
                aria-expanded="false"
                aria-controls="panel-search-advance"
              >
                ค้นหาขั้นสูง
              </button>
            </h5>

            <div id="panel-search-advance" class="accordion-collapse collapse">
              <div class="accordion-body">
                <div class="advance-section">
                  <div class="section">
                    <FormKit
                      type="select"
                      label="ประเภทผลิตภัณฑ์"
                      name="OrderType"
                      placeholder="ระบุคำค้นหา"
                      v-model="orderTypeText"
                      :options="orderTypeOption"
                    />
                  </div>
                  <!-- <div class="section">
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
                              </div> -->
                </div>
                <div class="advance-section">
                  <div class="section">
                    <FormKit
                      type="date"
                      label="เริ่มต้น"
                      name="EffectiveDate"
                      placeholder="dd/mm/yyyy"
                      :min="expireMinDate"
                      v-model="effectiveDateText"
                    />
                  </div>
                  <div class="section">
                    <FormKit
                      type="date"
                      label="สิ้นสุด"
                      name="ExpireDate"
                      placeholder="dd/mm/yyyy"
                      :min="expireMinDate"
                      v-model="expireDateText"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </FormKit>

  <aside
    class="search-result"
    v-if="
      (searchText != '' && SearchCategoryShow != '') ||
      orderTypeText != '' ||
      effectiveDateText != '' ||
      expireDateText != ''
    "
  >
    <div class="notice-info">
      แสดงรายการจากผลการค้นหา "{{ searchText }}" จาก {{ SearchCategoryShow }}
      <button type="button" class="btn-info" @click="clearSearch()">
        <i class="fa-solid fa-eraser"></i>ล้างค่าการค้นหา
      </button>
    </div>
  </aside>
<!--   Impact modal delete at index.vue waiting to verify
  <ElementsDialogModal
   :modal-show="isError"
   :modal-type="'warning'"
   :modal-title="'ข้อความแจ้งเตือน'"
   :modal-text="messageError"
  />
   -->
</template>

<script setup lang="ts">
import type { SelectOption } from "~/shared/entities/select-option";
import type { HistorySearch } from "~/shared/entities/order-entity";

const emit = defineEmits(["searchHistory", "clearSearchHistory"]);

var searchOption: globalThis.Ref<SelectOption[]> = ref([
  { label: "หมวดหมู่การค้นหา", value: "", attrs: { disabled: true } },
  { label: "เลขที่คำสั่งซื้อ", value: "OrderNo", option: "LIKE" },
  { label: "วันที่สร้าง", value: "CreateDate", option: "DATE_EQ" },
  // { label: 'ผลิตภัณฑ์', value: 'OrderGroupType',options:'MATCH' },
  { label: "จำนวนเงิน", value: "OrderAmount", option: "NUM_EQ" },
]);

var orderTypeOption: globalThis.Ref<SelectOption[]> = ref([
  { label: "ทั้งหมด", value: "" },
  { label: "ภาคบังคับ", value: "COMPULSORY", option: "OrderType" },
  { label: "ภาคสมัครใจ", value: "VOLUNTARY", option: "OrderType" },
]);
const isError = ref(false);
const messageError = ref("");
var searchCategory = ref("");
var searchText = ref("");
var orderTypeText = ref("");
var effectiveDateText = ref("");
var expireDateText = ref("");
const historySearch: globalThis.Ref<HistorySearch | undefined> = ref();

var SearchCategoryShow = ref("");

watch(searchCategory, async (newCategory) => {
  let category = searchOption.value.find((w) => w.value == newCategory);
  SearchCategoryShow.value = category?.label ?? "";
});

const clearSearch = async () => {
  searchCategory.value = "";
  searchText.value = "";
  orderTypeText.value = "";
  effectiveDateText.value = "";
  expireDateText.value = "";
  emit("clearSearchHistory", true);
};
const validateSubmit = (): boolean => {
  let validate = false;
  validate = Boolean(
    (searchCategory.value != "" && searchText.value != "") ||
      (orderTypeText.value && orderTypeText.value != "") ||
      (effectiveDateText.value && expireDateText.value)
  );

  return validate;
};
const submitSearch = async () => {
  isError.value = false;
  messageError.value = "";
  await sleep(100)
  const validate = validateSubmit()
  console.log(validate,isError.value)
  if (validate) {
    let historySearch: HistorySearch = {
      SearchCategory: searchOption.value.find((x) => x.value == searchCategory.value),
      SearchText: searchText.value,
      EffectiveDate: effectiveDateText.value,
      ExpireDate: expireDateText.value,
      orderType:
        orderTypeText.value != ""
          ? orderTypeOption.value.find((x) => x.value == orderTypeText.value)
          : undefined,
    };
    // console.log('historySearch', historySearch)
    emit("searchHistory", historySearch);
  } else {
    isError.value = true;
    messageError.value = "กรุณากรอกช่องในการค้นหาให้ครบ";
  }
};

function sleep(ms:any) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
</script>
<style scoped>
.btn-primary a.btn-primary {
  background-color: #138543 !important;
  border-color: #138543 !important;
  color: #fff !important;
}
.btn:disabled {
  background: var(--fk-color-border) !important;
  color: var(--fk-color-button) !important;
  cursor: not-allowed;
}
.btn-search-fix {
  margin-top: 15px !important;
}
</style>
