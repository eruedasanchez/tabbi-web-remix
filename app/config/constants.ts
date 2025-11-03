export const constantsENV = {
    API_BASE_URL: import.meta.env.VITE_EXPRESS || "/api",
    SENTRY: {
        dsn: import.meta.env.VITE_SENTRY_DSN || "",
        release: import.meta.env.VITE_VERSION || "0.0.0",
        environment: import.meta.env.VITE_STAGE || "testing"
    },
    ENDPOINT: {
        email: import.meta.env.VITE_ENDPOINT_EXPRESS_EMAIL || "email"
        // ADD CONSTANTS
    },
    EMAIL_DESTINATION: import.meta.env.VITE_EMAIL_DESTINATION || ""
}