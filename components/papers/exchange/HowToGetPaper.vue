<template>
    <div class="accordion" id="accordion-shipping">
		<div class="accordion-item">

			<h2 class="accordion-header">
				<button class="accordion-button" type="button" data-bs-toggle="collapse"
					data-bs-target="#collapse-shipping" aria-expanded="true"
					aria-controls="collapse-shipping">วิธีการรับกระดาษ</button>
			</h2>

			<div id="collapse-shipping" class="accordion-collapse collapse show" data-bs-parent="#accordion-shipping">
				<div class="accordion-body">

					<div class="form-placeorder">
						<div class="form-hide-label">
							<ElementsFormRadioShippingPaper />
						</div>

						<section class="shipping-method">
							<h3>วิธีการจัดส่ง</h3>
							<div class="row">
								<div class="col-12">
									<div class="notice-info">
                                        <i class="fa-regular fa-circle-info"></i>
                                        <u>ฟรี</u>
										ค่าจัดส่ง
										เมื่อแลกกระดาษเกิน 5,000 บาทขึ้นไป
                                    </div>
								</div>
								<div class="col-6">
									<FormKit type="select" label="ช่องทางการจัดส่ง" name="ShippingMethod"
										placeholder="ช่องทางการจัดส่ง" v-model="ShippingMethodText" 
                                        validation="required" :validation-messages="{ required: 'กรุณาเลือกข้อมูล' }" />
								</div>
								<div class="col-6">
									<FormKit type="text" label="ค่าจัดส่ง" name="ShippingFee" placeholder="ค่าจัดส่ง"
										v-model="ShippingFeeText" readonly />
								</div>
							</div>
						</section>

						<section class="shipping-address">
							<h3>ที่อยู่สำหรับจัดส่ง</h3>
							<div class="form-hide-label">
								<FormKit type="radio" label="รายชื่อที่อยู่" name="PostalAddressPolicy"
									options-class="option-block-stack" />
							</div>
							<aside class="new-shipping-address inner-section">
								<h4>ที่อยู่จัดส่งใหม่</h4>
								<div class="row">
									<ElementsFormNewAddress />
								</div>
								<FormKit type="submit" label="บันทึกข้อมูล"
									:classes="{ input: 'btn-primary', outer: 'form-actions' }" :loading="isLoading" />
							</aside>
						</section>

					</div>

				</div>
			</div>

		</div>
	</div>
</template>

<script setup lang="ts">
</script>