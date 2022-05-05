const cells = Array.from(document.getElementsByClassName('cell'));
const playerDisplay = document.getElementsByClassName('display-player');
const resetButton = document.getElementById('reset');
const announcer = document.getElementsByClassName('announcer');

let board = ['', '', '', '', '', '', '', '', '', ];
let currentPlayer = 'X';
let isGameActive = true;

const PLAYERX_WON = 'PLAYERX_WON';
const PLAYERO_WON = 'PLAYERO_WON';
const TIE  = 'TIE';

const winningCondition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i < 7; i++) {
        const winCondition = winningCondition[i];
        const a= board[winCondition[0]];
        const b= board[winCondition[1]];
        const c= board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;            
        }

        if (a === b && b === c ) {
            round = true;
            break;         
        }
    }

    if (roundWon) {
        if(currentPlayer === 'X'){
            announce(playerX_Won);
        }else{
            announce(playerO_Won);
        }
        isGameActive = false;
        return;
    }

    if (!board.includes('')) {
        announce(TIE);   
    }

}

function announce(type) {
    switch (type) {
        case playerO_Won:
            announcer.innerHTML = 'Player <span class=""PlayerO">O</span> Won';
            break;
        case playerX_Won:
            announcer.innerHTML = 'Player <span class=""PlayerX">X</span> Won';
            break;
        case TIE:
            announcer.innerHTML = 'Tie';
            break;
    }
    announcer.classList.remove('hide');
}

function isValidAction(cell) {
    if (cell.innerText === 'X' || cell.innerText === 'O') {
        return false;
    }
    return true;
}

function updateBoard(index) {
    board[index] = currentPlayer;
    
}

function changePlayer(){
    playerDisplay.classList.remove(`player${currentPlayer}`);
    if (currentPlayer === 'X') {
        currentPlayer = 'O';        
    }else{
        currentPlayer = 'X'
    }
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

function userAction(cell, index){
    if (isValidAction(cell) && isGameActive) {
        cell.innerText = currentPlayer;
        cell.classList.add(`playe${currentPlayer}`);
        updatePlayer(index);
        handleResultValidation();
        changePlayer();   
    }
}

function resetButton(){
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcer.classList.add('hide');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    cells.forEach(cell => {
        cell.innerText = '';
        cell.classList.remove('playerX');
        cell.classList.remove('playerO');
    });
}

cells.array.forEach((cell, index) => {
    cell.addEventListener('click', () => userAction(cell, index));
});

resetButton.addEventListener('click' resetButton);