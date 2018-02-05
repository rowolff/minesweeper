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
Then create a Game instance and run commands like so:
let game = new Game(3, 3, 3);
game.playMove(0, 1);
game.playMove(1, 2);
When done run `.exit`
