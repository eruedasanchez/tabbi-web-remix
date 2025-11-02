import { useParams } from "react-router"
import { BillingPeriod } from "../types"

const getEnvNumber = (key: string, fallback: number) => {
    const value = import.meta.env[key]
    return value !== undefined ? parseFloat(value) : fallback
}

const PRICES = {
    ar: {
        [BillingPeriod.MONTHLY]: {
        express: getEnvNumber("VITE_AR_MONTHLY_EXPRESS", 0),
        pro: getEnvNumber("VITE_AR_MONTHLY_PRO", 0),
        proMax: getEnvNumber("VITE_AR_MONTHLY_PROMAX", 0)
        },
        [BillingPeriod.SEMIANNUAL]: {
        express: getEnvNumber("VITE_AR_SEMIANNUAL_EXPRESS", 0),
        pro: getEnvNumber("VITE_AR_SEMIANNUAL_PRO", 0),
        proMax: getEnvNumber("VITE_AR_SEMIANNUAL_PROMAX", 0)
        },
        [BillingPeriod.ANNUAL]: {
        express: getEnvNumber("VITE_AR_ANNUAL_EXPRESS", 0),
        pro: getEnvNumber("VITE_AR_ANNUAL_PRO", 0),
        proMax: getEnvNumber("VITE_AR_ANNUAL_PROMAX", 0)
        }
    },
    es: {
        [BillingPeriod.MONTHLY]: {
        express: getEnvNumber("VITE_ES_MONTHLY_EXPRESS", 0),
        pro: getEnvNumber("VITE_ES_MONTHLY_PRO", 0),
        proMax: getEnvNumber("VITE_ES_MONTHLY_PROMAX", 0)
        },
        [BillingPeriod.SEMIANNUAL]: {
        express: getEnvNumber("VITE_ES_SEMIANNUAL_EXPRESS", 0),
        pro: getEnvNumber("VITE_ES_SEMIANNUAL_PRO", 0),
        proMax: getEnvNumber("VITE_ES_SEMIANNUAL_PROMAX", 0)
        },
        [BillingPeriod.ANNUAL]: {
        express: getEnvNumber("VITE_ES_ANNUAL_EXPRESS", 0),
        pro: getEnvNumber("VITE_ES_ANNUAL_PRO", 0),
        proMax: getEnvNumber("VITE_ES_ANNUAL_PROMAX", 0)
        }
    }
}

export const getRegionalPrices = () => {
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es'
    
    if (locale === "es") {
        return PRICES.es
    }

    return PRICES.ar
}
