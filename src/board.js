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

  newSafeTile (tile) {
    this._zeroTiles.push(tile)
  }

  isSafeTile (tile) {
    return this._zeroTiles.some(zeroTile => tile.toString() === zeroTile.toString())
  }

  flipTile (rowIndex, colIndex) {

  	if (this._playerBoard[rowIndex][colIndex] !== ' ') {
  		console.log('This tile has already been flipped')
  		return
  	}

  	// flip all bombs or number of adjacent bombs
  	if (this._bombBoard[rowIndex][colIndex] === 'B') {
  		this._bombBoard.forEach((row, rowBombIndex) => {
        row.forEach((column, colBombIndex) => {
          if (column === 'B') {
            this._playerBoard[rowBombIndex][colBombIndex] = 'B'
          }
        })
      })
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
    if (this.isSafeTile([rowIndex, colIndex])) {
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
    // for convenience. Any tiles we find that are not bombs, we want
    // to add to the array of safe tiles, to skip them during recursion
    if (numberOfBombs === 0) {
        this.newSafeTile([rowIndex, colIndex])
        adjacentSafeTiles.forEach(tile => {
          const adjacentBombCount = this.getNumberOfNeighborBombs(tile[0], tile[1])
          if (adjacentBombCount !== undefined) {
            // Error handling!
            // I don't know why this even can be "undefined"
            // It's on tiles that contain a bomb - so that's sth to look into...
            this.newSafeTile([tile[0], tile[1]])
            this._playerBoard[tile[0]][tile[1]] = adjacentBombCount
            this._numTiles--
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
