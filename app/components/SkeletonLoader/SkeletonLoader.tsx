import { 
    DefaultLoader, 
    FuncionalidadesLoader, 
    HardwareLoader, 
    HomeLoader, 
    PreciosLoader
} from "./components"
import style from "./SkeletonLoader.module.css"

interface SkeletonLoaderProps {
    variant?: "funcionalidades" | "hardware" | "home" | "precios"    
}

const loaderMap = {
    funcionalidades: FuncionalidadesLoader,
    hardware: HardwareLoader,
    home: HomeLoader,
    precios: PreciosLoader
} as const

export const PlaceholderImage = () => (
    <div className={style.skeletonImage}></div>
)

const SkeletonLoader = ({ variant = "home" }: SkeletonLoaderProps) => {
    const LoaderComponent = loaderMap[variant] || DefaultLoader
    return <LoaderComponent />
}

export default SkeletonLoader