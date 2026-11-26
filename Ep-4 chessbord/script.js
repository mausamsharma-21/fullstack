
// Get chessboard element
const board = document.getElementById("chessboard");

// Apply CSS properties using JavaScript
board.style.width = "480px";
board.style.height = "480px";
board.style.display = "grid";
board.style.gridTemplateColumns = "repeat(8, 1fr)";
board.style.gridTemplateRows = "repeat(8, 1fr)";
board.style.border = "5px solid black";

// Chess pieces
const pieces = [
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"]
];

// Create 8 rows and 8 columns
for (let row = 0; row < 8; row++) {

    for (let col = 0; col < 8; col++) {

        // Create square dynamically
        const square = document.createElement("div");

        // Set chessboard colors
        if ((row + col) % 2 === 0) {
            square.style.backgroundColor = "#f0d9b5";
        } else {
            square.style.backgroundColor = "#b58863";
        }

        // Apply square styling
        square.style.display = "flex";
        square.style.justifyContent = "center";
        square.style.alignItems = "center";
        square.style.fontSize = "40px";
        square.style.cursor = "pointer";

        // Add chess piece
        square.textContent = pieces[row][col];

        // Add square to chessboard
        board.appendChild(square);
    }
}
