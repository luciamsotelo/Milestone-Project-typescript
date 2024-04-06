// Constants
const cardType = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "purple",
    "grey",
    "brown",
    "deeppink",
    "aqua",
];

const cardSet = [...cardType, ...cardType]; // Concatenate cardType array
const cardSetLength = cardSet.length;
const gameBoard = document.querySelector(".cards");
const startButton = document.getElementById("startButton");
const currentAttempts = document.getElementById("attempts");
const messageDiv = document.getElementById("message");

// Variables
let visibleCards = 0;
let activeCard = null;
let activeCardColor = null;
let awaitingEndOfMove = false;
let attempts = 0;
let timer = null;
let seconds = 0;

// Timer function
function startTimer() {
    timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = `${minutes}:${remainingSeconds}`;
}

// Event listeners
startButton.addEventListener("click", startGame);

// Function to start the game
function startGame() {
    // Hide message
    messageDiv.setAttribute('hidden', 'hidden');

    // Clear game board
    gameBoard.innerHTML = "";

    // Shuffle cards and append to game board
    shuffle(cardSet).forEach(card => {
        const cardElement = createCard(card);
        gameBoard.appendChild(cardElement);
        cardElement.addEventListener("click", cardHandler);
    });

    // Reset attempts and start timer
    attempts = 0;
    currentAttempts.innerText = attempts;
    stopTimer();
    startTimer();
}

// Function to check if the game is over
function checkGameOver() {
    if (visibleCards === cardSetLength) {
        stopTimer();
        messageDiv.removeAttribute("hidden"); // Show message
        setTimeout(() => {
            location.reload(); // Refresh the page after a delay
        }, 6000);
    }
}

// Function to stop the timer
function stopTimer() {
    clearInterval(timer);
    seconds = 0;
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = "";  
}

// Function to create card element
function createCard(randomCard) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-cardType", randomCard);
    card.setAttribute("data-revealed", "false");
    return card;
}

// Function to handle card clicks
function cardHandler(event) {
    const card = event.target;
    const cardRevealed = card.getAttribute("data-revealed");

    if (awaitingEndOfMove || cardRevealed === "true" || card === activeCard) {
        return;
    }

    card.style.backgroundColor = card.getAttribute("data-cardType");

    if (!activeCard) {
        activeCard = card;
        activeCardColor = card.getAttribute("data-cardType");
        return;
    }

    const cardToMatch = card.getAttribute("data-cardType");

    if (cardToMatch === activeCardColor) {
        activeCard.setAttribute("data-revealed", "true");
        card.setAttribute("data-revealed", "true");
        activeCard = null;
        awaitingEndOfMove = false;
        visibleCards += 2;
        checkGameOver();
    } else {
        awaitingEndOfMove = true;
        setTimeout(() => {
            card.style.backgroundColor = null;
            activeCard.style.backgroundColor = null;
            awaitingEndOfMove = false;
            activeCard = null;
            updateAttempts();
        }, 250);
    }
    attempts++;
    currentAttempts.innerText = attempts;
}

// Function to shuffle array
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}
