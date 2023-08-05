<template>
  <NuxtLayout :name="layout">

    <!-- Content -->
    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">

      <div class="row">
        <div class="col-lg-8 col-xl-9">

          <div class="card">
            <div class="card-body">

              <div class="summary-detail">
                <header class="topic">
                  <h5 class="label"><i class="fa-duotone fa-car"></i>ข้อมูลรถของท่าน:</h5>
                  <h6 class="detail">TOYOTA Yaris 1.2 Smart Auto 2019</h6>
                </header>
                <div class="meta">
                  <!-- TODO Change focus ring position -->
                  <a class="edit fa-icon no-icon" href="#">แก้ไข</a>
                  <div class="validate is-success"><i class="fa-solid fa-circle-check"></i></div>
                </div>
              </div>

            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">ระบุข้อมูลรถยนต์</h3>
            </div>
            <div class="card-body">
              <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>

              <div class="form-inline">
                <ElementsFormRadioCarUse />
              </div>

              <div class="form-inline">
                <ElementsFormSelectCarType />
              </div>

              <div class="form-inline">
                <FormKit type="select" label="ขนาดรถยนต์" name="CarSize" placeholder="เลือกข้อมูล" :options="{
                  1: '1',
                  2: '2',
                  3: '3',
                }" validation="required" :validation-messages="{
  required: 'กรุณาเลือกข้อมูล',
}" />
              </div>

              <div class="form-inline">
                <FormKit type="select" label="ปีที่จดทะเบียน" name="CarYear" placeholder="เลือกข้อมูล" :options="{
                  1: '1',
                  2: '2',
                  3: '3',
                }" validation="required" :validation-messages="{
  required: 'กรุณาเลือกข้อมูล',
}" />
              </div>

              <div class="form-inline">
                <FormKit type="text" label="ขนาดเครื่องยนต์" name="CarCC" placeholder="ระบุ cc ของเครื่องยนต์" />
              </div>

            </div>
          </div>

          <div class="card">
            <div class="card-header">
              <h3 class="card-title">เลือกวันคุ้มครอง</h3>
            </div>
            <div class="card-body">
              <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>

              <div class="form-inline">
                <ElementsFormUsername />
              </div>

              <div class="form-inline">
                <ElementsFormIdCard />
              </div>

            </div>
          </div>

          <!-- <div class="card">
            <div class="card-body">

              <div class="your-first-form">
                <img src="https://pro.formkit.com/logo.svg" alt="FormKit Logo" width="244" height="50" class="logo">
                <FormKit type="form" #default="{ value }" @submit="submit">

                  <FormKit type="autocomplete" name="country" label="Search for a country"
                    placeholder="Example: United States" :options="countries" />

                  <FormKit type="slider" value="33" step="0.1" label="A single slider with a visible input"
                    help="I have a single linked input" show-input tooltip="true" />

                  <FormKit label="Primary Label" type="toggle" />

                  <FormKit type="text" name="name" label="Name" help="What do people call you?" />
                  <FormKit type="checkbox" name="flavors" label="Favorite ice cream flavors" :options="{
                    'vanilla': 'Vanilla',
                    'chocolate': 'Chocolate',
                    'strawberry': 'Strawberry',
                    'mint-chocolate-chip': 'Mint Chocolate Chip',
                    'rocky-road': 'Rocky Road',
                    'cookie-dough': 'Cookie Dough',
                    'pistachio': 'Pistachio',
                  }" validation="required|min:2" />

                  <FormKit type="repeater" name="invitees" label="Invitees" help="Who else should we invite to FormKit?">
                    <FormKit type="text" name="email" label="Email" validation="required|email" />
                  </FormKit>
                  <FormKit type="checkbox" name="agree" label="I agree FormKit is the best form authoring framework." />
                  <pre>{{ value }}</pre>
                </FormKit>
              </div>

            </div>
          </div> -->

        </div>

        <!-- Sidebar -->
        <div class="col-lg-4 col-xl-3">

          <aside class="card">
            <div class="card-header">
              <h3 class="card-title">รายการที่ท่านเลือก</h3>
            </div>

          </aside>

          <FormKit type="submit" label="ต่อไป" name="order-submit" id="order-submit" :classes="{
            input: 'btn-primary',
            outer: 'form-actions'
          }" :disabled="isLoading" :loading="isLoading" />

          <a href="#" class="btn btn-back btn-primary-outline">ย้อนกลับ</a>

        </div>
      </div>

    </FormKit>

  </NuxtLayout>
</template>

<script setup>
// Define Variables
// Loading state after form submiting
const isLoading = ref(false)

// Submitted state after submit
const submitted = ref(false)

// Response status for notice user
const statusMessage = ref()
const statusMessageType = ref()

// Binding default value
// case 1
// const values = reactive({
//   username: 'AM00371908',
//   idcard: '1100400284852'
// })
// case 2
const values = reactive({
  username: 'AM00125633',
  idcard: '3909900809081'
})

// Submit form event
const submitOrder = async (formData) => {
  console.log('%cOrder%cformData', 'color:#fff;background:#ee6f57;padding:3px;border-radius:2px', 'color:#fff;background:#1f3c88;padding:3px;border-radius:2px', 'color:#fff;background:rgb(222, 125, 44);padding:3px;border-radius:2px', formData)

  // Add waiting time for debug
  await new Promise((r) => setTimeout(r, 1000))

  const response = await useCallApi().get({
    URL: '/Agent/user/check',
    AgentCode: formData.username,
    IDCard: formData.idcard,
  })

  statusMessage.value = response.statusMessage
  statusMessageType.value = response.statusMessageType
  submitted.value = false // Form submitted status
}

// Define layout
const layout = "monito"

// Define meta seo
useHead({
  title: "Compulsory Template",
  meta: [{ name: "description", content: "Compulsory Template" }],
  bodyAttrs: {
    class: "page-order single-name",
  },
})
</script>