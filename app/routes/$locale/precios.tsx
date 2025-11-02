import { useLoaderData, useNavigation, useParams } from "react-router-dom"
import { getTranslations } from "~/i18n"
import { getPreciosData } from "~/services/precios.service"
import { SkeletonLoader } from "~/components"
import { 
    Banner, 
    ComparePlans, 
    FAQs, 
    PageEnd, 
    PageHero, 
    Plans 
} from "~/ui"
import { type PreciosData } from "~/types/Precios"

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
        return <SkeletonLoader />
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

export const meta = () => {
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)

    return [{ title: t("precios.preciosTitle") }]
}