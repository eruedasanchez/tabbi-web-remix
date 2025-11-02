import { 
    DevicesSection, 
    PageEnd, 
    PageHero, 
    PageSection 
} from "~/ui"
import { PlaceholderImage } from "../../SkeletonLoader"
import style from "./HardwareLoader.module.css"

const HardwareLoader = () => {
    return (
        <main className={style.hardwareContainer}>
            <PageHero
                children={<PlaceholderImage />}
                className={style.pageHero}
                title={<div className={`${style.skeletonBlock} ${style.h1Block}`} />}
                text={<div className={`${style.skeletonBlock} ${style.pBlock}`} />}
                cto=""
            />
            <section className={style.pageBanner}>
                <article className={style.container}>
                <div className={`${style.skeletonBlock} ${style.h2Block}`} />
                <div className={`${style.skeletonBlock} ${style.pBlock}`} />
                </article>
            </section>
            {[1, 2, 3, 4, 5, 6, 7].map((_, idx) => (
                <PageSection key={idx} className={style.pageSection} alt img="">
                <div>
                    <div className={`${style.skeletonBlock} ${style.h3Block}`} />
                    <div className={`${style.skeletonBlock} ${style.pBlock}`} />
                </div>
                <ul className={style.skeletonList}>
                    {Array.from({ length: 5 }).map((_, i) => (
                    <li key={i}>
                        <div className={style.skeletonLine} />
                    </li>
                    ))}
                </ul>
                </PageSection>
            ))}
            <DevicesSection
                title={<div className={`${style.skeletonBlock} ${style.h2Block}`} />}
                text={<div className={`${style.skeletonBlock} ${style.pBlock}`} />}
            >
                <div className={style.devicesPlaceholder}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                    key={i}
                    className={`${style.skeletonBlock} ${style.deviceCardBlock}`}
                    />
                ))}
                </div>
            </DevicesSection>
            <DevicesSection
                title={<div className={`${style.skeletonBlock} ${style.h2Block}`} />}
                text={<div className={`${style.skeletonBlock} ${style.pBlock}`} />}
            >
                <div className={style.devicesPlaceholder}>
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                    key={i}
                    className={`${style.skeletonBlock} ${style.deviceCardBlock}`}
                    />
                ))}
                </div>
            </DevicesSection>
            <PageEnd
                className={style.endBanner}
                text={<div className={`${style.skeletonBlock} ${style.pBlock}`} />}
                cta=""
            />
        </main>
    )
}

export default HardwareLoader
