import Gameboard from '../Gameboard.js'
import Ship from '../Ship.js'

describe('Test the functions of gameboard', () => {
    let gameboard
    let ship
    let testGameBoard = []

    beforeEach(() => {
        gameboard = new Gameboard
        ship = new Ship('Carrier', 4)

        for (let row = 0; row < 10; row++){
            testGameBoard[row] = []
            for (let col = 0; col < 10; col++) {
                testGameBoard[row][col] = {
                    canHit: true
                }
            }
        }
    })
    
    test('Test gameboard size creation', () => {
        gameboard.createGrid(10)
        expect(gameboard.board).toEqual(testGameBoard)
    })

    test('Placement of ships', () => {
        gameboard.placeShip(ship, 1, 1, false)
        testGameBoard[1][1] = {
            ShipInfo: ship,
            hasShip: true,
            canHit: true,
        }
        testGameBoard[1][2] = {
            ShipInfo: ship,
            hasShip: true,
            canHit: true,
        }
        testGameBoard[1][3] = {
            ShipInfo: ship,
            hasShip: true,
            canHit: true,
        }
        testGameBoard[1][4] = {
            ShipInfo: ship,
            hasShip: true,
            canHit: true,
        }
        expect(gameboard.board).toEqual(testGameBoard)
    })

    test('Can place ship', () => {
        expect(gameboard.canPlace(ship, 0, 0, false)).toBe(true)
    })

    test("Can't overlap ships", () => {
        gameboard.placeShip(ship, 2, 2, true)
        expect(gameboard.canPlace(ship, 2, 1, false)).toBe(false)
    })

    test("Can't place ships outside of boundary", () => {
        expect(gameboard.canPlace(ship, 10, 10, false)).toBe(false)
    })

    test('Hits a ship', () => {
        gameboard.placeShip(ship, 1, 1, false)
        gameboard.receiveAttack(1, 1)
        expect(gameboard.board[1][1].ShipInfo.hits.includes(1)).toBe(true)
    })

    test("Can't attack the same square", () => {
        gameboard.receiveAttack(1, 1)
        expect(gameboard.canAttack(1, 1)).toBe(false)
    })

    test('Receives multiple hits', () => {
        gameboard.placeShip(ship, 1, 1, false)
        gameboard.receiveAttack(1, 1)
        gameboard.receiveAttack(1, 2)
        expect(gameboard.board[1][2].ShipInfo.hits).toEqual(
            [1, 2]
        )
    })

    test('Game is over', () => {
        gameboard.placeShip(ship, 1, 1, false)
        gameboard.receiveAttack(1, 1)
        gameboard.receiveAttack(1, 2)
        gameboard.receiveAttack(1, 3)
        gameboard.receiveAttack(1, 4)
        expect(gameboard.isGameOver()).toBe(true)
    })

})