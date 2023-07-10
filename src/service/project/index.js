import axios from "../axios"

export const useProject = {
    create: async (state) => await axios.post("/projects/", state),
    list: async () => axios.get("/projects"),
    remove: async (id) => axios.delete(`/projects/${id}`),
    update: async (id, state) => axios.patch(`/projects/${id}`, state)
}