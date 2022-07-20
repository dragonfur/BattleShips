import Player from './Player.js'
import Gameboard from './Gameboard.js'
import Ship from './Ship.js'
import { errorHandler, shipCreationHandler, textTalk } from './DomManip.js'

//ships
const AvailableShips = [
    {
        name: 'Carrier',
        length: 5
    },
    {
        name: 'Battleship',
        length: 4
    },
    {
        name: 'Cruiser',
        length: 3
    },
    {
        name: 'Submarine',
        length: 3
    },
    {
        name: 'Destroyer',
        length: 2
    }
]

//game loop
const StartGame = document.querySelector('[data-id="start"]')
const StatusArea = document.querySelector('[data-id="status"]')
const enterPlayerOne = document.querySelector('[data-id="playerOneNameSelector"]')
const enterName = document.querySelector('[data-id="enterName"]')
const nameChosenPlayerOne = document.querySelector('[data-id="nameChosenPlayerOne"]')
const playerOneName = document.querySelector('[data-id="playerGridName"]')

//////player grids
const playerOneGrid = document.querySelector('[data-id="gridPlayerOne"]')
const playerTwoGrid = document.querySelector('[data-id="gridPlayerTwo"]')

//create game
StartGame.addEventListener('click', () => {
    StartGame.style.display = "none"
    enterPlayerOne.style.display = "flex"
})

let playerOne

enterName.addEventListener('click', () => {
    let namePlayerOne = 'mate'
    if (nameChosenPlayerOne.value === "") {
        playerOneName.textContent = 'YOUR FLEET'
    } else {
        namePlayerOne = nameChosenPlayerOne.value
        playerOneName.textContent = `${namePlayerOne.toUpperCase()}'S FLEET`
        nameChosenPlayerOne.value = ""
    }
    enterPlayerOne.style.display = "none"
    StatusArea.textContent = `Time to place your ships, ${namePlayerOne}.`
    textTalk(StatusArea)
    
    addGrid(playerOneGameboard, playerOneGrid, "player1")
    addGrid(playerTwoGameboard, playerTwoGrid, "player2")

    playerOne = new Player(`${namePlayerOne}`)
})

let playerOneGameboard = new Gameboard
let playerTwoGameboard = new Gameboard
let playerTwo = new Player("Mr. Bot")

////main player

///gameboard
function addGrid(gameboard, grid, player) {
    for (let i = 0; i < gameboard.board.length; i++) {
            for (let j = -1; j < gameboard.board.length; j++) {
                if (player === "player1") {
                    if (j === -1) {
                        const xCoord = document.createElement('div')
                        xCoord.textContent = `${i +1}`
                        xCoord.setAttribute('class', 'cellCoord')

                        grid.appendChild(xCoord)
                    } else {
                        const cell = document.createElement('div')
                        cell.setAttribute('class', 'cell')
                        cell.setAttribute('data-yCoord', i)
                        cell.setAttribute('data-xCoord', j)
                        grid.appendChild(cell)    
                    }
                } else if (player === "player2") {
                    if (j < 9) {
                        const cell = document.createElement('div')
                        cell.setAttribute('class', 'cell')
                        cell.setAttribute('data-yCoord', i)
                        cell.setAttribute('data-xCoord', j +1)
                        grid.appendChild(cell)
                    } else {
                        const xCoord = document.createElement('div')
                        xCoord.textContent = `${i +1}`
                        xCoord.setAttribute('class', 'cellCoord')
                        grid.appendChild(xCoord)
                    }
            }
        }
    }
}

function createShips(shipNumber) {
    if (shipNumber === 5) {
        doneShipPlacement()
        return
    }
    const ship = new Ship(AvailableShips[shipNumber].name, AvailableShips[shipNumber].length)
    shipCreationHandler(StatusArea, ship)
}

let z = 1
function timeToPlace(ship) {
    playerOneGrid.addEventListener('click', (e) => {
        if (e.target.classList.contains('cell')) {
            if (playerOneGameboard.canPlace(ship, parseInt(e.target.dataset.ycoord), parseInt(e.target.dataset.xcoord), false) === true) {
                playerOneGameboard.placeShip(ship, parseInt(e.target.dataset.ycoord), parseInt(e.target.dataset.xcoord), false)
                createShips(z)
                console.log(playerOneGameboard.board)
                z++
            } else {
                errorHandler(StatusArea, 1)
                timeToPlace(ship)
            }
        } else {
            errorHandler(StatusArea, 0)
            timeToPlace(ship)
        }
    }, {once: true})
}

////AI placement

function doneShipPlacement() {
    console.log(playerOne)
    StatusArea.textContent = "Alright, you're all set mate!"

    //AI random placement
    AvailableShips.forEach(ship => {
        playerTwo.randomPlacement(playerTwoGameboard, ship)
    })
    console.log(playerTwoGameboard)
}

export { timeToPlace, createShips }