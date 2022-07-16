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
}

export default Player