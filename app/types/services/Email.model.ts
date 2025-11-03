import type { ParamSearch } from "./BaseService.model"

interface TypedWithString<T> {
    [key: string]: T
}
interface EmailDTO //TODO Se modifica
    extends TypedWithString<string | boolean | number | Array<number>> {
    id: string

    // ListDTO
}

interface CompleteEmailDTO extends EmailDTO {
    asunto: string
}

type ArrayEmail = Array<EmailDTO>

interface EmailPayload {
    asunto: string
    detalle: string
    emailOrigen: string
    emailsDestino: string[]
}

interface EmailParamSearch extends ParamSearch<EmailParamSearch> {
    description?: string
}

export type {
    EmailDTO,
    ArrayEmail,
    EmailPayload,
    CompleteEmailDTO,
    EmailParamSearch
}