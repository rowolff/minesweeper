"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Helpers = {
  generateBoard: function generateBoard(numRows, numCols, colContent) {
    var board = [];
    for (var i = 0; i < numRows; i++) {
      var row = [];
      for (var j = 0; j < numCols; j++) {
        row.push(colContent);
      }
      board.push(row);
    }
    return board;
  }
};

exports.Helpers = Helpers;