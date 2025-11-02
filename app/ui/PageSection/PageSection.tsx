import style from "./PageSection.module.css"

interface Props {
    img?: string | React.ReactNode
    alt?: boolean
    className?: string
    rowReverse?: boolean
    children?: React.ReactNode
    id?: string
}

const PageSection = ({
    img,
    alt,
    children,
    className,
    rowReverse = false,
    id
}: Props) => {
    return (
        <section
        className={`${style.pageSection} ${alt ? style.alt : ""} ${className}`}
        id={id}
        >
        <article
            className={`${style.container} ${rowReverse ? style.rowReverse : ""}`}
        >
            <div className={style.children}>{children}</div>
            <div className={style.content}>
            {typeof img === "string" ? (
                <img
                className={style.image}
                src={img}
                loading="lazy"
                draggable="false"
                />
            ) : (
                img
            )}
            </div>
        </article>
        </section>
    )
}

export default PageSection
