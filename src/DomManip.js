import HandleCoords, { createShips, timeToPlace } from './index'
import Ship from './Ship'

function textTalk(object) {
    setTimeout(() => {
        object.textContent = "Let's start with your biggest ship, the Carrier."
        createShips(0)
    }, 1000)
}

function errorHandler(object, number) {
switch (number) {
    case 0 :
        object.textContent = "That's not the board, mate."
        break
    case 1 :
        object.textContent = "You can't place it there, mate."
        break
    case 2 :
        object.textContent = "We know there's nothing there, captain! Pick a different spot."
        break
    }
}

function shipCreationHandler(object, shiptype) {
switch (shiptype.name) {
    case 'Carrier' :
        object.textContent = "Where would you like to place your Carrier?"
        timeToPlace(shiptype)
        break
    case 'Battleship' :
        object.textContent = "How about the Battleship?"
        timeToPlace(shiptype)
        break
    case 'Cruiser' :
        object.textContent = 'How about the Cruiser ship?'
        timeToPlace(shiptype)
        break
    case 'Submarine' :
        object.textContent = "Can't forget about our submarines now, can we?"
        timeToPlace(shiptype)
        break
    case 'Destroyer' :
        object.textContent = "Last, but not least, our 'Destroyer'?"
        timeToPlace(shiptype)
        break
    }
}



export { textTalk, errorHandler, shipCreationHandler }