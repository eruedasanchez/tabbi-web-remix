import { AxiosError } from "axios"
import type { NextFunction, Request, Response } from "express"
import logger from "../loaders/logger.js"

export const errorLogger = (
    error: AxiosError,
    req: Request,
    res: Response,
    _next: NextFunction
) => {
    ////./src/client/config/API.ts --> clientId header
    const { src, tenant, traceparent } = req.headers
    const errorStatus = error.response ? error.response.status : 500

    logger.error(
        `Error on ${src || req.originalUrl} status ${errorStatus} ${tenant ? `from tenant ${tenant} ` : ""}with method ${req.method ? req.method : "unknown"} from request ${traceparent} : ${
        error.message
        }`
    )
    res.status(errorStatus).json({
        error: `Error on ${src || "unknown"} with method ${
        error.config ? error.config.method : "unknown"
        }: ${error.message}`
    })
}