import { randBool, randFloat, randInt } from "./utils"

export interface Problem {
    a: number
    b: number
    statement: string
    answer: boolean
    reason: string
}

class IncreaseMore implements Problem {
    a: number
    b: number
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = Math.ceil(randInt(1, 10)) * 10 // 10, 20, ..., 90
        this.a = Math.round(Math.pow(10, randFloat(0, 8)))
        let threshold = this.a * (1 + (n / 100))
        if (this.answer === true) {
            let left = threshold * (1 + 0.001)
            let right = threshold * (1 + 0.02)
            this.b = randInt(left, right)
        }
        else {
            let left = threshold * (1 - 0.02)
            let right = threshold * (1 - 0.001)
            this.b = randInt(left, right)
            if (this.b === threshold) this.b--
        }
        this.statement = `${n}% 이상 증가하였다.`
        this.reason = ((this.b / this.a - 1.0) * 100).toFixed(3) + "%"
    }

    static get() {
        return new IncreaseMore()
    }
}

class DecreaseMore implements Problem {
    a: number
    b: number
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = randInt(1, 10) * 10 // 10, 20, ..., 90
        this.a = Math.round(Math.pow(10, randFloat(0, 8)))
        let threshold = this.a * (1 - (n / 100))
        if (this.answer === true) {
            let left = threshold * (1 - 0.02)
            let right = threshold * (1 - 0.001)
            this.b = randInt(left, right)
        }
        else {
            let left = threshold * (1 + 0.001)
            let right = threshold * (1 + 0.02)
            this.b = randInt(left, right)
            if (this.b === threshold) this.b++
        }
        this.statement = `${n}% 이상 감소하였다.`
        this.reason = ((1.0 - this.b / this.a) * 100).toFixed(3) + "%"
    }

    static get() {
        return new DecreaseMore()
    }
}

class IncreaseLess implements Problem {
    a: number
    b: number
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = Math.ceil(randInt(1, 10)) * 10 // 10, 20, ..., 90
        this.a = Math.round(Math.pow(10, randFloat(0, 8)))
        let threshold = this.a * (1 + (n / 100))
        if (this.answer === true) {
            let left = threshold * (1 - 0.02)
            let right = threshold * (1 - 0.001)
            this.b = randInt(left, right)
            if (this.b === threshold) this.b--
        }
        else {
            let left = threshold * (1 + 0.001)
            let right = threshold * (1 + 0.02)
            this.b = randInt(left, right)
        }
        this.statement = `증가량이 ${n}%보다 작다.`
        this.reason = ((this.b / this.a - 1.0) * 100).toFixed(3) + "%"
    }

    static get() {
        return new IncreaseLess()
    }
}

class DecreaseLess implements Problem {
    a: number
    b: number
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = randInt(1, 10) * 10 // 10, 20, ..., 90
        this.a = Math.round(Math.pow(10, randFloat(0, 8)))
        let threshold = this.a * (1 - (n / 100))
        if (this.answer === true) {
            let left = threshold * (1 + 0.001)
            let right = threshold * (1 + 0.02)
            this.b = randInt(left, right)
            if (this.b === threshold) this.b++
        }
        else {
            let left = threshold * (1 - 0.02)
            let right = threshold * (1 - 0.001)
            this.b = randInt(left, right)
        }
        this.statement = `감소량이 ${n}%보다 작다.`
        this.reason = ((1.0 - this.b / this.a) * 100).toFixed(3) + "%"
    }

    static get() {
        return new DecreaseLess()
    }
}

class MultipleMore implements Problem {
    a: number
    b: number
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = randInt(2, 10) // 2, 3, ..., 9
        this.a = Math.round(Math.pow(10, randFloat(0, 8)))
        let threshold = this.a * n
        if (this.answer === true) {
            let left = threshold * (1 + 0.001)
            let right = threshold * (1 + 0.03)
            this.b = randInt(left, right)
            if (this.b == threshold) this.b++
        }
        else {
            let left = threshold * (1 - 0.03)
            let right = threshold * (1 - 0.001)
            this.b = randInt(left, right)
        }
        this.statement = `${n}배가 넘는다.`
        this.reason = (this.b / this.a).toFixed(3) + "배"
    }

    static get() {
        return new MultipleMore()
    }
}

class IncreaseEqual implements Problem {
    a: number
    b: number
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = Math.ceil(randInt(1, 10)) * 10 // 10, 20, ..., 90
        this.a = Math.round(Math.pow(10, randFloat(0, 8)))
        let threshold = this.a * (1 + (n / 100))
        if (this.answer === true) {
            this.b = Math.round(threshold)
        }
        else {
            if (randBool()) {
                let left = threshold * (1 + 0.001)
                let right = threshold * (1 + 0.03)
                this.b = randInt(left, right)
                if (this.b == Math.round(threshold)) this.b++
            }
            else {
                let left = threshold * (1 - 0.001)
                let right = threshold * (1 - 0.03)
                this.b = randInt(left, right)
                if (this.b == Math.round(threshold)) this.b--
            }
        }
        this.statement = `증가량이 ${n}%이다.`
        this.reason = ((this.b / this.a - 1.0) * 100).toFixed(3) + "%"
    }

    static get() {
        return new IncreaseEqual()
    }
}

class DecreaseEqual implements Problem {
    a: number
    b: number
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = Math.ceil(randInt(1, 10)) * 10 // 10, 20, ..., 90
        this.a = Math.round(Math.pow(10, randFloat(0, 8)))
        let threshold = this.a * (1 - (n / 100))
        if (this.answer === true) {
            this.b = Math.round(threshold)
        }
        else {
            if (randBool()) {
                let left = threshold * (1 + 0.001)
                let right = threshold * (1 + 0.03)
                this.b = randInt(left, right)
                if (this.b == Math.round(threshold)) this.b++
            }
            else {
                let left = threshold * (1 - 0.001)
                let right = threshold * (1 - 0.03)
                this.b = randInt(left, right)
                if (this.b == Math.round(threshold)) this.b--
            }
        }
        this.statement = `감소량이 ${n}%이다.`
        this.reason = ((1.0 - this.b / this.a) * 100).toFixed(3) + "%"
    }

    static get() {
        return new DecreaseEqual()
    }
}

class FractionLarge implements Problem {
    a: number
    b: number
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = Math.ceil(randInt(1, 10)) * 10 // 10, 20, ..., 90
        this.a = Math.round(Math.pow(10, randFloat(0, 8)))
        let threshold = this.a * (1 - (n / 100))
        if (this.answer === true) {
            this.b = Math.round(threshold)
        }
        else {
            if (randBool()) {
                let left = threshold * (1 + 0.001)
                let right = threshold * (1 + 0.03)
                this.b = randInt(left, right)
                if (this.b == Math.round(threshold)) this.b++
            }
            else {
                let left = threshold * (1 - 0.001)
                let right = threshold * (1 - 0.03)
                this.b = randInt(left, right)
                if (this.b == Math.round(threshold)) this.b--
            }
        }
        this.statement = `감소량이 ${n}%이다.`
        this.reason = ((1.0 - this.b / this.a) * 100).toFixed(3) + "%"
    }

    static get() {
        return new DecreaseEqual()
    }
}


export function genProblem(): Problem {
    const gen: (() => Problem)[] = [
        IncreaseMore.get,
        DecreaseMore.get,
        IncreaseLess.get,
        DecreaseLess.get,
        IncreaseEqual.get,
        DecreaseEqual.get,
        MultipleMore.get,
    ]
    return gen[randInt(0, gen.length)]()
}