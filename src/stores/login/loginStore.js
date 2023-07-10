import { computed, reactive } from "vue"
import { defineStore } from "pinia";


export const loginStore = defineStore("login", () => {

    const state = reactive({
        list: [],
        loading: true,
        errorMessage: ""
    })
    
    const SET_LIST = (list) => {
        state.list = list
    }

    const LIST = computed(() => state.list)

    return { LIST, SET_LIST }

})