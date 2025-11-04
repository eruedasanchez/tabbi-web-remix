import axios, { type AxiosInstance } from "axios"
import { clientAxiosInterceptor } from "../interceptors/clientAxiosInterceptor.js"

const clientAxiosInstance: AxiosInstance = axios.create()

clientAxiosInstance.interceptors.request.use(clientAxiosInterceptor.onRequest)
clientAxiosInstance.interceptors.response.use(
    clientAxiosInterceptor.onResponse,
    clientAxiosInterceptor.onResponseError
)

export default clientAxiosInstance