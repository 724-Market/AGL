<template>
    <FormKit type="form" #default="{ value }" :actions="false">
        <!--Setting the `options` prop to async function `loadHorrorMovies`-->
        <FormKit name="movie" type="taglist" label="Search for your favorite movie"
            placeholder="Example: Shawshank Redemption" :options="searchMovies" 
            :allow-new-values="true" max="1"/>
        <pre wrap>{{ value }}</pre>
    </FormKit>
</template>

<script setup lang="ts">
import { ref, onMounted, defineProps } from 'vue';
import { UserGroupListRes } from '~/shared/entities/user-entity';

const userGroupList = ref<UserGroupListRes[] | undefined>(undefined);

const props = defineProps({
    userId: String,
});

onMounted(async () => {
    console.log("Branch userID3 "+props.userId)
    try {
        const response = await useRepository().user.getGroupList();
        if (
            response.apiResponse.Status &&
            response.apiResponse.Status === 200 &&
            response.apiResponse.Data
        ) {
            console.log("Call group list success ")
            userGroupList.value = response.apiResponse.Data;
        } else {
            console.error('Failed to fetch user group list:', response.apiResponse);
        }
    } catch (error) {
        console.error('An error occurred while fetching user group list:', error);
    }
});

// Search movie receives FormKit's context object
// which we are destructuring to get the search value.
async function searchMovies({ search }: { search: string }) {
    if (!search || !userGroupList.value) return [];

    const filteredList = userGroupList.value.filter((group) =>
        group.Name.toLowerCase().includes(search.toLowerCase())
    );

    // Iterating over results to set the required
    // `label` and `value` keys.
    return filteredList.map((result) => {
        return {
            label: result.Name,
            value: result.ID,
        };
    });
}
</script>