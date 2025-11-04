import { Card } from "~/components"
import type { DevicesDTO } from "~/data/data"
import style from "./DeviceCard.module.css"

const DeviceCard = ({
    text,
    image,
    title,
    className
}: { className?: string } & DevicesDTO) => {
    return (
        <Card className={`${style.deviceCard} ${className}`}>
        <div className={style.image}>
            <img
            src={image}
            loading="lazy"
            draggable={false}
            className={style.img}
            alt=""
            aria-hidden
            />
        </div>
        <div className={style.container}>
            <h3 className={style.title}>{title}</h3>
            <p className={style.text}>{text}</p>
        </div>
        </Card>
    )
}

export default DeviceCard
