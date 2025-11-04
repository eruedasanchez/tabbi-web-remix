import { type AxiosResponse } from "axios"
import { properties } from "../config/constants.js"
import axiosInstance from "../utils/Api.js"

const basicAuth = Buffer.from(
    `${properties.auth.basicUser}:${properties.auth.basicPassword}`
).toString("base64")

export const authenticateClient = async (): Promise<AxiosResponse | void> => {
    const config = {
        method: "post",
        maxBodyLength: Infinity,
        url: properties.auth.url + "grant_type=client_credentials",
        headers: {
        Authorization: `Basic ${basicAuth}`
        }
    }

    const response = await axiosInstance.request(config)
    return response
}