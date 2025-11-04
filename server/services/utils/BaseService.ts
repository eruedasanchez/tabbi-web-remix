import { type Request } from "express"
import logger from "../../loaders/logger.js"
import axiosInstance from "../../utils/Api.js"

export const BaseService = async (req: Request) => {
    const token = req.cookies.access_token
    const { tenant, traceparent } = req.headers
    const { body } = req
    const { errorreport } = req.headers

    const fullPath = req.url.replace(/\/$/, "")

    const config = {
        method: req.method,
        url: fullPath,
        headers: {
        tenant: tenant,
        traceparent: traceparent,
        accept: "*/*",
        errorreport: errorreport,
        src: "BaseService",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
        },
        data: body
    }

    logger.info(JSON.stringify(config))
    const response = await axiosInstance.request(config)
    return response
}
