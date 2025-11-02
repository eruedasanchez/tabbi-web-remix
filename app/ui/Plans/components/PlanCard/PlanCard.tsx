import { useEffect, useState, useRef } from "react"
import { useParams } from "react-router-dom"
import { scrollToFormSection } from "~/utils"
import gsap from "gsap"
import checkIcon from "../../assets/check.svg"
import style from "./PlanCard.module.css"

interface Props {
    title: string
    subtitle: string
    price: number
    features: string[]
    recommended?: boolean
    billingText?: string
}

const CURRENCY_MAP: { [key: string]: string } = {
    ar: "$",
    es: "€"
}

const PlanCard = ({
    title,
    subtitle,
    price,
    features,
    recommended,
    billingText
}: Props) => {
    const [currencySymbol, setCurrencySymbol] = useState("$")
    const [whole, setWhole] = useState(price.toFixed(2).split(".")[0])
    const [cents, setCents] = useState(price.toFixed(2).split(".")[1])
    const priceRef = useRef<HTMLSpanElement>(null)
    const prevWhole = useRef(whole)
    const { locale } = useParams<{ locale: string }>()

    useEffect(() => {
        if (!locale) {
        return
        }

        const symbol = CURRENCY_MAP[locale] || "$"

        setCurrencySymbol(symbol)
    }, [locale])

    useEffect(() => {
        const newWhole = price.toFixed(2).split(".")[0]
        const newCents = price.toFixed(2).split(".")[1]

        if (prevWhole.current !== newWhole) {
        const el = priceRef.current
        if (!el) {
            return
        }

        gsap.to(el, {
            opacity: 0,
            zIndex: -1,
            duration: 0.2,
            onComplete: () => {
            prevWhole.current = newWhole
            setWhole(newWhole)
            setCents(newCents)
            gsap.fromTo(
                el,
                { opacity: 0, zIndex: 1 },
                { opacity: 1, duration: 0.2 }
            )
            }
        })
        }
    }, [price])

    return (
        <article
        className={`${style.planCard} ${recommended ? style.recommended : ""}`}
        >
        <header
            className={`${style.header} ${billingText ? style.headerToBillingText : ""}`}
        >
            <h4 className={style.title}>{title}</h4>
            <h5 className={style.subtitle}>{subtitle}</h5>

            <div className={style.priceContainer}>
            <span className={style.currency}>{currencySymbol}</span>
            <span className={style.priceWhole} ref={priceRef}>
                {whole},<span className={style.priceCents}>{cents}</span>
            </span>
            </div>

            <p className={style.perDevice}>por dispositivo</p>

            {billingText && (
            <p className={style.billingText}>
                {currencySymbol}
                <span className={style.billingPrice}>
                {parseInt(billingText.split(" ")[0])}
                </span>{" "}
                {billingText.split(" ").slice(1).join(" ")}
            </p>
            )}
        </header>

        <div className={style.featuresContainer}>
            <ul className={style.features}>
            {features.map((item, index) => (
                <li key={index}>
                <img src={checkIcon} alt="check" />
                {item}
                </li>
            ))}
            </ul>

            <button className={style.button} onClick={scrollToFormSection}>
            Comenzar
            </button>
        </div>
        </article>
    )
}

export default PlanCard
