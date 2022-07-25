import { checkShipSunk, GameLooper } from "."
import { errorHandler } from "./StatusManip"
import Player from './Player'

let currentplayer
let currentgameboard
let currentgrid
let currentobject

function attackClick(player, gameboard, grid, object, ai) {
    console.log(gameboard)
    currentplayer = player
    currentgameboard = gameboard
    currentgrid = grid
    currentobject = object
    if (ai) {
        const success = player.randomAttack(currentgameboard)
        const coords = player.grabCoords()
        const cell = document.querySelector(
            `[data-ycoord='${coords.y}'][data-xcoord='${coords.x}']`
        )
        if (success) {
            console.log("PLAYER 2 HIT YOU")
            cell.setAttribute('id', 'hit')
            checkShipSunk(currentgameboard, coords.y, coords.x)
            GameLooper()
            return
        } else {
            console.log("PLAYER 2 MISSED YOU")
            cell.setAttribute('id', 'miss')
            GameLooper()
            return
        }
    } else {
        grid.addEventListener('click', playClick)
    }
}

function playClick(e) {
    if (e.target.classList.contains('cell')) {
        if (currentgameboard.canAttack(
            parseInt(e.target.dataset.ycoord),
            parseInt(e.target.dataset.xcoord)
        ) === true) {
            const success = currentplayer.attack(
                parseInt(e.target.dataset.ycoord),
                parseInt(e.target.dataset.xcoord),
                currentgameboard
            )
            if (success) {
                console.log("YOU HIT PLAYER 2")
                e.target.setAttribute('id', 'hit')
                checkShipSunk(currentgameboard, e.target.dataset.ycoord, e.target.dataset.xcoord)
                GameLooper()
            } else {
                console.log("YOU MISSED PLAYER 2")
                GameLooper()
                e.target.setAttribute('id', 'miss')
            }
        } else {
            errorHandler(currentobject, 2, currentplayer.name)
            attackClick(currentplayer, currentgameboard, currentgrid, currentobject, false)
        }
    } else {
        errorHandler(currentobject, 1, currentplayer.name)
        attackClick(currentplayer, currentgameboard, currentgrid, currentobject, false)
    }
}

function removeListeners(grid) {
    grid.removeEventListener('click', playClick)
}

export {attackClick, removeListeners}