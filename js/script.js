//const cells = document.getElementsByClassName('cells');
const playerDisplay = document.getElementById('display-player');
const playerTurn = document.getElementById('player-turn');
const resetButton = document.getElementById('reset');
const announcement = document.getElementById('announcement');
const announcer = document.getElementById('announcer');
const boardPlayer = document.getElementById('board');

let board = ['', '', '', '', '', '', '', '', '', ];
let currentPlayer = 'X';
let isGameActive = true;

const playerX_Won = 'PLAYERX_WON';
const playerO_Won = 'PLAYERO_WON';
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

//cells.forEach(myFunction);

function myFunction(cell, index) {
    var cell = document.getElementById(cell);
    playerTurn.classList.remove('hide');
    userAction(cell, index);
    //cell.addEventListener('click', userAction(cell, index));
}


function userAction(cell, index){
    currentPlayer == cell.innerText;
    if (isValidAction(cell) && isGameActive) {
        cell.innerText = currentPlayer;
        updateBoard(index);
        handleResultValidation();
        changePlayer(cell);   
    }
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
            roundWon = true;
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

        alert(isGameActive);
    }

    if (!board.includes('')) {
        announce(TIE);   
    }

}

function announce(type) {
    switch (type) {
        case playerO_Won:
            announcement.classList.remove('hide'); 
            announcement.classList.add('show');            
            announcer.innerHTML = 'Player <span class="PlayerO">O</span> Won';
            break;
        case playerX_Won:
            announcement.classList.remove('hide'); 
            announcement.classList.add('show'); 
            announcer.innerHTML = 'Player <span class="PlayerX">X</span> Won';
            break;
        case TIE:
            announcer.innerHTML = 'Tie';
            break;
    }
    announcer.classList.remove('hide');
}


function changePlayer(cell){
    playerDisplay.classList.remove(`player${currentPlayer}`);
    boardPlayer.classList.remove(currentPlayer);
    if (currentPlayer === 'X') {
        currentPlayer = 'O'; 
        cell.classList.add('x');      
    }else{
        currentPlayer = 'X';
        cell.classList.add('o');
    }
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
    boardPlayer.classList.add(currentPlayer);
}

function resetBoard(){
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcement.classList.add('hide');
    announcement.classList.remove('show');

    if (currentPlayer === 'O') {
        changePlayer();
    }

    for (let i = 0; i < 9; i++) {
        var cell = document.getElementById('cell'+i)
    
        cell.innerText = '';
        cell.classList.remove('playerX');
        cell.classList.remove('playerO');
    }
}



//resetButton.addEventListener('click', resetBoard);