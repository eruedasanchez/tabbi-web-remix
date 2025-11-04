import { useEffect, type FormEvent } from "react"
import { useParams, useFetcher } from "react-router-dom"
import { generarMailContacto, useForm } from "./hooks/useForm"
import { getTranslations } from "~/i18n"
import { constantsENV } from "~/config/constants"
import style from "./FormSection.module.css"

const FormSection = () => {
    const fetcher = useFetcher()
    const isSubmitting = fetcher.state !== "idle"
    const submissionData = fetcher.data as { ok?: boolean, error?: string, message?: string} | undefined
    
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)
    
    const {
        data,
        errors,
        hasError,
        handleChange,
        validate,
        resetForm,
        getErrorMessage
    } = useForm(locale)

    useEffect(() => {
        if (fetcher.state === "idle" && submissionData) {
            if (submissionData.ok) {
                resetForm()
            }
        }
    }, [
        fetcher.state, 
        submissionData, 
        resetForm
    ])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        if (validate()) {
            const emailPayload = generarMailContacto(data, [
                constantsENV.EMAIL_DESTINATION
            ])
            
            fetcher.submit(emailPayload as any, {
                method: "POST",
                action: "."
            })
        }
    }

    const isSending = isSubmitting
    const isSuccess = fetcher.state === "idle" && submissionData?.ok
    const isError = fetcher.state === "idle" && !submissionData?.ok && submissionData?.error 

    let displayedError = ""
    if (isError) {
        const errMsg = submissionData?.error || getErrorMessage(submissionData)
        const rateLimitMessage = "Has enviado demasiados emails. Espera 5 minutos antes de intentar nuevamente"
        
        if (errMsg.includes("429") || errMsg.includes("Demasiadas solicitudes")) {
            displayedError = rateLimitMessage
            
        } else {
            displayedError = `Error al enviar el mail: ${errMsg}`
        }
    }
    
    return (
        <section className={style.formSection} id="form-section">
        <form className={style.form} onSubmit={handleSubmit}>
            <h3 className={style.title}>
            {t("common.form.title")} sobre tu negocio o idea.
            </h3>

            <div className={style.row}>
            <div className={style.inputGroup}>
                <label htmlFor="firstName">Nombre</label>
                <input
                type="text"
                id="firstName"
                placeholder={`${t("common.input")} tu nombre`}
                value={data.firstName}
                onChange={handleChange}
                className={hasError("firstName") ? style.errorInput : ""}
                />
            </div>
            <div className={style.inputGroup}>
                <label htmlFor="lastName">Apellido</label>
                <input
                type="text"
                id="lastName"
                placeholder={`${t("common.input")} tu apellido`}
                value={data.lastName}
                onChange={handleChange}
                className={hasError("lastName") ? style.errorInput : ""}
                />
            </div>
            </div>

            <div className={style.row}>
            <div className={`${style.inputGroup} ${style.areaCodeGroup}`}>
                <label htmlFor="areaCode">Código de área</label>
                <input
                type="text"
                id="areaCode"
                placeholder="Ej: +54"
                value={data.areaCode}
                onChange={handleChange}
                className={hasError("areaCode") ? style.errorInput : ""}
                />
            </div>
            <div className={style.inputGroup}>
                <label htmlFor="phone">Teléfono</label>
                <input
                type="number"
                id="phone"
                placeholder="Ejemplo: 9 11 2456 3848"
                value={data.phone}
                onChange={handleChange}
                className={hasError("phone") ? style.errorInput : ""}
                />
            </div>
            </div>

            <div className={style.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
                type="email"
                id="email"
                placeholder={`${t("common.input")} tu email`}
                value={data.email}
                onChange={handleChange}
                className={hasError("email") ? style.errorInput : ""}
            />
            </div>

            <div className={style.inputGroup}>
            <label htmlFor="businessName">Nombre del negocio</label>
            <input
                type="text"
                id="businessName"
                placeholder={`${t("common.input")} el nombre de tu negocio`}
                value={data.businessName}
                onChange={handleChange}
                className={hasError("businessName") ? style.errorInput : ""}
            />
            </div>

            <div className={style.inputGroup}>
            <label htmlFor="city">Ciudad</label>
            <input
                type="text"
                id="city"
                placeholder={`${t("common.input")} el nombre de la ciudad donde está el negocio`}
                value={data.city}
                onChange={handleChange}
                className={hasError("city") ? style.errorInput : ""}
            />
            </div>

            <div className={style.inputGroup}>
            <label htmlFor="comment">Comentario</label>
            <textarea
                id="comment"
                placeholder={`${t("common.input")} un comentario`}
                rows={3}
                value={data.comment}
                onChange={handleChange}
                className={hasError("comment") ? style.errorInput : ""}
            />
            </div>

            <button type="submit" disabled={isSending}>
            {isSending ? "Enviando..." : "Enviar"}
            </button>

            {errors.length > 0 ? (
            <p className={style.formError}>(!) Todos los campos son requeridos</p>
            ) : isSuccess ? (
            <p className={style.formSuccess}>¡Email enviado exitosamente!</p>
            ) : isError ? (
            <p className={style.formError}>
                {displayedError}
            </p>
            ) : null}
        </form>
        </section>
    )
}

export default FormSection
