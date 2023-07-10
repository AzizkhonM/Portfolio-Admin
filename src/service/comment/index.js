import axios from "../axios"

export const useComment = {
    create: async (state) => await axios.post("/comments/", state),
    list_verified: async () => axios.get("/comments/verified"),
    list_unverified: async () => axios.get("/comments/unverified"),
    remove: async (id) => axios.delete(`/comments/${id}`),
    update: async (id, state) => axios.patch(`/comments/${id}`, state),
    verify: async (id) => axios.get(`comments/verify/${id}`),
    unverify: async (id) => axios.get(`comments/unverify/${id}`),
}