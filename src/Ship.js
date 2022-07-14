class Ship {
    constructor (name, length) {
        this.name = name
        this.length = length
        this.hits = []
        this.sunkShip = false
    }

    hit(number) {
        if (this.hits.includes(number)) {
            return
        } else {
            this.hits.push(number)
        }
    }

    isSunk() {
        if (this.hits.length === this.length) {
            return this.sunkShip = true
        }
    }
}

export default Ship