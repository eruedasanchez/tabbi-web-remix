import deliverectSVG from "./deliverect.svg"
import superpopiSVG from "./superpopi.svg"
import globalSVG from "./global.svg"
import glovoSVG from "./glovo.svg"
import sumupSVG from "./sumup.svg"
import zeusSVG from "./zeus.svg"
import mercadopagoSVG from "./mercadopago.svg"
import paywaySVG from "./payway.svg"
import pedidoyaSVG from "./pedidoya.svg"
import rappiSVG from "./rappi.svg"

export const IntegrationsAssetsES = {
    sumup: sumupSVG,
    global: globalSVG,
    zeus: zeusSVG,
    superpopi: superpopiSVG,
    glovo: glovoSVG,
    deliverect: deliverectSVG
} as { [key: string]: string }

export const IntegrationsAssetsAR = {
    mercadopago: mercadopagoSVG,
    payway: paywaySVG,
    zeus: zeusSVG,
    pedidoya: pedidoyaSVG,
    rappi: rappiSVG,
    deliverect: deliverectSVG
} as { [key: string]: string }

export default IntegrationsAssetsES as { [key: string]: string }
