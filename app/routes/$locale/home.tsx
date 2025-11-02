import { useParams, useLoaderData, useNavigation } from "react-router-dom"
import { getHomeData } from "~/services/home.service"
import { getTranslations } from "~/i18n"
import { Button, SkeletonLoader } from "~/components"
import { PageHero, Banner, PageSection, About, Integrations, PageEnd } from "~/ui"
import type { HomeData } from "~/types/Home"

import productAsset from "../../assets/home/product.webp"
import homeAsset from "../../assets/home/home.webp"
import style from "./styles/home.module.css"

export async function loader() {
    const data = await getHomeData()
    return data
}

const Home = () => {
    const navigation = useNavigation()
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)
    
    const data = useLoaderData() as HomeData
    
    if (navigation.state === "loading") {
        return <SkeletonLoader variant="home" />
    }

    const scrollToFormSection = () => {
        const seccion = document.getElementById("form-section")
        if (seccion) {
        seccion.scrollIntoView({ behavior: "smooth" })
        }
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

export const meta = () => {
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)
    
    return [{ title: t("home.homeTitle") }]
}
