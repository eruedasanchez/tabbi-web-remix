import { useEffect, useState } from "react"
import { useParams } from "react-router"
import { useWindowSize } from "~/hooks"
import { getTranslations } from "~/i18n"
import { createSwipeHandlers } from "~/utils"
import { useAboutData } from "./hooks/useAboutData"
import AboutCard from "./components/AboutCard"
import style from "./About.module.css"

const MOBILE_BREAKPOINT = 900

const About = () => {
    const [isMobile, setIsMobile] = useState(false)
    const [activeIndex, setActiveIndex] = useState(0)
    const { width } = useWindowSize()
    const AboutData = useAboutData()
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)

    useEffect(() => {
        if (width > 0) {
        setIsMobile(width < MOBILE_BREAKPOINT)
        }
    }, [width])

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % AboutData.length)
    }

    const handlePrev = () => {
        setActiveIndex((prev) => (prev === 0 ? AboutData.length - 1 : prev - 1))
    }

    const handleSwipe = createSwipeHandlers({
        onSwipeLeft: handleNext,
        onSwipeRight: handlePrev
    })

    return (
        <section className={style.about}>
        <article className={style.aboutHero}>
            <h3 className={style.title}>{t("home.uniqueFeaturesSection.title")}</h3>
            <p className={style.text}>
            {t("home.uniqueFeaturesSection.description")}
            </p>
        </article>

        <article className={style.aboutArticle}>
            <div className={style.aboutContainer}>
            {isMobile
                ? AboutData.map((item, idx) => (
                    <div
                    key={idx}
                    className={`${style.slide} ${
                        idx === activeIndex ? style.active : style.hidden
                    }`}
                    onTouchStart={handleSwipe.start}
                    onTouchEnd={handleSwipe.end}
                    >
                    <AboutCard
                        handleNext={handleNext}
                        handlePrev={handlePrev}
                        {...item}
                    />
                    </div>
                ))
                : AboutData.map((item, idx) => <AboutCard {...item} key={idx} />)}
            </div>
        </article>
        </section>
    )
}

export default About
