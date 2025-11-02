import React from "react"
import { useParams } from "react-router"
import { getTranslations } from "~/i18n"
import { boxIcon, checkIcon, notIcon } from "./assets"
import { PLANS, SECTIONS } from "./utils"
import style from "./ComparePlans.module.css"

const ComparePlans = () => {
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)
    
    return (
        <section className={style.comparePlansSection} id="compare-plans">
            <header>
                <h4 className={style.captionTitle}>Comparativa de planes</h4>
                <h3 className={style.title}>{t("precios.comparative.title")}</h3>
                <p className={style.description}>{t("precios.comparative.text")}</p>
            </header>
            <table className={style.compareTable}>
                <thead>
                    <tr>
                        <th>Comparación de planes</th>
                        {PLANS.map((plan, index) => (
                        <th key={index} className={style.planHeader}>
                            <img src={boxIcon} alt="" aria-hidden />
                            <div className={style.planTitle}>{plan.title}</div>
                            <div className={style.planSubtitle}>{plan.subtitle}</div>
                        </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {SECTIONS.map((section, index) => (
                        <React.Fragment key={index}>
                        <tr>
                            <td className={style.sectionTitle}>{section.name}</td>
                            <td colSpan={3} />
                        </tr>

                        {section.items.map((item, idx) => (
                            <tr key={idx}>
                            <td>{item.label}</td>
                            {item.values.map((val, index) => (
                                <td key={index} className={style.checkCell}>
                                {typeof val === "boolean" ? (
                                    <img
                                    src={val ? checkIcon : notIcon}
                                    alt=""
                                    aria-hidden
                                    />
                                ) : (
                                    <span>{val}</span>
                                )}
                                </td>
                            ))}
                            </tr>
                        ))}
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </section>
    )
}

export default ComparePlans
