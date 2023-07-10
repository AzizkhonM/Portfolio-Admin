import axios from "../axios"

export const useSkill = {
    create: async (state) => await axios.post("/skills/", state),
    list: async () => axios.get("/skills"),
    remove: async (id) => axios.delete(`/skills/${id}`),
    update: async (id, state) => axios.patch(`/skills/${id}`, state)
}