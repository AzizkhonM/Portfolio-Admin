import axios from "../axios"

export const useLogin = {
    login: async (state) => await axios.post("/admin/login/", state)
}