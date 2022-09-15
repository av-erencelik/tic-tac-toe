const gameBoard = () => {
    let board = []
    let squares = document.querySelectorAll("#square")
    squares.forEach((e) => board.push(e))
    return board
}
const game = (player1,player2,board) => {
    let squares = document.querySelectorAll("#square")
    let xTurn = true
    squares.forEach(function(elem) {
        elem.addEventListener("click", () => {
            xTurn = playRound(board,elem.getAttribute("data-index"),xTurn,player1,player2)
        })
    })
    console.log(xTurn)

}
function changeText(turn) {
    let text = document.getElementById("text")
    if(turn) {
        text.textContent = "Player1's Turn"
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
    xSign.addEventListener("click", () => handlePlayer("X",xSign,ySign))
    ySign.addEventListener("click", () => handlePlayer("O",xSign,ySign))
}
function handlePlayer(sign,xSign,ySign) {
    xSign.style.display = "none"
    ySign.style.display = "none"
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
    console.log(player1,player2)
    let board = gameBoard()
    game(player1,player2,board)
    
}