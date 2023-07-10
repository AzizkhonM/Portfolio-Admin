import { computed, reactive } from "vue"
import { defineStore } from "pinia";


export const postStore = defineStore("post", () => {

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