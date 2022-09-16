const gameBoard = () => {
    let board = []
    let squares = document.querySelectorAll("#square")
    squares.forEach((e) => board.push(e))
    return board
}
const game = (player1,player2,board) => {
    let squares = document.querySelectorAll("#square")
    let xTurn = true
    let status = checkWinner(board)
    let text = document.getElementById("text")
    console.log(board)
    changeText(xTurn)
    squares.forEach(function(elem) {
        elem.addEventListener("click", function handler() {
            this.removeEventListener("click",handler)
            if(status.isThereAWinner) {
                 return
            }
            xTurn = playRound(board,elem.getAttribute("data-index"),xTurn,player1,player2)
            changeText(xTurn)
            status = checkWinner(board)
            if(status.isThereAWinner) {
                if(status.winnerSign == "X") {
                    text.textContent = "Winner is Player 1"
                }else {
                    text.textContent = "Winner is Player 2"                 
                }
            }
            
        })
    })
    const handleInput = () => {
        this.removeEventListener("click",handler)
        if(status.isThereAWinner) {
                 return
        }
        xTurn = playRound(board,elem.getAttribute("data-index"),xTurn,player1,player2)
        changeText(xTurn)
        status = checkWinner(board)
        if(status.isThereAWinner) {
             if(status.winnerSign == "X") {
                    text.textContent = "Winner is Player 1"
            }else {
                    text.textContent = "Winner is Player 2"                 
            }
            }
    }
    console.log(xTurn)
}

const checkWinner= (board) => {
    if(board.length < 9) {
        return
    }
    let checkBoard = []
    let isThereAWinner= false
    let winnerSign = ""
    for(let square of board) {
        checkBoard.push(square.textContent)
    }
    if(!(checkBoard.includes(""))) {
        document.getElementById("text").textContent = "DRAW"
    }
    console.log(checkBoard)
    if (checkBoard[0] === checkBoard[1] && checkBoard[1]=== checkBoard[2] && checkBoard[0] != "") {
        isThereAWinner = true
        winnerSign = checkBoard[0]
    }else if (checkBoard[3] === checkBoard[4] && checkBoard[4] === checkBoard[5]  && checkBoard[3] != "") {
        isThereAWinner = true
        winnerSign = checkBoard[3]
    }else if (checkBoard[6] === checkBoard[7] && checkBoard[7] === checkBoard[8]  && checkBoard[6] != "") {
        isThereAWinner = true
        winnerSign = checkBoard[6]
    }else if (checkBoard[0] === checkBoard[3] && checkBoard[3] === checkBoard[6]  && checkBoard[0] != "") {
        isThereAWinner = true
        winnerSign = checkBoard[0]
    }else if (checkBoard[1] === checkBoard[4] && checkBoard[4] === checkBoard[7]  && checkBoard[1] != "") {
        isThereAWinner = true
        winnerSign = checkBoard[1]
    }else if (checkBoard[2] === checkBoard[5] && checkBoard[5] === checkBoard[8]  && checkBoard[2] != "") {
        isThereAWinner = true
        winnerSign = checkBoard[2]
    }else if (checkBoard[0] === checkBoard[4] && checkBoard[4] === checkBoard[8]  && checkBoard[0] != "") {
        isThereAWinner = true
        winnerSign = checkBoard[0]
    }else if (checkBoard[2] === checkBoard[4] && checkBoard[4] === checkBoard[6]  && checkBoard[2] != "") {
        isThereAWinner = true
        winnerSign = checkBoard[2]
    }return {isThereAWinner,winnerSign}
}
function changeText(turn) {
    let text = document.getElementById("text")
    if(turn) {
        text.textContent = "Player1's Turn"
    }else {
        text.textContent = "Player2's Turn"
    }
}

function playRound(board, i,xTurn,player1,player2) {
    if(xTurn) {
        board[i].textContent = player1.sign
        return false
    }else {
        board[i].textContent = player2.sign
        return true
    }
}
const createPlayer = (name,sign) => {
    return {name,sign}
}
const start = (() => {
    let startButton = document.getElementById("start")
    startButton.addEventListener("click", () => signChoice())
})()
function signChoice() {
    document.getElementById("start").style.display = "none"
    let xSign = document.getElementById("x")
    let ySign = document.getElementById("o")
    xSign.style.display = "inline-block"
    ySign.style.display = "inline-block"
    xSign.addEventListener("click", function handle() {
        handlePlayer("X",xSign,ySign)
        this.removeEventListener("click", handle)
    })
    ySign.addEventListener("click", function handle()  {
        handlePlayer("O",xSign,ySign)
        this.removeEventListener("click",handle)
    })
}
function handlePlayer(sign,xSign,ySign) {
    let board = gameBoard()
    restartButton = document.getElementById("restart")
    restartButton.style.display = "inline-block"
    let player1
    let player2
    if(sign === "X") {
        player1 = createPlayer("player1", "X")
        player2 = createPlayer("player2", "O")
    }else {
        player2 = createPlayer("player2", "O")
        player1 = createPlayer("player1", "X")
    }
    restartButton.addEventListener("click", function handle() {
        restart(board,restartButton,player1,player2)
        this.removeEventListener("click",handle)
    })
    xSign.style.display = "none"
    ySign.style.display = "none"
    console.log(player1,player2)
    game(player1,player2,board)
}
function restart(board,restartButton) {
    for(let i = 0; i < 9; i++) {
        board[i].textContent = ""
    }
    console.log(board)
    restartButton.style.display = "none"
    changeText(true)
    signChoice()
}