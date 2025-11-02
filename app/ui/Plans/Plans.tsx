import { useState } from "react"
import { BillingPeriod } from "./types"
import { getRegionalPrices } from "./utils"
import { useParams } from "react-router-dom"
import BillingSwitch from "./components/BillingSwitch/BillingSwitch"
import PlanCard from "./components/PlanCard/PlanCard"
import style from "./Plans.module.css"

const Plans = () => {
    const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>(
        BillingPeriod.MONTHLY
    )

    const prices = getRegionalPrices()[billingPeriod]
    const formatPrice = (value: number): number => Number(value.toFixed(2))
    const { locale } = useParams()

    const PLANS = [
        {
        title: "Tabbi Express",
        subtitle: "Pack barra",
        price: formatPrice(prices.express),
        features: [
            "Gestión de pedidos en barra",
            "Módulo de caja y facturación",
            "Integración con medios de pago y delivery"
        ],
        recommended: false,
        billingText:
            billingPeriod === BillingPeriod.SEMIANNUAL
            ? `${formatPrice(prices.express * 6)} por 6 meses`
            : billingPeriod === BillingPeriod.ANNUAL
                ? `${formatPrice(prices.express * 12)} por 1 año`
                : undefined
        },
        {
        title: "Tabbi Pro",
        subtitle: "Pack Sala",
        price: formatPrice(prices.pro),
        features: [
            "Gestión de hasta 30 mesas",
            "Integración con medios de pago y delivery",
            "Toma de pedidos desde comanderas",
            "Reportes avanzados y analytics en tiempo real",
            "Incluye 1 comandera"
        ],
        recommended: true,
        billingText:
            billingPeriod === BillingPeriod.SEMIANNUAL
            ? `${formatPrice(prices.pro * 6)} por 6 meses`
            : billingPeriod === BillingPeriod.ANNUAL
                ? `${formatPrice(prices.pro * 12)} por 1 año`
                : undefined
        },
        {
        title: "Tabbi Pro Max",
        subtitle: "Pack Sala",
        price: formatPrice(prices.proMax),
        features: [
            "Gestión de más de 30 mesas",
            "Integración con medios de pago y delivery",
            "Toma de pedidos desde comanderas",
            "Reportes avanzados y analytics en tiempo real",
            "Incluye 2 comanderas"
        ],
        recommended: false,
        billingText:
            billingPeriod === BillingPeriod.SEMIANNUAL
            ? `${formatPrice(prices.proMax * 6)} por 6 meses`
            : billingPeriod === BillingPeriod.ANNUAL
                ? `${formatPrice(prices.proMax * 12)} por 1 año`
                : undefined
        }
    ]

    return (
        <section className={style.plans} id="plans">
        <div className={style.container}>
            <header>
            <h3>Planes de Suscripción</h3>
            <h5 className={style.plansText}>
                {locale === "es" ? "Elige" : "Elegí"} el plan que mejor se adapte a
                ti, no dudes en contactarnos.
            </h5>
            </header>

            <BillingSwitch value={billingPeriod} onChange={setBillingPeriod} />

            <div className={style.list}>
            {PLANS.map((plan, index) => (
                <PlanCard key={index} {...plan} />
            ))}
            </div>
        </div>
        </section>
    )
}

export default Plans
