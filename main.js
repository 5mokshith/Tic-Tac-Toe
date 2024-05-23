/* const gameBoard = document.querySelector('#gameBoard');
const info = document.querySelector('#info');
const board = [
    " "," "," ",
    " "," "," ",
    " "," "," "
];
let turn = "circle";
info.textContent = `It is ${turn}'s turn `;

function createBoard(){
    board.forEach((cell,index) =>{
    var cells = document.createElement('div');
    cells.classList.add('cells');
    cells.id = "cell" + index;
    gameBoard.append(cells);
    cells.addEventListener('click',play);
});  
}



function play(event){
    let clickedCell = event.target;

    let cellIndex = parseInt(clickedCell.id.replace('cell', ''));

    board[cellIndex] = turn;

    let symbol = document.createElement('div');
    symbol.classList.add(turn === "circle"?"circle":"ex");
    clickedCell.append(symbol); 
    clickedCell.removeEventListener('click',play);
    
    if(checkWin()){
        
        
        winningCombinations.forEach(index => {
         document.getElementById(`cell${index}`).classList.add('flash');
         });
       
        setTimeout(()=>{
        document.body.style.fontSize = "30px";
        document.body.style.color = turn === "circle" ? "blue" : "red"; 
        document.body.innerText = (turn === "circle" ? "Circle " : "Ex "); + "is the Winner ! "  + (turn === "circle" ? "(Player 1)" : "(Player 2)");
       },200); 
        
    }
    else if(checkDraw()){
        document.body.innerText = "It is an draw"
        document.body.style.fontSize = "80px";
    }
    else{
        turn = turn === "circle"?"ex":"circle";
    info.textContent = `This is ${turn}'s turn `;
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6]             
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        if(board[a] !== " " && board[a] === board[b] && board[a] === board[c]){
            return combination
        }
        return null;
    });
}

function checkDraw(){
    return (board.every(element => element !== " "))
}

createBoard(); */



const gameBoard = document.querySelector('#gameBoard');
const info = document.querySelector('#info');
const board = [
    " ", " ", " ",
    " ", " ", " ",
    " ", " ", " "
];
let turn = "circle";
info.textContent = `It is ${turn}'s turn`;

const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function createBoard() {
    board.forEach((cell, index) => {
        const cells = document.createElement('div');
        cells.classList.add('cells');
        cells.id = "cell" + index;
        gameBoard.append(cells);
        cells.addEventListener('click', play);
    });
}

function play(event) {
    const clickedCell = event.target;
    const cellIndex = parseInt(clickedCell.id.replace('cell', ''));

    if (board[cellIndex] !== " ") return;  

    board[cellIndex] = turn;

    const symbol = document.createElement('div');
    symbol.classList.add(turn);
    symbol.id = `cells${cellIndex}`;
    clickedCell.append(symbol);
    clickedCell.removeEventListener('click', play);

    const winningCombination = checkWin();
    console.log(checkWin());
    if (winningCombination) {
        winningCombination.forEach(index => {
            document.getElementById(`cells${index}`).classList.add('flash');
        });

        setTimeout(() => {
            document.body.style.fontSize = "30px";
            document.body.style.color = turn === "circle" ? "blue" : "red";
            document.body.innerText = `${turn === "circle" ? "Circle" : "Ex"} is the Winner! ${turn === "circle" ? "(Player 1)" : "(Player 2)"}`;
            disableAllCells(); 
        },6000);  
        
    } else if (checkDraw()) {
        document.body.innerText = "It is a draw";
        document.body.style.fontSize = "80px";
        disableAllCells(); 
    } else {
        turn = turn === "circle" ? "ex" : "circle";
        info.textContent = `It is ${turn}'s turn`;
    }
}

function checkWin() {
    return winningCombinations.find(combination => {
        const [a, b, c] = combination;
        return board[a] !== " " && board[a] === board[b] && board[a] === board[c];
    });
}

function checkDraw() {
    return board.every(element => element !== " ");
}

function disableAllCells() {
    document.querySelectorAll('.cells').forEach(cell => {
        cell.removeEventListener('click', play);
    });
}

createBoard();

