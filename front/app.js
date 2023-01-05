const chessboard = document.getElementById("chessboard");
const flipButton = document.getElementById("flip-button");
const resetButton = document.getElementById("reset-button");
const addBtn = document.getElementById("addButton");
const openingList = document.getElementById("opening-list");
addBtn.addEventListener("click", openingAddHandler);
flipButton.addEventListener("click", handleFlipButtonClick);
resetButton.addEventListener("click", handleResetButtonClick);

// Add the chess pieces
const pieces = [
  { name: "rook", color: "black" },
  { name: "knight", color: "black" },
  { name: "bishop", color: "black" },
  { name: "queen", color: "black" },
  { name: "king", color: "black" },
  { name: "bishop", color: "black" },
  { name: "knight", color: "black" },
  { name: "rook", color: "black" },
  { name: "pawn", color: "black" },
  { name: "pawn", color: "black" },
  { name: "pawn", color: "black" },
  { name: "pawn", color: "black" },
  { name: "pawn", color: "black" },
  { name: "pawn", color: "black" },
  { name: "pawn", color: "black" },
  { name: "pawn", color: "black" },
  { name: "pawn", color: "white" },
  { name: "pawn", color: "white" },
  { name: "pawn", color: "white" },
  { name: "pawn", color: "white" },
  { name: "pawn", color: "white" },
  { name: "pawn", color: "white" },
  { name: "pawn", color: "white" },
  { name: "pawn", color: "white" },
  { name: "rook", color: "white" },
  { name: "knight", color: "white" },
  { name: "bishop", color: "white" },
  { name: "queen", color: "white" },
  { name: "king", color: "white" },
  { name: "bishop", color: "white" },
  { name: "knight", color: "white" },
  { name: "rook", color: "white" },
];
const squares = [];
function generateChessboard() {
  // Generate the squares of the chessboard

  for (let i = 0; i < 8; i++) {
    const row = document.createElement("div");
    row.classList.add("chessboard__row");
    document.getElementById("chessboard").appendChild(row);
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");
      square.classList.add("chessboard__square");
      row.appendChild(square);
      squares.push(square);
    }
  }

  // Add the chess pieces to the board
  pieces.forEach((piece, index) => {
    const chessPiece = document.createElement("div");
    chessPiece.classList.add(
      "chessboard__piece",
      `chessboard__piece--${piece.color}`,
      `chessboard__piece--${piece.name}`
    );
    chessPiece.setAttribute("draggable", "true");
    chessPiece.setAttribute("data-index", index);

    if (index > 15) {
      let pos = index + 32;
      squares[pos].appendChild(chessPiece);
    } else {
      squares[index].appendChild(chessPiece);
    }

    chessPiece.addEventListener("dragstart", handleDragStart);
    chessPiece.addEventListener("drag", handleDrag);
    chessPiece.addEventListener("dragend", handleDragEnd);
  });

  squares.forEach((square) => {
    square.addEventListener("dragenter", handleDragEnter);
    square.addEventListener("dragover", handleDragOver);
    square.addEventListener("dragleave", handleDragLeave);
    square.addEventListener("drop", handleDrop);
  });
}

function defer(callback) {
  if (document.readyState !== "loading") {
    callback();
  } else {
    document.addEventListener("DOMContentLoaded", callback);
  }
}

// running into issues getting the board to display properly, this may not be neccessary
defer(generateChessboard);

function handleDragStart(e) {
  e.dataTransfer.setData("text/plain", e.target.getAttribute("data-index"));
  e.target.classList.add("dragging");
}

function handleDrag(e) {
  // Do nothing
}

function handleDragEnd(e) {
  e.target.classList.remove("dragging");
}

function handleDragEnter(e) {
  e.target.classList.add("over");
}

function handleDragOver(e) {
  e.preventDefault();
}

function handleDragLeave(e) {
  e.target.classList.remove("over");
}

function handleDrop(e) {
  e.preventDefault();
  e.target.classList.remove("over");
  const data = e.dataTransfer.getData("text/plain");

  const chessPiece = document.querySelector(`[data-index="${data}"]`);
  const currentSquare = chessPiece.parentNode;
  e.target.appendChild(chessPiece);
}

function handleFlipButtonClick() {
  // Flip the board and chess pieces
  chessboard.classList.toggle("chessboard--flipped");
  const chessPieces = document.querySelectorAll(".chessboard__piece");
  chessPieces.forEach((piece) => {
    piece.classList.toggle("chesspiece--flipped");
  });

  // Find the kings and queens
  const whiteKing = document.querySelector(
    ".chessboard__piece--white.chessboard__piece--king"
  );
  const whiteQueen = document.querySelector(
    ".chessboard__piece--white.chessboard__piece--queen"
  );
  const blackKing = document.querySelector(
    ".chessboard__piece--black.chessboard__piece--king"
  );
  const blackQueen = document.querySelector(
    ".chessboard__piece--black.chessboard__piece--queen"
  );

  // Swap the kings and queens
  const whiteKingSquare = whiteKing.parentElement;
  const whiteQueenSquare = whiteQueen.parentElement;
  const blackKingSquare = blackKing.parentElement;
  const blackQueenSquare = blackQueen.parentElement;
  whiteKingSquare.appendChild(whiteQueen);
  whiteQueenSquare.appendChild(whiteKing);
  blackKingSquare.appendChild(blackQueen);
  blackQueenSquare.appendChild(blackKing);
}

function handleResetButtonClick() {
  // Remove the flip classes from the board and pieces
  chessboard.classList.remove("chessboard--flipped");
  const chessPieces = document.querySelectorAll(".chessboard__piece");
  chessPieces.forEach((piece) => {
    piece.classList.remove("chesspiece--flipped");
  });

  // Remove all the pieces from the board
  chessPieces.forEach((piece) => {
    piece.parentElement.removeChild(piece);
  });

  // Add the pieces back to the board in their original positions
  pieces.forEach((piece, index) => {
    const chessPiece = document.createElement("div");
    chessPiece.classList.add(
      "chessboard__piece",
      `chessboard__piece--${piece.color}`,
      `chessboard__piece--${piece.name}`
    );
    chessPiece.setAttribute("draggable", "true");
    chessPiece.setAttribute("data-index", index);

    if (index > 15) {
      let pos = index + 32;
      squares[pos].appendChild(chessPiece);
    } else {
      squares[index].appendChild(chessPiece);
    }
    chessPiece.addEventListener("dragstart", handleDragStart);
    chessPiece.addEventListener("drag", handleDrag);
    chessPiece.addEventListener("dragend", handleDragEnd);
  });
}

const createList = (arr) => {
  openingList.innerHTML = "";
  let list = document.createElement("ul");
  for (let i = 0; i < arr.length; i++) {
    let openingName = arr[i];
    let listItem = document.createElement("li");
    let loadButton = document.createElement("button");
    loadButton.textContent = "Load";
    loadButton.dataset.openingName = openingName;
    loadButton.addEventListener("click", () => {
      const openingName = loadButton.dataset.openingName;
      updateChessboard(openingName);
    });

    listItem.textContent = openingName;
    listItem.appendChild(loadButton);
    list.appendChild(listItem);
  }
  openingList.appendChild(list);
};

function updateChessboard(openingName) {
  axios
    .get(`/opening-positions/${openingName}`)
    .then((res) => {
      const positions = res.data;

      // Remove the flip classes from the board and pieces
      chessboard.classList.remove("chessboard--flipped");
      const chessPieces = document.querySelectorAll(".chessboard__piece");
      chessPieces.forEach((piece) => {
        piece.classList.remove("chesspiece--flipped");
      });

      // Remove all chess pieces from the board
      squares.forEach((square) => {
        while (square.firstChild) {
          square.removeChild(square.firstChild);
        }
      });

      // Add the chess pieces to the board based on the positions stored in the database
      positions.forEach((position) => {
        const chessPiece = document.createElement("div");
        chessPiece.classList.add(
          "chessboard__piece",
          `chessboard__piece--${position.color}`,
          `chessboard__piece--${position.name}`
        );
        chessPiece.setAttribute("draggable", "true");
        chessPiece.setAttribute("data-index", position.index);
        squares[position.position].appendChild(chessPiece);
        chessPiece.addEventListener("dragstart", handleDragStart);
        chessPiece.addEventListener("drag", handleDrag);
        chessPiece.addEventListener("dragend", handleDragEnd);
      });
    })
    .catch((err) => {
      console.log(`Error loading positions from database: ${err}`);
      alert(
        "Uh oh. There was an error loading the positions from the database."
      );
    });
}

const addOpening = (opening) => {
  return axios
    .post("/aOpening", {
      openingName: opening.openingName,
      positions: opening.positions,
    })
    .then((res) => {
      createList(res.data);
    })
    .catch((err) => {
      console.log(err);
      alert("Uh oh. Your request did not work.");
    });
};

function openingAddHandler(e) {
  e.preventDefault();

  const openingElement = document.getElementById("chess-opening");
  const openingName = openingElement.value;
  if (!openingName) return;

  const positions = [];
  squares.forEach((square, index) => {
    if (square.childNodes.length > 0) {
      positions.push({
        name: square.childNodes[0].classList[2].split("--")[1],
        color: square.childNodes[0].classList[1].split("--")[1],
        position: index,
      });
    }
  });

  addOpening({ openingName: openingName, positions: positions })
    .then(() => {
      console.log("Opening saved to database");
    })
    .catch((err) => {
      console.log(`Error saving opening to database: ${err}`);
    });
}
