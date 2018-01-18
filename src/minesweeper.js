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

const generatePlayerBoard = (numRows, numCols) => {
	
	return generateBoard(numRows, numCols, ' ')
}

const generateBombBoard = (numRows, numCols, numBombs) => {
	
	if (numBombs >= numRows * numCols) { 
		console.log('Error: More bombs than space available on requested board!')
		return []
	}

	const board = generateBoard(numRows, numCols, null)
	
	let numBombsPlaced = 0

	while (numBombsPlaced < numBombs) {		
		const randomRowIndex = Math.floor(Math.random() * numRows)
		const randomColIndex = Math.floor(Math.random() * numCols)
		// only place a bomb if the selected field is not null
		if (!board[randomRowIndex][randomColIndex]) {
			board[randomRowIndex][randomColIndex] = 'B'
			numBombsPlaced++
		}
	}

	return board
}

const getNumberOfNeighborBombs = (bombBoard, rowIndex, colIndex) => {
	const neighborOffsets = [
		[-1,-1], [-1,0], [-1,1],
		[0,-1], [0,1],
		[1,-1], [1,0], [1,1]
	]
	const numberOfRows = bombBoard.length
	const numberofCols = bombBoard[0].length

	let numberOfBombs = 0

	neighborOffsets.forEach(offset => {
		const neighborRowIndex = rowIndex + offset[0]
		const neighborColIndex = colIndex + offset[1]
		if (   neighborRowIndex >= 0 
			&& neighborRowIndex < numberOfRows
			&& neighborColIndex >= 0
			&& neighborColIndex < numberofCols) {
			
			if (bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
				numberOfBombs++
			}
		}
	})

	return numberOfBombs
}

const printBoard = board => {
	console.log(board
		.map(row => row.join(' | '))
		.join('\n')
	)
}

const playerBoard = generatePlayerBoard(3,3)
const bombBoard = generateBombBoard(3,3,3)

console.log('Player Board: ')
printBoard(playerBoard)

console.log('Bomb Board: ')
printBoard(bombBoard)

console.log(getNumberOfNeighborBombs(bombBoard, 2, 2))