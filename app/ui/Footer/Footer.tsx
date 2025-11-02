import { useParams } from "react-router"
import { useWindowSize } from "~/hooks"
import ScrollNavLink from "./components/ScrollNavLink"
import Logo from "./assets/logo-footer.svg"
import Arrow from "./assets/arrow-up.svg"
import style from "./Footer.module.css"

const Footer = () => {
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { width } = useWindowSize()

    const goToPage = (redirect: string) => {
        return `/${locale}/${redirect}`
    }

    const scrollToFormSection = () => {
        const seccion = document.getElementById("hero-section")
        if (seccion) {
        seccion.scrollIntoView({ behavior: "smooth" })
        }
    }
    
    return (
        <footer className={style.footer}>
            <div className={style.footerContainer}>
                <img src={Logo} alt="Tabbi Logo" className={style.logo} />
                <p>Copyright © 2025 Tabbi</p>
                <p>Todos los derechos reservados</p>
            </div>
            {width > 900 && (
                <div className={style.navLinks}>
                <ul>
                    <li>
                    <ScrollNavLink to={goToPage("")}>Inicio</ScrollNavLink>
                    </li>
                    <li>
                    <ScrollNavLink to={goToPage("funcionalidades")}>
                        Funcionalidades
                    </ScrollNavLink>
                    </li>
                    <li>
                    <ScrollNavLink to={goToPage("hardware")}>Hardware</ScrollNavLink>
                    </li>
                    <li>
                    <ScrollNavLink to={goToPage("precios")}>Precios</ScrollNavLink>
                    </li>
                </ul>
                </div>
            )}
            <button
                className={style.backToTop}
                onClick={() => scrollToFormSection()}
            >
                <img src={Arrow} alt="Back to top" />
            </button>
        </footer>
    )
}

export default Footer
