<template>
    <dialog id="papers-dialog" v-show="_show">
        <div class="dialog-card">
            <div class="card-header">
                <button
                    type="button"
                    class="btn btn-close btn-close-wallet"
                    @click="closeModal(false)"
                    >
                    ปิด
                </button>
            </div>
            <div class="card-body">
                <figure class="dialog-icon"><i class="fa-solid fa-layer-group"></i></figure>
                <h5>คลังกระดาษ</h5>
                <ul class="nav nav-tabs justify-content-center nav-fill" id="papers-stock-tabs" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="compulsory-tab" data-bs-toggle="tab"
                            data-bs-target="#compulsory-tab-pane" type="button" role="tab"
                            aria-controls="compulsory-tab-pane" aria-selected="true">พ.ร.บ.</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="voluntary-tab" data-bs-toggle="tab"
                            data-bs-target="#voluntary-tab-pane" type="button" role="tab" aria-controls="voluntary-tab-pane"
                            aria-selected="false" tabindex="-1" disabled>ประเภท</button>
                    </li>
                </ul>
            </div>
            <div class="card-body card-table">
                <div class="tab-content papers-stock-tabs">
                    <div class="tab-pane fade show active" id="compulsory-tab-pane" role="tabpanel"
                        aria-labelledby="compulsory-tab" tabindex="0">
                        <div class="papers-stock-table">
                            <table class="table no-striped">
                                <thead>
                                    <tr>
                                        <th>รายการกระดาษ</th>
                                        <th class="text-end">จำนวนที่มี (แผ่น)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr class="product" v-for="(item, i) in pledgePaperOnhandBalanceGet" v-bind:key="i" >
                                        <td>
                                            <div class="item">
                                                <figure class="brand">
                                                    <img :src="`https://724.co.th/image/logo_insurance_company/logo_${item.Company}.png`" alt="">
                                                </figure>
                                                <div class="info">
                                                    <h6> {{ item.Brand }} </h6>
                                                    <p>ราคามัดจำ<span class="big"> {{ item.PaperValue }} </span></p>
                                                </div>
                                            </div>
                                        </td>
                                        <td class="text-end quantity"> {{ item.Quantity }} </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="voluntary-tab-pane" role="tabpanel" aria-labelledby="voluntary-tab"
                        tabindex="0">
                        <div class="papers-stock-table">
                            <table class="table no-striped">
                                <thead>
                                    <tr>
                                        <th>รายการกระดาษ</th>
                                        <th class="text-end">จำนวนที่มี (แผ่น)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <NuxtLink class="btn-secondary" to="/papers/exchange"><i
                        class="fa-solid fa-file-circle-plus"></i>แลกกระดาษ
                </NuxtLink>
            </div>
        </div>
    </dialog>
</template>

<script setup lang="ts">
import type {
PledgePaperOnhandBalanceReq,
PledgePaperOnhandBalanceRes
} from "~/shared/entities/pledge-entity";

const emit = defineEmits(["closeWallet"]);
const pledgePaperOnhandBalanceGet: globalThis.Ref<PledgePaperOnhandBalanceRes[] | undefined> = ref([]);

const props = defineProps({
  show: Boolean,

});
const _show = ref(false);

const onLoad = onMounted(async () => {
    await loadPledgeHistoryPaymentAddList();

    if (props.show) {
        openModal();
    }

    
    /*
    const dialogPapers = document.getElementById('papers-dialog')
    const openDialogPapers = document.querySelector('.btn-open-papers')
    const closeDialogPapers = document.querySelector('.btn-close-papers')

    openDialogPapers.addEventListener('click', function () {
        dialogPapers.showModal()
    })

    closeDialogPapers.addEventListener('click', function () {
        dialogPapers.close()
    })
    */
})
function openModal() {
  //modal.show()
  _show.value = props.show;
  const dialogLoading = document.getElementById("papers-dialog");
  if (dialogLoading) dialogLoading.showModal();
}
watch(
  () => props.show,
  () => {
    console.log("prop value changed", props.show);
    if (props.show) {
      openModal();
    } else {
      closeModal(false);
    }
  }
);
async function closeModal(refresh: boolean) {
  //modal.hide()
  _show.value = false;
  const dialogLoading = document.getElementById("wallet-dialog");
  if (dialogLoading) dialogLoading.close();
  emit("closeWallet", false, refresh);
}

const loadPledgeHistoryPaymentAddList = async (productID: string) => {
    const req: PledgePaperOnhandBalanceReq = {
        ProductID: productID,
    };
    const response = await useRepository().pledge.paperOnhandBalanceGet(req);
    if (response.apiResponse.Status && response.apiResponse.Status == "200") {
        if (response.apiResponse.Data) {
            pledgePaperOnhandBalanceGet.value = response.apiResponse.Data;

            return pledgePaperOnhandBalanceGet.value
        } else {
            // data not found
        }
    } else {
    }
};
</script>