import { useNavigation, useNavigate, useParams } from "react-router-dom"
import { getTranslations } from "~/i18n"
import functionalitiesAssets from "~/assets/funcionalidades"

interface SectionData {
    id: string
    img: string
    rowReverse?: boolean 
    className: string
    titleStrong: string
    titleRest: string
    description: string
    listItems: string[]
}

const useFuncionalidades = () => {
    const navigation = useNavigation()
    const navigate = useNavigate()
    const { locale: currentLocale } = useParams()
    
    const locale = currentLocale || 'es' 
    const { t } = getTranslations(locale)
    
    const goToHardwarePage = () => {
        navigate(`/${locale}/hardware`, { replace: false })
    }
    
    const sections: SectionData[] = [
        {
            id: 'sell',
            img: functionalitiesAssets.pic2,
            className: 'sectionRow',
            titleStrong: t("funcionalidades.sections.sell.titleStrong"),
            titleRest: t("funcionalidades.sections.sell.titleRest"),
            description: t("funcionalidades.sections.sell.description"),
            listItems: [
                t("funcionalidades.sections.sell.listOne"),
                t("funcionalidades.sections.sell.listTwo"),
                t("funcionalidades.sections.sell.listThree"),
            ]
        },
        {
            id: 'table',
            img: functionalitiesAssets.pic3,
            rowReverse: true, 
            className: 'sectionRowReverse',
            titleStrong: t("funcionalidades.sections.table.titleStrong"),
            titleRest: t("funcionalidades.sections.table.titleRest"),
            description: t("funcionalidades.sections.table.description"),
            listItems: [
                t("funcionalidades.sections.table.listOne"),
                t("funcionalidades.sections.table.listTwo"),
                t("funcionalidades.sections.table.listThree"),
            ]
        },
        {
            id: 'integrations',
            img: functionalitiesAssets.pic4,
            className: 'sectionRow',
            titleStrong: t("funcionalidades.sections.integrations.titleStrong"),
            titleRest: t("funcionalidades.sections.integrations.titleRest"),
            description: t("funcionalidades.sections.integrations.description"),
            listItems: [
                t("funcionalidades.sections.integrations.listOne"),
                t("funcionalidades.sections.integrations.listTwo"),
                t("funcionalidades.sections.integrations.listThree"),
            ]
        },
        {
            id: 'customers',
            img: functionalitiesAssets.pic5,
            rowReverse: true,
            className: 'sectionRowReverse',
            titleStrong: t("funcionalidades.sections.customers.titleStrong"),
            titleRest: t("funcionalidades.sections.customers.titleRest"),
            description: t("funcionalidades.sections.customers.description"),
            listItems: [
                t("funcionalidades.sections.customers.listOne"),
                t("funcionalidades.sections.customers.listTwo"),
                t("funcionalidades.sections.customers.listThree"),
            ]
        },
        {
            id: 'plans',
            img: functionalitiesAssets.pic6,
            className: 'sectionRow',
            titleStrong: t("funcionalidades.sections.plans.titleStrong"),
            titleRest: t("funcionalidades.sections.plans.titleRest"),
            description: t("funcionalidades.sections.plans.description"),
            listItems: [
                t("funcionalidades.sections.plans.listOne"),
                t("funcionalidades.sections.plans.listTwo"),
                t("funcionalidades.sections.plans.listThree"),
            ]
        },
        {
            id: 'management',
            img: functionalitiesAssets.pic7,
            rowReverse: true,
            className: 'sectionRowReverse',
            titleStrong: t("funcionalidades.sections.management.titleStrong"),
            titleRest: t("funcionalidades.sections.management.titleRest"),
            description: t("funcionalidades.sections.management.description"),
            listItems: [
                t("funcionalidades.sections.management.listOne"),
                t("funcionalidades.sections.management.listTwo"),
                t("funcionalidades.sections.management.listThree"),
            ]
        },
    ]

    return {
        isNavigating: navigation.state === "loading",
        goToHardwarePage,
        locale,
        sections,
        t
    }
}

export default useFuncionalidades