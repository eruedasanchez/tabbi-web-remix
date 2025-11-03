import { Button } from "~/components"
import { scrollToFormSection } from "~/utils/utils"
import style from "./PageHero.module.css"

interface Props {
    cto: string
    title: string | React.ReactNode
    text?: string | React.ReactNode
    className?: string
    children?: string | React.ReactNode
    buttonFunction?: () => void
}

const sanitizeTitle = (title: string): string => {
    return title
        .replace(/<(?!\/?(br)\s*\/?>)[^>]*>/gi, "")
        .replace(/javascript:/gi, "")
        .replace(/on\w+=/gi, "")
}

const PageHero = ({
    title,
    text,
    cto,
    className,
    children,
    buttonFunction
}: Props) => {
    return (
        <section
        className={`${style.pageHero} ${text !== "" ? style.withText : ""} ${className}`}
        id="hero-section"
        >
        <article className={style.article}>
            <div className={style.container}>
            {typeof title === "string" ? (
                <h2
                className={style.title}
                dangerouslySetInnerHTML={{ __html: sanitizeTitle(title) }}
                />
            ) : (
                <h2 className={style.title}>{title}</h2>
            )}
            {typeof text === "string" ? (
                <p className={style.text}>{text}</p>
            ) : (
                text
            )}
            <Button
                value={cto}
                onClick={() =>
                buttonFunction ? buttonFunction() : scrollToFormSection()
                }
            />
            </div>
            <div className={style.children}>
            <div className={style.content}>
                {typeof children === "string" ? (
                <img
                    src={children}
                    loading="eager" 
                    fetchPriority="high"
                    draggable="false"
                    className={style.image}
                />
                ) : (
                children
                )}
            </div>
            </div>
        </article>
        </section>
    )
}

export default PageHero
