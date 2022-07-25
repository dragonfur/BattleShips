import { createNewBoards, createShips, timeToPlace, visualizer } from './index'
import Ship from './Ship'

function textTalk(object) {
    setTimeout(() => {
        object.textContent = "Let's start with your biggest ship, the Carrier."    
    }, 3000)
    setTimeout(() => {
        createShips(0)
    }, 6000)
}

function errorHandler(object, number, name) {
switch (number) {
    case 0 :
        object.textContent = `That's not the board, ${name}.`
        break
    case 1 :
        object.textContent = `You can't place it there, ${name}.`
        break
    case 2 :
        object.textContent = `We know there's nothing there, ${name}! Pick a different spot.`
        break
    }
}

function shipCreationHandler(object, shiptype) {
    if (shiptype.name === 'Carrier') {
        object.textContent = "Where would you like to place your Carrier?"
        timeToPlace()
        visualizer()
    } 
    else if (shiptype.name === 'Battleship') {
        object.textContent = "How about the Battleship?"
        timeToPlace()
        visualizer()
    } 
    else if (shiptype.name === 'Cruiser') {
        object.textContent = 'How about the Cruiser ship?'
        timeToPlace()
        visualizer()
    } 
    else if (shiptype.name === 'Submarine') {
        object.textContent = "Can't forget about our Submarines now, can we?"
        timeToPlace()
        visualizer()
    } 
    else if (shiptype.name === 'Destroyer') {
        object.textContent = "Last, but not least, our 'Destroyer'?"
        timeToPlace()
        visualizer()
    } 
    else {
        return
    }
}

function changeDirection(object) {
    const directionalizer = document.createElement('button')
    directionalizer.classList.add('changeDirection')
    object.appendChild(directionalizer)
    return directionalizer
}

function startGameText(object, name) {
    object.textContent = `Alright, you're all set, ${name}.`
    setTimeout(() => {
        object.textContent = "You're up for the first shot, let's get them!"
    }, 1500)
    setTimeout(() => {
        object.textContent = ""
    }, 4000)
}

function statusShipSunk(object, shipName) {
    object.textContent = `Ship down! You have sunk their ${shipName}.`
    setTimeout(() => {
        object.textContent = ""
    }, 4000)
}

function endGame(object, winnername, losername) {
    object.textContent = `${winnername} has sunk all of ${losername}'s ships.`
    const restart = document.createElement("button")
    restart.textContent = "Play again?"
    restart.classList.add('Start')
    restart.addEventListener('click', () => {
        createNewBoards()
    })
    setTimeout(() => {
        object.appendChild(restart)
    }, 4000)
}

export { textTalk, errorHandler, shipCreationHandler, changeDirection, startGameText, statusShipSunk, endGame }