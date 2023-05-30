<template>
    <ul class="_navbar">
        <li>
            <NuxtLink to="/login">login</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/register">register</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/verify-register">verify-register</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/otp">otp</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/set-password">set-password</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/change-password">change-password</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/reset-password">reset-password</NuxtLink>
        </li>
        <li>
            <NuxtLink to="/forgot-password">forgot-password</NuxtLink>
        </li>
    </ul>
</template>

<style scoped>
._navbar {
    display: flex;
    flex-direction: row;
    position: fixed;
    overflow-y: scroll;
    width: 100%;
    top: 0;
    left: 0;
    justify-content: space-between;
    padding: 1rem;
    margin: 0;
    gap: 1rem;
}

._navbar::after {
    backdrop-filter: blur(3px);
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 60px;
    z-index: -1;
    border-bottom: 1px solid #fff;
}

._navbar li {
    list-style: none;
    white-space: nowrap;
}
</style>