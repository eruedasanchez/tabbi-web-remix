import { createCipheriv, createDecipheriv } from "crypto"
import type { NextFunction, Request, Response } from "express"
import { properties } from "../config/constants.js"
import logger from "../loaders/logger.js"

export function encrypt(text: string) {
    const cipher = createCipheriv(
        "aes-256-cbc",
        Buffer.from(properties.secret, "hex"),
        Buffer.from(properties.iv, "base64")
    )
    let encrypted = cipher.update(text)

    encrypted = Buffer.concat([encrypted, cipher.final()])
    return encrypted.toString("hex")
}

export function decrypt(text: string) {
    if (!text) {
        throw Error(
        "Hubo un error en el método de desencriptación con el input: " + text
        )
    }

    const encryptedText = Buffer.from(text, "hex")
    const decipher = createDecipheriv(
        "aes-256-cbc",
        Buffer.from(properties.secret, "hex"),
        Buffer.from(properties.iv, "base64")
    )

    let decrypted = decipher.update(encryptedText)

    decrypted = Buffer.concat([decrypted, decipher.final()])
    return decrypted.toString()
}

export const authorizationDecrypter = (
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    const authorization = req.cookies.access_token

    if (!authorization) {
        logger.error("401 - Authorization cookies is missing - " + req.url)
        res.status(401).json({ error: "Authorization cookies is missing" })
        return
    }

    try {
        const decrypted = decrypt(authorization)

        req.cookies.access_token = decrypted
        next()
    } catch (_error) {
        logger.error(
        "500 - Error on auth middleware decryption with input: " + authorization
        )
        res.status(500).json({
        error:
            "Unable to decrypt authorization cookies. Error in input: " +
            authorization
        })
        return
    }
}