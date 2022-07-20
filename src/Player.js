class Player {
    constructor(name) {
        this.name = name
    }

    attack(row, col, gameboard) {
        if (gameboard.board[row][col].canHit === false) {
            return
        } else {
            gameboard.receiveAttack(row, col)
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
        gameboard.receiveAttack(row, col)
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