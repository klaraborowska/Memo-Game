const cardGame = document.querySelector(".card-list");
const star = document.querySelectorAll(".flaticon-favorite");

shuffleCards();

// reset game settings when click on refresh button
document.querySelector(".restart-button").addEventListener("click", function() {
    shuffleCards();

    const cardFront = document.querySelectorAll(".card-front");
    const cardBack = document.querySelectorAll(".card-back");
    for (let i = 0; i < cardFront.length; i++) {
        hideCard(cardFront[i], cardBack[i]);
    }
    
    moves = 0;
    document.querySelector(".moves-counter").innerHTML ="Moves: " + moves;
    gameRound = 2;

    star[0].classList.remove("hidden-star");
    star[1].classList.remove("hidden-star");
    star[2].classList.remove("hidden-star");

    seconds = 0;
    minutes = 0;

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
        if (gameRound == 0) {

            //reset gameround
            gameRound = 2;

            //add one move
            moves += 1;
            document.querySelector(".moves-counter").innerHTML ="Moves: " + moves;
            
            switch(moves) {
                case 13:
                star[2].classList.add("hidden-star");
                break;
                case 22:
                star[1].classList.add("hidden-star");
                break;
                case 30:
                star[0].classList.add("hidden-star");
            }

            //compares, if cards have the same icons, if not, closes the cards
            if (previousSrc !== back.firstElementChild.src) {
                setTimeout(hideCard, 1000, front, back);
                setTimeout(hideCard, 1000, previousFront, previousBack);
            }
        }
       
        //store parameteres to compare cards in game round
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


//set timer
const time = document.querySelector(".timer");
let seconds = 0;
let minutes = 0;

function counter() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
	time.innerHTML = (minutes > 0 ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    showTime();
}

function showTime() {
    setTimeout(counter, 1000);
}
showTime();    
