const Board = require('./board')
const Display = require('./display')
let isPaused = false
const boardSize = 8

//debug
let debug = {}

Board.reset(boardSize)
Board.hover({ row: 0, col: 0 })

Display.writeLine('\x1b[36mLoading...\x1b[0m')

setInterval(() => {
    if (isPaused) Display.rewriteLine(Board.render(debug), 2)
}, 73)

Display.waitForKey((key) => {
    debug.keyname = key.name
    if (key.name === 'return') {
        if (Board.getIsMoving()) {
            Board.move()
        } else {
            Board.enterMovingState()
        }
    }
    const destinationPoint = Board.moveHover(key.name)
})

const start = () => {
    isPaused = true
}

module.exports = {
    start
}
