import { useParams, useNavigation } from "react-router-dom"
import { getTranslations } from "~/i18n"
import { Button } from "~/components"
import { PageHero, Banner, PageSection, About, Integrations, PageEnd } from "~/ui"
import type { LoaderFunctionArgs } from "@remix-run/node"
import { DefaultLoader } from "~/components/SkeletonLoader/components"

import productAsset from "../../assets/home/product.webp"
import homeAsset from "../../assets/home/home.webp"
import style from "./styles/home.module.css"

const Home = () => {
    const navigation = useNavigation()
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)
    
    const scrollToFormSection = () => {
        const seccion = document.getElementById("form-section")
        if (seccion) {
            seccion.scrollIntoView({ behavior: "smooth" })
        }
    }

    if (navigation.state === "loading") {
        return <DefaultLoader />
    }
    
    return (
        <main className={style.homeContainer}>
            <div className={style.homeBg}>
                <PageHero
                    children={homeAsset}
                    className={style.homeHero}
                    title={t("home.homeSection.home.title")}
                    cto={t("home.homeSection.home.button")}
                />
                {locale === "es" && <Banner />}
                <PageSection img={productAsset} className={style.productSection}>
                    <h3>{t("home.homeSection.product.title")}</h3>
                    <p>{t("home.homeSection.product.description")}</p>
                    <Button
                        value={t("home.homeSection.product.button")}
                        onClick={() => scrollToFormSection()}
                    />
                </PageSection>
            </div>
            <About />
            <Integrations />
            <PageEnd
                className={style.endBanner}
                text={t("home.endBanner.text")}
                cta={t("home.endBanner.button")}
            />
        </main>
    )
}

export default Home

export const meta = (context: LoaderFunctionArgs) => {
    const { params } = context
    const { locale: currentLocale } = params
    
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)
    
    const pageTitle = t("home.title")
    const pageDescription = t("home.metaDescription")
    
    const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL || 'https://tabbi-web-remix-7bfo.vercel.app'
    const canonicalUrl = `${BASE_URL}/${locale}/`
    const pageImage = `${BASE_URL}/favicon.svg`
    
    return [
        { title: pageTitle },
        { name: "description", content: pageDescription },
        { tagName: "link", rel: "canonical", href: canonicalUrl },
        { property: "og:title", content: pageTitle },
        { property: "og:type", content: "website" },
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
