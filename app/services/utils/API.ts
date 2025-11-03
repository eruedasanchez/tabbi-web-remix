import axios from "axios"
import { constantsENV } from "../../config/constants"

const apiService = axios.create({
    baseURL: constantsENV.API_BASE_URL
})

export default apiService
