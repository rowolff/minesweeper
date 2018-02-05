const Helpers = {
  generateBoard: (numRows, numCols, colContent) => {
  	const board = []
  	for (let i = 0; i < numRows; i++) {
  		const row = []
  		for (let j = 0; j < numCols; j++) {
  			row.push(colContent)
  		}
  		board.push(row)
  	}
  	return board
  }
}

export { Helpers }
