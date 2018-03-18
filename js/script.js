
// shuffle card when click on game settings --> will be changed to start/refresh button

document.querySelector(".settings").addEventListener("click", function() {
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



