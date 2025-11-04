import * as Sentry from "@sentry/node"
import { properties } from "./constants.js"

Sentry.init({
    dsn: properties.sentry.dsn,
    environment: properties.sentry.environment,
    tracesSampleRate: 1.0
})

export default Sentry
