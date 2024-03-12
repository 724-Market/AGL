<template>
  <main class="main-content" id="panel">

    <!--  Header -->
    <header class="site-header">
      <div class="container-fluid">
        <div class="row">

          <ElementsMonitoHeader :page-title="pageTitle" :page-category="pageCategory" :show-page-steps="showPageSteps"
            :show-page-header="showPageHeader" :show-logo-header="showLogoHeader" />

        </div>
      </div>
    </header>

    <!--  Page content -->
    <article class="site-content">
      <div class="container-fluid">
        <slot />
      </div>
    </article>

  </main>

  <UtilitiesSquaresAnimateBg />
</template>

<script setup lang="ts">
// Props from page setup
const props = defineProps({
  pageTitle: String,
  pageCategory: String,
  layoutClass: String,
  showPageSteps: Boolean,
  showPageHeader: Boolean,
  showLogoHeader: Boolean
})

// Function get token
const getToken = async () => {
  const token = await useUtility().getToken()
  setTimeout(getToken, 1000 * 60)
}

// Mounted
onMounted(() => {
  setTimeout(getToken, 1000 * 60)
})

// Define head
useHead({
  bodyAttrs: {
    class: props.layoutClass
  }
})
</script>