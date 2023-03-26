// Selecting the necessary elements from the HTML
const chooseButton = document.querySelectorAll('.btn-logo'); // Buttons to choose X or O
const mainPage = document.querySelector('.main-div'); // Main page element
const gamePage = document.querySelector('.board-div'); // Game board element
const button2Vs = document.querySelector('.newgameb'); // Button to start a new game
const restartButton = document.getElementById('restart'); // Button to restart the game
const restartDiv = document.querySelector('.restart-game'); // Restart game popup element
const restartCancelButton = document.getElementById('cancel'); // Button to cancel restarting the game
const restartBack = document.getElementById('restore'); // Button to go back to the main menu
const gameBox = document.querySelectorAll('.game'); // Game squares
const backgroundHover = document.querySelector('.hover'); //Element used to display the hover effect over the game squares



// Arrays and variables to keep track of game state
let freeButton = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Array to keep track of available game squares
let xArray = []; // Array to keep track of X's moves
let oArray = []; // Array to keep track of O's moves
turn = 'x'; // Variable to keep track of whose turn it is




// Function to activate the X or O selection button
const acvtivateDecision = (figure) => {
    if(figure === 'x'){
        chooseButton[0].classList.add('active');
        chooseButton[1].classList.remove('active');
    } else {
        chooseButton[1].classList.add('active');
        chooseButton[0].classList.remove('active');
    }
};




// Function to handle restarting the game
const restartGame = () => {
    restartButton.addEventListener('click', () =>{
        restartDiv.style.display = 'flex';
        backgroundHover.style.display = "block";
    })
    
    restartCancelButton.addEventListener('click', () => {
        restartDiv.style.display = 'none';
        gamePage.style.display = 'flex';
        backgroundHover.style.display = "none";
    })
    
    restartBack.addEventListener('click', () => {
        restartDiv.style.display = 'none';
        gamePage.style.display = 'flex';
        backgroundHover.style.display = "none";
    })
}




// Function to handle selecting the game mode (not shown in this code)
const chooseGameMode = () =>{
    button2Vs.addEventListener('click', () => {
        mainPage.style.display = 'none';
        gamePage.style.display = 'flex';
    })
}




// Function to handle the hover effect on the game squares
const makeHover = () => {
    for(let i = 0; i < freeButton.length; i++){
        const gameIndex = freeButton[i];
        if(turn === 'x'){
            gameBox[gameIndex].classList.add('x-hover');
            gameBox[gameIndex].classList.remove('o-hover');
        } else{
            gameBox[gameIndex].classList.remove('x-hover');
            gameBox[gameIndex].classList.add('o-hover');
        }
    }
}




// Function to handle placing X or O icons on the game board
const clickMakeIcon = () => {
    for (let i = 0; i < gameBox.length; i++) {
        gameBox[i].onclick = (event) => {
            gameBox[i].classList.remove('x-hover');
            gameBox[i].classList.remove('o-hover');
            const icon = document.createElement('img');
            icon.classList.add('icon-style');
    
            const gameBoxIndex = freeButton.indexOf(i);
            freeButton.splice(gameBoxIndex, 1);
    
            if(turn === 'x') {
                icon.src = './starter-code/assets/icon-x.svg';
                event.target.append(icon);
                turn = 'o';
            } else{
                icon.src = './starter-code/assets/icon-o.svg';
                event.target.append(icon);
                turn = 'x';
            }
            makeHover();
            event.target.onclick = null;
        }
    }
}





//Run the functions
chooseGameMode();
restartGame();
makeHover();
clickMakeIcon();

