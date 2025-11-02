export const PLANS = [
  {
    title: "Tabbi Express",
    subtitle: "Pack Barra"
  },
  {
    title: "Tabbi Pro",
    subtitle: "Pack Sala"
  },
  {
    title: "Tabbi Pro Max",
    subtitle: "Pack Sala"
  }
]

export const SECTIONS = [
  {
    name: "Hardware",
    items: [
      { label: "Hardware Terminal TPV Sunmi", values: [true, true, true] }
    ]
  },
  {
    name: "Software",
    items: [
      {
        label: "Gestión de pedidos",
        values: ["Barra", "Barra + Hasta 30 Mesas", "Barra + Más de 30 Mesas"]
      },
      { label: "Módulo de caja y facturación", values: [true, true, true] },
      {
        label: "Integración con pagos y delivery",
        values: [true, true, true]
      },
      { label: "Control de inventario", values: [false, true, true] },
      { label: "Comanderas", values: [false, true, true] },
      {
        label: "Reportes avanzados y analytics",
        values: [false, true, true]
      },
      {
        label: "Licencias TPV incluidas",
        values: ["1 licencia", "1 TPV + 1 comandera", "2 TPV + 2 comandera"]
      },
      { label: "Gestión de mesas", values: [false, true, true] }
    ]
  },
  {
    name: "Soporte Técnico",
    items: [
      {
        label: "Soporte técnico",
        values: [
          "Horario comercial estandar",
          "Horario comercial estandar",
          "Horario comercial estandar"
        ]
      }
    ]
  }
]
