import { useLoaderData, useNavigation, useNavigate, useParams } from "react-router-dom"
import { getFuncionalidadesData } from "~/services/funcionalidades.service"
import { PageEnd, PageHero, PageSection } from "~/ui"
import { getTranslations } from "~/i18n"
import { SkeletonLoader } from "~/components"
import type { FuncionalidadesData } from "~/types/Funcionalidades"
import type { LoaderFunctionArgs } from "@remix-run/node"

import pic1 from "../../assets/funcionalidades/pic1.webp"
import pic2 from "../../assets/funcionalidades/pic2.webp"
import pic3 from "../../assets/funcionalidades/pic3.webp"
import pic4 from "../../assets/funcionalidades/pic4.webp"
import pic5 from "../../assets/funcionalidades/pic5.webp"
import pic6 from "../../assets/funcionalidades/pic6.webp"
import pic7 from "../../assets/funcionalidades/pic7.webp"
import style from "./styles/funcionalidades.module.css"

export async function loader() {
    const data = await getFuncionalidadesData() 
    return data
}

const Funcionalidades = () => {
    const data = useLoaderData() as FuncionalidadesData
    const navigation = useNavigation()
    const navigate = useNavigate()
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)

    if (navigation.state === "loading") {
        return <SkeletonLoader variant="funcionalidades" />
    }
    
    const goToHardwarePage = () => {
        navigate(`/${locale}/hardware`, { replace: false })
    }
    
    return (
        <main className={style.funcionalityContainer}>
        <PageHero
            children={pic1}
            className={style.functionalityHero}
            text={t("funcionalidades.home.text")}
            cto={t("funcionalidades.home.button")}
            title={t("funcionalidades.home.title")}
            buttonFunction={goToHardwarePage}
        />
        <PageSection img={pic2} className={`${style.sectionRow}`}>
            <h3>
            <strong>{t("funcionalidades.sections.sell.titleStrong")}</strong>{" "}
            {t("funcionalidades.sections.sell.titleRest")}
            </h3>
            <p>{t("funcionalidades.sections.sell.description")}</p>
            <ul>
            <li>{t("funcionalidades.sections.sell.listOne")}</li>
            <li>{t("funcionalidades.sections.sell.listTwo")}</li>
            <li>{t("funcionalidades.sections.sell.listThree")}</li>
            </ul>
        </PageSection>
        <PageSection
            img={pic3}
            rowReverse
            className={`${style.sectionRowReverse}`}
        >
            <h3>
            <strong>{t("funcionalidades.sections.table.titleStrong")}</strong>{" "}
            {t("funcionalidades.sections.table.titleRest")}
            </h3>
            <p>{t("funcionalidades.sections.table.description")}</p>
            <ul>
            <li>{t("funcionalidades.sections.table.listOne")}</li>
            <li>{t("funcionalidades.sections.table.listTwo")}</li>
            <li>{t("funcionalidades.sections.table.listThree")}</li>
            </ul>
        </PageSection>
        <PageSection img={pic4} className={`${style.sectionRow}`}>
            <h3>
            <strong>
                {t("funcionalidades.sections.integrations.titleStrong")}
            </strong>{" "}
            {t("funcionalidades.sections.integrations.titleRest")}
            </h3>
            <p>{t("funcionalidades.sections.integrations.description")}</p>
            <ul>
            <li>{t("funcionalidades.sections.integrations.listOne")}</li>
            <li>{t("funcionalidades.sections.integrations.listTwo")}</li>
            <li>{t("funcionalidades.sections.integrations.listThree")}</li>
            </ul>
        </PageSection>
        <PageSection
            img={pic5}
            rowReverse
            className={`${style.sectionRowReverse}`}
        >
            <h3>
            <strong>{t("funcionalidades.sections.customers.titleStrong")}</strong>{" "}
            {t("funcionalidades.sections.customers.titleRest")}
            </h3>
            <p>{t("funcionalidades.sections.customers.description")}</p>
            <ul>
            <li>{t("funcionalidades.sections.customers.listOne")}</li>
            <li>{t("funcionalidades.sections.customers.listTwo")}</li>
            <li>{t("funcionalidades.sections.customers.listThree")}</li>
            </ul>
        </PageSection>
        <PageSection img={pic6} className={`${style.sectionRow}`}>
            <h3>
            <strong>{t("funcionalidades.sections.plans.titleStrong")}</strong>{" "}
            {t("funcionalidades.sections.plans.titleRest")}
            </h3>
            <p>{t("funcionalidades.sections.plans.description")}</p>
            <ul>
            <li>{t("funcionalidades.sections.plans.listOne")}</li>
            <li>{t("funcionalidades.sections.plans.listTwo")}</li>
            <li>{t("funcionalidades.sections.plans.listThree")}</li>
            </ul>
        </PageSection>
        <PageSection
            img={pic7}
            rowReverse
            className={`${style.sectionRowReverse}`}
        >
            <h3>
            <strong>{t("funcionalidades.sections.management.titleStrong")}</strong>
            {t("funcionalidades.sections.management.titleRest")}
            </h3>
            <p>
            {t("funcionalidades.sections.management.description")}
            </p>
            <ul>
            <li>{t("funcionalidades.sections.management.listOne")}</li>
            <li>{t("funcionalidades.sections.management.listTwo")}</li>
            <li>{t("funcionalidades.sections.management.listThree")}</li>
            </ul>
        </PageSection>
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
    
    const BASE_URL = process.env.PUBLIC_BASE_URL || 'https://tu-dominio-produccion.com'
    const canonicalUrl = `${BASE_URL}/${locale}/funcionalidades`
    const pageImage = `${BASE_URL}/assets/images/social-preview.jpg`
    
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
