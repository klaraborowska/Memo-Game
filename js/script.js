const cardGame = document.querySelector(".card-list");
const star = document.querySelectorAll(".flaticon-favorite");
const time = document.querySelector(".timer");
const cardFront = document.querySelectorAll(".card-front");
const cardBack = document.querySelectorAll(".card-back");
const winner = document.querySelector(".winner-banner");
let seconds, minutes, gameRound, moves, previousSrc, pairs, stars;

init();
showTime();

// reset game settings when click on refresh button
document.querySelector(".restart-button").addEventListener("click", function() {
    init();
});


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


            //compares, if cards have the same icons, if not, closes the cards
            if (previousSrc !== back.firstElementChild.src) {
                setTimeout(hideCard, 1000, front, back);
                setTimeout(hideCard, 1000, previousFront, previousBack);
            } else {
                back.classList.add("card-match");
                previousBack.classList.add("card-match");
                pairs -= 1;
                if (pairs == 0) {
                    winner.classList.remove("banner-hidden");
                    document.querySelector(".moves-number").innerHTML = moves;
                    if (stars < 0) {
                        stars === 0;
                        document.querySelector(".stars-number").innerHTML = stars;
                    }
                }
            }
        }
        hideStars()

        //store parameteres to compare cards in game round
        previousSrc = back.firstElementChild.src;
        previousFront = front;
        previousBack = back;
    } 
});

document.querySelector(".play-again").addEventListener("click", function() {
    winner.classList.add("banner-hidden");
    init();
});

//start the game
function init() {
    gameRound = 2;
    moves = 0;
    seconds = 0;
    minutes = 0;
    pairs = 8;
    stars = 3;
    shuffleCards();
    document.querySelector(".moves-counter").innerHTML ="Moves: " + moves;
    star[0].classList.remove("hidden-star");
    star[1].classList.remove("hidden-star");
    star[2].classList.remove("hidden-star");

    for (let i = 0; i < cardFront.length; i++) {
        cardBack[i].classList.remove("card-match");
        hideCard(cardFront[i], cardBack[i]);
    }
}

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

//hide card, when card is open
function hideCard(x, y) {
    if (x.classList.contains("front-inactive") && y.classList.contains("back-active")) {
        x.classList.remove("front-inactive");
        y.classList.remove("back-active");
    }
}

//set timer
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

//hide stars
function hideStars() {
    switch(moves) {
        case 13:
        star[2].classList.add("hidden-star");
        stars -= 1;
        break;
        case 22:
        star[1].classList.add("hidden-star");
        stars -= 1;
        break;
        case 30:
        star[0].classList.add("hidden-star");
        stars -= 1;
    }
}
