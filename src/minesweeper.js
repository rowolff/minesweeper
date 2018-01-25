// helpers

const generateBoard = (numRows, numCols, colContent) => {
	const board = []
	for (i = 0; i < numRows; i++) {
		const row = []
		for (j = 0; j < numCols; j++) {
			row.push(colContent)
		}
		board.push(row)
	}
	return board
}

// classes

class Game {
  constructor (numRows, numCols, numBombs) {
    this._board = new Board(numRows, numCols, numBombs)
  }

  playMove (rowIndex, colIndex) {
    this._board.flipTile(rowIndex, colIndex)
    if (this._board.playerBoard[rowIndex][colIndex] === 'B') {
      console.log('Boom! Game over! Final board:')
    } else if (!this._board.hasSafeTiles()) {
      console.log('Congrats, you won!!! Final board:')
    } else {
      console.log('Keep going! Current board:')
    }
    this._board.print()
  }
}


class Board {
  constructor (numRows, numCols, numBombs) {
    this._numBombs = numBombs
    this._numTiles = numRows * numCols
    this._playerBoard = Board.generatePlayerBoard(numRows, numCols)
    this._bombBoard = Board.generateBombBoard(numRows, numCols, numBombs)
  }

  get playerBoard () {
    return this._playerBoard
  }

  flipTile (rowIndex, colIndex) {

  	if (this._playerBoard[rowIndex][colIndex] !== ' ') {
  		console.log('This tile has already been flipped')
  		return
  	}

  	// flip "B" or number of adjacent bombs
  	if (this._bombBoard[rowIndex][colIndex] === 'B') {
  		this._playerBoard[rowIndex][colIndex] = 'B'
  		// todo: flip all other (unmarked) bombs
  	} else {
  		this._playerBoard[rowIndex][colIndex] = this.getNumberOfNeighborBombs(
  											rowIndex,
  											colIndex
  										)
      // todo: flip all adjacent empty '0' tiles
  	}
    this._numTiles--
  }

  getNumberOfNeighborBombs (rowIndex, colIndex) {

  	// offsets for all possible 8 tiles around the selected tile
  	const neighborOffsets = [
  		[-1,-1], [-1,0], [-1,1],
  		[0,-1], [0,1],
  		[1,-1], [1,0], [1,1]
  	]

  	const numberOfRows = this._bombBoard.length
  	const numberofCols = this._bombBoard[0].length

  	let numberOfBombs = 0

  	// loop through all possible adjacent tiles,
  	// check if they are valid tiles in the board
  	// and check if there's a bomb on it. If so,
  	// increase the bomb counter:

  	neighborOffsets.forEach(offset => {
  		const neighborRowIndex = rowIndex + offset[0]
  		const neighborColIndex = colIndex + offset[1]
  		if (   neighborRowIndex >= 0
  			&& neighborRowIndex < numberOfRows
  			&& neighborColIndex >= 0
  			&& neighborColIndex < numberofCols) {

  			if (this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
  				numberOfBombs++
  			}
  		}
  	})

  	return numberOfBombs
  }

  hasSafeTiles () {
    // numTimes decreases by 1 everytime the player flips a tile
    // that's not a bomb, so this method will return 'false' as
    // soon as the remaining tiles match the number of bombs
    return this._numBombs !== this._numTiles
  }

  print () {
  	console.log(this._playerBoard
  		.map(row => row.join(' | '))
  		.join('\n')
  	)
  }

  static generatePlayerBoard (numRows, numCols) {
  	return generateBoard(numRows, numCols, ' ')
  }

  static generateBombBoard (numRows, numCols, numBombs) {

  	if (numBombs >= numRows * numCols) {
  		console.log('Error: More bombs than space available on requested board!')
  		return []
  	}

  	const board = generateBoard(numRows, numCols, null)

  	let numBombsPlaced = 0

  	while (numBombsPlaced < numBombs) {
  		const randomRowIndex = Math.floor(Math.random() * numRows)
  		const randomColIndex = Math.floor(Math.random() * numCols)
  		// only place a bomb if the selected field is not already a bomb
  		if (board[randomRowIndex][randomColIndex] !== 'B') {
  			board[randomRowIndex][randomColIndex] = 'B'
  			numBombsPlaced++
  		}
  	}

  	return board
  }

}

// get things rolling

const g = new Game(3,3,3)

g.playMove(0,0)
g.playMove(1,1)
g.playMove(1,2)
