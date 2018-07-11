export default function() {

    const cardFront = document.querySelectorAll(".js_card-front");
    const cardBack = document.querySelectorAll(".js_card-back");
    const cards = document.querySelectorAll(".js_card-img");
    const finalTime = document.querySelector(".js_final-time");
    const game = document.querySelector(".js_game");
    const movesNum = document.querySelectorAll(".js_moves");
    const playButton = document.querySelector(".js_play");
    const restartButton = document.querySelector(".js_restart");
    const star = document.querySelectorAll(".js_star");
    const starsNum = document.querySelector(".js_stars-number");
    const timer = document.querySelector(".js_timer");
    const winner = document.querySelector(".js_pop-up");

    let allowClick, clock, currentTime, firstClick, gameRound, minutes, moves, pairs, previousBack, previousFront, previousSrc, seconds, stars;

    function setup() {
        game.addEventListener("click", playGame);
        restartButton.addEventListener("click", init);
        playButton.addEventListener("click", playAgain);
        init();
    }
    setup();


    function playGame(event) {
        const front = event.target;
        const back = front.nextElementSibling;
        
        if (front.classList.contains("js_card-front") && allowClick === true) {
            openCard(front, back);

            if (gameRound === 0) {
                updateRound();

                if (previousSrc !== back.firstElementChild.src) {
                    setTimeout(closeCard, 1000, front, back);
                    setTimeout(closeCard, 1000, previousFront, previousBack); 
                } else {
                    matchCards(back, previousBack);
                    if (pairs === 0) {
                        finishGame();
                    }
                }
            }

            //store parameteres to compare cards in game round
            previousSrc = back.firstElementChild.src;
            previousFront = front;
            previousBack = back;
        } 

        if (firstClick) {
            startTimer();
        }
        firstClick = false;
    }


    function openCard(frontSide, backSide) {
        if (!frontSide.classList.contains("js_front-inactive")) {
            frontSide.classList.add("js_front-inactive");
            backSide.classList.add("js_back-active");
            gameRound -= 1;
        }
    }

    function closeCard(frontSide, backSide) {
        if (frontSide.classList.contains("js_front-inactive")) {
            frontSide.classList.remove("js_front-inactive");
            backSide.classList.remove("js_back-active");
            allowClick = true;
        }
    }

    function matchCards(card, previousCard) {
        card.classList.add("js_card-match");
        previousCard.classList.add("js_card-match");
        pairs -= 1;
        allowClick = true;
    }

    function resetCards() {
        for (let i = 0; i < cardFront.length; i++) {
            cardBack[i].classList.remove("js_card-match");
            closeCard(cardFront[i], cardBack[i]);
        }
        shuffleCards();
    }

    function shuffleCards() {
        for (let i = 0; i < cards.length; i++) {
            let random = Math.floor(Math.random() * (cards.length - 1));

            let a = cards[i].src;
            cards[i].src = cards[random].src;
            cards[random].src =  a;
        }
    }

    function updateRound() {
        allowClick = false;
        gameRound = 2;
        moves += 1;
        movesNum.forEach(el => el.innerHTML = moves);
        updateStars();
    }

    function updateStars() {
        switch(moves) {
            case 16:
            stars = 2;
            star[2].classList.add("js_star-light");
            break;
            case 24:
            stars = 1;
            star[1].classList.add("js_star-light");
            break;
            case 30:
            stars = 0;
            star[0].classList.add("js_star-light");
        }
        starsNum.innerHTML = stars;
    }

    function finishGame() {
        winner.classList.remove("js_banner-hidden");
        finalTime.innerHTML = currentTime;
        stopTimer();
    }

    function playAgain() {
        winner.classList.add("js_banner-hidden");
        init();
    }


    //TIMER
    function setTimer() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes += 1;
        }
        currentTime = `${(minutes > 0 ? (minutes > 9 ? minutes : "0" + minutes) : "00")}:${(seconds > 9 ? seconds : "0" + seconds)}`;
        timer.innerHTML = currentTime;
        startTimer();
    }

    function startTimer() {
        clock = setTimeout(setTimer, 1000);
    } 

    function stopTimer() {
        clearTimeout(clock);
    }


    function init() {
        firstClick = true;
        allowClick = true;
        gameRound = 2;
        moves = 0;
        pairs = 8;
        seconds = 0;
        minutes = 0;
        stars = 3;
        movesNum.forEach(el => el.innerHTML = moves);
        timer.innerHTML = "00:00";
        updateStars();
        stopTimer();
        resetCards();
        star.forEach(el => el.classList.remove("js_star-light"));
    }
}