<template>
  <div class="card-login">
    <header class="form-header">
      <h1 class="title">เข้าสู่ระบบ</h1>
      <h2 class="subtitle">เพื่อใช้งานระบบสมาชิก</h2>
      <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>
    </header>

    <FormKit
      type="form"
      :actions="false"
      id="form-login"
      @submit="submitLogin"
      form-class="form-login form-theme"
      #default="{ value }"
      v-model="values"
      :incomplete-message="false"
    >
      <ElementsFormUsername v-model="username" />

      <ElementsFormPasswordWithForgot v-model="password" />

      <FormKit
        type="submit"
        label="เข้าใช้งานระบบ"
        name="login-submit"
        id="login-submit"
        :classes="{
          input: 'btn-primary',
          outer: 'form-actions',
        }"
        :loading="isLoading"
      />
    </FormKit>

    <footer class="form-footer">
      <p>
        ยังไม่เคยลงทะเบียน ?
        <NuxtLink to="/register" title="ลงทะเบียนเพื่อเปิดใช้งานที่นี่"
          >ลงทะเบียนเพื่อเปิดใช้งานที่นี่</NuxtLink
        >
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import type { IUserAuthRequest } from "~/shared/entities/userAuth-entity";
// TODO Animating validate elements
// TODO Middleware and navigation
// TODO Page transition

// Define import
// Import store
import { useStoreUserAuth } from "~/stores/user/storeUserAuth";

// Pinia
import { createPinia } from "pinia";
import { storeToRefs } from "pinia";
// Pinia persist plugin
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
// Define Variables

// set init pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// State or Store
const auth = ref(null);
const completedLogin = ref(false);

// Loading state after form submiting
const isLoading = ref(false);

// Submitted state after submit
const submitted = ref(false);

// Response status for notice user
const statusMessage = ref();
const statusMessageType = ref();

const username = ref();
const password = ref();
// Binding default value
const values = reactive({
  username: "AM00000003",
  //username:"AM00125633",
  password: "Qwerty1234@",
});

// Submit form event
const submitLogin = async () => {
  isLoading.value = true;
  // Add waiting time for debug
  // await new Promise((r) => setTimeout(r, 1000))
  // Define Variables
  // State or Store
  const store = useStoreUserAuth();
  const req: IUserAuthRequest = {
    username: username.value,
    password: password.value,
  };
  const { data } = await useAsyncData("userAuth", () => store.authLogin(req));
  isLoading.value = false;
  if (data && data.value) {
    const auth = data.value.Data;
    if (data.value.Status == "200") {
      const router = useRouter();
      router.push({ path: "/order/compulsory/information" });
    } else {
      statusMessageType.value = "notice-warning";
      statusMessage.value = data.value.ErrorMessage;
      if (data.value.ErrorCode == "90000999") {
        statusMessage.value = "Username หรือ Password ไม่ถูกต้อง";

        return statusMessage.value;
      }
    }
  }
};
</script>
