const nrow = 6;
const ncol = 7;
let boardArray = Array(nrow * ncol).fill(0);
let player = 1;
let winner = 0;

function checkHorizontalRight(currentPos, rowId, colId) {
    return (boardArray[currentPos] != 0 &&
        (boardArray[currentPos] == boardArray[rowId*ncol + (colId + 1)]) &&
        (boardArray[currentPos] == boardArray[rowId*ncol + (colId + 2)]) &&
        (boardArray[currentPos] == boardArray[rowId*ncol + (colId + 3)]));
}

function checkDiagRight(currentPos, rowId, colId) {
    return (rowId + 3 < nrow) && (boardArray[currentPos] != 0 &&
        (boardArray[currentPos] == boardArray[(rowId+1)*ncol + (colId + 1)]) &&
        (boardArray[currentPos] == boardArray[(rowId+2)*ncol + (colId + 2)]) &&
        (boardArray[currentPos] == boardArray[(rowId+3)*ncol + (colId + 3)]));
}

function checkDiagLeft(currentPos, rowId, colId) {
    return (colId - 3 >= 0) && (boardArray[currentPos] != 0 &&
        (boardArray[currentPos] == boardArray[(rowId+1)*ncol + (colId - 1)]) &&
        (boardArray[currentPos] == boardArray[(rowId+2)*ncol + (colId - 2)]) &&
        (boardArray[currentPos] == boardArray[(rowId+3)*ncol + (colId - 3)]));
}

function checkVerticalDown(currentPos, rowId, colId) {
    return (boardArray[currentPos] != 0 &&
        (boardArray[currentPos] == boardArray[(rowId+1)*ncol + colId]) &&
        (boardArray[currentPos] == boardArray[(rowId+2)*ncol + colId]) &&
        (boardArray[currentPos] == boardArray[(rowId+3)*ncol + colId]));
}

function isEnoughCellsToRight(colId) {
    return colId + 3 < ncol
}

function isEnoughCellsToDown(rowId) {
    return rowId + 3 < nrow
}

function checkRight(currentPos, rowId, colId) {
    if(!isEnoughCellsToRight(colId)) return 0;

    if(checkHorizontalRight(currentPos, rowId, colId))
        return boardArray[currentPos];

    if(checkDiagRight(currentPos, rowId, colId))
        return boardArray[currentPos];

    return 0;
}

function checkLeftDown(currentPos, rowId, colId) {
    if (!isEnoughCellsToDown(rowId)) return 0;

    if(checkVerticalDown(currentPos, rowId, colId))
        return boardArray[currentPos];

    if(checkDiagLeft(currentPos, rowId, colId)) {
        return boardArray[currentPos];
    }

    return 0;
}

function checkWinner() {
    for(let rowId = 0; rowId < nrow; rowId++) {
        for(let colId = 0; colId < ncol; colId++) {
            const currentPos = rowId * ncol + colId;
            if(checkRight(currentPos, rowId, colId) || checkLeftDown(currentPos, rowId, colId)) {
                return boardArray[currentPos]
            }
        }
    }

    return 0; //no winner
}

function changeBackground(rowId, colIndex, player) {
    $('.one-field[attr-row-index="'+rowId+'"][attr-col-index="'+colIndex+'"]')
        .removeClass()
        .addClass((player == 1)
            ? 'one-field color-red'
            :'one-field color-purple');
}

function displayResult() {
    $('.winner').text('Player ' + winner + ' is winner!');
}

function displayWinner() {
    winner = checkWinner();
    if(winner) {
        displayResult();
    }
}

function switchPlayer() {
    if(player == 1) {
        player = 2;
        return;
    }

    player = 1;
}

function isGameOver() {
    return winner != 0;
}

function processGame(colIndex) {
    for(var rowId = nrow - 1; rowId >= 0; rowId--) {
        if(boardArray[rowId*ncol + colIndex] == 0) {
            boardArray[rowId*ncol + colIndex] = player;
            changeBackground(rowId, colIndex, player)
            switchPlayer()
            displayWinner()
            break;
        }
    }
}

$(document).on('click', '.one-field', function(){
    if(isGameOver()) {
        return;
    }

    let colIndex = parseInt($(this).attr('attr-col-index'));
    processGame(colIndex);
})