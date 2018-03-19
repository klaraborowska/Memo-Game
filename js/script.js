const cardGame = document.querySelector(".card-list");


// shuffle card when click on refresh button
document.querySelector(".restart-button").addEventListener("click", function() {
    shuffleCards();
    const cardFront = document.querySelectorAll(".card-front");
    const cardBack = document.querySelectorAll(".card-back");

    for (let i = 0; i < cardFront.length; i++) {
        hideCard(cardFront[i], cardBack[i]);
    }
    
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
    const front = event.target;
    const back = event.target.nextElementSibling;

    //check if the clicked element is a div with a class "card-front"
    if (front.nodeName === "DIV" && front.classList.contains("card-front")) {

        //check if the clickd element doesn't have the class "front-inacitive" (in order not to add the second the same class)
        if (!front.classList.contains("front-inactive")) {
            front.classList.add("front-inactive");
            back.classList.add("back-active");
            gameRound -= 1;
        }

        //happens, when two cards are open
        if (gameRound === 0) {

            //reset gameround
            gameRound = 2;

            //add one move
            moves +=1;
            console.log("moves: " + moves);
            
            //compares, if cards have the same icons, if not, closes the cards
            if (previousSrc !== back.firstElementChild.src) {
                setTimeout(hideCard, 1000, front, back);
                setTimeout(hideCard, 1000, previousFront, previousBack);
            }
        }
       
        previousSrc = back.firstElementChild.src;
        previousFront = front;
        previousBack = back;
    } 
});


function hideCard(x, y) {
    if (x.classList.contains("front-inactive") && y.classList.contains("back-active")) {
        x.classList.remove("front-inactive");
        y.classList.remove("back-active");
    }
}