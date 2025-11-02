type Params = {
    onSwipeLeft: () => void
    onSwipeRight: () => void
    threshold?: number
}

type Return = {
    start: (e: React.TouchEvent) => void
    end: (e: React.TouchEvent) => void
}

export const createSwipeHandlers = ({
    onSwipeLeft,
    onSwipeRight,
    threshold = 50
}: Params): Return => {
    let startX = 0

    const start = (e: React.TouchEvent) => {
        startX = e.touches[0].clientX
    }

    const end = (e: React.TouchEvent) => {
        const endX = e.changedTouches[0].clientX
        const delta = endX - startX

        if (Math.abs(delta) > threshold) {
        if (delta > 0) {
            onSwipeRight()
        } else {
            onSwipeLeft()
        }
        }
    }
    
    return { start, end }
}