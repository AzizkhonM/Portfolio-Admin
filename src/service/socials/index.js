import axios from "../axios"

export const useSocials = {
    create: async (state) => await axios.post("/socialpages/", state),
    list: async () => axios.get("/socialpages"),
    remove: async (id) => axios.delete(`/socialpages/${id}`),
    update: async (id, state) => axios.patch(`/socialpages/${id}`, state)
}