import type { FuncionalidadesData } from "~/types/Funcionalidades"

export async function getFuncionalidadesData(): Promise<FuncionalidadesData> {
    await new Promise(resolve => setTimeout(resolve, 50)) 
    
    return {
        heroTitle: "Funcionalidades Clave de Tabbi",
        features: [
            { 
                id: 1, 
                name: "Gestión de Inventario", 
                description: "Control en tiempo real de tu stock y alertas de bajo inventario." 
            },
            { 
                id: 2, 
                name: "Integración de Pagos", 
                description: "Soporte para múltiples pasarelas y métodos de pago electrónicos." 
            },
            { 
                id: 3, 
                name: "Reportes Avanzados", 
                description: "Análisis de ventas con filtros personalizables y exportación de datos." 
            }
        ]
    }
}