import axios from "axios"
import { constantsENV } from "~/config/constants"
import type { EmailPayload } from "~/types/services/Email.model"

const API_BASE = constantsENV.API_BASE_URL
const EMAIL_ENDPOINT = constantsENV.ENDPOINT?.email

const VITE_EXPRESS_EMAIL_ENDPOINT = 
    (API_BASE && EMAIL_ENDPOINT) 
        ? `${API_BASE}/${EMAIL_ENDPOINT}` 
        : '/api/email'
        
const emailService = {
    post: async (payload: EmailPayload) => {
        const response = await axios.post(VITE_EXPRESS_EMAIL_ENDPOINT, payload, {
            headers: { 
                'Content-Type': 'application/json'
            },
            timeout: 10000 
        })
        return response
    }
}

export default emailService