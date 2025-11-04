import { Router } from "express"
import {
    makeLoginClient,
    makeLogout
} from "../../../controllers/authController.js"

const authRouter = Router()

authRouter.post("/", makeLoginClient)
authRouter.post("/logout", makeLogout)

authRouter.get("/", (_req, res, _next) => {
    res.status(200).json("login-route")
})

export default authRouter
