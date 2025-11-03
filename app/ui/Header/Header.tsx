import { NavLink } from "react-router-dom"
import useHeader from "./hooks/useHeader"
import icon from "./assets/icon.svg"
import cross from "./assets/cross.svg"
import burgerIcon from "./assets/burguer.png"
import style from "./Header.module.css"

const Header = () => {
    const headerValues = useHeader()
    const {
        currentLang,
        handleLangChange,
        LANGUAGES,
        locale,
        routes,
        setToggleLang,
        setToggleNav,
        t,
        toggleNav,
        toggleLang
    } = headerValues
        
    const closeMenus = () => {
        setToggleNav(false)
        setToggleLang(false)
    }

    return (
        <header className={style.header}>
            <NavLink
                to={`/${locale}/`}
                className={style.badgeLink}
                onClick={closeMenus}
            >
                <img
                    className={style.badge}
                    src={icon}
                    loading="eager" 
                    fetchPriority="high"
                    alt="tabbi-logo"
                    draggable="false"
                />
            </NavLink>
            <nav className={`${style.nav} ${toggleNav ? style.active : ""}`}>
                <ul className={style.list}>
                    <img
                        className={`${style.badge} ${style.navBadge}`}
                        src={icon}
                        loading="lazy"
                        alt="tabbi-logo"
                        draggable="false"
                    />
                    <li
                        className={style.closeNav}
                        onClick={() => setToggleNav(!toggleNav)}
                    >
                        <img 
                            src={cross}
                            loading="lazy" 
                            alt="cross-icon" 
                            draggable="false" 
                        />
                    </li>
                    {routes
                        .filter((rt) => !rt.navOmit)
                        .map((rt, idx) => {
                            const baseKey = rt.name.replace(/\.name$/, "")
                            const navText = t(rt.name)
                            let finalPath = ""
                            
                            if (baseKey === "home.name") {
                                finalPath = `/${locale}/`
                            } else {
                                const slugKey = `${baseKey}.path`
                                const translatedSlug = t(slugKey)

                                finalPath = `/${locale}/${translatedSlug}`
                            }

                            return (
                                <li className={style.item} key={idx}>
                                <NavLink
                                    end
                                    to={finalPath}
                                    onClick={() => setToggleNav(!toggleNav)}
                                    className={({ isActive }) =>
                                    `${style.link} ${isActive ? style.active : ""}`
                                    }
                                >
                                    {navText}
                                </NavLink>
                                </li>
                            )
                    })}
                </ul>
            </nav>
            <a className={style.demoBtn} href={"#form-section"}>
                {t("common.nav.scheduleDemo")}
            </a>
            <div className={style.langSelector}>
                <button
                    className={style.currentLang}
                    onClick={() => setToggleLang(!toggleLang)}
                    title={`Idioma actual: ${currentLang.name}`}
                >
                    <img 
                        src={currentLang.flag} 
                        loading="eager" 
                        fetchPriority="high"
                        alt={`${currentLang.name} flag`} 
                        className={style.flagIcon} 
                    /> 
                    <span className={`${style.langArrow} ${toggleLang ? style.up : ""}`}></span>
                </button>

                <ul className={`${style.langList} ${toggleLang ? style.active : ""}`}>
                    {LANGUAGES.map((lang) => (
                        <li
                        key={lang.code}
                        className={`
                            ${style.langItem} 
                            ${lang.code === locale ? style.active : ""}
                            `}
                        onClick={() => handleLangChange(lang.code)}
                        >
                            <span>{lang.name}</span>
                            <img 
                                src={lang.flag}
                                loading="lazy" 
                                alt={`${lang.name} flag`} 
                                className={style.flagIcon} 
                            />
                        </li>
                    ))}
                </ul>
            </div>
            <button
                className={style.burguerIcon}
                onClick={() => setToggleNav(!toggleNav)}
            >
                <img 
                    src={burgerIcon}
                    loading="lazy" 
                    alt="burger-icon" 
                    draggable="false" 
                />
            </button>
        </header>
    )
}

export default Header
