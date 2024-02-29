<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader" :show-logo-header="showLogoHeader">

    <FormKit type="form" @submit="submitOrder" :actions="false" id="form-order" form-class="form-order form-theme"
      :incomplete-message="false">

      <div class="row">

        <div class="col col-main">

          <div class="has-sticky">

            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Form</h3>
              </div>

              <div class="card-body">
                <FormKit id="groupA" name="groupA" type="group" #default="{ state: { valid } }">

                  <h3>Form A</h3>
                  <div v-if="valid" class="notice-success">Good 👍</div>

                  <ElementsFormAgentCode label="รหัสสมาชิก" name="agentCode" />

                  <ElementsFormEmail label="อีเมล" name="email" />

                </FormKit>

                <hr>

                <FormKit id="groupB" name="groupB" type="group" #default="{ state: { valid } }">

                  <h3>Form B</h3>
                  <div v-if="valid" class="notice-success">Good 👍</div>

                  <FormKit type="mask" mask="#-####-#####-##-#" name="idCard" placeholder="เลขบัตรประชาชน 13 หลัก"
                    validation="required|matches:/^[0-9]{13}$/" :validation-messages="{
                      required: 'กรุณาใส่เลขบัตรประชาชน',
                      matches: 'เลขบัตรประชาชนควรเป็นตัวเลข 13 หลัก'
                    }" show-mask="false" unmask-value="true" inputmode="numeric" autocomplete="off" />

                </FormKit>

                <hr>

                <FormKit id="groupC" name="groupC" type="group" #default="{ state: { valid } }">

                  <h3>Form C</h3>
                  <div v-if="valid" class="notice-success">Good 👍</div>

                  <FormKit label="อื่นๆ" name="other" help="ไม่ required นะ" />

                </FormKit>

              </div>

            </div>

          </div>

        </div>

        <div class="col col-sidebar">

          <section class="site-sidebar is-sticky">

            <div class="card">
              <div class="card-body">

                <div class="status-list">
                  <figure class="status-icon">
                    <div class="icon check success"></div>
                  </figure>
                  <h4 class="title">Checklist</h4>
                  <div class="status-item">
                    <h5 class="topic">Form A</h5>
                    <p :class="checkListItemA"><i class="fa-solid fa-circle-check"></i></p>
                  </div>
                  <div class="status-item">
                    <h5 class="topic">Form B</h5>
                    <p :class="checkListItemB"><i class="fa-solid fa-circle-check"></i></p>
                  </div>
                  <div class="status-item">
                    <h5 class="topic">Form C</h5>
                    <p class="text-success"><i class="fa-solid fa-circle-check"></i></p>
                  </div>
                </div>

              </div>

              <div class="card-footer">
                <FormKitSummary />
              </div>
            </div>

            <FormKit type="submit" label="ตกลง" name="order-submit" id="order-submit"
              :classes="{ input: 'btn-primary', outer: 'form-actions' }" :disabled="isLoading" :loading="isLoading" />

            <NuxtLink to="" class="btn-back btn-gray">ย้อนกลับ</NuxtLink>

          </section>

        </div>

      </div>

    </FormKit>

    <ElementsDialogLoading :propsLoading="loadingProps" />

  </NuxtLayout>
</template>

<script setup>
// Define import
import { getNode } from '@formkit/core'
import { FormKitSummary } from '@formkit/vue'

/////////////////////////////////////////
// Checklist indicator
const checkListItemA = ref('')
const checkListItemB = ref('')

/////////////////////////////////////////
// Button Loading
const isLoading = ref(false)

/////////////////////////////////////////
// Modal Loading
const loadingProps = ref({})
const openLoadingDialog = (isShowLoading = true, showLogo = false, showText = false) => {
  loadingProps.value = useUtility().createLoadingProps(isShowLoading, showLogo, showText)
}

/////////////////////////////////////////
// on Mounted
onMounted(async () => {

  // Check validation all state
  watchValidationState('groupA', checkListItemA)
  watchValidationState('groupB', checkListItemB)

})

/////////////////////////////////////////
// Function check validation
const watchValidationState = (nodeName, checkListItem) => {
  const nodeData = getNode(nodeName)
  watch(() => nodeData.context.state.valid, () => {
    checkListItem.value = nodeData.context.state.valid ? 'text-success' : ''
  })
}

///////// Refactor `Function check validation` from: /////////
// Get `groupA` node and Watch validation state
// const groupAData = getNode('groupA')
// watch(() => groupAData.context.state.valid, () => {
//   if (groupAData.context.state.valid) {
//     checkListItemA.value = 'text-success'
//   } else {
//     checkListItemA.value = ''
//   }
// })

/////////////////////////////////////////
// Submit page
const submitOrder = async (formData) => {
  openLoadingDialog(true)

  const formRequest = {
    a: formData.groupA.agentCode,
    b: formData.groupA.email,
    c: formData.groupB.idCard,
    d: formData.groupC.other
  }

  await new Promise((r) => setTimeout(r, 1000))

  console.log(formRequest)

  openLoadingDialog(false)
}

/////////////////////////////////////////
// Define layout
const layout = 'monito'
const layoutClass = ''
const showPageSteps = false
const showPageHeader = true
const showLogoHeader = false

// Define page meta
const pageTitle = 'เช็คลิสต์ฟอร์ม'
const pageCategory = 'สั่งซื้อสินค้า'
const pageDescription = ''

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: 'description', content: pageDescription }],
  bodyAttrs: {
    class: 'page-order single-information',
  },
})
</script>

<style>
.formkit-summary .formkit-summary-header {
  display: none;
}

.formkit-summary .formkit-message-link {
  color: #e64b5f;
}
</style>