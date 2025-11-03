import { useState } from "react"
import { useParams } from "react-router"
import { getTranslations } from "~/i18n"
import arrowIcon from "./assets/arrow.svg"
import styles from "./FAQs.module.css"

type AnswerBlock = {
    type: "text" | "list"
    content: string | string[]
}

type FAQ = {
    question: string
    answer: AnswerBlock[]
}

const FAQs = () => {
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)

    const faqsData = t<{ faqs: FAQ[] }>("faqs")
    const faqs = faqsData.faqs

    return (
        <section className={styles.faqsSection}>
        <div>
            <div className={styles.faqHeader}>
            <h3 className={styles.title}>FAQs</h3>
            <p className={styles.subtitle}>
                Te contamos algunas cosas que tienes que saber antes de probar
                nuestro producto
            </p>
            </div>
            <div>
            {faqs.map((faq, index) => (
                <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
            </div>
        </div>
        </section>
    )
}

export default FAQs

const FAQItem = ({
    question,
    answer
}: {
    question: string
    answer: { type: string; content: string | string[] }[]
}) => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleOpen = () => setIsOpen(!isOpen)

    return (
        <div className={`${styles.faqItem} ${isOpen ? styles.open : ""}`}>
        <button className={styles.question} onClick={toggleOpen}>
            <span>{question}</span>
            <img
                src={arrowIcon}
                loading="lazy"
                alt=""
                aria-hidden
                draggable={false}
                className={isOpen ? "" : styles.rotate}
            />
        </button>
        <div className={styles.answerWrapper}>
            <div className={styles.answer}>
            {answer.map((block, i) => {
                if (block.type === "text") {
                return <p key={i}>{block.content}</p>
                }

                if (block.type === "list") {
                return (
                    <ul key={i}>
                    {(block.content as string[]).map(
                        (item: string, index: number) => (
                        <li key={index}>{item}</li>
                        )
                    )}
                    </ul>
                )
                }
            })}
            </div>
        </div>
        </div>
    )
}
