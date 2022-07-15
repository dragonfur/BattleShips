import Ship from './Ship.js'

class Gameboard {

    constructor() {
        this.board = []
        this.createGrid(10)
    }

    createGrid(size) {
        for (let row = 0; row < size; row++) {
            this.board[row] = []
            for (let col = 0; col < size; col++) {
                this.board[row][col] = {
                    canHit: true
                }
            } 
        }
    }

    placeShip(Ship, row, col, vertical) {
        
        if (vertical) {
            for (let i = 0; i < Ship.length; i++)
            this.board[row + i][col] = {
                ShipInfo: Ship,
                hasShip: true,
                canHit: true,
            }
        } else {
            for (let j = 0; j < Ship.length; j++) {
                this.board[row][col + j] = {
                    ShipInfo: Ship,
                    hasShip: true,
                    canHit: true,
                }
            }
        }
    }

    receiveAttack(row, col) {
        
        if (this.board[row][col].canHit === true) {
            this.board[row][col].canHit = false
            if (this.board[row][col].hasShip === true) {
                let hitindex = (this.board[row][col].ShipInfo.hits.length) + 1
                this.board[row][col].ShipInfo.hit(hitindex)
            }
        } else {
            return
        }
    }

    isGameOver() {
        let done = false
        for (let i = 0; i < this.board.length; i++ ) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[i][j].hasShip === true) {
                    if (this.board[i][j].ShipInfo.isSunk()) {
                        done = true
                        return done
                    } else {
                        done = false
                        return done
                    }
                }
            }
        }
        return done
    }
}

export default Gameboard