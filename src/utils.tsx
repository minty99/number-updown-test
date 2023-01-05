// Generate random float in [left, right)
export function randFloat(left: number, right: number): number {
    return Math.random() * (right - left) + left
}

// Generate random integer in [left, right)
export function randInt(left: number, right: number): number {
    return Math.floor(randFloat(left, right))
}

// Generate random boolean
export function randBool(): boolean {
    return !!randInt(0, 2)
}