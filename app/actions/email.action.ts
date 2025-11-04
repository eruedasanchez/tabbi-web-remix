import type { ActionFunctionArgs } from "react-router-dom"
import { AxiosError } from "axios"
import { json } from "@remix-run/node"
import { generarMailContacto, type FormData } from "~/ui/FormSection/hooks/useForm"
import { constantsENV } from "~/config/constants"
import type { EmailPayload } from "~/types/services/Email.model" 
import emailService from "~/services/email.service"

export type ActionResponse = {
    ok: boolean
    message?: string
    error?: string
}

export async function emailAction({ request }: ActionFunctionArgs): Promise<Response> {
    let rawData: any
    try {
        rawData = await request.json()
    } catch (error) {
        return json<ActionResponse>(
            { 
                ok: false, 
                error: "Datos del formulario inválidos o incompletos." 
            }, 
            { status: 400 }
        )
    }
    
    const formData: FormData = {
        firstName: rawData.firstName || '',
        lastName: rawData.lastName || '',
        areaCode: rawData.areaCode || '',
        phone: rawData.phone || '',
        email: rawData.email || '',
        businessName: rawData.businessName || '',
        city: rawData.city || '',
        comment: rawData.comment || ''
    }
    
    const requiredFields: Array<keyof FormData> = ['firstName', 'lastName', 'email', 'businessName']
    const missingFields = requiredFields.filter(field => !formData[field].trim())
    
    if (missingFields.length > 0) {
        return json<ActionResponse>({ 
            ok: false, 
            error: `Faltan campos requeridos: ${missingFields.join(', ')}` 
        }, { status: 400 })
    }
    
    const emailPayload: EmailPayload = generarMailContacto(formData, [
        constantsENV.EMAIL_DESTINATION 
    ])
    
    try {
        await emailService.post(emailPayload)
        
        return json<ActionResponse>({ ok: true, message: "Email enviado exitosamente." })
    } catch (error: unknown) {
        const axiosError = error as AxiosError<ActionResponse>
        const status = axiosError.response?.status || 500
        const errorMessage = axiosError.response?.data?.error || axiosError.message || "Error interno del servidor."
        
        return json<ActionResponse>(
            { 
                ok: false, 
                error: errorMessage
            }, 
            { status: status }
        )
    }
}