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
    }

    canPlace(ship, row, col, vertical) {
        let canPlaceShip = true

        //goes out of board
        for (let i = 0; i < ship.length; i++) {
            if ((row + i) > 10) {
                canPlaceShip = false
                return canPlaceShip
            }
        }

        for (let j = 0; j < ship.length; j++) {
            if ((col + j) > 10) {
                canPlaceShip = false
                return canPlaceShip    
            }
        }

        if (vertical) {
            for (let i = 0; i < ship.length; i++) {
                if (this.board[row + i][col].hasShip === true) {
                    canPlaceShip = false
                    return canPlaceShip
                }
            }
        } else {
            for (let j = 0; j < ship.length; j++) {
                if (this.board[row][col + j].hasShip === true) {
                    canPlaceShip = false
                    return canPlaceShip
                }
            }
        }
    }
    
}

export default Gameboard