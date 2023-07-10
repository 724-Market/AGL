<template>
    <div class="layout-monito">

        <!--  Sidenav -->
        <nav class="sidenav navbar fixed-left navbar-expand" id="sidenav-main" v-if="showComponent">
            <div class="scrollbar-inner">
                <header class="sidenav-header">

                    <!--  Brand -->
                    <div class="navbar-brand">
                        <NuxtLink to="/dashboard" title="กลับไปหน้าแดชบอร์ด">กลับไปหน้าแดชบอร์ด</NuxtLink>
                    </div>

                    <!--  Sidenav toggler -->
                    <div class="sidenav-toggler-wrapper">
                        <div class="sidenav-toggler" data-action="sidenav-unpin" data-target="#sidenav-main">
                            <div class="sidenav-toggler-inner">
                                <i class="sidenav-toggler-line"></i>
                                <i class="sidenav-toggler-line"></i>
                                <i class="sidenav-toggler-line"></i>
                            </div>
                        </div>
                    </div>
                </header>

                <ElementsMonitoSidenav />

            </div>
        </nav>

        <!-- Main content-->
        <main class="main-content" id="panel">

            <!--  Topbar -->
            <div class="navbar-top" v-if="showComponent">
                <div class="container-fluid">
                    <div class="row">

                        <ElementsMonitoTopbar />

                    </div>
                </div>
            </div>

            <!--  Header -->
            <header class="site-header">
                <div class="container-fluid">
                    <div class="row">

                        <ElementsMonitoHeader :page-title="pageTitle" :page-category="pageCategory"
                            :show-page-steps="showPageSteps" :show-page-header="showPageHeader" />

                    </div>
                </div>
            </header>

            <!--  Page content -->
            <article class="site-content">
                <div class="container-fluid">
                    <slot />
                </div>
            </article>

            <!-- Footer -->
            <footer class="site-footer" v-if="showComponent">
                <div class="container-fluid">
                    <div class="row">

                        <ElementsMonitoFooter />

                    </div>
                </div>
            </footer>

        </main>

    </div>
</template>

<script setup>
// Props from page setup
const props = defineProps({
    pageTitle: String,
    pageCategory: String,
    layoutClass: String,
    showPageSteps: Boolean,
    showPageHeader: Boolean
})

const showComponent = ref(true)

if (props.layoutClass === 'page-monito-minimal') {
    showComponent.value = false
} else {
    showComponent.value = true
}

// Define style
useHead({
    link: [{ rel: 'stylesheet', href: '/assets/css/monito.css' }],
    script: [
        { src: '/assets/js/popper.min.js' },
        { src: '/assets/js/bootstrap.min.js' },
        { src: 'https://kit.fontawesome.com/285262ebb5.js', crossorigin: 'anonymous', 'data-search-pseudo-elements': true, defer: true },
    ],
    bodyAttrs: {
        class: props.layoutClass,
    },
})
</script>