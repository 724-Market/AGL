<template>
    <FormKit type="form" :actions="false">
        <FormKit name="Branch" type="taglist" label="สาขา" placeholder="ระบุสาขา" :options="searchBranch" :allow-new-values="true" max="1" v-model="branchText" autocomplete="off" />
    </FormKit>
</template>

<script setup lang="ts">
import { UserGroupListRes } from '~/shared/entities/user-entity'

const userGroupList = ref<UserGroupListRes[] | undefined>(undefined)

const props = defineProps({
    userId: String
})

// Get branch value on Mounted
onMounted(async () => {
    try {
        const response = await useRepository().user.getGroupList();
        if (
            response.apiResponse.Status &&
            response.apiResponse.Status === 200 &&
            response.apiResponse.Data
        ) {
            userGroupList.value = response.apiResponse.Data
        } else {
            console.error('ไม่เจอสาขา:', response.apiResponse)
        }
    } catch (error) {
        console.error('เกิดข้อผิดพลาด:', error)
    }
})

// Search branch function
async function searchBranch({ search }: { search: string }) {
    if (!search || !userGroupList.value) return []

    const filteredList = userGroupList.value.filter((group) =>
        group.Name.toLowerCase().includes(search.toLowerCase())
    )

    return filteredList.map((result) => {
        return {
            label: result.Name,
            value: result.ID
        }
    })
}
</script>