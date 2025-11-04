import axios from "axios"
import { properties } from "../config/constants.js"
import { basicAuth } from "../utils/basicAuth.js"

let cachedClientToken: {
    token: string
    expiresAt: number
} | null = null

export const getClientToken = async (): Promise<string> => {
    const response = await axios.post(
        properties.auth.url + "/oauth/token?grant_type=client_credentials",
        null,
        {
        headers: {
            Authorization: `Basic ${basicAuth}`
        }
        }
    )

    const { access_token, expires_in } = response.data

    if (!access_token || !expires_in) {
        throw new Error("Failed to obtain client access token")
    }

    const now = Date.now()

    cachedClientToken = {
        token: access_token,
        expiresAt: now + expires_in * 1000 - 5000
    }

    return access_token
}

export const getValidClientToken = async (): Promise<string> => {
    const now = Date.now()

    if (cachedClientToken && cachedClientToken.expiresAt > now) {
        return cachedClientToken.token
    }

    return await getClientToken()
}