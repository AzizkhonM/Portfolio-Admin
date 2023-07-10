import axios from "../axios"

export const useHome = {
    list_socials: async () => await axios.get("/socialpages"),
    list_comments: async () => await axios.get("/comments"),
    list_posts: async () => await axios.get("/posts"),
    list_study: async () => await axios.get("/studyplaces"),
    list_work: async () => await axios.get("/workplaces"),
    list_skills: async () => await axios.get("/skills"),
    list_services: async () => await axios.get("/services"),
    list_projects: async () => await axios.get("/projects"),
}