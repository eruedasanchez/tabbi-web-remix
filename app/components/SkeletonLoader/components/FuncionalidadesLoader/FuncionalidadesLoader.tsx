import { PageEnd, PageHero, PageSection } from "~/ui"
import { PlaceholderImage } from "../../SkeletonLoader"
import style from "./FuncionalidadesLoader.module.css"

const FuncionalidadesLoader = () => {
    return (
        <main className={style.funcionalityContainer}>
            <PageHero
                children={<PlaceholderImage />}
                className={style.functionalityHero}
                title={<div className={`${style.skeletonBlock} ${style.h1Block}`} />}
                text={<div className={`${style.skeletonBlock} ${style.pBlock}`} />}
                cto=""
            />
            <PageSection img={<PlaceholderImage />} className={style.sectionRow}>
                <div className={style.skeletonTitle}></div>
                <div className={style.skeletonParagraph}></div>
                <ul>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                </ul>
            </PageSection>
            <PageSection img={<PlaceholderImage />} rowReverse className={style.sectionRowReverse}>
                <div className={style.skeletonTitle}></div>
                <div className={style.skeletonParagraph}></div>
                <ul>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                </ul>
            </PageSection>
            <PageSection img={<PlaceholderImage />} className={style.sectionRow}>
                <div className={style.skeletonTitle}></div>
                <div className={style.skeletonParagraph}></div>
                <ul>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                </ul>
            </PageSection>
            <PageSection img={<PlaceholderImage />} rowReverse className={style.sectionRowReverse}>
                <div className={style.skeletonTitle}></div>
                <div className={style.skeletonParagraph}></div>
                <ul>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                </ul>
            </PageSection>
            <PageSection img={<PlaceholderImage />} className={style.sectionRow}>
                <div className={style.skeletonTitle}></div>
                <div className={style.skeletonParagraph}></div>
                <ul>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                </ul>
            </PageSection>
            <PageSection img={<PlaceholderImage />} rowReverse className={style.sectionRowReverse}>
                <div className={style.skeletonTitle}></div>
                <div className={style.skeletonParagraph}></div>
                <ul>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                <li className={style.skeletonList}></li>
                </ul>
            </PageSection>
            <PageEnd className={style.endBanner} text={<div className={style.skeletonTitle}></div>} cta="" />
        </main>
    )
}

export default FuncionalidadesLoader
