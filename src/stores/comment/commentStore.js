import { computed, reactive } from "vue"
import { defineStore } from "pinia";


export const commentStore = defineStore("comment", () => {

    const state = reactive({
        list_verified: [],
        list_unverified: [],
        loading: true,
        errorMessage: ""
    })
    
    const SET_LIST_VERIFIED = (list) => {
        state.list_verified = list
    }

    const SET_LIST_UNVERIFIED = (list) => {
        state.list_unverified = list
    }

    const LIST_VERIFIED = computed(() => state.list_verified)
    const LIST_UNVERIFIED = computed(() => state.list_unverified)

    return { LIST_UNVERIFIED, LIST_VERIFIED, SET_LIST_UNVERIFIED, SET_LIST_VERIFIED }

})