import { randBool, randFloat, randInt } from "./utils"

export interface Problem {
    a: string
    b: string
    statement: string
    answer: boolean
    reason: string
}

class IncreaseMore implements Problem {
    a: string
    b: string
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = Math.ceil(randInt(1, 10)) * 10 // 10, 20, ..., 90
        let a = Math.round(Math.pow(10, randFloat(2, 8)))
        let threshold = a * (1 + (n / 100))
        var b: number
        if (this.answer === true) {
            let left = threshold * (1 + 0.005)
            let right = threshold * (1 + 0.025)
            b = randInt(left, right)
        }
        else {
            let left = threshold * (1 - 0.025)
            let right = threshold * (1 - 0.005)
            b = randInt(left, right)
            if (b === threshold) b--
        }
        this.a = a.toLocaleString('en-US')
        this.b = b.toLocaleString('en-US')
        this.statement = `${n}% 이상 증가하였다.`
        this.reason = ((b / a - 1.0) * 100).toFixed(3) + "%"
    }

    static get() {
        return new IncreaseMore()
    }
}

class DecreaseMore implements Problem {
    a: string
    b: string
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = randInt(1, 10) * 10 // 10, 20, ..., 90
        let a = Math.round(Math.pow(10, randFloat(2, 8)))
        var b: number
        let threshold = a * (1 - (n / 100))
        if (this.answer === true) {
            let left = threshold * (1 - 0.025)
            let right = threshold * (1 - 0.005)
            b = randInt(left, right)
        }
        else {
            let left = threshold * (1 + 0.005)
            let right = threshold * (1 + 0.025)
            b = randInt(left, right)
            if (b === threshold) b++
        }
        this.a = a.toLocaleString('en-US')
        this.b = b.toLocaleString('en-US')
        this.statement = `${n}% 이상 감소하였다.`
        this.reason = ((1.0 - b / a) * 100).toFixed(3) + "%"
    }

    static get() {
        return new DecreaseMore()
    }
}

class IncreaseLess implements Problem {
    a: string
    b: string
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = Math.ceil(randInt(1, 10)) * 10 // 10, 20, ..., 90
        let a = Math.round(Math.pow(10, randFloat(2, 8)))
        let threshold = a * (1 + (n / 100))
        var b: number
        if (this.answer === true) {
            let left = threshold * (1 - 0.025)
            let right = threshold * (1 - 0.005)
            b = randInt(left, right)
            if (b === threshold) b--
        }
        else {
            let left = threshold * (1 + 0.005)
            let right = threshold * (1 + 0.025)
            b = randInt(left, right)
        }
        this.a = a.toLocaleString('en-US')
        this.b = b.toLocaleString('en-US')
        this.statement = `증가량이 ${n}%보다 작다.`
        this.reason = ((b / a - 1.0) * 100).toFixed(3) + "%"
    }

    static get() {
        return new IncreaseLess()
    }
}

class DecreaseLess implements Problem {
    a: string
    b: string
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = randInt(1, 10) * 10 // 10, 20, ..., 90
        let a = Math.round(Math.pow(10, randFloat(2, 8)))
        var b: number
        let threshold = a * (1 - (n / 100))
        if (this.answer === true) {
            let left = threshold * (1 + 0.005)
            let right = threshold * (1 + 0.025)
            b = randInt(left, right)
            if (b === threshold) b++
        }
        else {
            let left = threshold * (1 - 0.025)
            let right = threshold * (1 - 0.005)
            b = randInt(left, right)
        }
        this.a = a.toLocaleString('en-US')
        this.b = b.toLocaleString('en-US')
        this.statement = `감소량이 ${n}%보다 작다.`
        this.reason = ((1.0 - b / a) * 100).toFixed(3) + "%"
    }

    static get() {
        return new DecreaseLess()
    }
}

class MultipleMore implements Problem {
    a: string
    b: string
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = randInt(2, 10) // 2, 3, ..., 9
        let a = Math.round(Math.pow(10, randFloat(2, 8)))
        var b: number
        let threshold = a * n
        if (this.answer === true) {
            let left = threshold * (1 + 0.005)
            let right = threshold * (1 + 0.025)
            b = randInt(left, right)
            if (b === threshold) b++
        }
        else {
            let left = threshold * (1 - 0.025)
            let right = threshold * (1 - 0.005)
            b = randInt(left, right)
        }
        this.a = a.toLocaleString('en-US')
        this.b = b.toLocaleString('en-US')
        this.statement = `${n}배가 넘는다.`
        this.reason = (b / a).toFixed(3) + "배"
    }

    static get() {
        return new MultipleMore()
    }
}

class IncreaseEqual implements Problem {
    a: string
    b: string
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = Math.ceil(randInt(1, 10)) * 10 // 10, 20, ..., 90
        let a = Math.round(Math.pow(10, randFloat(2, 8)))
        var b: number
        let threshold = a * (1 + (n / 100))
        if (this.answer === true) {
            b = Math.round(threshold)
        }
        else {
            if (randBool()) {
                let left = threshold * (1 + 0.005)
                let right = threshold * (1 + 0.025)
                b = randInt(left, right)
                if (b === Math.round(threshold)) b++
            }
            else {
                let left = threshold * (1 - 0.005)
                let right = threshold * (1 - 0.025)
                b = randInt(left, right)
                if (b === Math.round(threshold)) b--
            }
        }
        this.a = a.toLocaleString('en-US')
        this.b = b.toLocaleString('en-US')
        this.statement = `증가량이 ${n}%이다.`
        this.reason = ((b / a - 1.0) * 100).toFixed(3) + "%"
    }

    static get() {
        return new IncreaseEqual()
    }
}

class DecreaseEqual implements Problem {
    a: string
    b: string
    statement: string
    answer: boolean
    reason: string

    constructor() {
        this.answer = Math.random() >= 0.5
        let n = Math.ceil(randInt(1, 10)) * 10 // 10, 20, ..., 90
        let a = Math.round(Math.pow(10, randFloat(2, 8)))
        let threshold = a * (1 - (n / 100))
        var b: number
        if (this.answer === true) {
            b = Math.round(threshold)
        }
        else {
            if (randBool()) {
                let left = threshold * (1 + 0.005)
                let right = threshold * (1 + 0.025)
                b = randInt(left, right)
                if (b === Math.round(threshold)) b++
            }
            else {
                let left = threshold * (1 - 0.005)
                let right = threshold * (1 - 0.025)
                b = randInt(left, right)
                if (b === Math.round(threshold)) b--
            }
        }
        this.a = a.toLocaleString('en-US')
        this.b = b.toLocaleString('en-US')
        this.statement = `감소량이 ${n}%이다.`
        this.reason = ((1.0 - b / a) * 100).toFixed(3) + "%"
    }

    static get() {
        return new DecreaseEqual()
    }
}

class FractionA implements Problem {
    a: string
    b: string
    statement: string
    answer: boolean
    reason: string

    constructor() {
        let a1 = Math.round(Math.pow(10, randFloat(1, 8)))
        let a2 = Math.round(Math.pow(10, randFloat(1, 8)))
        var b1: number, b2: number
        if (randBool()) {
            b1 = Math.round(a1 * Math.pow(10, randFloat(0, 0.06)))
            b2 = Math.round(a2 * Math.pow(10, randFloat(0, 0.06)))
            if (a1 === b1) b1++
            if (a2 === b2) b2++
        }
        else {
            b1 = Math.round(a1 * Math.pow(10, randFloat(-0.06, 0)))
            b2 = Math.round(a2 * Math.pow(10, randFloat(-0.06, 0)))
            if (a1 === b1) b1--
            if (a2 === b2) b2--
        }
        if (a1 / a2 > b1 / b2) this.answer = true
        else this.answer = false
        this.a = `${a1.toLocaleString()} / ${a2.toLocaleString()}`
        this.b = `${b1.toLocaleString()} / ${b2.toLocaleString()}`
        this.statement = `A > B`
        this.reason =
            "A = B * " + ((a1 / a2) / (b1 / b2)).toFixed(3)
    }

    static get() {
        return new FractionA()
    }
}

class FractionB implements Problem {
    a: string
    b: string
    statement: string
    answer: boolean
    reason: string

    constructor() {
        let a1 = Math.round(Math.pow(10, randFloat(1, 8)))
        let a2 = Math.round(Math.pow(10, randFloat(1, 8)))
        var b1: number, b2: number
        if (randBool()) {
            b1 = Math.round(a1 * Math.pow(10, randFloat(0, 0.08)))
            b2 = Math.round(a2 * Math.pow(10, randFloat(0, 0.08)))
            if (a1 === b1) b1++
            if (a2 === b2) b2++
        }
        else {
            b1 = Math.round(a1 * Math.pow(10, randFloat(-0.08, 0)))
            b2 = Math.round(a2 * Math.pow(10, randFloat(-0.08, 0)))
            if (a1 === b1) b1--
            if (a2 === b2) b2--
        }
        if (a1 / a2 < b1 / b2) this.answer = true
        else this.answer = false
        this.a = `${a1.toLocaleString()} / ${a2.toLocaleString()}`
        this.b = `${b1.toLocaleString()} / ${b2.toLocaleString()}`
        this.statement = `A < B`
        this.reason =
            "A = B * " + ((a1 / a2) / (b1 / b2)).toFixed(3)
    }

    static get() {
        return new FractionB()
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
        FractionA.get,
        FractionB.get,
    ]
    return gen[randInt(0, gen.length)]()
}