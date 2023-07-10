import axios from "../axios"

export const usePost = {
    create: async (state) => await axios.post("/posts/", state),
    list: async () => axios.get("/posts"),
    remove: async (id) => axios.delete(`/posts/${id}`),
    update: async (id, state) => axios.patch(`/posts/${id}`, state)
}