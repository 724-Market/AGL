<template>
  <div class="col">
    <nav class="navbar">

      <div class="topbar-nav">
        <div class="sidenav-toggle">
          <a id="btn-sidenav-open" href="#" title="เมนู">
            <span class="sidenav-toggle-text"><span>เมนู</span></span>
          </a>
        </div>
      </div>

      <ElementsUtilitiesNotificationDropdown v-if="!isHidden" />

      <ElementsUtilitiesShortcutDropdown />

      <ElementsUtilitiesUserDropdown />

    </nav>
  </div>
</template>

<script setup>
const isHidden = ref(true)
</script>