<template>
    <div class="card">
        <div class="card-header">
            <h3 class="card-title">เลือกกระดาษ</h3>
        </div>
        <div class="card-body">
            <div class="form-placeorder">
                <section class="shippped-branch">

                    <div class="row -blocker-boundary" v-if="shippingType != 'DELIVERY'">
                        <div class="-blocker-action btn-open-emptycart"></div>
                        <div class="col-md-6">
                            <FormKit type="select" label="ภาค" name="Zone" placeholder="เลือกภาค" :options="areaOption"
                                @change="onAreaChange" v-model="ZoneText" validation="required"
                                :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                        </div>
                        <div class="col-md-6">
                            <FormKit type="select" label="สาขา" namr="Branch" placeholder="เลือกสาขา"
                                :options="wareHouseOption" v-model="BranchText" validation="required"
                                :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                        </div>

                    </div>

                    <aside class="branch-papers-stock inner-section">
                        <div class="notice-info">กระดาษในคลัง <b>{{ BranchLabel }}</b></div>

                        <div class="row">
                            <div class="col-md-5">
                                <FormKit type="select" label="ชนิดกระดาษ" name="PaperType" placeholder="เลือกชนิดกระดาษ"
                                    :options="productSubOption" v-model="PaperTypeText" validation="required"
                                    :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                            </div>
                            <div class="col-md-7">
                                <FormKit type="select" label="บริษัทประกันภัย" name="Company"
                                    placeholder="เลือกบริษัทประกันภัย" :options="productCompanyOption"
                                    @change="onProductCompanyChange" v-model="CompanyText" validation="required"
                                    :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
                            </div>
                        </div>
                    </aside>

                </section>
            </div>
        </div>
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
    shippingType: String,
    wareHouse: Array<WarehouseAreaListRes>,
    productSubCategory: Array<ProductsubcategoryAreaListRes>,
    productCompany: Array<ProductcompanyAreaListRes>,
})

const areaOption: globalThis.Ref<SelectOption[]> = ref([]);
const wareHouseOption: globalThis.Ref<SelectOption[]> = ref([]);
const productSubOption: globalThis.Ref<SelectOption[]> = ref([]);
const productCompanyOption: globalThis.Ref<SelectOption[]> = ref([]);
var shippingType = ref("")

var ZoneText = ref("")
var BranchText = ref("")
var BranchLabel = ref("")
var PaperTypeText = ref("")
var CompanyText = ref("")

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
    if (props.shippingType) {
        shippingType.value = props.shippingType
    }
    if (props.wareHouse) {
        if (shippingType.value == 'DELIVERY') {
            BranchLabel.value = props.wareHouse[0].Name
            await onWareHouseChange(props.wareHouse[0].ID, props.wareHouse[0].AreaID)
        }
        else {
            wareHouseOption.value = props.wareHouse.map((x) => {
                const options: SelectOption = {
                    label: x.Name,
                    value: x.ID,
                };
                return options;
            });
            wareHouseOption.value.unshift({
                label: "เลือกสาขา",
                value: "",
                attrs: { disabled: true },
            });
        }
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
        const defaultValue: SelectOption[] = [
            {
                label: "เลือกบริษัทประกันภัย",
                value: "",
                attrs: { disabled: true }
            },
            {
                label: 'ทั้งหมด',
                value: "-",
            }
        ]
        productCompanyOption.value = [...defaultValue, ...productCompanyOption.value];
        CompanyText.value = '-'
    }

    const dialogEmptyCart = document.getElementById('emptycart-dialog')
    const openDialogEmptyCart = document.querySelectorAll('.btn-open-emptycart')

    openDialogEmptyCart.forEach(function (openItem) {
        openItem.addEventListener('click', function () {
            if (dialogEmptyCart instanceof HTMLDialogElement) {
                dialogEmptyCart.showModal();
            }
        })
    })
});

const onAreaChange = async (event: any) => {
    BranchText.value = ''
    PaperTypeText.value = ''
    CompanyText.value = ''
    emit('areaChange', event.target.value)
};

watch(BranchText, async (newBranch) => {
    await onWareHouseChange(newBranch, '')
});

const onWareHouseChange = async (event: string, area: string) => {
    PaperTypeText.value = ''
    CompanyText.value = ''
    if (wareHouseOption.value.length > 0) {
        BranchLabel.value = wareHouseOption.value.find(w => w.value == event)?.label.toString() ?? ''

    }
    emit('wareHouseChange', event, area)
};

watch(PaperTypeText, async (newProductSub) => {
    CompanyText.value = ''
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
            areaOption.value.unshift({
                label: "เลือกภาค",
                value: "",
                attrs: { disabled: true },
            });
        }
    }
)

watch(
    () => props.shippingType,
    async () => {
        if (props.shippingType) {
            shippingType.value = props.shippingType
        }
    }
)

watch(
    () => props.wareHouse,
    async () => {
        if (props.wareHouse) {
            if (shippingType.value == 'DELIVERY') {
                BranchLabel.value = props.wareHouse[0].Name
                await onWareHouseChange(props.wareHouse[0].ID, props.wareHouse[0].AreaID)
            }
            else {
                wareHouseOption.value = props.wareHouse.map((x) => {
                    const options: SelectOption = {
                        label: x.Name,
                        value: x.ID,
                    };
                    return options;
                });
                wareHouseOption.value.unshift({
                    label: "เลือกสาขา",
                    value: "",
                    attrs: { disabled: true },
                });
            }
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
            productSubOption.value.unshift({
                label: "เลือกชนิดกระดาษ",
                value: "",
                attrs: { disabled: true },
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

            const defaultValue: SelectOption[] = [
                {
                    label: "เลือกบริษัทประกันภัย",
                    value: "",
                    attrs: { disabled: true }
                },
                {
                    label: 'ทั้งหมด',
                    value: "-",
                }
            ]
            productCompanyOption.value = [...defaultValue, ...productCompanyOption.value];
            CompanyText.value = '-'
        }
    }
)

</script>