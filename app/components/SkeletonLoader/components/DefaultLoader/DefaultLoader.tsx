import style from "./DefaultLoader.module.css"

const DefaultLoader = () => {
    return (
        <main className={style.skeletonContainer}>
            <div className={`${style.skeletonBlock} ${style.h1Block}`}></div>
            <div className={`${style.skeletonBlock} ${style.pBlock}`}></div>
            <div className={`${style.skeletonBlock} ${style.accentBlock}`}></div>
        </main>
    )

}

export default DefaultLoader