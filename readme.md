# Minesweeper command line game

Part of a codecademy course to learn/repeat the basics of JS and get into ES6.

ES6 source code in /src

Transpiled "compatible" code in /lib

## Installation

`npm install`

## Playing the game

You'll need to have node installed.

In the command line, navigate to the lib directory and run `node`
Run `.load game.js` to load the contents of this file.

Each game starts with a default board of 10x10 with 10 boards.

You can play moves with the following command:

`g.playMove(0, 1)`

If you want to start a Game with different board sizes/bomb count, use:

`g = new Game(3, 3, 3)`

When done playing, run

 `.exit`
