import { Helpers } from './helpers'

export class Board {
  constructor (numRows, numCols, numBombs) {
    this._numBombs = numBombs
    this._numTiles = numRows * numCols
    this._playerBoard = Board.generatePlayerBoard(numRows, numCols)
    this._bombBoard = Board.generateBombBoard(numRows, numCols, numBombs)
    this._zeroTiles = []
  }

  get playerBoard () {
    return this._playerBoard
  }

  newZeroTile (tile) {
    this._zeroTiles.push(tile)
  }

  isZeroTile (tile) {
    return this._zeroTiles.some(zeroTile => tile.toString() === zeroTile.toString())
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
  	}
    this._numTiles--
  }

  getNumberOfNeighborBombs (rowIndex, colIndex) {

  	// if this function is called recursively,
    // we want to exit immediately if we already know
    // that the tile to check is safe with 0 bombs surrounding
    if (this.isZeroTile([rowIndex, colIndex])) {
      return
    }

    // if there are bombs around it, get
    // offsets for all possible 8 tiles around the selected tile
  	const neighborOffsets = [
  		[-1,-1], [-1,0], [-1,1],
  		[0,-1], [0,1],
  		[1,-1], [1,0], [1,1]
  	]

  	const numberOfRows = this._bombBoard.length
  	const numberofCols = this._bombBoard[0].length
    const adjacentSafeTiles = []

  	let numberOfBombs = 0

  	// loop through all possible adjacent tiles,
  	// check if they are valid tiles in the board
  	// and check if there's a bomb on it. If so,
  	// increase the bomb counter:

  	neighborOffsets.forEach(offset => {
  		const neighborRowIndex = rowIndex + offset[0]
  		const neighborColIndex = colIndex + offset[1]

  		if ( neighborRowIndex >= 0
  			&& neighborRowIndex < numberOfRows
  			&& neighborColIndex >= 0
  			&& neighborColIndex < numberofCols) {

        if (this._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
  				numberOfBombs++
  			} else {
          adjacentSafeTiles.push([neighborRowIndex, neighborColIndex])
        }
  		}

  	})

    // if the current tile is a safe tile with 0 bombs surrounding
    // we want to flip all surrounding tiles (recursively)
    // for convenience
    if (numberOfBombs === 0) {
        this.newZeroTile([rowIndex, colIndex])
        adjacentSafeTiles.forEach(tile => {
          if (this.getNumberOfNeighborBombs(tile[0], tile[1]) === 0) {
            this._playerBoard[tile[0]][tile[1]] = 0
            this._numTiles--
            this.print()
          }      
        })
    }

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
  	return Helpers.generateBoard(numRows, numCols, ' ')
  }

  static generateBombBoard (numRows, numCols, numBombs) {

  	if (numBombs >= numRows * numCols) {
  		console.log('Error: More bombs than space available on requested board!')
  		return []
  	}

  	const board = Helpers.generateBoard(numRows, numCols, null)

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
