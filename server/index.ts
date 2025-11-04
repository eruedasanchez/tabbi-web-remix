import express from "express"
import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url" 
import { properties } from "./config/constants.js"
import logger from "./loaders/logger.js"
import cookieParser from "cookie-parser"
import bodyParser from "body-parser"
import cors from "cors"
import apiRouter from "./routes/api/index.js"
import "./config/sentry.js"
import { errorLogger } from "./middlewares/errorLogger.js"

dotenv.config()
const app = express()

app.use(bodyParser.json({ limit: "50mb" }))
app.use(
    bodyParser.urlencoded({
        limit: "50mb",
        extended: true,
        parameterLimit: 50000
    })
)

app.use(bodyParser.text({ limit: "200mb" }))
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true
    })
)

app.use(cookieParser())
app.use("/api", apiRouter)

// Solución para __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const staticPath = path.join(__dirname, "../../dist/client")

app.use(express.static(staticPath))

app.use(errorLogger)

app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"))
})

app.listen(properties.port, () => {
    logger.info(`Server listening on port: ${properties.port}`)
})
logger.info("properties: " + JSON.stringify(properties, null, " "))
