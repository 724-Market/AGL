<template>
    <aside class="card">
        <div class="card-body">
            <div class="status-list">
                <figure class="status-icon">
                    <i class="fa-solid fa-percent fa-xl"></i>
                </figure>
                <h4 class="title">บันทึกรายการผลตอบแทน</h4>
                <div class="status-item" v-for="(item, j) in props.userCommissionList" :key="j">
                    <h5 class="topic">{{ item.Commission }}</h5>
                    <p>{{ useUtility().formatDate(item.CreateDate, "DD MMMM BBBB HH: mm: ss") }}</p>
                </div>
            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import {
    UserProfileReq,
    UserDataRes,
    UserCommissionListRes,
    UserGroupListRes,
    delGroupReq,
} from "~/shared/entities/user-entity";

import { useStoreUserSave } from "~/stores/user/storePasswordUser";

const emit = defineEmits(["checkProfileDetail", "createUserConfirm", "editUserConfirm", "reProfile"])
const userGroupList: globalThis.Ref<UserGroupListRes[] | undefined> = ref();

const userSave = useStoreUserSave();

const messageError = ref("");

const dateNow: Date = new Date();

const isError = ref(false);
const isLoading = ref(false);

var userIDRes = ref("");


var passwordNumberText = ref("");

var confirmPasswordText = ref("");

var firstNameText = ref("");

var lastNameText = ref("");

var phoneNumberText = ref("");

var emailText = ref("");

const limitMoney = ref(0);

const commission = ref(0);

var branchText = ref("");

const isActive = ref(false);

const props = defineProps({
    userProfile: {
        type: Object as () => UserProfileReq,
    },
    userDetails: {
        type: Object as () => UserDataRes,
    },
    userCommissionList: {
        type: Object as () => UserCommissionListRes[],
    },
    loadData: Boolean,
    getUserPassword: String,
    getStatus: {
        type: [Number, String],
        default: 0,
        validator: (value) => {
            return typeof value === 'number' || (typeof value === 'string' && value.trim() === '') || value === null;
        },
    },
    userID: String,
});

const userPassRes = toRef(props, 'getUserPassword');

// Create a ref to store the initial value
const originalUserPass = ref(props.getUserPassword);

onMounted(() => {
    loadGroupList();

    // console.log("Commission list component ", props.userCommissionList)

    if (props.userDetails && originalUserPass.value !== null) {

        passwordNumberText.value = "";
        confirmPasswordText.value = "";
        firstNameText.value = props.userDetails.FirstName;
        lastNameText.value = props.userDetails.LastName;
        phoneNumberText.value = props.userDetails.Phone;
        emailText.value = props.userDetails.Email;

        // Convert string values to numbers
        limitMoney.value = parseFloat(props.userDetails.CreditLimitAmount);
        commission.value = props.userDetails.Commission;
        branchText.value = props.userDetails.UserGroupName;
        isActive.value = !!props.userDetails.IsActive;
        userIDRes.value = props.userDetails?.UserName;
        //userPassRes.value = originalUserPass.value ?? ''; 

        clearStore()
    }
});

const deleteBranch = async (branchid: string) => {
    //ลบแบบร่างนี้
    let confirmAction = confirm("ต้องการลบรายการหรือไม่?");
    if (confirmAction) {
        isLoading.value = true;
        let req: delGroupReq = {
            ID: branchid,
        };
        var response = await useRepository().user.deleteGroup(req);
        if (response.apiResponse.Status && response.apiResponse.Status == "200") {
            //await loadHistoryStatus();
            emit('reProfile', props.userID);

        } else {
            console.log("props.userID" + props.userID)
            alert(response.apiResponse.ErrorMessage);
        }
        isLoading.value = false;
    }
};

const clearStore = async () => {
    const req: UserProfileReq = {
        Password: "",
        FirstName: "",
        LastName: "",
        PhoneNumber: "",
        Email: "",
        CreditLimit: 0,
        Commission: 0,
        BranchName: "",
        IsActive: isActive.value,

    }
    console.log("submitCreateUser setUser store" + passwordNumberText.value);
    userSave.setUserSave(req);

};

const loadGroupList = async () => {
    console.log("load Group List!!! ")

    const response = await useRepository().user.getGroupList();
    if (
        response.apiResponse.Status &&
        response.apiResponse.Status == "200" &&
        response.apiResponse.Data
    ) {
        userGroupList.value = response.apiResponse.Data;
    } else {
        isError.value = true;
        messageError.value = response.apiResponse.ErrorMessage ?? "";
    }
};


// Submit form event
const submitCreateUser = async (formData: any) => {
    if (props.userID == null && passwordNumberText.value != null) {
        const req: UserProfileReq = {
            Password: passwordNumberText.value,
            FirstName: firstNameText.value,
            LastName: lastNameText.value,
            PhoneNumber: phoneNumberText.value,
            Email: emailText.value,
            CreditLimit: limitMoney.value,
            Commission: commission.value,
            BranchName: branchText.value,
            IsActive: isActive.value,

        }
        console.log("submitCreateUser setUser store" + passwordNumberText.value);
        userSave.setUserSave(req);
    }
    if (props.userID == null) {
        // Add waiting time for debug
        emit("createUserConfirm",
            passwordNumberText.value,
            firstNameText.value,
            lastNameText.value,
            phoneNumberText.value,
            emailText.value,
            limitMoney.value,
            commission.value,
            branchText.value,
            isActive.value
        );
    } else {
        if (passwordNumberText.value == null) {
            userSave.clearUserSave()
        }
        emit("editUserConfirm",
            props.userDetails?.UserID,
            passwordNumberText.value,
            firstNameText.value,
            lastNameText.value,
            phoneNumberText.value,
            emailText.value,
            limitMoney.value,
            commission.value,
            branchText.value,
            isActive.value
        );
        passwordNumberText.value = "";
        confirmPasswordText.value = "";
    }
};

// Watch for changes in response.apiResponse.Status
watch(
    () => props.getStatus,
    async (newStatus) => {
        if (newStatus == '200') {
            console.log('User profile update!!!' + newStatus);
            isLoading.value = true;
            await loadGroupList();
            isLoading.value = false;

        }
    }
);
</script>