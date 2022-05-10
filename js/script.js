// document.getElementsByName('player').forEach(function(firstPlayer) {
//     firstPlayer.addEventListener('click', function() {
//         var player = firstPlayer.value;
//         document.getElementById('display-player').innerText = player;
//         document.getElementById('start').classList.remove('hide');
//     });
//     });

//     document.getElementById('start').addEventListener("click", start);

const cells = document.getElementsByClassName('cell');
const playerDisplay = document.getElementById('display-player');
const playerTurn = document.getElementById('player-turn');
const resetButton = document.getElementById('reset');
const announcement = document.getElementById('announcement');
const announcer = document.getElementById('announcer');
const boardPlayer = document.getElementById('board');

let board = ['', '', '', '', '', '', '', '', '', ];
let currentPlayer = playerDisplay.innerText;
boardPlayer.classList.add(currentPlayer.toLowerCase());
let isGameActive = true;

const playerX_Won = 'PLAYERX_WON';
const playerO_Won = 'PLAYERO_WON';
const TIE = 'TIE';

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

for (let i = 0; i < 9; i++) {
    cells[i].addEventListener('click', function () {
        if (isValidAction(cells[i]) && isGameActive === true) {
            cells[i].innerText = currentPlayer;

            if (currentPlayer === 'X') {
                cells[i].classList.add('x');
            } else {
                cells[i].classList.add('o');
            }
            updateBoard(i);
            handleResultValidation();
            changePlayer(cells[i]);
        }
    });
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
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningCondition[i];
        const a = board[winCondition[0]];
        const b = board[winCondition[1]];
        const c = board[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
            console.log(a);
                }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        if (currentPlayer === 'X') {
            announce(playerX_Won);
        } else {
            announce(playerO_Won);
        }
        playerTurn.classList.add('hide');
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
            announcement.classList.remove('hide');
            announcement.classList.add('show');
            announcer.innerHTML = 'Tie';
            break;
    }
    announcer.classList.remove('hide');
}


function changePlayer(cell) {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    boardPlayer.classList.remove(currentPlayer.toLowerCase());
    if (currentPlayer === 'X') {
        currentPlayer = 'O';
    } else {
        currentPlayer = 'X';
    }
    boardPlayer.classList.add(currentPlayer.toLowerCase());
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
    playerTurn.classList.remove('hide');
}

resetButton.addEventListener('click', resetBoard);

function resetBoard() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    announcement.classList.add('hide');
    announcement.classList.remove('show');

    changePlayer();

    for (let i = 0; i < 9; i++) {
        cells[i].innerText = '';
        cells[i].classList.remove('x');
        cells[i].classList.remove('o');
    }
}