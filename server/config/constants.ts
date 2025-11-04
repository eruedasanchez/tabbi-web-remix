import { config } from "dotenv"

config({})

const VERSION = process.env.VITE_VERSION || "0.0.0"
const PORT = process.env.VITE_SERVER_PORT || 8080
const PUBLIC_URL = process.env.VITE_PUBLIC_URL || ""
const SENTRY_DSN = process.env.VITE_SENTRY_DSN || ""
const STAGE = process.env.VITE_STAGE || "testing"
const BASIC_PASSWORD = process.env.VITE_BASIC_PASSWORD || ""
const BASIC_USER = process.env.VITE_BASIC_USER || ""
const USER = process.env.VITE_USER || "zeus"
const PASS = process.env.VITE_PASS || "1234"
const CRYPTO_SECRET = process.env.VITE_CRYPTO_SECRET
    ? process.env.VITE_CRYPTO_SECRET
    : "22b1076fc42aee8ff4b1dbbc7cdb4f3b39d18232b520deb6fd6517ab60f9003b"
const CRYPTO_IV = process.env.VITE_CRYPTO_IV
    ? process.env.VITE_CRYPTO_IV
    : "ndi01tB/I4gYqTXfga+RLw=="
const API_AUTH_URL = process.env.VITE_AUTH_URL || ""
const API_URL = process.env.VITE_API_URL || ""

// Rate limiting configuration
const EMAIL_RATE_LIMIT_MAX = parseInt(
    process.env.VITE_EMAIL_RATE_LIMIT_MAX || "3"
)
const EMAIL_RATE_LIMIT_WINDOW_MINUTES = parseInt(
    process.env.VITE_EMAIL_RATE_LIMIT_WINDOW_MINUTES || "5"
)

//ADD CONST
const ENDPOINT_EMAIL =
    process.env.VITE_API_URL && process.env.VITE_ENDPOINT_EMAIL
        ? `${process.env.VITE_API_URL}${process.env.VITE_ENDPOINT_EMAIL}`
        : ""
const ENDPOINT_TEST_PRODUCT =
    process.env.VITE_API_URL && process.env.VITE_ENDPOINT_TEST_PRODUCT
        ? `${process.env.VITE_API_URL}${process.env.VITE_ENDPOINT_TEST_PRODUCT}`
        : ""

export const properties = {
    port: PORT,
    publicUrl: PUBLIC_URL,
    apiAuthUrl: API_AUTH_URL,
    secret: CRYPTO_SECRET,
    iv: CRYPTO_IV,
    login: {
        user: USER,
        pass: PASS
    },
    auth: {
        url: API_AUTH_URL,
        basicUser: BASIC_USER,
        basicPassword: BASIC_PASSWORD
    },
    sentry: {
        dsn: SENTRY_DSN,
        release: VERSION,
        environment: STAGE
    },
    api: {
        url: API_URL,
        endpoint: {
        //ADD ENDPOINT
        email: ENDPOINT_EMAIL,
        testProduct: ENDPOINT_TEST_PRODUCT
        }
    },
    logs: {
        level: process.env.LOG_LEVEL || "silly"
    },
    email: {
        rateLimitMax: EMAIL_RATE_LIMIT_MAX,
        rateLimitWindowMinutes: EMAIL_RATE_LIMIT_WINDOW_MINUTES
    }
}
