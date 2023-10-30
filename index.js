// here are all of my constants, could not get the images

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

let cardSet = cardType.concat(cardType);
const cardSetLength = cardSet.length;
const gameBoard = document.querySelector(".cards");
const startButton = document.getElementById("startButton");
const currentAttempts = document.getElementById("attempts");
const messageDiv = document.getElementById("message");


// variables needed
let visibleCards = 0;
let activeCard = null;
let activeCardColor = null;
let awaitingEndOfMove = false;
let attempts = 0;
let timer = null;
let seconds = 0;

// got the timer function from watching the youTube channel Web Dev Simplified
function startTimer() {
    timer = setInterval(updateTimer, 1000);
}
function updateTimer() {
    seconds++;
    const minutes = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
    const remainingSeconds = (seconds % 60).toString().padStart(2, "0");
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = `${minutes}:${remainingSeconds}`;
}

startButton.addEventListener("click", startGame);


function startGame() {
    messageDiv.setAttribute('hidden', 'hidden');
    gameBoard.innerHTML = ""; 
    //visiability for the message div set to false
    
    // this makes the cards randomly appear
    for (let i = 0; i < cardSetLength; i++) {
        const randomIndex = Math.floor(Math.random() * cardSet.length);

        const randomCard = cardSet[randomIndex];
        const card = createCard(randomCard);

        cardSet.splice(randomIndex, 1);
        gameBoard.appendChild(card);
        card.addEventListener("click", cardHandler); 
    }
    cardSet = cardType.concat(cardType);
    attempts = 0;
    currentAttempts.innerText = attempts;
    stopTimer(timer);
    console.log(timer);
    startTimer();

}
    
function checkGameOver() {
    if (visibleCards === cardSetLength) {
        stopTimer();
        //visiability for the message div set to true
        function showMessage() {
            messageDiv.removeAttribute("hidden"); 
        }
        showMessage();
    }
}

function stopTimer() {
    clearInterval(timer);
    seconds = 0;
    const timerDisplay = document.getElementById("timer");
    timerDisplay.innerText = "";  
}

// this is where the cards are being revealed and hidden used youtube video for inspiration learn the javascript DOM with this project
function createCard(randomCard) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-cardType", randomCard);
    card.setAttribute("data-revealed", "false");
    //  here is the event listener to make it click and reveal and stay if match occurs and turns black if does not match
    return card;
}
function cardHandler(event) {
    let card = event.target;
    const cardRevealed = card.getAttribute("data-revealed");

    if (awaitingEndOfMove || cardRevealed === "true" || card == activeCard) {
        return;
    }

    card.style.backgroundColor = card.getAttribute("data-cardType");

    if (!activeCard) {
        activeCard = card;
        activeCardColor = card.getAttribute("data-cardType");
        return;
    }

    const cardToMatch = card.getAttribute("data-cardType");

    console.log(activeCardColor);
    console.log(cardToMatch);

    if (cardToMatch === activeCardColor) {
        activeCard.setAttribute("data-revealed", "true"); //cardType --> revealed
        card.setAttribute("data-revealed", "true");

        activeCard = null;
        awaitingEndOfMove = false;
        visibleCards += 2;
        console.log(visibleCards);
        checkGameOver();

        return;
    }

    awaitingEndOfMove = true;
    

    setTimeout(() => {
        card.style.backgroundColor = null;
        activeCard.style.backgroundColor = null;

        awaitingEndOfMove = false;
        activeCard = null;
        updateAttempts();
    }, 250);
    attempts++;
    currentAttempts.innerText = attempts;
}


// watched the video on YouTube learn the JavaScript DOM with this project for inspiration and when i couldn't get my pokemon pictures to work i went with the colors and got the idea from this video.
