import type { NextFunction, Request, Response } from "express"
import { Router } from "express"
import { properties } from "../../../config/constants.js"
import rateLimit from "express-rate-limit"
import * as emailController from "../../../controllers/emailController.js"

export const emailRateLimit = rateLimit({
    windowMs: properties.email.rateLimitWindowMinutes * 60 * 1000, 
    max: properties.email.rateLimitMax, 
    message: {
        error: `Demasiadas solicitudes de email. Intenta nuevamente en ${properties.email.rateLimitWindowMinutes} minutos.`,
        retryAfter: `${properties.email.rateLimitWindowMinutes} minutos`
    },
    standardHeaders: true,
    legacyHeaders: false,
    skipSuccessfulRequests: false, 
    skipFailedRequests: false,
    keyGenerator: (req) => {
        const email = req.body?.emailOrigen || ""
        return `${req.ip}-${email}`
    }
})

const emailRouter = Router()

// GET
emailRouter.get("/search", handleRequestEndpoint)
emailRouter.get("/", emailController.basicGet)
emailRouter.get("/:id", handleRequestEndpoint)

emailRouter.post("/batch", emailRateLimit, handleRequestEndpoint)
emailRouter.post("/", emailRateLimit, handleRequestEndpoint)

// PUT
emailRouter.put("/batch", handleRequestEndpoint)
emailRouter.put("/", handleRequestEndpoint)
emailRouter.put("/:id", handleRequestEndpoint)

// DELETE
emailRouter.delete("/batch", handleRequestEndpoint)
emailRouter.delete("/", handleRequestEndpoint)
emailRouter.delete("/:id", handleRequestEndpoint)

function handleRequestEndpoint(
    req: Request,
    res: Response,
    next: NextFunction
) {
    req.url = properties.api.endpoint.email + req.url
    emailController.emailFetch(req, res, next)
}

export default emailRouter
