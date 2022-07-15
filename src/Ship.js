class Ship {
    constructor (name, length) {
        this.name = name
        this.length = length
        this.hits = []
    }

    hit(number) {
        if (this.hits.includes(number)) {
            return
        } else {
            this.hits.push(number)
        }
    }

    isSunk() {
        return this.hits.length === this.length
    }
}

export default Ship