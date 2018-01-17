const board = []

const printBoard = board => {
	console.log("Current board:")
	board.forEach(elem => console.log(elem.join(" | ")))
}

// create empty board
board.push([],[],[])
board.forEach(elem => elem.push(" ", " ", " "))

// kick things off
printBoard(board)

// test manual board manipulation
board[0][1] = "1"
board[2][2] = "B"

// print modified board
printBoard(board)