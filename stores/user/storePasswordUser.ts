import type { UserProfileReq } from "~/shared/entities/user-entity"

export const useStoreUserSave = defineStore('useStoreUserSave',{
    state: (): UserProfileReq => {
        return {
            Password: "",
            FirstName: "",
            LastName: "",
            PhoneNumber: "",
            Email: "",
            CreditLimit: 0,
            Commission: 0,
            BranchName: "",
            IsActive: true,
        }
    },
    getters: {
        UserSave: state => state,
    },
    actions: {
        setUserSave(request: UserProfileReq): UserProfileReq {
            this.$state = request
            return this.$state
        },
        clearUserSave() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStoreUserSave')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})
    