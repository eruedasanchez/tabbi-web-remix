import type { Request, Response, NextFunction } from "express"
import logger from "server/loaders/logger.js"
import emailService from "server/services/emailService"

const basicGet = (_req: Request, res: Response) => {
    res.json("email-route")
}

const emailFetch = async (req: Request, res: Response, next: NextFunction) => {
    const response = await emailService(req, next)
    if (response && !res.headersSent) {
        res.status(res.statusCode).json(response.data)
        ////./src/client/config/API.ts --> clientId header
        logger.info(
        `emailController - emailService with method ${req.method}, ` +
            res.statusCode
        )
    } else {
        return
    }
}

export { basicGet, emailFetch }
