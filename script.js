var board1 = Chessboard('board1', 'start');
const chess = new Chess();

let movesToVisualizeEl = document.getElementById("movesToVisualize");

function displayGameMove(pgn, moveNumber, player = white) {
    chess.load_pgn(pgn, {sloppy: true})
    let moves = chess.history();
    chess.reset();
    for (let y = 0; y <= moveNumber; y++) {
        chess.move(moves[y]);
    }
    board1 = Chessboard('board1', {orientation: player})
    board1.position(chess.fen());
}

function displayGameFEN(fen) {
    chess.load(fen)
    board1.position(chess.fen());
}

function resetBoard() {
    chess.reset()
    board1.position(chess.fen());
}

function flipBoard() {
    let fen = chess.fen();
    let newOrientation = board1.orientation();
    resetBoard();
    if (newOrientation == 'white') {
        newOrientation = 'black';
    } else {
        newOrientation = 'white';
    }
    board1 = Chessboard('board1', {orientation: newOrientation})
    displayGameFEN(fen)
}
function updateMovestoVisualize(string) {
    movesToVisualizeEl.innerHTML = string;
}
function capture() {
    document.getElementById("capture").style="background-color: hsl(218 7% 17% / 1);"

    html2canvas(document.querySelector("#capture")).then(canvas => {
        document.body.appendChild(canvas)
        document.getElementById("capture").style="display: none;"
    });

}
function hideCanvas() {

    document.getElementById("body").removeChild(document.querySelector("canvas"))
    document.getElementById("capture").style="display: flex; background-color: hsl(218 7% 25% / 1);"

}

function showModal() {
    document.getElementById("popup").style="display: flex;"
}
function hideModal() {
    document.getElementById("popup").style="display: none;"

}
function submit() {
    let level = document.getElementById("level").value
    let rating = document.getElementById("rating").value
    let fen = document.getElementById("fen").value
    let moves = document.getElementById("moves").value

    document.getElementById("website-subtitle").innerHTML = "Level " + level
    document.getElementById("puzzleRating").innerHTML = "Rating: " + rating
    displayGameFEN(fen)
    document.getElementById("movesToVisualize").innerHTML = moves

    hideModal()
}


// async function getLichessGamebyId(id) {
//     fetch("https://lichess.org/game/export/{gameId}", {httpNodeCors: {
//         origin: "*",
//         methods: "GET,PUT,POST,DELETE"
//        }, params: {gameId: id, moves: true},
//     headers : { 
//         'Content-Type': 'application/json',
//         'Accept': 'application/json'
//     }}
//     // mode : "no-cors"

//     )
//     .then(async function(result) {
//         console.log(result)
//         return result;
//     })
//     .then(async function(data) {
//         let adata = await data.json();
//         console.log(adata);
//     })
// }