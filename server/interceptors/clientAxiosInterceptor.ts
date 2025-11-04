/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    type InternalAxiosRequestConfig,
    type AxiosResponse,
    AxiosError,
    AxiosHeaders
} from "axios"
import {
    getClientToken,
    getValidClientToken
} from "../helpers/getClientToken.js"
import logger from "../loaders/logger.js"
import clientAxiosInstance from "../utils/clientApi.js"

export const clientAxiosInterceptor = {
    onRequest: async (config: InternalAxiosRequestConfig<unknown>) => {
        const token = await getValidClientToken()

        config.headers = config.headers || {}
        config.headers.Authorization = `Bearer ${token}`
        return config
    },

    onResponse: async (response: AxiosResponse): Promise<AxiosResponse> => {
        return response
    },

    onResponseError: async (
        error: AxiosError
    ): Promise<AxiosResponse | Promise<never>> => {
        const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean
        headers: AxiosHeaders
        }
        if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true

        try {
            const newToken = await getClientToken()

            originalRequest.headers.set("Authorization", `Bearer ${newToken}`)

            return clientAxiosInstance(originalRequest)
        } catch (error) {
            logger.error(
            `Error fetching client token - Response error: ${(error as any).response.data.error}`
            )
        }
        }

        return Promise.reject(error)
    }
}