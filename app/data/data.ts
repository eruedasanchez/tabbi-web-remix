import Assets from "../assets/hardware/devices"

export interface DevicesDTO {
    text: string
    image: string
    title: string
}

const DevicesES: Array<DevicesDTO> = [
    {
        title: "Sumup",
        image: Assets.sumup,
        text: "Acepta pagos, consulta tu historial de ventas con el datáfono independiente más avanzado."
    }
    ]

    const DevicesAR: Array<DevicesDTO> = [
    {
        image: Assets.newland,
        title: "Newland N910",
        text: "Tiene todo lo que necesita para procesar pagos, simplificando drásticamente todo el proceso."
    },
    {
        image: Assets.mppoint,
        title: "MP Point Smart",
        text: "Todo lo que necesitás para cobrar sin parar. Con Chip de internet 4G gratis."
    }
]

const Devices: Array<DevicesDTO> = [
    {
        image: Assets.reader,
        title: "Lector de código de barras",
        text: "Agiliza tus ventas y controla el inventario al instante con lecturas rápidas y precisas."
    },
    {
        image: Assets.printer,
        title: "Impresora de cocina",
        text: "Omprime órdenes automáticamente con cada pedido para un flujo ágil y sincronizado."
    },
    {
        image: Assets.tablet,
        title: "Monitor de cocina",
        text: "Recibe los pedidos en tiempo real y organiza la preparación sin errores ni papeles."
    },
    {
        image: Assets.servicesCaller,
        title: "Llamador de servicios",
        text: "Notifica al personal de manera silenciosa y eficiente para mejorar la atención al cliente."
    }
]

export { Devices, DevicesES, DevicesAR }
