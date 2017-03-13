var stdin = process.openStdin();
var board = [[0,0,0],[0,0,0],[0,0,0]];
var letters = 'ABC';
var gameOver = false;
var player1 = true;
var renderBoard = function() { 
  console.log('\ \ \ 1\ \  2\ \ \ 3');
  board.forEach((row, rowIndex) => {
    var currentRow = '';
    currentRow += letters[rowIndex] + '\ ';
    row.forEach((square, i) => {
      square === 0 ? currentRow += '\ \ \ ' : currentRow += '\ ' + square + '\ ';
      if (i !== 2) {
        currentRow += '|';
      } else {
        currentRow += '\ \ ';
      }
    });
    if (rowIndex !== 2) {
      currentRow += '\n\ \ -----------';
    }
    console.log(currentRow);
  });
};

var checkForWinner = function() {
  // check rows
  for (var i = 0; i < board.length; i++) {
    var currentRowP1 = true;
    var currentRowP2 = true;
    for (var j = 0; j < board.length; j++) {
      if (board[i][j] !== 'O') {
        currentRowP1 = false;
      }
      if (board[i][j] !== 'X') {
        currentRowP2 = false;
      }
    }
    if (currentRowP1 === true || currentRowP2 === true) {
      return true;
    }
  }
  // check column
  for (var i = 0; i < board[0].length; i++) {
    var currentColP1 = true;
    var currentColP2 = true;
    for (var j = 0; j < board.length; j++) {
      if (board[j][i] !== 'O') {
        currentColP1 = false;
      }
      if (board[j][i] !== 'X') {
        currentColP2 = false;
      }
    }
    if (currentColP1 === true || currentColP2 === true) {
      return true;
    }
  }
  return false;
};

var checkForFullBoard = function() {
  var isFull = true;
  board.forEach(row => {
    row.forEach(square => {
      if (square === 0) {
        isFull = false;
      }
    })
  })
  return isFull;
};

stdin.addListener("data", function(d) {
  var input = d.toString().trim();
  // Restart game or exit 
  if (gameOver && input === 'n') {
    console.log('Goodbye!');
    process.exit();
  } else if (gameOver && input === 'y') {
    console.log('New Game')
    board = [[0,0,0],[0,0,0],[0,0,0]];
    player1 = !player1;
    player1 === true ? console.log('Player 1 \'s turn') : console.log('Player 2 \'s turn')
    renderBoard();
    return;
  }

  var row = letters.indexOf(input[0].toUpperCase());
  if (input.length > 2 || isNaN(input[1]) || input[1] > board[0].length || row === -1 || board[row][input[1] - 1] !== 0) {
    console.log('Please select a valid square');
    return;
  } 
  var marker = player1 === true ? 'O' : 'X';
  board[row][input[1] - 1] = marker;

  if (checkForWinner()) {
    player1 === true ? console.log('Congratulations Player 1!') : console.log('Congratulations Player 2!')
    renderBoard();
    gameOver = true;
    console.log('Play again? y/n')
    return;
  } else if (checkForFullBoard()) {
    console.log('Tie Game!');
    renderBoard();
    console.log('Play again? y/n')
    return;
  }

  player1 = !player1;
  player1 === true ? console.log('Player 1 \'s turn') : console.log('Player 2 \'s turn')
  renderBoard();
});

// Display on start
console.log('New Game')
player1 === true ? console.log('Player 1 \'s turn') : console.log('Player 2 \'s turn')
renderBoard();
