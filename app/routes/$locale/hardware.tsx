import { useEffect, useState } from "react"
import { useLoaderData, useNavigation, useParams } from "react-router-dom"
import { useWindowSize } from "~/hooks"
import { getTranslations } from "~/i18n"
import { getHardwareData } from "~/services/hardware.service"
import { Button } from "~/components"
import { DefaultLoader } from "~/components/SkeletonLoader/components"
import { createSwipeHandlers } from "~/utils"
import { DeviceCard, DevicesSection, PageEnd, PageHero, PageSection } from "~/ui"
import { Devices, DevicesAR, DevicesES, type DevicesDTO } from "~/data/data"
import { type HardwareData } from "~/types/Hardware"
import type { LoaderFunctionArgs } from "@remix-run/node"

import Assets from "~/assets/hardware"
import style from "./styles/hardware.module.css"

const MOBILE_BREAKPOINT = 900

export async function loader() {
    const data = await getHardwareData()
    return data
}

const Hardware = () => {
    const [activeIndexAccessories, setActiveIndexAccessories] = useState(0)
    const [activeIndexPaid, setActiveIndexPaid] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    
    const navigation = useNavigation()
    const data = useLoaderData() as HardwareData
    const { width } = useWindowSize()

    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)
    
    const DevicesPaid = locale === "es" ? DevicesES : DevicesAR

    const scrollToFormSection = () => {
        const seccion = document.getElementById("terminals")
        if (seccion) {
        seccion.scrollIntoView({ behavior: "smooth" })
        }
    }

    useEffect(() => {
        if (width > 0) {
            setIsMobile(width < MOBILE_BREAKPOINT)
        }
        }, [width])
        
    
    const handleNext = (
        setter: React.Dispatch<React.SetStateAction<number>>,
        arrLength: number
    ) => {
        setter((prev) => (prev + 1) % arrLength)
    }

    const handlePrev = (
        setter: React.Dispatch<React.SetStateAction<number>>,
        arrLength: number
    ) => {
        setter((prev) => (prev === 0 ? arrLength - 1 : prev - 1))
    }

    const renderSlider = (
        items: Array<DevicesDTO>,
        activeIndex: number,
        setActiveIndex: React.Dispatch<React.SetStateAction<number>>
    ) => {
        const multiple = items.length > 1

        const handleSwipe = createSwipeHandlers({
        onSwipeLeft: () => handlePrev(setActiveIndex, items.length),
        onSwipeRight: () => handleNext(setActiveIndex, items.length)
        })

        if (!isMobile || !multiple) {
        return items.map((item, idx) => (
            <DeviceCard key={idx} {...item} className={style.deviceCard} />
        ))
        }

        return (
        <>
            {items.map((item, idx) => (
            <div
                key={idx}
                className={`${style.slide} ${
                idx === activeIndex ? style.active : style.hidden
                }`}
                onTouchStart={handleSwipe.start}
                onTouchEnd={handleSwipe.end}
            >
                <DeviceCard {...item} className={style.deviceCard} />
            </div>
            ))}

            <div className={style.buttons}>
            <Button
                className={`${style.btn} ${style.buttonLeft}`}
                onClick={() => handlePrev(setActiveIndex, items.length)}
            />
            <Button
                className={`${style.btn} ${style.buttonRight}`}
                onClick={() => handleNext(setActiveIndex, items.length)}
            />
            </div>
        </>
        )
    }

    if (navigation.state === "loading") {
        return <DefaultLoader />
    }

    return (
        <main className={style.hardwareContainer}>
        <PageHero
            children={Assets.totem}
            className={style.pageHero}
            title={t("hardware.home.title")}
            text={t("hardware.home.text")}
            cto={t("hardware.home.button")}
            buttonFunction={scrollToFormSection}
        />
        <section className={style.pageBanner}>
            <article className={style.container}>
            <h2 className={style.title}>{t("hardware.pageBanner.title")}</h2>
            <p className={style.text}>{t("hardware.pageBanner.text")}</p>
            </article>
        </section>
        <PageSection
            alt
            rowReverse
            id="terminals"
            img={Assets.pic1}
            className={style.pageSection}
        >
            <div>
            <strong>{t("hardware.section.c20.strong")}</strong>
            <h3>{t("hardware.section.c20.title")}</h3>
            </div>
            <p>{t("hardware.section.c20.description")}</p>
            <ul>
            <li>{t("hardware.section.c20.list.first")}</li>
            <li>{t("hardware.section.c20.list.second")}</li>
            <li>{t("hardware.section.c20.list.third")}</li>
            <li>{t("hardware.section.c20.list.fourth")}</li>
            <li>{t("hardware.section.c20.list.fifth")}</li>
            <li>{t("hardware.section.c20.list.sixth")}</li>
            </ul>
        </PageSection>
        <PageSection alt img={Assets.pic3} className={style.pageSection}>
            <div>
            <strong>{t("hardware.section.p30.strong")}</strong>
            <h3>{t("hardware.section.p30.title")}</h3>
            </div>
            <p>{t("hardware.section.p30.description")}</p>
            <ul>
            <li>{t("hardware.section.p30.list.first")}</li>
            <li>{t("hardware.section.p30.list.second")}</li>
            <li>{t("hardware.section.p30.list.third")}</li>
            <li>{t("hardware.section.p30.list.fourth")}</li>
            <li>{t("hardware.section.p30.list.fifth")}</li>
            </ul>
        </PageSection>
        <PageSection
            alt
            rowReverse
            img={Assets.pic2}
            className={style.pageSection}
        >
            <div>
            <strong>{t("hardware.section.d2s.strong")}</strong>
            <h3>{t("hardware.section.d2s.title")}</h3>
            </div>
            <p>{t("hardware.section.d2s.description")}</p>
            <ul>
            <li>{t("hardware.section.d2s.list.first")}</li>
            <li>{t("hardware.section.d2s.list.second")}</li>
            <li>{t("hardware.section.d2s.list.third")}</li>
            <li>{t("hardware.section.d2s.list.fourth")}</li>
            </ul>
        </PageSection>
        <PageSection className={style.pageSection} alt img={Assets.pic4}>
            <div>
            <strong>{t("hardware.section.t2s.strong")}</strong>
            <h3>{t("hardware.section.t2s.title")}</h3>
            </div>
            <p>{t("hardware.section.t2s.description")}</p>
            <ul>
            <li>{t("hardware.section.t2s.list.first")}</li>
            <li>{t("hardware.section.t2s.list.second")}</li>
            <li>{t("hardware.section.t2s.list.third")}</li>
            <li>{t("hardware.section.t2s.list.fourth")}</li>
            </ul>
        </PageSection>
        <PageSection
            alt
            rowReverse
            img={Assets.pic5}
            className={style.pageSection}
        >
            <div>
            <strong>{t("hardware.section.tablet.strong")}</strong>
            </div>
            <p>{t("hardware.section.tablet.description")}</p>
            <ul>
            <li>{t("hardware.section.tablet.list.first")}</li>
            <li>{t("hardware.section.tablet.list.second")}</li>
            <li>{t("hardware.section.tablet.list.third")}</li>
            <li>{t("hardware.section.tablet.list.fourth")}</li>
            <li>{t("hardware.section.tablet.list.fifth")}</li>
            </ul>
        </PageSection>
        <PageSection className={style.pageSection} alt img={Assets.pic6}>
            <div>
            <strong>{t("hardware.section.k2.strong")}</strong>
            <h3>{t("hardware.section.k2.title")}</h3>
            </div>
            <p>{t("hardware.section.k2.description")}</p>
            <ul>
            <li>{t("hardware.section.k2.list.first")}</li>
            <li>{t("hardware.section.k2.list.second")}</li>
            <li>{t("hardware.section.k2.list.third")}</li>
            <li>{t("hardware.section.k2.list.fourth")}</li>
            </ul>
        </PageSection>
        <PageSection
            alt
            rowReverse
            img={Assets.pic7}
            className={style.pageSection}
        >
            <div>
            <strong>{t("hardware.section.commander.strong")}</strong>
            </div>
            <p>{t("hardware.section.commander.description")}</p>
            <ul>
            <li>{t("hardware.section.commander.list.first")}</li>
            <li>{t("hardware.section.commander.list.second")}</li>
            </ul>
        </PageSection>
        <DevicesSection
            title={t("hardware.devices.paid.title")}
            text={t("hardware.devices.paid.text")}
        >
            {renderSlider(DevicesPaid, activeIndexPaid, setActiveIndexPaid)}
        </DevicesSection>
        <DevicesSection
            title={t("hardware.devices.accessories.title")}
            text={t("hardware.devices.accessories.text")}
        >
            {renderSlider(
            Devices,
            activeIndexAccessories,
            setActiveIndexAccessories
            )}
        </DevicesSection>
        <PageEnd
            className={style.endBanner}
            text={t("hardware.endBanner.text")}
            cta={t("hardware.endBanner.button")}
        />
        </main>
    )
}

export default Hardware

export const meta = (context: LoaderFunctionArgs) => {
    const { params } = context
    const { locale: currentLocale } = params
    
    const locale = currentLocale || 'es'
    const { t } = getTranslations(locale)
    
    const pageTitle = t("hardware.title")
    const pageDescription = t("hardware.metaDescription") 
    
    const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL || 'https://tabbi-web-remix-7bfo.vercel.app'
    
    const canonicalUrl = `${BASE_URL}/${locale}/hardware`
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
