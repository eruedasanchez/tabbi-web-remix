import { useParams } from "react-router"
import { getTranslations } from "~/i18n"
import { Card } from "~/components"
import verifactuSvg from "./assets/verifactu.svg"
import style from "./Banner.module.css"

const Banner = () => {
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)
    
    return (
        <article className={style.banner}>
            <Card className={style.card}>
                <img
                loading="lazy"
                alt="verifactu"
                draggable="false"
                src={verifactuSvg}
                className={style.logo}
                />
                <h2 className={style.text}>
                    <strong>{t("common.banner.strong")}</strong>
                    {t("common.banner.text")}
                </h2>
            </Card>
        </article>
    )
}

export default Banner
