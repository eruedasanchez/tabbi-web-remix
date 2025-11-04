import { BaseService } from "server/services/utils/BaseService"
import type { Request, Response, NextFunction } from "express"
import logger from "server/loaders/logger.js"

export const handleRequest = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const response = await BaseService(req)
        if (response && !res.headersSent) {
        res.status(res.statusCode).json(response.data)
        const { tenant, traceparent } = req.headers

        logger.info(
            `BaseController - BaseService with method ${req.method}, from tenant ${tenant} and request ${traceparent}, ` +
            res.statusCode
        )
        }
    } catch (error) {
        next(error)
    }
}
