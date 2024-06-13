/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
// Defined the combinations that are considered "wiiners ". Array of arrays. 


/*---------------------------- Variables (state) ----------------------------*/

let board, turn, winner, tie;
// Stated all the variables needed to track the board, track the winner, what thurn they are on, and if they tied. So there is board, turn, winner, and tie

/*------------------------ Cached Element References ------------------------*/

const squareEls = document.querySelectorAll('.sqr');
// Cached to the square element.
const messageEl = document.getElementById('message');
// cached to the message element.
const resetBtnEl = document.getElementById('reset');
// Cached reset button.

/*-------------------------------- Functions --------------------------------*/

function init() {
    board = ['', '', '', '', '', '', '', '', '']; //Initializes a board with 9 spaces and empty
    turn = 'X'; // Makes the first turn be X, second turn will be O. 
    winner = false; // During the beginning of the match there is no winner
    tie = false; // During the beginnng of the match theres is no tie
    render(); // Render method to initialize in the UI in init state. 
}


function render() { 
    updateBoard(); // this will update th UI board
    updateMessage(); // this updates the status message of the game. 
}

function updateBoard() {
    board.forEach((val, idx) => {
        squareEls[idx].textContent = val; // This will put the content in each square and make sure the letters go on the one you click on .
    });
}

function updateMessage() {
    if (winner) {
        messageEl.textContent = `${turn} wins!`; // This will show who wins 
    } else if (tie) {
        messageEl.textContent = "It's a tie!"; // if tied 
    } else {
        messageEl.textContent = `It's ${turn}'s turn!`; // Show whos turn it is. 
    }
}

function handleClick(evt) {
    const squareIndex = parseInt(evt.target.id); // Gets the index of the clicked square using the evt.target.id
    if (board[squareIndex] || winner) return; // This will close it out if the square is occupied or if the game is done

        placePiece(squareIndex); // When you click on a square it puts the piece down
        checkForWinner();  // this funtion will check if there is a winner
        checkForTie(); // This function will check if there is a tie
        switchPlayerTurn(); // This function will change the turn after the player goes 
        render(); // push to AI.
}

function placePiece(index) {
    board[index] = turn; // This function will put the players piece (x,o) on to the board.
}

function checkForWinner() {
    winningCombos.forEach(combo => {
        if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[2]]) // Set all the combinations. 
    {
            winner = true; // if those combincations are found, then winner = true.
        }
    });
}

function checkForTie() {
    if (!winner && board.every(square => square)) { // Checks if all of the squars are filled.
        tie = true; // if the above is true (all squares are filled) then it will show a tie.
    }
}

function switchPlayerTurn() {
    if (winner) return; // return function to close out if there is a winner.
    turn = turn === 'X' ? 'O' : 'X'; // Switches turn.
    // if (turn === 'X') {
//     turn = 'O';
// } else {
//     turn = 'X';

// }

// This could have been written both ways, I tried out the top way from a website I found explaining it. 
}


/*----------------------------- Event Listeners -----------------------------*/

squareEls.forEach(square => square.addEventListener('click', handleClick));
// Event listener that waits for the click for each square element. Called a click event.
resetBtnEl.addEventListener('click', init);
// Same thing, but for the reset button to reset the game.

init();
// fires the game up with the script starts. I forgot to add this and it took me 30 mins to finally find it lol.

// I could not figure out which combinations resulted in 3 in a row generating a win, thats the only thing i could not figure out.
