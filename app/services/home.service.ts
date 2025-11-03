import type { HomeData } from "~/types/Home"

export async function getHomeData(): Promise<HomeData> {
    await new Promise(resolve => setTimeout(resolve, 50))

    return {
        welcomeMessageKey: 'welcomeTitle',
        currentStatus: 'online'
    }
}
