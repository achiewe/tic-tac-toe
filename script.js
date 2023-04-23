// Selecting the necessary elements from the HTML
const chooseButton = document.querySelectorAll(".btn-logo"); // Buttons to choose X or O
const mainPage = document.querySelector(".main-div"); // Main page element
const gamePage = document.querySelector(".board-div"); // Game board element
const button2Vs = document.querySelector(".newgameb"); // Button to start a new game
const restartButton = document.getElementById("restart"); // Button to restart the game
const restartDiv = document.querySelector(".restart-game"); // Restart game popup element
const restartCancelButton = document.getElementById("cancel"); // Button to cancel restarting the game
const yesRestart = document.getElementById("restore"); // Button to go back to the main menu
const gameBox = document.querySelectorAll(".game"); // Game squares
const backgroundHover = document.querySelector(".hover"); //Element used to display the hover effect over the game squares
const playerOWin = document.getElementById("playeroWin"); // Element to display player O's win count
const playerXwin = document.getElementById("playerxWin"); // Element to display player X's win count
const matchTied = document.getElementById("tied"); // Element to display number of tied matches
const backgroundOverlay = document.querySelector(".overlay"); // Element to display overlay over game board
const quitButton = document.querySelectorAll(".quit"); // Buttons to quit the game
const nextRoundButton = document.querySelectorAll(".next-round"); // Buttons to play the next round
const blueBox = document.getElementById("Xplayer"); // Element to display player X's name
const playerXCount = document.getElementById("Xcount"); // Element to display player X's win count
const yellowBox = document.getElementById("Oplayer"); // Element to display player O's name
const playerOCount = document.getElementById("Ocount"); // Element to display player O's win count
const playerTied = document.getElementById("tie-title"); // Element to display tied match count
const playertieCount = document.getElementById("tie-count"); // Element to display tied match count
const iconsHeaderXO = document.getElementById("header-svg"); // Header element displaying X and O icons
const TurnX = document.getElementById("icon-x"); // Element to display X icon for current turn
const turnO = document.getElementById("icon-o"); // Element to display O icon for current turn

// Arrays and variables to keep track of game state
let freeButton = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Array to keep track of available game squares
let xArray = []; // Array to keep track of X's moves
let oArray = []; // Array to keep track of O's moves
let turn = "x"; // Variable to keep track of whose turn it is
let player1; // Variable to store the name of the first player
let winningCombination = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; // Array to store all possible winning combinations

let countX = 0; // Variable to store the number of wins for player X
let countO = 0; // Variable to store the number of wins for player O
let countTied = 0; // Variable to store the number of tied matches

// Function to activate the X or O selection button
const acvtivateDecision = (figure) => {
  if (figure === "x") {
    chooseButton[0].classList.add("active");
    chooseButton[1].classList.remove("active");
    player1 = "x";
  } else if (figure === "o") {
    chooseButton[1].classList.add("active");
    chooseButton[0].classList.remove("active");
    player1 = "o";
  }
};

// Function to select the player and update the UI accordingly
const selectPlayer = () => {
  if (player1 === "x") {
    // If player1 chooses X, update the UI to show X as Player 1 and O as Player 2
    blueBox.innerHTML = "X (P1)";
    yellowBox.innerHTML = "O (P2)";
    playerXwin.firstElementChild.firstElementChild.textContent =
      "PLAYER 1 WINS!";
    playerOWin.firstElementChild.firstElementChild.textContent =
      "PLAYER 2 WINS!";
  } else if (player1 === "o") {
    // If player1 chooses O, update the UI to show O as Player 1 and X as Player 2
    yellowBox.innerHTML = "O (P1)";
    blueBox.innerHTML = "X (P2)";
    playerXwin.firstElementChild.firstElementChild.textContent =
      "PLAYER 2 WINS!";
    playerOWin.firstElementChild.firstElementChild.textContent =
      "PLAYER 1 WINS!";
  } else if (player1 !== "x" && player1 !== "o") {
    // If player1 does not choose X or O, display the main page and hide the game board
    mainPage.style.display = "flex";
    gamePage.style.display = "none";
  }
};

// Function to change the display of the player's turn icon
const alterationTurn = () => {
  if (turn === "x") {
    // Display the X icon and hide the O icon
    TurnX.style.display = "block";
    turnO.style.display = "none";
  } else {
    // Display the O icon and hide the X icon
    turnO.style.display = "block";
    TurnX.style.display = "none";
  }
};

// Function to reset the game board to its initial state
const resetGameView = () => {
  freeButton = [0, 1, 2, 3, 4, 5, 6, 7, 8]; // Resetting the array to keep track of available game squares
  xArray = []; // Resetting the array to keep track of X's moves
  oArray = []; // Resetting the array to keep track of O's moves
  turn = "x"; // Setting the turn to X
  clickMakeIcon(); // Re-adding the click event listeners to the game squares
  makeHover(); // Re-adding the hover effect to the game squares
};

// Function to handle restarting the game
const restartGame = () => {
  restartButton.addEventListener("click", () => {
    restartDiv.style.display = "flex";
    backgroundHover.style.display = "block";
  });

  restartCancelButton.addEventListener("click", () => {
    restartDiv.style.display = "none";
    gamePage.style.display = "flex";
    backgroundHover.style.display = "none";
  });

  yesRestart.addEventListener("click", () => {
    for (let index = 0; index < gameBox.length; index++) {
      if (gameBox[index].hasChildNodes()) {
        resetGameView();
        gameBox[index].innerHTML = "";
      }
    }
    backgroundHover.style.display = "none";
    restartDiv.style.display = "none";
    playerXCount.textContent = "0";
    playertieCount.textContent = "0";
    playerOCount.textContent = "0";
    turn = "x";
    resetGameView();
    alterationTurn();
  });
};

// Function to handle the hover effect on the game squares
const makeHover = () => {
  for (let i = 0; i < freeButton.length; i++) {
    const gameIndex = freeButton[i];
    if (turn === "x") {
      gameBox[gameIndex].classList.add("x-hover");
      gameBox[gameIndex].classList.remove("o-hover");
    } else {
      gameBox[gameIndex].classList.remove("x-hover");
      gameBox[gameIndex].classList.add("o-hover");
    }
  }
};

// Function to handle placing X or O icons on the game board
const clickMakeIcon = () => {
  for (let i = 0; i < gameBox.length; i++) {
    gameBox[i].onclick = (event) => {
      gameBox[i].classList.remove("x-hover");
      gameBox[i].classList.remove("o-hover");
      const icon = document.createElement("img");
      icon.classList.add("icon-style");

      const gameBoxIndex = freeButton.indexOf(i);
      freeButton.splice(gameBoxIndex, 1);

      if (turn === "x") {
        icon.src = "./starter-code/assets/icon-x.svg";
        event.target.append(icon);
        turn = "o";
        xArray.push(i);
      } else {
        icon.src = "./starter-code/assets/icon-o.svg";
        event.target.append(icon);
        turn = "x";
        oArray.push(i);
      }
      makeHover();
      event.target.onclick = null;
      checkWinner();
      alterationTurn();
    };
  }
};

// This function checks the winning combinations on the board and displays the winner or tie message, and updates the count for each player. If a player wins, their winning combination is highlighted and the other boxes are cleared.
const checkWinner = () => {
  for (let i = 0; i < winningCombination.length; i++) {
    if (
      xArray.includes(winningCombination[i][0]) &&
      xArray.includes(winningCombination[i][1]) &&
      xArray.includes(winningCombination[i][2])
    ) {
      playerXwin.style.display = "flex";
      backgroundOverlay.style.display = "flex";

      const [a, b, c] = winningCombination[i];
      gameBox[a].classList.add("x-winner-active");
      gameBox[b].classList.add("x-winner-active");
      gameBox[c].classList.add("x-winner-active");

      gameBox[a].innerHTML = "";
      gameBox[b].innerHTML = "";
      gameBox[c].innerHTML = "";

      countX++;
      return;
    } else if (
      oArray.includes(winningCombination[i][0]) &&
      oArray.includes(winningCombination[i][1]) &&
      oArray.includes(winningCombination[i][2])
    ) {
      playerOWin.style.display = "flex";
      backgroundOverlay.style.display = "flex";

      const [a, b, c] = winningCombination[i];
      gameBox[a].classList.add("o-winner-active");
      gameBox[b].classList.add("o-winner-active");
      gameBox[c].classList.add("o-winner-active");

      gameBox[a].innerHTML = "";
      gameBox[b].innerHTML = "";
      gameBox[c].innerHTML = "";
      countO++;
      return;
    }
  }

  if (freeButton.length === 0 && !checkTie()) {
    matchTied.style.display = "flex";
    backgroundOverlay.style.display = "flex";
    countTied++;
  }
};

// This function checks if the game is tied by checking if all cells have been clicked and there is no winner
const checkTie = () => {
  for (let i = 0; i < winningCombination.length; i++) {
    if (
      xArray.includes(winningCombination[i][0]) &&
      xArray.includes(winningCombination[i][1]) &&
      xArray.includes(winningCombination[i][2])
    ) {
      return true;
    } else if (
      oArray.includes(winningCombination[i][0]) &&
      oArray.includes(winningCombination[i][1]) &&
      oArray.includes(winningCombination[i][2])
    ) {
      return true;
    }
  }
  return false;
};

// This function handles the click event for the Quit button and Next Round button
const buttonClick = () => {
  for (let i = 0; i < quitButton.length; i++) {
    quitButton[i].addEventListener("click", () => {
      location.reload();
    });
  }
  // Add click event listener to Next Round button to reset game view for the next round
  for (let j = 0; j < nextRoundButton.length; j++) {
    nextRoundButton[j].addEventListener("click", () => {
      // Hide the result pop-up and update the player scores
      playerOWin.style.display = "none";
      playerXwin.style.display = "none";
      matchTied.style.display = "none";
      playerXCount.textContent = countX;
      playerOCount.textContent = countO;
      playertieCount.textContent = countTied;
      backgroundOverlay.style.display = "none";

      // Remove winner active class from all game boxes
      for (let e = 0; e < gameBox.length; e++) {
        gameBox[e].classList.remove("x-winner-active");
        gameBox[e].classList.remove("o-winner-active");
      }

      // Reset game state for next round
      turn = "x";
      alterationTurn();
      for (let index = 0; index < gameBox.length; index++) {
        if (gameBox[index].hasChildNodes()) {
          resetGameView();
          gameBox[index].innerHTML = "";
        }
      }
    });
  }
};

// Function to handle selecting the game mode (not shown in this code)
const chooseGameMode = () => {
  button2Vs.addEventListener("click", () => {
    mainPage.style.display = "none";
    gamePage.style.display = "flex";
    selectPlayer();
  });
};

// Function to navigate back to the home page when the X/O icons header is clicked
const BackHomePage = () => {
  iconsHeaderXO.addEventListener("click", () => {
    gamePage.style.display = "none";
    mainPage.style.display = "flex";
  });
};

//Run the functions
chooseGameMode();
restartGame();
makeHover();
clickMakeIcon();
buttonClick();
BackHomePage();
