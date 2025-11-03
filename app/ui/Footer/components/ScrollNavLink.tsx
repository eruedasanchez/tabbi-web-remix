import { NavLink } from "react-router-dom"
import styles from "../Footer.module.css"

const ScrollNavLink = ({
    to,
    children
}: {
    to: string
    children: React.ReactNode
}) => (
    <NavLink
        end
        to={to}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={({ isActive }) =>
        `${styles.item} ${isActive ? styles.active : ""}`
        }
    >
        {children}
    </NavLink>
)

export default ScrollNavLink
