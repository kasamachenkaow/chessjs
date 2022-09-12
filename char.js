const getMovablePoints = (type, currPoint) => {
    switch(type){
        case 'N': {
            return []
        } 
        case 'Q': {
            return []
        }
        case 'K': {
            return []
        }
        case 'R': {
            return []
        }
        case 'B': {
            return []
        }
        case 'P': {
            return [{row: currPoint.row-1, col: currPoint.col}]
        } 
        default: {
            return []
        }
    }
}

const newChar = (char) => {
    return {

    }
}

module.exports = {
    getMovablePoints
}