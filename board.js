const endOfLine = require('os').EOL;
const Display = require('./display')
const Char = require('./char')

let board = undefined
const emptyChar = '■'
let hoverPoint = null
let movablePoint = []
let boardSize = 0

let isMoving = false
let movingHoverPoint = null

const reset = (size) => {
    boardSize = size
    board = new Array(boardSize).fill('').map(x=>new Array(boardSize).fill(emptyChar))
    board[0] = ['R','N','B','Q','K','B','N','R']
    board[1] = ['P','P','P','P','P','P','P','P']
    board[board.length-2] = ['P','P','P','P','P','P','P','P']
    board[board.length-1] = ['R','N','B','Q','K','B','N','R']
}

const move = () => {
    if(isMoving){
        const movingChar = board[hoverPoint.row][hoverPoint.col]
        board[hoverPoint.row][hoverPoint.col] = emptyChar
        board[movingHoverPoint.row][movingHoverPoint.col] = movingChar
        isMoving = false
    }
}

const hover = (point) => {
    if(isMoving)
    {
        movingHoverPoint = point
    } else {
        hoverPoint = point
        movablePoint = Char.getMovablePoints(board[hoverPoint.row][hoverPoint.col], hoverPoint)
    }
}

const moveHover = (direction) => {
    let currHoverPoint = getCurrHoverPoint()
    const destinationPoint = { ...currHoverPoint }
    switch (direction) {
        case 'left': destinationPoint.col = Math.max(currHoverPoint.col - 1, 0); break;
        case 'up': destinationPoint.row = Math.max(currHoverPoint.row - 1, 0); break;
        case 'right': destinationPoint.col = Math.min(currHoverPoint.col + 1, boardSize - 1); break;
        case 'down': destinationPoint.row = Math.min(currHoverPoint.row + 1, boardSize - 1); break;
    }
    
    hover(destinationPoint)
}

const enterMovingState = () => {
    isMoving = true
    movingHoverPoint = {...hoverPoint}
}

const getIsMoving = () => {
    return isMoving
}

const render = (debug) => {
    debug = {
        ...debug,
        movablePoint,
        isMoving,
        movingHoverPoint
    }

    let currHoverPoint = getCurrHoverPoint()

    return board
    .map((cols,row) => (currHoverPoint && row === currHoverPoint.row) ? cols.map((char,col)=>(currHoverPoint && col === currHoverPoint.col) ? Display.applyColor(char, Display.Color.Reverse) : char) : cols)
    .map((cols,row) => (movablePoint.length > 0 && movablePoint.some(m => m.row === row)) ? cols.map((char,col)=>(movablePoint.length > 0 && movablePoint.some(m => m.col === col)) ? Display.applyColor(char, Display.Color.FgYellow) : char) : cols)
    .reduce((p, c) => p + c.join('|') + endOfLine, '')
    + JSON.stringify(debug)
}

const getCurrHoverPoint = () => isMoving ? movingHoverPoint : hoverPoint

module.exports = {
    reset, render, move, hover, moveHover, enterMovingState, getIsMoving
}