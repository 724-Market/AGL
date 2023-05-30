<template>
    <NuxtLayout :name="layout">
        <article>
            <section>
                <h1>Agent Love Club</h1>
                <NuxtLink to="/login">Login</NuxtLink>
            </section>
        </article>
    </NuxtLayout>
</template>

<script setup>

    const layout = "default";

    useHead({
        title: 'Homepage',
        meta: [
            { name: 'description', content: 'Welcome to Homepage' }
        ],
        bodyAttrs: {
            class: 'homepage'
        },
    })

</script>

<style scoped>
article {
    display: grid;
    height: 100vh;
    text-align: center;
}
section {
    place-self: center;
}
h1 {
    font-family: sans-serif;
    font-size: 4rem;
}
a {
    font-family: sans-serif;
    font-size: 2rem;
}
</style>