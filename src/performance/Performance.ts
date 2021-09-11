export default class Performance {
    performance = {
        start: 0,
        finish: 0,
        result: 0,
    }

    start(text?: string) {
        this.performance.start = Date.now()
        this.performance.finish = 0
        this.performance.result = 0
        if (text) console.log(text)
    }

    stop(text?: string) {
        this.performance.finish = Date.now()
        if (text) {
            console.log(text)
            console.log(`Spent ${this.result()} s`)
        }
    }

    result() {
        this.performance.result = Math.round((this.performance.finish - this.performance.start) / 1000)
        return this.performance.result
    }
}