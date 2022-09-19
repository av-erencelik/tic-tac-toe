const gameBoard = () => {
    let board = []
    let squares = document.querySelectorAll("#square")
    squares.forEach((e) => board.push(e))
    return board
}
const game = (player,ai,board) => {
    let squares = document.querySelectorAll("#square")
    let playerTurn;
    if(player.sign == "X") {
        playerTurn = true
    }else {playerTurn=false}
    if(!playerTurn) {
        aiPlay()
    }
    let status = checkWinner(board)
    let text = document.getElementById("text")
    changeText(playerTurn)
    squares.forEach(function(elem) {
        elem.addEventListener("click", function handler() {
            this.removeEventListener("click",handler)
            if(status.isThereAWinner) {
                 return
            }
            if(board[elem.getAttribute("data-index")].textContent == "X" || board[elem.getAttribute("data-index")].textContent == "O" ) {return}
            playerTurn = playRound(board,elem.getAttribute("data-index"),player)
            changeText(playerTurn)
            status = checkWinner(board)
            if(status.isThereAWinner) {
                if(status.winnerSign == player.sign) {
                    text.textContent = "Winner is Player"
                    return
                }else if (status.winnerSign = "") {
                    return
                }          
                else {
                    text.textContent = "Winner is AI"        
                    return         
                }
            }
            aiPlay()
            changeText(playerTurn)
            status = checkWinner(board)
            if(status.isThereAWinner) {
                if(status.winnerSign == player.sign) {
                    text.textContent = "Winner is Player"
                    return
                }else if (status.winnerSign = "") {
                    return
                }          
                else {
                    text.textContent = "Winner is AI"        
                    return         
                }
            }
            
        })
    })
    function aiPlay() {
        let square = Math.floor(Math.random() * 9)
        while(!(board[square].textContent == "")) {
            square = Math.floor(Math.random() * 9)
        }
        squares[square].textContent = ai.sign
        playerTurn=true
    }
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
        isThereAWinner = true
        return {isThereAWinner, winnerSign}
    }
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
        text.textContent = "Player's Turn"
    }else {
        text.textContent = "AI's Turn"
    }
}

function playRound(board, i,player) { 
    board[i].textContent = player.sign 
    return false
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
    let player
    let ai
    if(sign === "X") {
        player = createPlayer("player", "X")
        ai = createPlayer("ai", "O")
    }else {
        player = createPlayer("player", "O")
        ai = createPlayer("ai", "X")
    }
    restartButton.addEventListener("click", function handle() {
        restart(board,restartButton,player,ai)
        this.removeEventListener("click",handle)
    })
    xSign.style.display = "none"
    ySign.style.display = "none"
    game(player,ai,board)
}
function restart(board,restartButton,player,ai) {
    for(let i = 0; i < 9; i++) {
        board[i].textContent = ""
    }
    restartButton = document.getElementById("restart")
    restartButton.addEventListener("click", function handle() {
        restart(board,restartButton,player,ai)
        this.removeEventListener("click",handle)
    })
    changeText(true)
    board = gameBoard()
    game(player,ai,board)
}