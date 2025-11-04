import { PageEnd, PageHero, PageSection } from "~/ui"
import { getTranslations } from "~/i18n"
import { DefaultLoader } from "~/components/SkeletonLoader/components"
import { type LoaderFunctionArgs } from "@remix-run/node"
import functionalitiesAssets from "~/assets/funcionalidades"
import useFuncionalidades from "~/hooks/funcionalidades/useFuncionalidades"
import style from "./styles/funcionalidades.module.css"

const Funcionalidades = () => {
    const { 
        isNavigating, 
        goToHardwarePage, 
        sections, 
        t 
    } = useFuncionalidades()
    
    if (isNavigating) {
        return <DefaultLoader />
    }
    
    return (
        <main className={style.funcionalityContainer}>
            <PageHero
                children={functionalitiesAssets.pic1}
                className={style.functionalityHero}
                text={t("funcionalidades.home.text")}
                cto={t("funcionalidades.home.button")}
                title={t("funcionalidades.home.title")}
                buttonFunction={goToHardwarePage}
            />
            {sections.map((section) => (
                <PageSection 
                    key={section.id} 
                    img={section.img} 
                    rowReverse={section.rowReverse}
                    className={style[section.className] || section.className} 
                >
                    <h3>
                        <strong>{section.titleStrong}</strong>{" "}
                        {section.titleRest}
                    </h3>
                    <p>{section.description}</p>
                    <ul>
                        {section.listItems.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                </PageSection>
            ))}
            
            <PageEnd
                className={style.endBanner}
                text={t("funcionalidades.endBanner.text")}
                cta={t("funcionalidades.endBanner.button")}
            />
        </main>
    )
}

export default Funcionalidades

export const meta = (context: LoaderFunctionArgs) => {
    const { params } = context
    const { locale: currentLocale } = params
    
    const locale = currentLocale || 'es'
    const { t } = getTranslations(locale)

    const pageTitle = t("funcionalidades.title")
    const pageDescription = t("funcionalidades.metaDescription")
    
    const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL || 'https://tabbi-web-remix-7bfo.vercel.app'
    const canonicalUrl = `${BASE_URL}/${locale}/funcionalidades`
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
