
// need to create variables for the cards and  playing board
let errors = 0
let cardType = ["Ivysaur", "Eevee", "Pachirisu", "Pikachu", "Totodile", "Squirtle", "Marill", "Phanpy", "Pipiup", "Skitty"]
let board = [];
let playingCards;
// let rows = 5;
// let columns = 4;

// let cardChoice1;
// let cardChoice2;

// use windows.onload to get the image on the page
window.onload = function() {
    shuffleDeck();
    startGame();
}

function shuffleDeck() {  
// 2 of each kind of card is needed to play the game. concat will create a copy of the array
    playingCards = cardType.concat(cardType);
    // console.log(playingCards) the concat worked I now have 2 sets of cards
}
// need to find a way to have the cards shuffle each time the game starts. 


// now I need to get the board arranged


