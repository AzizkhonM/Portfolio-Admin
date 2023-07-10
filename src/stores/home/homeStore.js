import { computed, reactive } from "vue"
import { defineStore } from "pinia";


export const homeStore = defineStore("home", () => {

    const state = reactive({
        list_socials: [],
        list_comments: [],
        list_posts: [],
        list_study: [],
        list_work: [],
        list_skills: [],
        list_services: [],
        list_projects: [],
    })
    
    const SET_LIST_SOCIALS = (list) => {
        state.list_socials = list
    }
    
    const SET_LIST_COMMENTS = (list) => {
        state.list_comments = list
    }
    
    const SET_LIST_POSTS = (list) => {
        state.list_posts = list
    }
    
    const SET_LIST_STUDY = (list) => {
        state.list_study = list
    }
    
    const SET_LIST_WORK = (list) => {
        state.list_work = list
    }
    
    const SET_LIST_SKILLS = (list) => {
        state.list_skills = list
    }
    
    const SET_LIST_SERVICES = (list) => {
        state.list_services = list
    }
    
    const SET_LIST_PROJECTS = (list) => {
        state.list_projects = list
    }
    

    const LIST_SOCIALS = computed(() => state.list_socials)
    const LIST_COMMENTS = computed(() => state.list_comments)
    const LIST_POST = computed(() => state.list_posts)
    const LIST_STUDY = computed(() => state.list_study)
    const LIST_WORK = computed(() => state.list_work)
    const LIST_SKILLS = computed(() => state.list_skills)
    const LIST_SERVICES = computed(() => state.list_services)
    const LIST_PROJECTS = computed(() => state.list_projects)

    return { LIST_COMMENTS, LIST_POST, LIST_PROJECTS, LIST_SERVICES, LIST_SKILLS, LIST_SOCIALS, LIST_STUDY, LIST_WORK,
    SET_LIST_COMMENTS, SET_LIST_POSTS, SET_LIST_PROJECTS, SET_LIST_SERVICES, SET_LIST_SKILLS, SET_LIST_SOCIALS, SET_LIST_STUDY, SET_LIST_WORK }

})