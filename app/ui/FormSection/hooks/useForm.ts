import type { EmailPayload } from "~/types/services/Email.model"
import { useState, type ChangeEvent } from "react"

const ES_PREFIX = "+34"
const AR_PREFIX = "+54"

const getInitialState = (locale?: string) => ({
    firstName: "",
    lastName: "",
    areaCode: locale === "es" ? ES_PREFIX : AR_PREFIX,
    phone: "",
    email: "",
    businessName: "",
    city: "",
    comment: ""
})

export type FormData = ReturnType<typeof getInitialState>

export function generarMailContacto(
    data: FormData,
    destino: string[]
): EmailPayload {
    const asunto = `Nuevo contacto desde Tabbi - ${data.firstName} ${data.lastName} (${data.businessName})`

    const detalle = `
    <!DOCTYPE html>
    <html>
    <head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px; }
        .table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        .table td { padding: 10px; border-bottom: 1px solid #eee; }
        .table .label { font-weight: bold; background-color: #f8f9fa; width: 120px; }
        .comment-section { background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0; }
        .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
    </style>
    </head>
    <body>
    <div class="container">
        <div class="header">
        <h2>🎉 Nueva solicitud de contacto - Tabbi</h2>
        <p>Recibieron una nueva solicitud de contacto a través del formulario del sitio web.</p>
        </div>

        <table class="table">
        <tr>
            <td class="label">🧍 Nombre:</td>
            <td>${data.firstName} ${data.lastName}</td>
        </tr>
        <tr>
            <td class="label">🏢 Negocio:</td>
            <td>${data.businessName}</td>
        </tr>
        <tr>
            <td class="label">📍 Ciudad:</td>
            <td>${data.city}</td>
        </tr>
        <tr>
            <td class="label">📞 Teléfono:</td>
            <td>${data.areaCode} ${data.phone}</td>
        </tr>
        <tr>
            <td class="label">📧 Email:</td>
            <td><a href="mailto:${data.email}">${data.email}</a></td>
        </tr>
        </table>

        <div class="comment-section">
        <h3>📝 Comentario:</h3>
        <p>${data.comment}</p>
        </div>

        <div class="footer">
        <p><strong>Próximos pasos:</strong></p>
        <p>Por favor, contacten al usuario para brindarle más información sobre nuestros servicios.</p>
        <br>
        <p>Saludos,<br>
        <strong>El sistema de contacto de Tabbi</strong></p>
        </div>
    </div>
    </body>
    </html>`

    return {
        asunto,
        detalle,
        emailOrigen: data.email,
        emailsDestino: destino
    }
}

export const useForm = (locale?: string) => {
    const [data, setData] = useState<FormData>(getInitialState(locale))
    const [errors, setErrors] = useState<string[]>([])

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { id, value } = e.target

        setData((prev) => ({ ...prev, [id]: value }))
        setErrors((prev) => prev.filter((field) => field !== id))
    }

    const validate = (): boolean => {
        const missing: string[] = Object.entries(data)
        .filter(([_, value]) => !value.trim())
        .map(([key]) => key)

        setErrors(missing)
        return missing.length === 0
    }

    const hasError = (field: string) => errors.includes(field)
    
    const resetForm = () => {
        setData(getInitialState(locale))
        setErrors([])
    }

    const getErrorMessage = (data: any): string => {
        if (typeof data?.message === 'string') {
            return data.message
        }
        if (data?.statusText) {
            return data.statusText
        }
        return "Error desconocido"
    }

    return {
        data,
        errors,
        handleChange,
        validate,
        hasError,
        resetForm,
        getErrorMessage
    }
}
