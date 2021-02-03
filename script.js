var board1 = Chessboard('board1', 'start');
const chess = new Chess();

let movesToVisualizeEl = document.getElementById("movesToVisualize");

function displayGameMove(pgn, moveNumber, player = "white") {
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
    // document.getElementById("capture").style="background-color: hsl(218 7% 17% / 1);"

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
    let gameId = document.getElementById("gameId").value
    let moveNumber = document.getElementById("moveNumber").value
    console.log("AAAAA"+moveNumber)
    if (gameId && moveNumber) { 
        lichessTactictoPuzzle(gameId, moveNumber, level)
    }

    let rating = document.getElementById("rating").value
    let fen = document.getElementById("fen").value
    let moves = document.getElementById("moves").value

    if (level == 1) {
        level = "One";
    } else if (level == 2) {
        level = "Two";
    } else if (level == 3) {
        level = "Three";
    } else if (level == 4) {
        level = "Four";
    } else if (level == 5) {
        level = "Five";
    } else if (level == 6) {
        level = "Six";
    }

    document.getElementById("website-subtitle").innerHTML = "Level " + level


    document.getElementById("puzzleRating").innerHTML = "Rating: " + rating
    displayGameFEN(fen)
    document.getElementById("movesToVisualize").innerHTML = moves

    hideModal()
}

function makePuzzle(string) {
    string = string.split("/")
    if (string.length == 3 || string.length == 4) {
        if (string.length == 4) {
           document.getElementById("level").value = string[3]
        }
        
        document.getElementById("rating").value = ""
        document.getElementById("gameId").value = string[2]
        document.getElementById("moveNumber").value = string[3]
        document.getElementById("fen").value = string[4]
        document.getElementById("moves").value = string[5]
    }
    document.getElementById("level").value = string[0]
    document.getElementById("rating").value = string[1]
    document.getElementById("gameId").value = string[2]
    document.getElementById("moveNumber").value = string[3]
    document.getElementById("fen").value = string[4]
    document.getElementById("moves").value = string[5]
    submit()
}

function lichessTactictoPuzzle(gameId, moveNumber, movesBack) {
    let player = "white";
    console.log(moveNumber)
    toString(moveNumber)
    
    // moveNumber should be the number if white is to move or the number + ... if black is to move
    if (!(moveNumber.includes("..."))) {
        moveNumber.replace("...", "")
        parseInt(moveNumber)
        moveNumber = moveNumber * 2 - 2
        player = "black"
    } else {
        console.log(moveNumber)
        moveNumber = moveNumber.replace("...", "")
        console.log(moveNumber)

        parseInt(moveNumber)
        console.log(moveNumber)

        moveNumber = moveNumber * 2 - 1
        console.log(moveNumber)

        player = "white"
    }

    console.log(moveNumber)
    movesBack = movesBack * 2
    moveNumber -= movesBack


    let movesToVisualize = []

    console.log(moveNumber)
    console.log(movesBack)


    getLichessGamebyId(gameId).then(data => data.text())
        .then(result => {
            console.log(result)
            chess.load_pgn(result, {sloppy: true})
            let moves = chess.history();
            console.log(moves)
            chess.reset();
            for (let y = 0; y <= moveNumber; y++) {
                chess.move(moves[y]);
            }
            board1 = Chessboard('board1', {orientation: player})
            board1.position(chess.fen());
            
            for (let y = 1; y <= movesBack; y++) {
                movesToVisualize.push(moves[moveNumber + y])
                console.log(movesToVisualize)
            }

            document.getElementById("movesToVisualize").innerHTML = movesToVisualize.join(" ")
        })
}

async function getLichessGamebyId(id) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      return fetch("https://lichess.org/game/export/" + id + "?clocks=false&evals=false", requestOptions)
        // .then(response => response.text())
        // .then(result => {console.log(result);})
        .catch(error => console.log('error', error));
}



lichessTactictoPuzzle("r97LGR27", "10", 2)

// getLichessGamebyId("r97LGR27").then(data => data.text())
//     .then(result => console.log(result))


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