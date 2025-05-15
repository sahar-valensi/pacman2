'use strict'

const WALL = '&#8251;'
const FOOD = '&middot;'
const EMPTY = ' '
const CHERRY = '🍒'
const SUPER_FOOD = '🪄'

var gGame
var gBoard
var gCherryInterval

function init() {
    console.log('hello')
    closeModal()
    gGame = {
        score: 0,
        isOn: false,
        isWon: false,
        foodCount: 0
    }

    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard()

    gGame.isOn = true
    gCherryInterval = setInterval(addCherry, 15000)
}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD
            gGame.foodCount++

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
                gGame.foodCount--
            }
        }
    }
    createSuperFood(board)
    return board
}

function updateScore(diff) {
    // TODO: update model and dom
    gGame.score += diff

    const elScore = document.querySelector('.score span')
    elScore.innerText = gGame.score
}

function gameOver() {
    console.log('Game Over')
    // TODO
    clearInterval(gCherryInterval)
    clearInterval(gGhostsInterval)

    gGame.isOn = false
    renderCell(gPacman.location,EMPTY)
    const msg = (gGame.isWon) ? 'You Won!' : ' Game Over'
    openModal(msg)
}
function addCherry() {
    const emptyCell = getEmptyCell(gBoard)
    if (!emptyCell) return

    gBoard[emptyCell.i][emptyCell.j] = CHERRY
    renderCell(emptyCell, CHERRY)
    // setTimeout(() => {
    //     gBoard[emptyCell.i][emptyCell.j] = EMPTY
    //   }, 2000);
}
function createSuperFood(board) {
    board[1][1] = SUPER_FOOD
    board[1][board[0].length - 2] = SUPER_FOOD
    board[board.length - 2][1] = SUPER_FOOD
    board[board.length - 2][board[0].length - 2] = SUPER_FOOD
    gGame.foodCount -= 4
}
function getEmptyCell(board) {
    const emptyCell = []
    for (var i = 0; i < board.length; i++) {
        for (var j = 0; j < board[0].length; j++) {
            if (board[i][j] === EMPTY) {
                emptyCell.push({ i, j })
            }
        }
    }
    if (!emptyCell.length) return null
    const randIdx = getRandomIntInclusive(0, emptyCell.length - 1)
    return emptyCell[randIdx]
}
function checkVictory(){
    if(gGame.foodCount === 0){
        gGame.isWon = true
        gameOver()
    }
 }
 function openModal(msg){
    const elModal = document.querySelector('.modal')
    const elSpan = document.querySelector('.end-msg')
    elSpan.innerHTML = msg
    elModal.style.display = 'block'
 }
 function closeModal(){
    const elModal = document.querySelector('.modal')
    elModal.style.display = 'none'
 }
