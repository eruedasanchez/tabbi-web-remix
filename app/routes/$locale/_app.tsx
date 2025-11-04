import { Outlet, useNavigation, useParams } from "react-router-dom"
import { Header, Footer, FormSection } from "~/ui"
import style from "./styles/_app.module.css"

export default function Layout() {
    const navigation = useNavigation()
    const isNavigating = navigation.state !== "idle"
    const { locale } = useParams() 

    if (!locale) {
        return (
        <div className={style.errorFallback}>
            <h1>Error de Configuración</h1>
            <p>El código de idioma (locale) no está definido en la URL. Revise la configuración de sus rutas.</p>
        </div>
        )
    }
    
    return (
        <div>
        {isNavigating && (
            <div className={`${style.loadingBarContainer} ${isNavigating && style.isNavigating}`}>
            <div className={style.loadingBarAnimation}></div>
            </div>
        )}
        <Header />
        <div className={style.mainContent}>
            <Outlet />
        </div>
        <FormSection />        
        <Footer />
        </div>
    )
}
