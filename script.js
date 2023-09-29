const board = document.getElementById('board');
const status = document.getElementById('status');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// Initialize the board
function initBoard() {
    board.innerHTML = '';
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;

    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', handleCellClick);
        board.appendChild(cell);
    }

    // Start the game with X or O depending on the choice
    if (currentPlayer === 'O') {
        computerMove();
    }
}

function handleCellClick(e) {
    const cell = e.target;
    const index = cell.dataset.index;

    if (boardState[index] === '' && gameActive) {
        boardState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add(currentPlayer);

        if (checkWin()) {
            status.textContent = `Player ${currentPlayer} wins!`;
            gameActive = false;
        } else if (boardState.every((cell) => cell !== '')) {
            status.textContent = 'It\'s a draw!';
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `Player ${currentPlayer}'s turn`;

            if (currentPlayer === 'O' && gameActive) {
                setTimeout(computerMove, 1000); // Delay computer move for 1 second
            }
        }
    }
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    return winPatterns.some((pattern) =>
        pattern.every((index) => boardState[index] === currentPlayer)
    );
}

function computerMove() {
    if (gameActive) {
        // Implement your computer's move logic here
        // For a basic implementation, you can make a random valid move
        let emptyCells = boardState.reduce((acc, val, index) => {
            if (val === '') acc.push(index);
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * emptyCells.length);
        const computerChoice = emptyCells[randomIndex];
        
        // Simulate the computer's click on the selected cell
        const cell = document.querySelector(`[data-index="${computerChoice}"]`);
        cell.click();
    }
}

resetButton.addEventListener('click', initBoard);

initBoard();
