import { Button } from "~/components"
import { scrollToFormSection } from "~/utils"
import style from "./PageEnd.module.css"

interface Props {
    text: string | React.ReactNode
    cta: string
    className?: string
}

const PageEnd = ({ text, cta, className }: Props) => {
    return (
        <section className={`${style.pageEnd} ${className}`}>
        <article className={style.container}>
            {typeof text === "string" ? (
            <h4>{text}</h4>
            ) : (
            text
            )}
            <Button value={cta} onClick={scrollToFormSection} />
        </article>
        </section>
    )
}

export default PageEnd
