import { useLoaderData, useNavigation, useParams } from "react-router-dom"
import { getTranslations } from "~/i18n"
import { getPreciosData } from "~/services/precios.service"
import { DefaultLoader } from "~/components/SkeletonLoader/components"
import { 
    Banner, 
    ComparePlans, 
    FAQs, 
    PageEnd, 
    PageHero, 
    Plans 
} from "~/ui"
import { type PreciosData } from "~/types/Precios"
import type { LoaderFunctionArgs } from "@remix-run/node"

import banner from "../../assets/precios/banner.jpg"
import style from "./styles/precios.module.css"

export async function loader() {
    const data = await getPreciosData()
    return data
}

const Precios = () => {
    const navigation = useNavigation()
    const data = useLoaderData() as PreciosData
    const { tagline, plans } = data

    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)

    const scrollToComparePlans = () => {
        const section = document.getElementById("compare-plans")

        if (section) {
        section.scrollIntoView({ behavior: "smooth" })
        }
    }

    if (navigation.state === "loading") {
        return <DefaultLoader /> 
    }
    
    return (
        <main className={style.pricePage}>
        <div className={style.priceHero}>
            <PageHero
            children={banner}
            text={t("precios.home.text")}
            cto={t("precios.home.button")}
            title={t("precios.home.title")}
            buttonFunction={scrollToComparePlans}
            />
            {locale === "es" && <Banner />}
            <Plans />
        </div>
        <ComparePlans />
        <FAQs />
        <PageEnd
            text={t("precios.endBanner.text")}
            cta={t("precios.endBanner.button")}
        />
        </main>
    )
}

export default Precios

export const meta = (context: LoaderFunctionArgs) => {
    const { params } = context
    const { locale: currentLocale } = params
    
    const locale = currentLocale || 'es'
    const { t } = getTranslations(locale)
    
    const pageTitle = t("precios.title")
    const pageDescription = t("precios.metaDescription") 
    
    const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL || 'https://tabbi-web-remix-7bfo.vercel.app'
    
    const canonicalUrl = `${BASE_URL}/${locale}/precios`
    const pageImage = `${BASE_URL}/favicon.svg`
    
    return [
        { title: pageTitle },
        { name: "description", content: pageDescription },
        { tagName: "link", rel: "canonical", href: canonicalUrl },
        { property: "og:title", content: pageTitle },
        { property: "og:type", content: "article" }, 
        { property: "og:url", content: canonicalUrl },
        { property: "og:description", content: pageDescription },
        { property: "og:image", content: pageImage },
        { property: "og:locale", content: locale },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@eruedasanchez" },
        { name: "twitter:title", content: pageTitle },
        { name: "twitter:description", content: pageDescription },
        { name: "twitter:image", content: pageImage }
    ]
}