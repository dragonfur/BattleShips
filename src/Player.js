class Player {

    constructor(name) {
        this.name = name
        this.currentrow
        this.currentcol
    }

    attack(row, col, gameboard) {
        if (gameboard.board[row][col].canHit === false) {
            return false
        } else {
            const success = gameboard.receiveAttack(row, col)
            if (success) {
                return true
            } else {
                return false
            }
        }
    }

    randomAttack(gameboard) {
        let row
        let col
        do {
            row = Math.floor(Math.random() * 10)
            col = Math.floor(Math.random() * 10)
        }
        while (gameboard.board[row][col].canHit === false)
        const success = gameboard.receiveAttack(row, col)
        this.grabCoords(row,col)
        if (success) {
            return true
        } else {
            return false
        }
    }

    grabCoords(row, col) {
        if (row === undefined || col === undefined) {
            return {
                y: this.currentrow,
                x: this.currentcol
            }
        } else {
            this.currentrow = row
            this.currentcol = col
            return
        }
    }

    randomPlacement(gameboard, ship) {
        let row
        let col
        let vertical
        do {
            row = Math.floor(Math.random() * 10)
            col = Math.floor(Math.random() * 10)
            vertical = this.verticalRandomizer()
        }
        while (gameboard.canPlace(ship, parseInt(row), parseInt(col), vertical) === false)
        gameboard.placeShip(ship, parseInt(row), parseInt(col), vertical)
    }

    verticalRandomizer() {
        const IsVertical = Math.random() * 1
        if (IsVertical >= 0.5) {
            return true
        } else if (IsVertical < 0.5) {
            return false
        }
    }
}

export default Player