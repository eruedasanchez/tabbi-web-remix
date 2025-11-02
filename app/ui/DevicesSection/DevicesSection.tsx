import style from "./DevicesSection.module.css"

interface Props {
    title: string | React.ReactNode
    text: string | React.ReactNode
    children: React.ReactNode
}

const DevicesSection = ({ title, text, children }: Props) => {
    return (
        <section className={style.devicesSection}>
        <article className={style.container}>
            <div className={style.pageHero}>
            <h3 className={style.pageTitle}>Hardware</h3>
            {typeof title === "string" ? (
                <h2 className={style.title}>{title}</h2>
            ) : (
                title
            )}
            {typeof title === "string" ? (
                <p className={style.text}>{text}</p>
            ) : (
                text
            )}
            </div>
            <div className={style.children}>{children}</div>
        </article>
        </section>
    )
}

export default DevicesSection
