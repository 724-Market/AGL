<template>
    <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
        :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

        <div class="row">
            <div class="col col-main">

                <div id="stats-overview" class="stats-group">
                    <FormKit type="group" v-model="overviewStats">

                        <div class="stats-header">
                            <FormKit type="togglebuttons" name="isPersonalView" :value="true" :options="[
        { label: 'ส่วนตัว', value: true },
        { label: 'ทีมงาน', value: false },
    ]" enforced />
                            <div class="stats-date">
                                <p>ข้อมูล ณ 16/06/2024 - 31/07/2024</p>
                            </div>
                        </div>

                        <div class="option-stats-overview" v-if="overviewStats.isPersonalView === true">

                            <div class="card-stat">
                                <div class="stat-wrapper has-info">
                                    <div class="stat-header">
                                        <h5 class="topic">ยอดขายส่วนตัว (บาท)</h5>
                                        <span class="value">477,546</span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-sack-dollar"></i>
                                        </figure>
                                    </div>
                                    <div class="stat-info">
                                        <p class="is-down"><span>1.57%</span>เทียบกับ 30 วันล่าสุด</p>
                                    </div>
                                </div>
                            </div>

                            <div class="card-stat">
                                <div class="stat-wrapper has-info">
                                    <div class="stat-header">
                                        <h5 class="topic">รายได้ส่วนตัว (บาท)</h5>
                                        <span class="value">56,243</span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-badge-percent"></i>
                                        </figure>
                                    </div>
                                    <div class="stat-info">
                                        <p class="is-up"><span>15.09%</span>เทียบกับ 30 วันล่าสุด</p>
                                    </div>
                                </div>
                            </div>

                            <div class="card-stat">
                                <div class="stat-wrapper has-info">
                                    <div class="stat-header">
                                        <h5 class="topic">จำนวนผู้ช่วย</h5>
                                        <span class="value">3<small>/10</small></span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-users"></i>
                                        </figure>
                                    </div>
                                    <div class="stat-info">
                                        <p class="is-steady"><span>0.00%</span>เทียบกับ 30 วันล่าสุด</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        <div class="option-stats-overview" v-else>

                            <div class="card-stat">
                                <div class="stat-wrapper has-info">
                                    <div class="stat-header">
                                        <h5 class="topic">ยอดขายทีมงาน (บาท)</h5>
                                        <span class="value">1,342,378</span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-sack-dollar fa-swap-opacity"></i>
                                        </figure>
                                    </div>
                                    <div class="stat-info">
                                        <p class="is-up"><span>3.24%</span>เทียบกับ 30 วันล่าสุด</p>
                                    </div>
                                </div>
                            </div>

                            <div class="card-stat">
                                <div class="stat-wrapper has-info">
                                    <div class="stat-header">
                                        <h5 class="topic">ค่าสายงาน (บาท)</h5>
                                        <span class="value">92,231</span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-hand-holding-circle-dollar"></i>
                                        </figure>
                                    </div>
                                    <div class="stat-info">
                                        <p class="is-up"><span>0.41%</span>เทียบกับ 30 วันล่าสุด</p>
                                    </div>
                                </div>
                            </div>

                            <div class="card-stat">
                                <div class="stat-wrapper has-info">
                                    <div class="stat-header">
                                        <h5 class="topic">จำนวนสมาชิก</h5>
                                        <span class="value">256</span>
                                    </div>
                                    <div class="stat-action">
                                        <figure class="figure">
                                            <i class="fa-duotone fa-users-medical fa-swap-opacity"></i>
                                        </figure>
                                    </div>
                                    <div class="stat-info">
                                        <p class="is-up"><span>0.28%</span>เทียบกับ 30 วันล่าสุด</p>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </FormKit>
                </div>

                <div id="stats-sales" class="stats-group">
                    <div class="card">
                        <div class="card-header">
                            <div class="header-group">
                                <h3 class="card-title">ยอดขายทั้งหมด</h3>
                                <h4 class="card-subtitle">แยกตามประเภทสินค้า</h4>
                            </div>
                            <div class="filter">
                                <FormKit type="form" #default="{ value }" :actions="false">
                                    <FormKit type="dropdown" name="saleChartFilter" :options="salesChartFilter"
                                        value="this-month" deselect="false" />
                                    <!-- <pre wrap>{{ value }}</pre> -->
                                </FormKit>
                            </div>
                        </div>
                        <div class="card-body">
                            <div id="graph"></div>
                            <v-chart class="chart" :option="salesData" />
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <ElementsDialogLoading :propsLoading="loadingProps" />

        <ElementsDialogModal :isShowModal="isShowModal" :modal-type="modalType" :modal-title="modalTitle"
            :modal-text="modalText" :modal-button="modalButton" @on-close-modal="handleCloseModal" />

    </NuxtLayout>
</template>

<script setup lang="ts">
/////////////////////////////////////////
// Import
import { use } from 'echarts/core'
import { BarChart } from 'echarts/charts'
import {
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent
} from 'echarts/components'
import { SVGRenderer } from 'echarts/renderers'
import VChart from 'vue-echarts'

use([
    BarChart,
    SVGRenderer,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DatasetComponent
])

/////////////////////////////////////////
// Sale chart
const salesData = ref({
    title: {},
    color: [
        'rgb(19, 133, 67)',
        'rgb(143, 199, 66)',
        'rgb(184, 233, 134)',
    ],
    grid: [
        { left: '50', right: '20', top: '50', bottom: '20' }
    ],
    tooltip: {
        className: 'chart-tooltip'
    },
    legend: {
        textStyle: {
            color: 'rgba(25, 70, 88, 0.8)',
            fontWeight: 'bold',
            fontSize: '15',
        },
        icon: 'roundRect',
    },
    dataset: {
        dimensions: ['sales', 'พรบ', 'ประเภท', 'non-motor'],
        source: [],
    },
    xAxis: {
        type: 'category',
        axisLine: {
            lineStyle: { color: 'rgba(25, 70, 88, 0.35)' }
        },
        axisLabel: {
            color: 'rgba(25, 70, 88, 0.8)'
        },
    },
    yAxis: {
        name: 'ยอดขาย (บาท)',
        nameTextStyle: {
            color: 'rgba(25, 70, 88, 0.8)',
            fontWeight: 'bold',
            fontSize: '15',
            lineHeight: '50'
        },
        axisLine: {
            lineStyle: { color: 'rgba(25, 70, 88, 0.35)' }
        },
        axisLabel: {
            color: 'rgba(25, 70, 88, 0.8)'
        },
        splitLine: {
            lineStyle: {
                type: 'dashed',
                color: 'rgba(25, 70, 88, 0.1)'
            }
        },
    },
    series: [
        {
            type: 'bar',
            barWidth: 30,
            label: {
                show: true,
                position: 'top',
                color: 'rgba(25, 70, 88, 0.9)'
            },
            itemStyle: {
                borderRadius: [3, 3, 0, 0]
            },
        },
        {
            type: 'bar',
            barWidth: 30,
            label: {
                show: true,
                position: 'top',
                color: 'rgba(25, 70, 88, 0.9)'
            },
            itemStyle: {
                borderRadius: [3, 3, 0, 0]
            },
        },
        {
            type: 'bar',
            barWidth: 30,
            label: {
                show: true,
                position: 'top',
                color: 'rgba(25, 70, 88, 0.9)'
            },
            itemStyle: {
                borderRadius: [3, 3, 0, 0]
            },
        }
    ]
})

/////////////////////////////////////////
// Sales chart filter
const salesChartFilter = [
    { label: 'เดือนนี้', value: 'this-month' },
    { label: 'เดือนที่แล้ว', value: 'last-month' },
    { label: '3 เดือนล่าสุด', value: 'last-3-month' }
]

/////////////////////////////////////////
const overviewStats = ref()

/////////////////////////////////////////
// Modal Loading
const loadingProps = ref({})
const openLoadingDialog = (isShowLoading = true, showLogo = false, showText = false) => {
    loadingProps.value = useUtility().createLoadingProps(isShowLoading, showLogo, showText)
}

/////////////////////////////////////////
// Modal Dialog
const isShowModal = ref(false)
const modalType = ref('')
const modalTitle = ref('')
const modalText = ref('')
const modalButton = ref('')

// Function to handle close modal events
const handleCloseModal = async () => {
    isShowModal.value = false
}

/////////////////////////////////////////

/////////////////////////////////////////
// Mounted
onMounted(async () => {
    openLoadingDialog(true)
    await getSalesData()
    openLoadingDialog(false)
})

/////////////////////////////////////////
// Function get `SalesData`
const getSalesData = (async () => {
    try {
        const response = await fetch('/data/salesData.json')
        const jsonData = await response.json()
        salesData.value.dataset.source = jsonData
    } catch (error) {
        console.error('Error fetching or parsing JSON:', error)
    }
})

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = '-monito-headless'
const showPageSteps = false
const showPageHeader = false
const showLogoHeader = false

// Define page meta
const pageTitle = 'แดชบอร์ด'
const pageCategory = 'แดชบอร์ด'
const pageDescription = ''

// Define meta seo
useHead({
    title: pageTitle,
    meta: [{ name: 'description', content: pageDescription }],
    bodyAttrs: {
        class: 'page-dashboard single-dashboard'
    }
})
</script>