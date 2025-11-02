import * as esCommon from "~/i18n/locales/es/common"
import * as esError from "~/i18n/locales/es/error"
import * as esFaqs from "~/i18n/locales/es/faqs"
import * as esFuncionalidades from "~/i18n/locales/es/funcionalidades"
import * as esHome from "~/i18n/locales/es/home"
import * as esHardware from "~/i18n/locales/es/hardware"
import * as esPrecios from "~/i18n/locales/es/precios"

import * as arCommon from "~/i18n/locales/ar/common"
import * as arError from "~/i18n/locales/ar/error"
import * as arFaqs from "~/i18n/locales/ar/faqs"
import * as arFuncionalidades from "~/i18n/locales/ar/funcionalidades"
import * as arHome from "~/i18n/locales/ar/home"
import * as arHardware from "~/i18n/locales/ar/hardware"
import * as arPrecios from "~/i18n/locales/ar/precios"

export type TFunction = <T = string>(key: string) => T

export type Translations = {
    common: typeof esCommon.common
    error: typeof esError.error
    faqs: typeof arFaqs.faqs
    funcionalidades: typeof esFuncionalidades.funcionalidades
    home: typeof esHome.home
    hardware: typeof esHardware.hardware
    precios: typeof esPrecios.precios
    t: TFunction
}

const translations: Record<string, Omit<Translations, 't'>> = {
    es: {
        common: esCommon.common,
        error: esError.error,
        faqs: esFaqs.faqs,
        funcionalidades: esFuncionalidades.funcionalidades,
        home: esHome.home,
        hardware: esHardware.hardware,
        precios: esPrecios.precios,
    },
    ar: {
        common: arCommon.common,
        error: arError.error,
        faqs: arFaqs.faqs,
        funcionalidades: arFuncionalidades.funcionalidades,
        home: arHome.home,
        hardware: arHardware.hardware,
        precios: arPrecios.precios
    }
}

const defaultLocale = 'es'

export function translateKey(resource: any, key: string): unknown {
    const parts = key.split('.')
    let current = resource
    
    for (const part of parts) {
        if (current && current[part] !== undefined) {
        current = current[part]
        } else {
        return key 
        }
    }
    
    if (typeof current === 'object' && current !== null) {
        return current
    }
    
    return String(current)
}


export function getTranslations(locale: string | undefined): Translations {
  const code = locale as keyof typeof translations
  let currentTranslations = translations[defaultLocale]
  
  if (code && translations[code]) {
    currentTranslations = translations[code]
  }
  
  const tFunction: TFunction = (key: string) => {
    return translateKey(currentTranslations, key) as any
  }
  
  return {
    ...currentTranslations,
    t: tFunction
  } as Translations 
}
