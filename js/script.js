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

//show card on click
cardGame.addEventListener("click", function(event) {
    if (event.target.nodeName === "DIV") {
        showCard(event.target, event.target.nextElementSibling);
    }
});

//function show card
function showCard(x, y) {
    if (!x.classList.contains("front-inactive") && !y.classList.contains("back-active")) {
        x.classList.add("front-inactive");
        y.classList.add("back-active");
    }
}
