import { useEffect, useState } from "react"
import { Button, Card } from "~/components"
import { useWindowSize } from "~/hooks"
import type { AboutDTO } from "../hooks/useAboutData"
import style from "./AboutCard.module.css"

const MOBILE_BREAKPOINT = 900

const AboutCard = ({
    icon,
    title,
    text,
    className,
    handleNext,
    handlePrev
}: { className?: string } & AboutDTO) => {
    const [isMobile, setIsMobile] = useState(false)
    const { width } = useWindowSize()

    useEffect(() => {
        if (width > 0) {
        setIsMobile(width < MOBILE_BREAKPOINT)
        }
    }, [width])

    return (
        <Card className={`${style.card} ${className}`}>
        <div className={style.head}>
            <div className={style.icon}>
            <img
                src={icon}
                loading="lazy"
                draggable="false"
                className={style.icon}
            />
            </div>
            <h4 className={style.title}>{title}</h4>
        </div>
        <p className={style.text}>{text}</p>

        {isMobile && (
            <div className={style.buttons}>
            <Button
                className={`${style.btn} ${style.buttonLeft}`}
                onClick={handlePrev}
            />
            <Button
                className={`${style.btn} ${style.buttonRight}`}
                onClick={handleNext}
            />
            </div>
        )}
        </Card>
    )
}

export default AboutCard
