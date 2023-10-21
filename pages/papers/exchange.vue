<template>
	<NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
		:show-page-steps="showPageSteps" :show-page-header="showPageHeader">

		<FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
			:incomplete-message="false">

			<div class="row">
				<div class="col">

					<div class="card">
						<div class="card-body">
							<PapersExchangeHowToGetPaper></PapersExchangeHowToGetPaper>
						</div>
					</div>

					<div class="card">
						<div class="card-header">
							<h3 class="card-title">เลือกกระดาษ</h3>
						</div>
						<div class="card-body">
							<ElementsFormPaperBranchStock></ElementsFormPaperBranchStock>
						</div>
					</div>

					<div class="card">
						<div class="card-body">

							<div class="package-item-new is-paper">
								<div class="detail">
									<figure class="brand">
										<img src="https://724.co.th/image/logo_insurance_company/logo_TIP.png" alt="">
									</figure>

									<div class="topic">
										<h4 class="title">ทิพยประกันภัย</h4>
										<h5 class="subtitle">ราคามัดจำ <span class="big">500</span></h5>
									</div>
								</div>

								<div class="tags">
									<span class="badge">VIB</span>
									<span class="badge-bg-secondary">พ.ร.บ.</span>
									<span class="badge-info">500</span>
								</div>

								<div class="action">
									<div class="quantity">
										<div class="form-hide-label">
											<FormKit type="number" label="จำนวน" validation="required|max:30|between:1,30" value="1" min="1"
												max="30"
												:validation-messages="{ required: 'ระบุจำนวน', between: 'จำนวนไม่ถูกต้อง', max: 'จำนวนไม่เพียงพอ' }"
												inputmode="numeric" />
										</div>
										<span class="remain">มีอยู่ 30 แผ่น</span>
									</div>

									<button class="btn-primary" type="button">ใส่ตระกร้า</button>
								</div>
							</div>

						</div>
					</div>

					<div class="card">
						<div class="card-body">

							<div class="package-item-new is-paper">
								<div class="detail">
									<figure class="brand">
										<img src="https://724.co.th/image/logo_insurance_company/logo_TMW.png" alt="">
									</figure>

									<div class="topic">
										<h4 class="title">ไทยศรีเออโก้</h4>
										<h5 class="subtitle">ราคามัดจำ <span class="big">1,000</span></h5>
									</div>
								</div>

								<div class="tags">
									<span class="badge">TMW</span>
									<span class="badge-bg-secondary">พ.ร.บ.</span>
									<span class="badge-info">1000</span>
								</div>

								<div class="action">
									<div class="quantity">
										<div class="form-hide-label">
											<FormKit type="number" label="จำนวน" validation="required|max:30000|between:1,30000" value="1"
												min="1" max="30000"
												:validation-messages="{ required: 'ระบุจำนวน', between: 'จำนวนไม่ถูกต้อง', max: 'จำนวนไม่เพียงพอ' }"
												inputmode="numeric" />
										</div>
										<span class="remain">มีอยู่ 30,000 แผ่น</span>
									</div>

									<button class="btn-primary" type="button">ใส่ตระกร้า</button>
								</div>
							</div>

						</div>
					</div>

				</div>

				<div class="col col-sidebar">

					<section class="site-sidebar is-sticky">

						<aside class="card">

							<div class="card-header">
								<h3 class="card-title">รายการที่เลือก</h3>
								<button type="button" class="btn-gray btn-open-papers" href="#"><i
										class="fa-solid fa-layer-group"></i>คลังกระดาษ</button>
							</div>

							<div class="card-body card-table">

								<div class="summary-table">
									<table class="table no-striped">
										<thead>
											<tr>
												<th scope="col">รายการกระดาษ</th>
												<th scope="col" class="text-end">ราคามัดจำ (บาท)</th>
											</tr>
										</thead>
										<tbody>
											<tr class="spacer">
												<td colspan="2"></td>
											</tr>
											<tr class="product">
												<th scope="row">ราคามัดจำ 500<span>พ.ร.บ. • ทิพยประกันภัย</span><a class="btn-delete" href="#"
														title="ลบรายการนี้"><i class="fa-regular fa-trash-can"></i>ลบรายการนี้</a></th>
												<td class="text-end price">5,000.00

													<FormKit type="stepNumber" label="ราคามัดจำ" validation="required|between:1,3000"
														validation-label="Number" value="10" min="1" max="3000" step="1"
														:validation-messages="{ between: 'จำนวนไม่ถูกต้อง' }" readonly />

												</td>
											</tr>
											<tr class="product">
												<th scope="row">ราคามัดจำ 1,000<span>ประเภท • ไทยศรีเออโก้</span><a class="btn-delete" href="#"
														title="ลบรายการนี้"><i class="fa-regular fa-trash-can"></i>ลบรายการนี้</a></th>
												<td class="text-end price">2,000.00

													<FormKit type="stepNumber" label="ราคามัดจำ" validation="required|between:1,10"
														validation-label="Number" value="5" min="1" max="10" step="1"
														:validation-messages="{ between: 'จำนวนไม่ถูกต้อง' }" readonly />

												</td>
											</tr>
											<tr class="shipping">
												<th scope="row">ค่าจัดส่ง<span>DHL Express</span></th>
												<td class="text-end price">50.00</td>
											</tr>
											<tr class="spacer">
												<td colspan="2"></td>
											</tr>
											<tr class="subtotal">
												<th scope="row">รวมราคามัดจำ</th>
												<td class="text-end price">7,050.00</td>
											</tr>
											<tr class="discount">
												<th scope="row">หักส่วนลดค่าจัดส่ง<span>แลกกระดาษเกิน 5,000 บาท</span></th>
												<td class="text-end price">-50.00</td>
											</tr>
											<tr class="spacer">
												<td colspan="2"></td>
											</tr>
										</tbody>
										<tfoot>
											<tr>
												<td scope="col">รวมยอดมัดจำที่ต้องใช้</td>
												<td scope="col" class="text-end price">6,000.00</td>
											</tr>
											<tr>
												<td scope="col">เงินมัดจำคงเหลือ</td>
												<td scope="col" class="text-end price">275,334.00</td>
											</tr>
										</tfoot>
									</table>
								</div>

							</div>

							<div class="card-footer">

								<nav aria-label="breadcrumb">
									<ol class="breadcrumb vertical fa-divider fa-icon">
										<li class="current"><em><i class="fa-solid fa-circle-check"></i>วิธีการรับกระดาษ</em>
										</li>
										<li><em><i class="fa-solid fa-circle-check"></i>เลือกกระดาษ</em></li>
									</ol>
								</nav>

							</div>
						</aside>

						<div class="formkit-outer form-actions" data-type="submit">
							<div class="formkit-wrapper">
								<button loading="false" class="formkit-input btn-primary" type="submit" name="order-submit"
									id="order-submit">ไปต่อ</button>
							</div>
						</div>

					</section>

				</div>
			</div>

		</FormKit>

		<ElementsDialogPaperstock />

	</NuxtLayout>
</template>

<script setup>
var isPostalShipping = ref(true)
var ShippingMethodText = ref([])
var ShippingFeeText = "50 บาท"
var isAddnew = ref(true)

// Define Variables
// Loading state after form submiting
const isLoading = ref(true)

// Submitted state after submit
const submitted = ref(false)

// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

// Submit form event
const submitOrder = async (formData) => {

	// Add waiting time for debug
	await new Promise((r) => setTimeout(r, 1000))

}

// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "เลือกกระดาษ"
const pageCategory = "แลกกระดาษ"
const pageDescription = ""

// Define meta seo
useHead({
	title: pageTitle,
	meta: [{ name: "description", content: pageDescription }],
	bodyAttrs: {
		class: "page-papers single-exchange"
	}
})
</script>