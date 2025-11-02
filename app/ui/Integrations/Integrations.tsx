import { useParams } from "react-router-dom"
import { getTranslations } from "~/i18n"
import { IntegrationsAssetsAR, IntegrationsAssetsES } from "./assets"
import style from "./Integrations.module.css"

const Integrations = () => {
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)
    
    const integrations =
        locale === "ar" ? IntegrationsAssetsAR : IntegrationsAssetsES
    
    return (
        <section className={style.integrations}>
            <article className={style.container}>
                <div className={style.integrationsHero}>
                    <h2 className={style.title}>{t("home.integrationsSection.title")}</h2>
                    <p className={style.text}>
                        {t("home.integrationsSection.description")}
                    </p>
                </div>
                <div className={style.content}>
                    {Object.keys(integrations).map((integrationKey) => (
                        <div key={integrationKey} className={style.logoContainer}>
                            <img
                                loading="lazy"
                                draggable={false}
                                className={style.logo}
                                src={integrations[integrationKey]}
                                alt={integrationKey}
                            />
                        </div>
                    ))}
                </div>
            </article>
        </section>
    )
}

export default Integrations
