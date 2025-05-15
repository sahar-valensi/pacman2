'use strict'

const GHOST = '👻'
var gGhosts = []
var gDeadGhost = []
var gGhostsInterval

function createGhosts(board) {
    gGhosts = []
    // TODO: Create 3 ghosts and an interval
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gGhostsInterval = setInterval(moveGhosts, 500)
}

function createGhost(board) {
    // TODO: Create a ghost with arbitrary start pos & currCellContent
    const ghost = {
        location: { i: 3, j: 3 },
        currCellContent: FOOD,
        color: getRandomColor()
    }

    // TODO: Add the ghost to the ghosts array
    // TODO: Update the board
    gGhosts.push(ghost)
    gBoard[ghost.location.i][ghost.location.j] = GHOST
}

function moveGhosts() {
    // TODO: loop through ghosts
    for (var i = 0; i < gGhosts.length; i++) {
        moveGhost(gGhosts[i])
    }
}

function moveGhost(ghost) {
    // TODO: figure out moveDiff, nextLocation, nextCell
    const diff = getMoveDiff()
    const nextLocation = {
        i: ghost.location.i + diff.i,
        j: ghost.location.j + diff.j,
    }
    const nextCell = gBoard[nextLocation.i][nextLocation.j]

    // TODO: return if cannot move
    if (nextCell === WALL || nextCell === GHOST) return

    // TODO: hitting a pacman? call gameOver
    if (nextCell === PACMAN) {
        if (gPacman.isSuper) return
        gameOver()
        return
    }

    // TODO: moving from current location:
    // TODO: update the model (restore prev cell contents)
    gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent

    // TODO: update the DOM
    renderCell(ghost.location, ghost.currCellContent)

    // TODO: Move the ghost to new location:
    // TODO: update the model (save cell contents so we can restore later)
    ghost.currCellContent = nextCell
    ghost.location = nextLocation

    gBoard[ghost.location.i][ghost.location.j] = GHOST
    // TODO: update the DOM
    renderCell(ghost.location, getGhostHTML(ghost))
}

function getMoveDiff() {
    const randNum = getRandomIntInclusive(1, 4)

    switch (randNum) {
        case 1: return { i: 0, j: 1 }
        case 2: return { i: 1, j: 0 }
        case 3: return { i: 0, j: -1 }
        case 4: return { i: -1, j: 0 }
    }
}

function getGhostHTML(ghost) {
    const ghostColor = (gPacman.isSuper) ? 'blue' : ghost.color
    // if(gPacman.isSuper){
    //     return `<span style ="background-color:blue;">${GHOST}</span> }
    return `<span style= "background-color:${ghostColor}">${GHOST}</span>`
}
function renderGhost() {
    for (var i = 0; i < gGhosts.length; i++) {
        var currGhost = gGhosts[i]
        renderCell(currGhost.location, getGhostHTML(currGhost))
    }
}
function killGhost(location) {
    for (var i = 0; i < gGhosts.length; i++) {
        var currLocation = gGhosts[i].location
        if (currLocation.i === location.i && currLocation.j === location.j) {
            const deadGhost = gGhosts.splice(i, 1)[0]
            checkGhostCellContect(deadGhost)
            gDeadGhost.push(deadGhost)
        }
        // renderCell(currGhost.location,getGhostHTML(currLocation))
    }
}
function checkGhostCellContect(ghost) {
    if (ghost.currLocation === FOOD) {
        handleFood()
        ghost.currCellContent = EMPTY
    }
}
function reviveGhost() {
    for (var i = 0; i < gDeadGhost.length; i++){
        const currGhost = gDeadGhost[i]
        gGhosts.push(currGhost)
    }
    gDeadGhost = []
}
function getRandomColor() {
    const letters = '0123456789ABCDEF'
    var color = '#'
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
    }
    return color
}