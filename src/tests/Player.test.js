import Player from '../Player.js'
import Gameboard from '../Gameboard.js'
import Ship from '../Ship.js'

describe('Tests player factory functions', () => {
    let player
    let gameboard
    let ship


    beforeEach(() => {
        player = new Player('Player 1')
        gameboard = new Gameboard()
        ship = new Ship('Carrier', 4)
    })

    test('Creates a player object', () => {
        expect(player).toEqual({
            name: 'Player 1'
        })
    })

    test('Attacks the enemy gameboard', () => {
        gameboard.placeShip(ship, 1, 1, false)
        player.attack(1, 1, gameboard)
        player.attack(1, 2, gameboard)
        player.attack(1, 3, gameboard)
        player.attack(1, 4, gameboard)
        expect(gameboard.isGameOver()).toBe(true)
    })

    test('Randomly attacks', () => {
        gameboard.placeShip(ship, 1, 1, false)
        for (let i = 0; i < 100; i++) {
            player.randomAttack(gameboard)
        }
        expect(gameboard.isGameOver()).toBe(true)
    })
})