import Ship from "../Ship"

describe('Ship tests', () => {
    let ship

    beforeEach(() => {
        ship = new Ship('Carrier', 4)
    })

    test('Initializes a new ship', () => {
        expect(ship).toEqual({
            name: 'Carrier',
            length: 4,
            hits: [],
            sunkShip: false
        })
    })

    test('Tests for hit', () => {
        ship.hit(1)
        expect(ship.hits).toContain(1)
    })

    test('Tests for ship sunk', () => {
        ship.hit(0)
        ship.hit(1)
        ship.hit(2)
        ship.hit(3)
        expect(ship.isSunk()).toBe(true)
    })

    test('Tests for non-accepting the same values', () => {
        ship.hit(1)
        ship.hit(1)
        ship.hit(1)
        expect(ship.hits).toEqual(
            [1]
        )
    })
})