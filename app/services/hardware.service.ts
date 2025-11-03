import type { HardwareData } from "~/types/Hardware"

export async function getHardwareData(): Promise<HardwareData> {
    await new Promise(resolve => setTimeout(resolve, 50))

    return {
        heroTitle: "Hardware Compatible Recomendado",
        devices: [
            { 
                id: 101, 
                name: "Terminal POS T1", 
                description: "Terminal Android 10 con lector NFC.", 
                category: 'terminal' 
            },
            { 
                id: 102, 
                name: "Impresora Térmica R-3", 
                description: "Impresora de recibos de 80mm de alta velocidad.", 
                category: 'printer' 
            },
            { 
                id: 103, 
                name: "Lector 2D Wireless", 
                description: "Lector de códigos de barras QR y 1D/2D.", 
                category: 'scanner' 
            },
        ]
    }
}