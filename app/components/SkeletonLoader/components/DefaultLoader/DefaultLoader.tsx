import style from "./DefaultLoader.module.css"

const DefaultLoader = () => {
    return (
        <article className={style.article}>
            <div className={style.container}>
                <div className={`${style.skeletonBlock} ${style.title}`} />
                <div className={`${style.skeletonBlock} ${style.text}`} />
                <div className={`${style.skeletonBlock} ${style.button}`}/>
            </div>
            <div className={style.children}>
                <div className={style.content}>
                    <div className={`${style.skeletonBlock} ${style.image}`} />
                </div>
            </div>
        </article>
    )
}

export default DefaultLoader