export interface PricingPlan {
    id: number
    name: string
    monthlyPrice: number
    features: string[]
    isRecommended: boolean
}

export interface PreciosData {
    tagline: string
    plans: PricingPlan[]
}