import { type AxiosResponse } from "axios"
import { type NextFunction, type Request } from "express"
import logger from "../loaders/logger.js"
import clientAxiosInstance from "../utils/clientApi.js"
import { getClientToken } from "../helpers/getClientToken.js"

export const emailService = async (req: Request, next: NextFunction) => {
    const token = await getClientToken()
    const { body } = req
    
    try {
        const fullPath = req.url.replace(/\/$/, "")
        
        const config = {
        method: req.method, 
        url: fullPath, 
        headers: {
            accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            src: "emailService"
        },
        data: body
        }
        
        logger.info(JSON.stringify(config))
        
        const response = await clientAxiosInstance(config)
        
        return response
    } catch (e) {
        req.headers.src = "emailService" 
        return next(e as unknown as AxiosResponse)
    }
}

export default emailService