import { Router } from "express"
import type { Request, Response } from "express"
import authRouter from "./auth/index.js"
import emailRouter from "./email/index.js"

const apiRouter = Router()

apiRouter.get("/hello", (_req: Request, res: Response) => {
    res.send("Hello world!")
})

//ADD ROUTES
apiRouter.use("/email", emailRouter)
apiRouter.use("/auth", authRouter)

export default apiRouter
