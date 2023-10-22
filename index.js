// here are all of my constants, could not get the images 

const cardType = ["red","orange","yellow","green","blue","purple","grey","brown","deeppink","aqua"];
const cardSet = cardType.concat(cardType);
const randomCard = cardSet.length;

const gameBoard = document.querySelector(".cards");
const startButton = document.getElementById("startButton")
const currentAttempts =document.getElementById("attempts");

// variables needed 
let visibleCards = 0;
let activeCard = null;
let awaitingEndOfMove = false;
let attempts = 0;
let timer;
let seconds = 0;


startButton.addEventListener("click", startGame);

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

function startGame(){ 

    gameBoard.innerHTML="";
    startTimer();
    // this makes the cards randomly appear
    for (let i = 0; i < randomCard; i++) {
        const randomIndex = Math.floor(Math.random() * cardSet.length);
        const randomCard = cardSet[randomIndex];
        const card = createCard(randomCard);
    
        cardSet.splice(randomIndex, 1);
        gameBoard.appendChild(card);
    }
}

function checkGameOver() {    
    if (visibleCards === randomCard) {
        stopTimer();
        clearInterval(timer);
    }
}    
function stopTimer() {
    clearInterval(timer);
}

// this is where the cards are being revealed and hidden
function createCard(randomCard) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-cardType", randomCard);
    card.setAttribute("data-revealed", "false");
//  here is the event listener to make it click and reveal and stay if match occurs and turns black if does not match
    
card.addEventListener("click", () => {
        const cardRevealed = card.getAttribute("data-revealed");
        if (awaitingEndOfMove || cardRevealed === "true" || card == activeCard) {
            return;
        }
        card.style.backgroundColor = randomCard;

        if (!activeCard) {
            activeCard = card;

            return;
        }

        const cardToMatch = activeCard.getAttribute("data-cardType");

        if (cardToMatch === randomCard) {
            activeCard.setAttribute("data-cardType", "true");
            card.setAttribute("data-revealed", "true");

            activeCard = null;
            awaitingEndOfMove = false;
            visibleCards += 2;

            checkGameOver();

            return;
        }
    //     return;
    // }
        awaitingEndOfMove = true;

        setTimeout(() => {
            card.style.backgroundColor = null;
            activeCard.style.backgroundColor = null;
        
            awaitingEndOfMove = false;
            activeCard = null;
            updateAttempts();
        }, 1000);
        attempts++;
        currentAttempts.innerText = attempts;
    });

    return card;
}





