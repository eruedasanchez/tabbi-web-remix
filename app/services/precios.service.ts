import type { PreciosData } from "~/types/Precios"

export async function getPreciosData(): Promise<PreciosData> {
    await new Promise(resolve => setTimeout(resolve, 50))

    return {
        tagline: "Elige el plan que impulsa tu negocio.",
        plans: [
            { 
                id: 1, 
                name: "Plan Básico", 
                monthlyPrice: 29, 
                features: ["1 Usuario", "Gestión de Ventas"], 
                isRecommended: false 
            },
            { 
                id: 2, 
                name: "Plan Pro", 
                monthlyPrice: 59, 
                features: ["5 Usuarios", "Inventario en Tiempo Real", "Reportes Avanzados"], 
                isRecommended: true 
            },
            { 
                id: 3, 
                name: "Plan Empresarial", 
                monthlyPrice: 99, 
                features: ["Usuarios Ilimitados", "API de Integración", "Soporte 24/7"], 
                isRecommended: false 
            },
        ]
    }
}