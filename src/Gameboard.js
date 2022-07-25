import Ship from './Ship.js'
import Player from './Player.js'

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
        
        if (this.canPlace(Ship, row, col, vertical) === false) {
            return
        }

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
        this.board[row][col].canHit = false
        if (this.board[row][col].hasShip === true) {
            let hitindex = (this.board[row][col].ShipInfo.hits.length) + 1
            this.board[row][col].ShipInfo.hit(hitindex)
            return true
        } else {
            return false
        }
    }

    canAttack(row, col) {
        if (this.board[row][col].canHit === false) {
            return false
        } else if (this.board[row][col].canHit === true) {
            return true
        } else {
            return
        }
    }

    isGameOver() {
        let gameOver
        for (let i = 0; i < this.board.length; i++ ) {
            for (let j = 0; j < this.board[0].length; j++) {
                if (this.board[i][j].hasShip === true) {
                    if (!this.board[i][j].ShipInfo.isSunk()) {
                        return false
                    } else {
                        gameOver = true
                    }
                }
            }
        }
        return gameOver
    }

    canPlace(ship, row, col, vertical) {
        if (vertical) {
            if ((parseInt(row) + parseInt(ship.length)) > 10) {
                return false
            }
        } else {
            if ((col + ship.length) > 10) {
                return false
            }
        }


        if (vertical) {
            for (let i = 0; i < ship.length; i++) {
                if ("hasShip" in this.board[row+i][col]) {
                    if (this.board[row + i][col].hasShip === true) {
                        return false
                    }
                }
            }
        } else {
            for (let j = 0; j < ship.length; j++) {
                if ("hasShip" in this.board[row][col+j]) {
                    if (this.board[row][col + j].hasShip === true) {
                        return false
                    }
                } 
            }
        }
        return true
    }
}

export default Gameboard