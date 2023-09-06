<template>
  <div class="card-login">
    <header class="form-header">
      <h1 class="title">เข้าสู่ระบบ</h1>
      <h2 class="subtitle">เพื่อใช้งานระบบสมาชิก</h2>
      <div :class="statusMessageType" v-if="statusMessage">{{ statusMessage }}</div>
    </header>

    <FormKit type="form" @submit="submitLogin" :actions="false" id="form-login" form-class="form-login form-theme"
      #default="{ value }" v-model="values" :incomplete-message="false">
      <ElementsFormUsername />

      <ElementsFormPasswordWithForgot />

      <FormKit type="submit" label="เข้าใช้งานระบบ" name="login-submit" id="login-submit" :classes="{
        input: 'btn-primary',
        outer: 'form-actions',
      }" :disabled="isLoading" :loading="isLoading" />
    </FormKit>

    <footer class="form-footer">
      <p>
        ยังไม่เคยลงทะเบียน ?
        <NuxtLink to="/register" title="ลงทะเบียนเพื่อเปิดใช้งานที่นี่">ลงทะเบียนเพื่อเปิดใช้งานที่นี่</NuxtLink>
      </p>
    </footer>
  </div>
</template>

<script setup>
// TODO Animating validate elements
// TODO Middleware and navigation
// TODO Page transition
// TODO Page loading
// TODO Create .env file

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

// Binding default value
const values = reactive({
  username: "AM00000003",
  //username:"AM00125633",
  password: "Qwerty1234@",
});

// Submit form event
const submitLogin = async (formData) => {
  // Add waiting time for debug
  // await new Promise((r) => setTimeout(r, 1000))
  // Define Variables
  // State or Store
  const store = useStoreUserAuth();

  const { data } = await useAsyncData("userAuth", () => store.authLogin(formData));
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
};
</script>
