import style from "./HomeLoader.module.css"

const HomeLoader = () => {
    return (
        <main className={`${style.skeletonContainer} ${style.home}`}>
            <div className={style.homeBg}>
                <section className={style.homeHero}>
                    <div className={`${style.skeletonBlock} ${style.heroImg}`}></div>
                    <div className={`${style.skeletonBlock} ${style.heroTitle}`}></div>
                    <div className={`${style.skeletonBlock} ${style.heroButton}`}></div>
                </section>
                <section className={style.productSection}>
                    <div className={`${style.skeletonBlock} ${style.productImg}`}></div>
                    <div className={`${style.skeletonBlock} ${style.productText}`}></div>
                    <div className={`${style.skeletonBlock} ${style.productButton}`}></div>
                </section>
            </div>
            <section className={style.aboutSection}>
                <div className={`${style.skeletonBlock} ${style.aboutImg}`}></div>
                <div className={`${style.skeletonBlock} ${style.aboutText}`}></div>
            </section>
            <section className={style.integrationsSection}>
                <div className={`${style.skeletonBlock} ${style.integrationItem}`}></div>
                <div className={`${style.skeletonBlock} ${style.integrationItem}`}></div>
                <div className={`${style.skeletonBlock} ${style.integrationItem}`}></div>
            </section>
            <section className={style.endBanner}>
                <div className={`${style.skeletonBlock} ${style.endText}`}></div>
                <div className={`${style.skeletonBlock} ${style.endButton}`}></div>
            </section>
        </main>
    )
}

export default HomeLoader