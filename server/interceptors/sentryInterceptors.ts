import { AxiosError, type AxiosResponse } from "axios"
import * as Sentry from "@sentry/node"
import { ERROR_REPORT } from "server/utils"

export const sentryInterceptor = {
    onResponse: (response: AxiosResponse) => response,

    onError: (error: AxiosError) => {
        if (error.config?.headers[ERROR_REPORT.headerName] !== ERROR_REPORT.true) {
        return Promise.reject(error)
        }
        if (!error.response) {
        Sentry.captureException(error, {
            tags: { type: "Network Error" },
            extra: {
            message: error.message,
            url: error.config?.url,
            method: error.config?.method
            }
        })
        } else if ([400, 404, 500].includes(error.response.status)) {
        Sentry.captureException(error, {
            tags: { type: "Backend Axios Error" },
            extra: {
            url: error.config?.url,
            method: error.config?.method,
            status: error.response?.status,
            headers: error.config?.headers,
            responseData: error.response?.data,
            requestData: error.config?.data,
            errorMessage: error.message,
            stack: error.stack
            }
        })
        }

        return Promise.reject(error)
    }
}