import { properties } from "server/config/constants.js"

export const basicAuth = Buffer.from(
    `${properties.auth.basicUser}:${properties.auth.basicPassword}`
).toString("base64")