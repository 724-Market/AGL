<template>
  <NuxtLayout :name="layout" :layout-class="layoutClass" :page-title="pageTitle" :page-category="pageCategory"
    :show-page-steps="showPageSteps" :show-page-header="showPageHeader">

    <div class="row">
      <div class="col">

        <div id="transaction-stats" class="card-stat-stack">
          <OrderHistoryCardsUsers v-if="usersLimitRes" :user-limit="usersLimitRes"></OrderHistoryCardsUsers>
        </div>

        <UsersGridTable :key="renderKey" :filters="filterOptionTable" v-if="filterOptionTable.length >= 0"
          @change-table="handlerChangeTable" @on-delete="deleteUsers" @on-profile="loadProfileUser"></UsersGridTable>

      </div>
    </div>
    
    <ElementsModalDelUser
      v-if="isDelUser" 
      :modal-show="isDelUser"
      :modal-title="'ยืนยันการลบผู้ช่วย'" 
      :modal-type="ModalType.Danger"
      @on-close-Modal="handleCloseModal"
      @on-confirm-modal="handleConfirmModal"
    />

  </NuxtLayout>
</template>

<script lang="ts" setup>
// Define import
import type { UserLimitRes, delUserReq } from "~/shared/entities/user-entity"
import { storeToRefs } from "pinia"
import { ModalType } from "~/shared/entities/enum-entity"
import { useStoreUserAuth } from "~~/stores/user/storeUserAuth"
import type { Filter } from "~/shared/entities/table-option"

// Define variables
const isLoading = ref(false)
const table = ref()
const router = useRouter()
const usersLimitRes: globalThis.Ref<UserLimitRes | any> = ref()

const filterOptionTable: globalThis.Ref<Filter[]> = ref([])

const storeAuth = useStoreUserAuth()
const { AuthenInfo } = storeToRefs(storeAuth)
const isError = ref(false)
const messageError = ref("")
const isDelUser = ref(false)
const delUserID = ref("")
const renderKey = ref(0)


// on Mounted
const onLoad = onMounted(async () => {
  if (AuthenInfo.value) {
    await loadUsersLimit()
  } else {
    router.push("/login")
  }
})

const handleCloseModal = async () => {
  isDelUser.value = false
}

const deleteUsers = async (UserID: string) => {
    isDelUser.value = true
    delUserID.value = UserID
}

const updateComponent = () => {
  return new Promise<void>((resolve) => {
    renderKey.value = renderKey.value + 1;
    resolve();
  });
}

const handleConfirmModal = async () => {
  isLoading.value = true
  let req: delUserReq = {
      SubUserID: delUserID.value,
  }
  var response = await useRepository().user.deleteUser(req)
  if (response.apiResponse.Status && response.apiResponse.Status == "200") {
      console.log("Reload");
      await updateComponent();
      await loadUsersLimit();
    } else {
      alert(response.apiResponse.ErrorMessage)
    }
  isLoading.value = false
}

const loadProfileUser = async (UserID: string) => {
  console.log("loadProfileUser3 " + UserID)
}

const loadUsersLimit = async () => {
  const response = await useRepository().user.createLimit()

  if (
    response.apiResponse.Status &&
    response.apiResponse.Status == "200" &&
    response.apiResponse.Data &&
    Array.isArray(response.apiResponse.Data) &&
    response.apiResponse.Data.length > 0
  ) {
    usersLimitRes.value = response.apiResponse.Data[0] as UserLimitRes
    return usersLimitRes.value
  } else {
    isError.value = true
    messageError.value = response.apiResponse.ErrorMessage ?? ""
  }
}

const handlerChangeTable = async (datatable: any) => {
  table.value = datatable
}

// Define layout
const layout = "monito"
const layoutClass = "layout-monito"
const showPageSteps = false
const showPageHeader = true

// Define page meta
const pageTitle = "ผู้ช่วย"
const pageCategory = "รายชื่อผู้ช่วย"
const pageDescription = ""

// Define meta seo
useHead({
  title: pageTitle,
  meta: [{ name: "description", content: pageDescription }],
  bodyAttrs: {
    class: "page-users single-history template-datatable"
  }
})
</script>