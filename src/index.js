import Player from './Player.js'
import Gameboard from './Gameboard.js'
import Ship from './Ship.js'
import { changeDirection, endGame, errorHandler, shipCreationHandler, startGameText, statusShipSunk, textTalk } from './StatusManip.js'
import { attackClick,  removeListeners } from './gameLoop.js'

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
        namePlayerOne = "Captain"
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

function createNewBoards() {
    playerOneGameboard = new Gameboard
    playerTwoGameboard = new Gameboard
    cleanBoards()

    addGrid(playerOneGameboard, playerOneGrid, "player1")
    addGrid(playerTwoGameboard, playerTwoGrid, "player2")

    createShips(0)
    z = 1
    vertical = false
    currentplayer = "playerOne"
    return
}

function cleanBoards() {
    playerOneGrid.innerHTML = ""
    for (let i = 0; i < 11; i++) {
        const ycoordcells = document.createElement('div')
        ycoordcells.classList.add('cellCoord')
        ycoordcells.classList.add('yCoord')
        if (i === 0) {
            ycoordcells.textContent = ""
            playerOneGrid.appendChild(ycoordcells)
        } else {
            ycoordcells.textContent = `${String.fromCharCode(64+i)}`
            playerOneGrid.appendChild(ycoordcells)
        }
    }

    playerTwoGrid.innerHTML = ""
    for (let j = 0; j < 11; j++) {
        const ycoordcells = document.createElement('div')
        ycoordcells.classList.add('cellCoord')
        ycoordcells.classList.add('yCoord')
        if (j === 10) {
            ycoordcells.textContent = ""
            playerTwoGrid.appendChild(ycoordcells)
        } else {
            ycoordcells.textContent = `${String.fromCharCode(65+j)}`
            playerTwoGrid.appendChild(ycoordcells)
        }
    }
}

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
    if (parseInt(shipNumber) === AvailableShips.length) {
        doneShipPlacement()
        return
    }
    let ship = new Ship(AvailableShips[shipNumber].name, AvailableShips[shipNumber].length)
    shipCreationHandler(StatusArea, ship)
    setCurrentShip(ship)
}

let z = 1
let vertical = false
let currentShip
let coords
let previousShip

function setCurrentShip(shipNow) {
    return currentShip = shipNow
}

function setDirection() {
    return vertical = !vertical
}

function setDirectionText(vertical) {
    if (vertical) {
       return "Vertical"
    } else {
        return "Horizontal"
    }
}

function setCoords(currentCoords) {
    return coords = currentCoords
}

function setPreviousShip() {
    return previousShip = currentShip
}

function timeToPlace() {
    const directionButton = changeDirection(StatusArea)
    directionButton.textContent = setDirectionText(vertical)
    directionButton.addEventListener('click', () => {
        setDirection()
        directionButton.textContent = setDirectionText(vertical)
    })
    playerOneGrid.addEventListener('click', placement, {once: true})
}

function placement(e) {
    if (e.target.classList.contains('cell')) {
        if (playerOneGameboard.canPlace(currentShip, parseInt(e.target.dataset.ycoord), parseInt(e.target.dataset.xcoord), vertical) === true) {
            setColor(e)
            playerOneGameboard.placeShip(currentShip, parseInt(e.target.dataset.ycoord), parseInt(e.target.dataset.xcoord), vertical)
            clearEventListeners()
            createShips(z)
            z++
        } else {
            errorHandler(StatusArea, 1, playerOne.name)
            timeToPlace()
        }
    } else {
        errorHandler(StatusArea, 0, playerOne.name)
        timeToPlace()
    }
}

function setColor(e) {
    e.target.classList.add(`${previousShip.name.toLowerCase()}`)
    if (vertical) {
        for (let j = 0; j < previousShip.length; j++) {
            const siblingCells = document.querySelector(`[data-ycoord="${parseInt(coords.row) + j}"][data-xcoord="${parseInt(coords.col)}"]`)
            siblingCells.classList.add(`${previousShip.name.toLowerCase()}`)
        }
    } else {
        for (let i = 0; i < previousShip.length; i++) {
            const siblingCells = document.querySelector(`[data-ycoord="${parseInt(coords.row)}"][data-xcoord="${parseInt(coords.col) + i}"]`)
            siblingCells.classList.add(`${previousShip.name.toLowerCase()}`)
        }
    }
}

function visualizer() {
    playerOneGrid.addEventListener('mouseover', visualizeplacement)
}

function visualizeplacement(e) {
    if (e.target.classList.contains('cell')) {
        if (playerOneGameboard.canPlace(currentShip, parseInt(e.target.dataset.ycoord), parseInt(e.target.dataset.xcoord), vertical) === true) {
            e.target.classList.add('selected')
            setCoords(coords = {
                row: e.target.dataset.ycoord,
                col: e.target.dataset.xcoord
            })

            if (vertical) {
                for (let j = 0; j < currentShip.length; j++) {
                    const siblingCells = document.querySelector(`[data-ycoord="${parseInt(coords.row) + j}"][data-xcoord="${parseInt(coords.col)}"]`)
                    siblingCells.classList.add('selected')
                }
            } else {
                for (let i = 0; i < currentShip.length; i++) {
                    const siblingCells = document.querySelector(`[data-ycoord="${parseInt(coords.row)}"][data-xcoord="${parseInt(coords.col) + i}"]`)
                    siblingCells.classList.add('selected')
                }    
            }
            setPreviousShip()
            e.target.addEventListener('mouseleave', clearvisualize)
        }
    }
}

function clearvisualize(e) {
    e.target.classList.remove('selected')

    if (vertical) {
        for (let j = 0; j < previousShip.length; j++) {
            const siblingCells = document.querySelector(`[data-ycoord="${parseInt(coords.row) + j}"][data-xcoord="${parseInt(coords.col)}"]`)
            siblingCells.classList.remove('selected')
        }
    } else {
        for (let i = 0; i < previousShip.length; i++) {
            const siblingCells = document.querySelector(`[data-ycoord="${parseInt(coords.row)}"][data-xcoord="${parseInt(coords.col) + i}"]`)
            siblingCells.classList.remove('selected')
        }
    }
}

function clearEventListeners() {
    playerOneGrid.removeEventListener('mouseover', visualizeplacement)
    playerOneGrid.removeEventListener('mouseleave', clearvisualize)
}

////AI placement

function doneShipPlacement() {
    startGameText(StatusArea, playerOne.name)

    //AI random placement
    AvailableShips.forEach(ship => {
        let newShip = new Ship(ship.name, ship.length)
        playerTwo.randomPlacement(playerTwoGameboard, newShip)
    })

    GameLooper()
}

let currentplayer = "playerOne"

function checkGameOver(gameboard) {
    return gameboard.isGameOver()
}

function GameLooper() {
    let isGameDone
    if (currentplayer === "playerOne") {
        isGameDone = checkGameOver(playerOneGameboard)

    } else {
        isGameDone = checkGameOver(playerTwoGameboard)
    }
    
    if (isGameDone) {
        if (currentplayer === "playerOne") {
            endGame(StatusArea, playerTwo.name, playerOne.name)
        } else {
            endGame(StatusArea, playerOne.name, playerTwo.name)
        }
        removeListeners(playerTwoGrid)
        return
    } else {
        if (currentplayer === "playerOne") {
            currentplayer = "playerTwo"
            attackClick(
                playerOne,
                playerTwoGameboard,
                playerTwoGrid,
                StatusArea,
                false
            )
            return
        } else if (currentplayer === "playerTwo") {
            if (playerTwo.name === "Mr. Bot") {
                currentplayer = "playerOne"
                attackClick(
                    playerTwo,
                    playerOneGameboard,
                    playerOneGrid,
                    StatusArea,
                    true 
                )
                return
            } else {
                currentplayer = "playerOne"
                attackClick(
                    playerTwo,
                    playerOneGameboard,
                    playerOneGrid,
                    StatusArea,
                    false
                )
                return
            }
        }
    }
}

function checkShipSunk(gameboard, row, col) {
    const shipIsSunkReminder = gameboard.board[row][col].ShipInfo.isSunk()
    if (shipIsSunkReminder) {
        statusShipSunk(StatusArea, gameboard.board[row][col].ShipInfo.name)
    }
}


export { timeToPlace, createShips, visualizer, GameLooper, checkShipSunk, createNewBoards }