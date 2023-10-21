const cardBoard = document.querySelector(".cards");
const cardType = ["red","orange","yellow","green","blue","purple","lime","gold","pink","aqua"];
const cardSet = cardType.concat(cardType);
const randomCard = cardSet.length;

let visibleCards = 0;
let activeCard = null;
let awaitingEndOfMove = false;
let attempts = 0;
let currentAttempts =document.getElementById("attempts");
// attempts++;
// currentAttempts.innerText = attempts;

function createCard(randomCard) {
    const card = document.createElement("div");

    card.classList.add("card");
    card.setAttribute("data-cardType", randomCard);
    card.setAttribute("data-revealed", "false");

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

            // if (visibleCards === randomCard) {
            //     alert ("Congrats! Play Again");
            // }
            return;
        }
        awaitingEndOfMove = true;
            
        setTimeout(() => {
            card.style.backgroundColor = null;
            activeCard.style.backgroundColor = null;
        
            awaitingEndOfMove = false;
            activeCard = null;
        }, 1000);
        attempts++;
        currentAttempts.innerText = attempts;
    });

    return card;
}

for (let i = 0; i < randomCard; i++) {
    const randomIndex = Math.floor(Math.random() * cardSet.length);
    const randomCard = cardSet[randomIndex];
    const card = createCard(randomCard);

    cardSet.splice(randomIndex, 1);
    cardBoard.appendChild(card);

    console.log(randomCard);
}



