<template>
  <UtilitiesSquaresAnimateBg />

  <div class="layout-login">

    <DevOnly>
      <!-- DEV: open menu for all Login series pages -->
      <DevMenuCheck />
    </DevOnly>

    <header class="header-login">
      <div class="logo">
        <!-- TODO Change link -->
        <a href="#" title="724 Market">724 Market</a>
      </div>
    </header>

    <section class="container-card">
      <slot />
    </section>

  </div>
</template>

<script setup>

// Define style
useHead({
  link: [{ rel: "stylesheet", href: "/assets/css/login.css" }],
});
</script>