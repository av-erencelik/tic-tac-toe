const gameBoard = (() => {
    let board = []
    let squares = document.querySelectorAll("#square")
    squares.forEach((e) => board.push(e))
    console.log(board)
    squares.forEach(function(elem) {
        elem.addEventListener("click", () => add(board,elem.getAttribute("data-index")))
    })
})()

function add(board, i) {
    console.log(i)
    board[i].innerHTML = "X"
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
    let ySign = document.getElementById("y")
    xSign.style.display = "inline-block"
    ySign.style.display = "inline-block"
    xSign.addEventListener("click", () => handlePlayer("X",xSign,ySign))
    ySign.addEventListener("click", () => handlePlayer("Y",xSign,ySign))
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
        player2 = createPlayer("player2", "Y")
    }else {
        player2 = createPlayer("player2", "Y")
        player1 = createPlayer("player1", "X")
    }
    console.log(player1,player2)
}