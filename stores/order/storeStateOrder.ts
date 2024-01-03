import type { StateOrder } from "~/shared/entities/state-entity";

export const useStoreStateOrder = defineStore('useStoreStateOrder', {
    state: (): StateOrder => {
        return {
            state: 0
        }
    },
    getters: {
        StateInfo: state => state,
    },
    actions: {
        setState(request: StateOrder): StateOrder {
            this.$state = request

            return this.$state
        },

        clearState() {
            this.$reset()
            this.$dispose()
            sessionStorage.removeItem('useStoreStateOrder')
        }
    },
    persist: {
        storage: persistedState.sessionStorage,
    }
})