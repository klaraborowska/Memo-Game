const cardGame = document.querySelector(".card-list");

// shuffle card when click on refresh button
document.querySelector(".restart-button").addEventListener("click", function() {
    shuffleCards();
});

// shuffle card function, randomly replace icon on cards
function shuffleCards() {
    const cards = document.querySelectorAll(".card-back img");
    for (let i = 0; i < cards.length; i++) {
        let random = Math.floor(Math.random() * (cards.length - 1));

        let a = cards[i].src;
        cards[i].src = cards[random].src;
        cards[random].src =  a;
      }
}


let gameRound = 2;
let moves = 0;
let previousSrc;

//add event listener to card list
cardGame.addEventListener("click", function(event) {
    const frontCard = event.target;
    const backCard = event.target.nextElementSibling;

    //check if the clicked element is a div with a class "card-front"
    if (frontCard.nodeName === "DIV" && frontCard.classList.contains("card-front")) {

        //check if the clickd element doesn't have the class "front-inacitive" (in order not to add the second the same class)
        if (!frontCard.classList.contains("front-inactive")) {
            frontCard.classList.add("front-inactive");
            backCard.classList.add("back-active");
            gameRound -= 1;
        }

        //happens, when two cards are open
        if (gameRound === 0) {

            //reset gameround
            gameRound = 2;

            //add one move
            moves +=1;
            console.log("moves: " + moves);
            
            //compares, if cards have the same icons
            if (previousSrc !== backCard.firstElementChild.src) {
                hideCard(frontCard, backCard);
                hideCard(previousFront, previousBack);
            }
            
        }
    
       
        previousSrc = backCard.firstElementChild.src;
        previousFront = frontCard;
        previousBack = backCard;
    } 
});


function hideCard(x, y) {
    if (x.classList.contains("front-inactive") && y.classList.contains("back-active")) {
        x.classList.remove("front-inactive");
        y.classList.remove("back-active");
    }
}
