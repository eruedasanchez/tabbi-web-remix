import { useParams } from "react-router"
import { getTranslations } from "~/i18n"
import watchStatusSVG from "../assets/watch-status.svg"
import receiptItemSVG from "../assets/receipt-item.svg"
import callCallingSVG from "../assets/call-calling.svg"
import monitorSVG from "../assets/monitor-mobbile.svg"
import buildingSVG from "../assets/building.svg"
import healthSVG from "../assets/health.svg"
import cloudAddSVG from "../assets/cloud-add.svg"
import mirroringScreenSVG from "../assets/mirroring-screen.svg"
import fullConnectivitySVG from "../assets/full-connectivity.svg"

export interface AboutDTO {
    icon: string
    title: string
    text: string
    handleNext?: () => void
    handlePrev?: () => void
}

export const useAboutData = (): AboutDTO[] => {
    const { locale: currentLocale } = useParams()
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)

    const AboutData: AboutDTO[] = [
        {
        icon: cloudAddSVG,
        title: t("home.uniqueFeaturesSection.about.cloudSecure.title"),
        text: t("home.uniqueFeaturesSection.about.cloudSecure.description")
        },
        {
        icon: mirroringScreenSVG,
        title: t("home.uniqueFeaturesSection.about.offline.title"),
        text: t("home.uniqueFeaturesSection.about.offline.description")
        },
        {
        icon: fullConnectivitySVG,
        title: t("home.uniqueFeaturesSection.about.connectivity.title"),
        text: t("home.uniqueFeaturesSection.about.connectivity.description")
        },
        {
        icon: monitorSVG,
        title: t("home.uniqueFeaturesSection.about.hardware.title"),
        text: t("home.uniqueFeaturesSection.about.hardware.description")
        },
        {
        icon: watchStatusSVG,
        title: t("home.uniqueFeaturesSection.about.realTimeOrg.title"),
        text: t("home.uniqueFeaturesSection.about.realTimeOrg.description")
        },
        {
        icon: receiptItemSVG,
        title: t("home.uniqueFeaturesSection.about.billing.title"),
        text: t("home.uniqueFeaturesSection.about.billing.description")
        },
        {
        icon: healthSVG,
        title: t("home.uniqueFeaturesSection.about.reports.title"),
        text: t("home.uniqueFeaturesSection.about.reports.description")
        },
        {
        icon: buildingSVG,
        title: t("home.uniqueFeaturesSection.about.multibranch.title"),
        text: t("home.uniqueFeaturesSection.about.multibranch.description")
        },
        {
        icon: callCallingSVG,
        title: t("home.uniqueFeaturesSection.about.support.title"),
        text: t("home.uniqueFeaturesSection.about.support.description")
        }
    ]

    return AboutData
}
