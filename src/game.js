// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import { Board } from './board'

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

// create default game
let g = new Game(5,5,2)
