
// Get HTML elements
const board = document.getElementById("board");
const dice = document.getElementById("dice");
const rollBtn = document.getElementById("rollBtn");
const restartBtn = document.getElementById("restartBtn");

const turnText = document.getElementById("turn");
const message = document.getElementById("message");

const p1Text = document.getElementById("p1");
const p2Text = document.getElementById("p2");

// Player positions
let positions = [1, 1];

// Current player
let currentPlayer = 0;

// Game status
let gameOver = false;

// Snakes and ladders
const snakes = {
    99: 54,
    70: 55,
    52: 42,
    25: 2,
    95: 72
};

const ladders = {
    4: 25,
    13: 46,
    33: 49,
    50: 69,
    63: 81,
    42: 80
};

// Create game board
function createBoard() {

    board.innerHTML = "";

    for (let row = 9; row >= 0; row--) {

        for (let col = 0; col < 10; col++) {

            let number;

            // Alternate numbering direction
            if (row % 2 === 0) {
                number = row * 10 + col + 1;
            } else {
                number = row * 10 + (10 - col);
            }

            const cell = document.createElement("div");

            cell.className = "cell";
            cell.id = "cell-" + number;

            const numberLabel = document.createElement("span");

            numberLabel.className = "number";
            numberLabel.textContent = number;

            cell.appendChild(numberLabel);

            // Add snake symbol
            if (snakes[number]) {

                const marker = document.createElement("span");

                marker.className = "marker";
                marker.textContent = "🐍";

                cell.appendChild(marker);
            }

            // Add ladder symbol
            if (ladders[number]) {

                const marker = document.createElement("span");

                marker.className = "marker";
                marker.textContent = "🪜";

                cell.appendChild(marker);
            }

            const tokens = document.createElement("div");

            tokens.className = "tokens";
            tokens.id = "tokens-" + number;

            cell.appendChild(tokens);

            board.appendChild(cell);
        }
    }

    updateBoard();
}

// Update player positions on board
function updateBoard() {

    // Clear all tokens
    for (let i = 1; i <= 100; i++) {

        document.getElementById("tokens-" + i)
            .innerHTML = "";
    }

    // Display both players
    positions.forEach((position, index) => {

        const token = document.createElement("span");

        token.textContent = index === 0 ? "🔴" : "🔵";

        document.getElementById("tokens-" + position)
            .appendChild(token);
    });

    p1Text.textContent = positions[0];
    p2Text.textContent = positions[1];
}

// Roll dice
function rollDice() {

    if (gameOver) return;

    const diceNumber = Math.floor(
        Math.random() * 6
    ) + 1;

    const diceFaces = [
        "⚀", "⚁", "⚂", "⚃", "⚄", "⚅"
    ];

    dice.textContent = diceFaces[diceNumber - 1];

    let oldPosition = positions[currentPlayer];

    let newPosition = oldPosition + diceNumber;

    // Player must land exactly on 100
    if (newPosition > 100) {

        message.textContent =
            "You need an exact number to reach 100!";

        changeTurn();
        return;
    }

    positions[currentPlayer] = newPosition;

    let result = "Moved to square " + newPosition;

    // Check ladder
    if (ladders[newPosition]) {

        positions[currentPlayer] = ladders[newPosition];

        result =
            "🎉 Great! You climbed a ladder to " +
            ladders[newPosition];
    }

    // Check snake
    else if (snakes[newPosition]) {

        positions[currentPlayer] = snakes[newPosition];

        result =
            "🐍 Oh no! A snake took you down to " +
            snakes[newPosition];
    }

    updateBoard();

    // Check winner
    if (positions[currentPlayer] === 100) {

        message.textContent =
            "🏆 Player " + (currentPlayer + 1) +
            " wins the game!";

        turnText.textContent = "Game Over!";

        gameOver = true;

        rollBtn.disabled = true;

        return;
    }

    message.textContent =
        "Player " + (currentPlayer + 1) +
        ": " + result;

    changeTurn();
}

// Change player turn
function changeTurn() {

    currentPlayer = 1 - currentPlayer;

    turnText.textContent =
        "Player " + (currentPlayer + 1) + "'s Turn";
}

// Restart game
function restartGame() {

    positions = [1, 1];

    currentPlayer = 0;

    gameOver = false;

    dice.textContent = "🎲";

    turnText.textContent = "Player 1's Turn";

    message.textContent = "Roll the dice to start!";

    rollBtn.disabled = false;

    updateBoard();
}

// Button events
rollBtn.addEventListener("click", rollDice);

restartBtn.addEventListener("click", restartGame);

// Start game
createBoard();
