import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getTranslations } from "~/i18n"
import argFlag from "../assets/flag-ar.svg"
import espFlag from "../assets/flag-es.svg"

interface Language {
    code: string
    name: string
    flag: string
}

interface RouteItem {
    name: 
        | "home.name" 
        | "funcionalidades.name" 
        | "hardware.name" 
        | "precios.name"
    navOmit?: boolean
}

const LANGUAGES: Language[] = [
    { code: "ar", name: "AR", flag: argFlag },
    { code: "es", name: "ES", flag: espFlag }
]

const NAV_ROUTES: RouteItem[] = [
    { name: "home.name" }, 
    { name: "funcionalidades.name" }, 
    { name: "hardware.name" }, 
    { name: "precios.name" } 
]

const useHeader = () => {
    const [toggleNav, setToggleNav] = useState<boolean>(false)
    const [toggleLang, setToggleLang] = useState<boolean>(false)
    
    const navigate = useNavigate()
    const { locale: currentLocaleParam } = useParams()
    const locale = currentLocaleParam || 'es' 
    const { t } = getTranslations(locale)
    
    const handleLangChange = (newLocale: string) => {
        if (newLocale === locale) return
        
        setToggleNav(false)
        setToggleLang(false)

        const currentPath = window.location.pathname
        const currentSlugPath = currentPath.replace(`/${locale}`, "") || "/"
        let currentPageBaseKey = "home" 
        
        for (const route of NAV_ROUTES) {
            if (route.name === "home.name") continue;
            
            const baseKey = route.name.replace(/\.name$/, "") 
            const slugKey = `${baseKey}.path`
            const currentTranslatedSlug = t(slugKey) 
            
            if (currentSlugPath.startsWith(`/${currentTranslatedSlug}`)) {
                currentPageBaseKey = baseKey
                break
            }
        }
        
        let newPath = `/${newLocale}`
        
        if (currentPageBaseKey !== "home.name") {
            const tNew = getTranslations(newLocale)
            const newSlugKey = `${currentPageBaseKey}.path`
            const newTranslatedSlug = t(newSlugKey)

            newPath = `/${newLocale}/${newTranslatedSlug}`
        } else {
            newPath = `/${newLocale}/`
        }

        navigate(newPath)
    }
    
    const currentLang =
        LANGUAGES.find((lang) => lang.code === locale) || LANGUAGES[0]

    const values = {
        toggleNav,
        toggleLang
    }

    const setters = {
        setToggleNav,
        setToggleLang
    }

    return {
        ...values,
        ...setters,
        locale,
        routes: NAV_ROUTES,
        t,
        handleLangChange,
        currentLang,
        LANGUAGES
    }
}

export default useHeader
