'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Board = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _helpers = require('./helpers');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numRows, numCols, numBombs) {
    _classCallCheck(this, Board);

    this._numBombs = numBombs;
    this._numTiles = numRows * numCols;
    this._playerBoard = Board.generatePlayerBoard(numRows, numCols);
    this._bombBoard = Board.generateBombBoard(numRows, numCols, numBombs);
    this._zeroTiles = [];
  }

  _createClass(Board, [{
    key: 'newSafeTile',
    value: function newSafeTile(tile) {
      this._zeroTiles.push(tile);
    }
  }, {
    key: 'isSafeTile',
    value: function isSafeTile(tile) {
      return this._zeroTiles.some(function (zeroTile) {
        return tile.toString() === zeroTile.toString();
      });
    }
  }, {
    key: 'flipTile',
    value: function flipTile(rowIndex, colIndex) {
      var _this = this;

      if (this._playerBoard[rowIndex][colIndex] !== ' ') {
        console.log('This tile has already been flipped');
        return;
      }

      // flip all bombs or number of adjacent bombs
      if (this._bombBoard[rowIndex][colIndex] === 'B') {
        this._bombBoard.forEach(function (row, rowBombIndex) {
          row.forEach(function (column, colBombIndex) {
            if (column === 'B') {
              _this._playerBoard[rowBombIndex][colBombIndex] = 'B';
            }
          });
        });
      } else {
        this._playerBoard[rowIndex][colIndex] = this.getNumberOfNeighborBombs(rowIndex, colIndex);
      }
      this._numTiles--;
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, colIndex) {
      var _this2 = this;

      // if this function is called recursively,
      // we want to exit immediately if we already know
      // that the tile to check is safe with 0 bombs surrounding
      if (this.isSafeTile([rowIndex, colIndex])) {
        return;
      }

      // if there are bombs around it, get
      // offsets for all possible 8 tiles around the selected tile
      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

      var numberOfRows = this._bombBoard.length;
      var numberofCols = this._bombBoard[0].length;
      var adjacentSafeTiles = [];

      var numberOfBombs = 0;

      // loop through all possible adjacent tiles,
      // check if they are valid tiles in the board
      // and check if there's a bomb on it. If so,
      // increase the bomb counter:

      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = rowIndex + offset[0];
        var neighborColIndex = colIndex + offset[1];

        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColIndex >= 0 && neighborColIndex < numberofCols) {

          if (_this2._bombBoard[neighborRowIndex][neighborColIndex] === 'B') {
            numberOfBombs++;
          } else {
            adjacentSafeTiles.push([neighborRowIndex, neighborColIndex]);
          }
        }
      });

      // if the current tile is a safe tile with 0 bombs surrounding
      // we want to flip all surrounding tiles (recursively)
      // for convenience. Any tiles we find that are not bombs, we want
      // to add to the array of safe tiles, to skip them during recursion
      if (numberOfBombs === 0) {
        this.newSafeTile([rowIndex, colIndex]);
        adjacentSafeTiles.forEach(function (tile) {
          var adjacentBombCount = _this2.getNumberOfNeighborBombs(tile[0], tile[1]);
          if (adjacentBombCount !== undefined) {
            // Error handling!
            // I don't know why this even can be "undefined"
            // It's on tiles that contain a bomb - so that's sth to look into...
            _this2.newSafeTile([tile[0], tile[1]]);
            _this2._playerBoard[tile[0]][tile[1]] = adjacentBombCount;
            _this2._numTiles--;
          }
        });
      }

      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      // numTimes decreases by 1 everytime the player flips a tile
      // that's not a bomb, so this method will return 'false' as
      // soon as the remaining tiles match the number of bombs
      return this._numBombs !== this._numTiles;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this._playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numRows, numCols) {
      return _helpers.Helpers.generateBoard(numRows, numCols, ' ');
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numRows, numCols, numBombs) {

      if (numBombs >= numRows * numCols) {
        console.log('Error: More bombs than space available on requested board!');
        return [];
      }

      var board = _helpers.Helpers.generateBoard(numRows, numCols, null);

      var numBombsPlaced = 0;

      while (numBombsPlaced < numBombs) {
        var randomRowIndex = Math.floor(Math.random() * numRows);
        var randomColIndex = Math.floor(Math.random() * numCols);
        // only place a bomb if the selected field is not already a bomb
        if (board[randomRowIndex][randomColIndex] !== 'B') {
          board[randomRowIndex][randomColIndex] = 'B';
          numBombsPlaced++;
        }
      }

      return board;
    }
  }]);

  return Board;
}();