import { errorHandler } from "./placeShipsText"

const StatusArea = document.querySelector('[data-id="status"]')

function attackClick(player, gameboard, grid, ai) {
    if (ai) {
        player.randomAttack(gameboard)
    } else {
        grid.addEventListener('click', (e) => {
            if (e.target.classList.contains('cell')) {
                if (gameboard.canAttack(
                    parseInt(e.target.dataset.ycoord),
                    parseInt(e.target.dataset.xcoord)
                ) === true) {
                    player.attack(
                        parseInt(e.target.dataset.ycoord),
                        parseInt(e.target.dataset.xcoord),
                        gameboard
                    )
                } else {
                    errorHandler(StatusArea, 3)
                    attackByPlayer(gameboard, grid)
                }
            } else {
                errorHandler(StatusArea, 2)
                attackByPlayer(gameboard, grid)
            }
        }, {
            once: true
        })
    }
}

function attackByAI(gameboard, grid) {
    
}