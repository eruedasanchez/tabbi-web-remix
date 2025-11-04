import axios from "axios"
import { sentryInterceptor } from "server/interceptors/sentryInterceptors"

const axiosInstance = axios.create()

axiosInstance.interceptors.response.use(
    sentryInterceptor.onResponse,
    sentryInterceptor.onError
)

export default axiosInstance