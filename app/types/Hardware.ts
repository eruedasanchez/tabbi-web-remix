export interface Device {
    id: number
    name: string
    description: string
    category: 'terminal' | 'printer' | 'scanner'
}

export interface HardwareData {
    heroTitle: string
    devices: Device[]
}