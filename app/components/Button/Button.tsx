import Assets from "./assets"
import style from "./Button.module.css"

interface Props {
    id?: string
    value?: string
    unfilled?: boolean
    className?: string
    disabled?: boolean
    withArrow?: boolean
    onClick?: () => void
    type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"]
}

const Button = ({
    id,
    value,
    onClick,
    className = "",
    type = "button",
    unfilled = false,
    disabled = false,
    withArrow = true
}: Props) => {
    return (
        <button
        id={id}
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={`${style.button} ${
            unfilled ? style.unfilled : ""
        } ${className}`}
        >
        <span>{value}</span>
        {withArrow && <div className={style.svg}>{Assets.arrow}</div>}
        </button>
    )
}

export default Button
