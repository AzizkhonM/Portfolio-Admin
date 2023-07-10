import axios from "../axios"

export const useService = {
    create: async (state) => await axios.post("/services/", state),
    list: async () => axios.get("/services"),
    remove: async (id) => axios.delete(`/services/${id}`),
    update: async (id, state) => axios.patch(`/services/${id}`, state)
}