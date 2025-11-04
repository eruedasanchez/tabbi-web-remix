import type { Response, Request, NextFunction, RequestHandler } from "express"
import { properties } from "../config/constants.js"
import { authenticateClient } from "../services/authService.js"
import { encrypt } from "server/middlewares/authorizationDecrypter.js"
import logger from "server/loaders/logger.js"

export const makeLoginClient: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const { username, password } = req.body
    const validUser = properties.login.user
    const validPass = properties.login.pass
    try {
        if (!username || !password) {
        logger.info(
            `authController - makeLogin with method ${req.method}, ` + "400"
        )
        return res.status(400).json()
        }

        if (username === validUser && password === validPass) {
        const response = await authenticateClient()

        if (response && !res.headersSent) {
            const { access_token } = response.data

            const token = encrypt(access_token)

            res.cookie("access_token", token, {
            httpOnly: true, // Solo accesible desde el backend
            /*         secure: true, // Solo se envía en HTTPS
            */ sameSite: "strict" // Previene ataques CSRF
            })
            res.json({ message: "Login exitoso" })
            logger.info(
            `authController - makeLogin with method ${req.method}, ` +
                res.statusCode
            )
        } else {
            logger.info(
            `authController - makeLogin with method ${req.method}, ` +
                res.statusCode
            )
        }
        } else {
        logger.info(`authController - makeLogin with method 400, Bad Request`)
        return res.status(400).json()
        }
    } catch (error) {
        // Si hay un error en authenticateUser, lo maneja el middleware de error
        next(error)
    }
}

export const makeLogout = async (req: Request, res: Response) => {
    res.clearCookie("access_token", { path: "/" })
    res.json({ message: "Logout exitoso" })
    logger.info(
        `authController - makeLogout with method ${req.method}, ` + res.statusCode
    )
}
