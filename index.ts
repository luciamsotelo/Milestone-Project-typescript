// Constants
const cardType: string[] = [
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

const cardSet: string[] = [...cardType, ...cardType]; // Concatenate cardType array
const cardSetLength: number = cardSet.length;
const gameBoard: HTMLElement | null = document.querySelector(".cards");
const startButton: HTMLElement | null = document.getElementById("startButton");
const currentAttempts: HTMLElement | null = document.getElementById("attempts");
const messageDiv: HTMLElement | null = document.getElementById("message");

// Variables
let visibleCards: number = 0;
let activeCard: HTMLElement | null = null;
let activeCardColor: string | null = null;
let awaitingEndOfMove: boolean = false;
let attempts: number = 0;
let timer: NodeJS.Timeout | null = null;
let seconds: number = 0;

// Timer function
function startTimer(): void {
    timer = setInterval(updateTimer, 1000);
}

function updateTimer(): void {
    seconds++;
    const minutes: string = Math.floor(seconds / 60).toString().padStart(2, "0");
    const remainingSeconds: string = (seconds % 60).toString().padStart(2, "0");
    const timerDisplay: HTMLElement | null = document.getElementById("timer");
    if (timerDisplay) {
        timerDisplay.innerText = `${minutes}:${remainingSeconds}`;
    }
}

// Event listeners
if (startButton) {
    startButton.addEventListener("click", startGame);
}

// Function to start the game
function startGame(): void {
    // Hide message
    if (messageDiv) {
        messageDiv.setAttribute('hidden', 'hidden');
    }

    // Clear game board
    if (gameBoard) {
        gameBoard.innerHTML = "";
    }

    // Shuffle cards and append to game board
    shuffle(cardSet).forEach(card => {
        const cardElement: HTMLElement = createCard(card);
        if (gameBoard) {
            gameBoard.appendChild(cardElement);
        }
        cardElement.addEventListener("click", cardHandler);
    });

    // Reset attempts and start timer
    attempts = 0;
    if (currentAttempts) {
        currentAttempts.innerText = attempts.toString();
    }
    stopTimer();
    startTimer();
}

// Function to check if the game is over
function checkGameOver(): void {
    if (visibleCards === cardSetLength) {
        stopTimer();
        // Show message
        if (messageDiv) {
            messageDiv.removeAttribute("hidden");
        }
        setTimeout(() => {
            location.reload(); // Refresh the page after a delay
        }, 6000);
    }
}

// Function to stop the timer
function stopTimer(): void {
    if (timer) {
        clearInterval(timer);
    }
    seconds = 0;
    const timerDisplay: HTMLElement | null = document.getElementById("timer");
    if (timerDisplay) {
        timerDisplay.innerText = "";
    }
}

// Function to create card element
function createCard(randomCard: string): HTMLElement {
    const card: HTMLElement = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-cardType", randomCard);
    card.setAttribute("data-revealed", "false");
    return card;
}

// Function to handle card clicks
function cardHandler(event: Event): void {
    const card: HTMLElement = event.target as HTMLElement;
    const cardRevealed: string | null = card.getAttribute("data-revealed");

    if (awaitingEndOfMove || cardRevealed === "true" || card === activeCard) {
        return;
    }

    card.style.backgroundColor = card.getAttribute("data-cardType") || "";

    if (!activeCard) {
        activeCard = card;
        activeCardColor = card.getAttribute("data-cardType");
        return;
    }

    const cardToMatch: string | null = card.getAttribute("data-cardType");

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
            card.style.backgroundColor = "";
            if (activeCard) {
                activeCard.style.backgroundColor = "";
            }
            awaitingEndOfMove = false;
            activeCard = null;
            updateAttempts();
        }, 250);
    }
    attempts++;
    if (currentAttempts) {
        currentAttempts.innerText = attempts.toString();
    }
}

// Function to shuffle array
function shuffle(array: string[]): string[] {
    return array.sort(() => Math.random() - 0.5);
}
