import axios from "../axios"

export const useStudy = {
    create: async (state) => await axios.post("/studyplaces/", state),
    list: async () => axios.get("/studyplaces"),
    remove: async (id) => axios.delete(`/studyplaces/${id}`),
    update: async (id, state) => axios.patch(`/studyplaces/${id}`, state)
}