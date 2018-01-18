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
	const board = generateBoard(numRows, numCols, null)
	
	let numBombsPlaced = 0

	while (numBombsPlaced <= numBombs) {		
		const randomRowIndex = Math.floor(Math.random() * numRows)
		const randomColIndex = Math.floor(Math.random() * numCols)
		// required: check if location already contains a bomb
		board[randomRowIndex][randomColIndex] = 'B'
		numBombsPlaced++
	}

	return board
}

const printBoard = (board) => {
	console.log(board
		.map(row => row.join(' | '))
		.join('\n')
	)
}

const playerBoard = generatePlayerBoard(3,3)
const bombBoard = generateBombBoard(3,3,5)

console.log('Player Board: ')
printBoard(playerBoard)

console.log('Bomb Board: ')
printBoard(bombBoard)