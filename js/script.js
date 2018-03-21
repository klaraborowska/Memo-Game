const star = document.querySelectorAll(".flaticon-favorite");
const cardFront = document.querySelectorAll(".card-front");
const cardBack = document.querySelectorAll(".card-back");
const winner = document.querySelector(".winner-banner");
let seconds, minutes, gameRound, moves, previousSrc, pairs, stars, currentTime;

init();
showTime();

// reset game settings when click on refresh button
document.querySelector(".restart-button").addEventListener("click", init);

//main event listener (click on card)
document.querySelector(".card-list").addEventListener("click", function(event) {
    const front = event.target;
    const back = event.target.nextElementSibling;

    //check if the clicked element is a div with a class "card-front"
    if (front.nodeName === "DIV" && front.classList.contains("card-front")) {

        //open the clicked card
        if (!front.classList.contains("front-inactive")) {
            front.classList.add("front-inactive");
            back.classList.add("back-active");
            gameRound -= 1;
        }

        //happens, when two cards are open
        if (gameRound == 0) {
            gameRound = 2;
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
                    document.querySelector(".final-time").innerHTML = currentTime;
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
    star[0].classList.remove("star-light");
    star[1].classList.remove("star-light");
    star[2].classList.remove("star-light");

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

function hideCard(x, y) {
    if (x.classList.contains("front-inactive") && y.classList.contains("back-active")) {
        x.classList.remove("front-inactive");
        y.classList.remove("back-active");
    }
}

//set timer
function counter() {
    if (pairs > 0) {
        currentTime = (minutes > 0 ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes += 1;
    }
	document.querySelector(".timer").innerHTML = currentTime;
    showTime();
    }
}

function showTime() {
    setTimeout(counter, 1000);
}

function stopCounter() {
    
}

function hideStars() {
    switch(moves) {
        case 16:
        stars = 2;
        star[2].classList.add("star-light");
        break;
        case 24:
        stars = 1;
        star[1].classList.add("star-light");
        break;
        case 30:
        stars = 0;
        star[0].classList.add("star-light");
    }
    document.querySelector(".stars-number").innerHTML = stars;
}