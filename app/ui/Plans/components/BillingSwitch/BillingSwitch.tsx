import { BillingPeriod } from "../../types"
import style from "./BillingSwitch.module.css"

interface Props {
    value: BillingPeriod
    onChange: (period: BillingPeriod) => void
}

const BillingSwitch = ({ value, onChange }: Props) => {
    return (
        <nav className={style.billingSwitch}>
        <button
            onClick={() => onChange(BillingPeriod.MONTHLY)}
            className={`${style.switchButton} ${
            value === BillingPeriod.MONTHLY ? style.active : ""
            }`}
        >
            Mensual
        </button>

        <button
            onClick={() => onChange(BillingPeriod.SEMIANNUAL)}
            className={`${style.switchButton} ${
            value === BillingPeriod.SEMIANNUAL ? style.active : ""
            }`}
        >
            Semestral -5%
        </button>

        <button
            onClick={() => onChange(BillingPeriod.ANNUAL)}
            className={`${style.switchButton} ${
            value === BillingPeriod.ANNUAL ? style.active : ""
            }`}
        >
            Anual -10%
        </button>
        </nav>
    )
}

export default BillingSwitch
