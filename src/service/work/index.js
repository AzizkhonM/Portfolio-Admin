import axios from "../axios"

export const useWork = {
    create: async (state) => await axios.post("/workplaces/", state),
    list: async () => axios.get("/workplaces"),
    remove: async (id) => axios.delete(`/workplaces/${id}`),
    update: async (id, state) => axios.patch(`/workplaces/${id}`, state)
}