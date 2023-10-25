import { AreaListResponse } from "~/shared/entities/paper-entity";

import { AreaListResponse } from "~/shared/entities/paper-entity";

<template>
    <div class="form-placeorder">

        <section class="shippped-branch">

            <div class="row">

                <div class="col-sm-12 col-md-6">
                    <FormKit type="select" label="ภาค" name="Zone" placeholder="เลือกภาค" 
                    :options="areaOption" @change="onAreaChange"
                    validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                </div>
                <div class="col-sm-12 col-md-6">
                    <FormKit type="select" label="สาขา" namr="Branch" placeholder="เลือกสาขา" 
                    :options="wareHouseOption" @change="onWareHouseChange"
                    validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                </div>

            </div>

            <aside class="branch-papers-stock inner-section">
                <div class="notice-info">กระดาษในคลัง <b>สาขาพระรามเก้า</b></div>

                <div class="row">
                    <div class="col-md-5">
                        <FormKit type="select" label="ชนิดกระดาษ" name="PaperType" placeholder="เลือกชนิดกระดาษ" 
                            :options="productSubOption" v-model="productSubText"
                            validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                    </div>
                    <div class="col-md-7">
                        <FormKit type="select" label="บริษัทประกันภัย" name="Company" placeholder="เลือกบริษัทประกันภัย"
                            :options="productCompanyOption" @change="onProductCompanyChange"
                            validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                    </div>
                </div>
            </aside>

        </section>

    </div>
</template>

<script setup lang="ts">
import { 
  AreaListRes,
  ProductcompanyAreaListRes,
  ProductsubcategoryAreaListRes,
  WarehouseAreaListRes
} from '~/shared/entities/paper-entity';
import { SelectOption } from '~/shared/entities/select-option';

const emit = defineEmits(['areaChange', 'wareHouseChange', 'productSubChange', 'productCompanyChange'])

const props = defineProps({ 
    area: Array<AreaListRes>,
    wareHouse: Array<WarehouseAreaListRes>,
    productSubCategory: Array<ProductsubcategoryAreaListRes>,
    productCompany: Array<ProductcompanyAreaListRes>
})

const areaOption: globalThis.Ref<SelectOption[]> = ref([]);
const wareHouseOption: globalThis.Ref<SelectOption[]> = ref([]);
const productSubOption: globalThis.Ref<SelectOption[]> = ref([]);
const productCompanyOption: globalThis.Ref<SelectOption[]> = ref([]);

var productSubText = ref("")

const onLoad = onMounted(async () => {
	if (props.area) {
        areaOption.value = props.area.map((x) => {
            const options: SelectOption = {
                label: x.Name,
                value: x.ID,
            };
            return options;
        });
    }
    if (props.wareHouse) {
        wareHouseOption.value = props.wareHouse.map((x) => {
            const options: SelectOption = {
                label: x.Name,
                value: x.ID,
            };
            return options;
        });
    }
    if (props.productSubCategory) {
        productSubOption.value = props.productSubCategory.map((x) => {
            const options: SelectOption = {
                label: x.ProductSubCategory,
                value: x.ProductSubCategory,
                option: x.ProductCategory
            };
            return options;
        });
    }
    if (props.productCompany) {
        productCompanyOption.value = props.productCompany.map((x) => {
            const options: SelectOption = {
                label: x.CompanyName,
                value: x.ProductCompany,
            };
            return options;
        });
    }
});

const onAreaChange = async (event: any) => {
    emit('areaChange', event.target.value)
};

const onWareHouseChange = async (event: any) => {
    emit('wareHouseChange', event.target.value)
};

watch(productSubText, async (newProductSub) => {
    let productSub = productSubOption.value.find((w) => w.value == newProductSub);
    emit('productSubChange', productSub?.value, productSub?.option)
});

const onProductCompanyChange = async (event: any) => {
    emit('productCompanyChange', event.target.value)
};

watch(
  () => props.area,
  async () => {
    if (props.area) {
		areaOption.value = props.area.map((x) => {
            const options: SelectOption = {
                label: x.Name,
                value: x.ID,
            };
            return options;
      });
    }
  }
)

watch(
  () => props.wareHouse,
  async () => {
    if (props.wareHouse) {
        wareHouseOption.value = props.wareHouse.map((x) => {
            const options: SelectOption = {
                label: x.Name,
                value: x.ID,
            };
            return options;
        });
    }
  }
)

watch(
  () => props.productSubCategory,
  async () => {
    if (props.productSubCategory) {
        productSubOption.value = props.productSubCategory.map((x) => {
            const options: SelectOption = {
                label: x.ProductSubCategory,
                value: x.ProductSubCategory,
                option: x.ProductCategory
            };
            return options;
        });
    }
  }
)

watch(
  () => props.productCompany,
  async () => {
    if (props.productCompany) {
        productCompanyOption.value = props.productCompany.map((x) => {
            const options: SelectOption = {
                label: x.CompanyName,
                value: x.ProductCompany,
            };
            return options;
        });
    }
  }
)

</script>