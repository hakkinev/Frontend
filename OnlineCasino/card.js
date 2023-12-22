document.addEventListener('DOMContentLoaded', () => {
    const cardsContainer = document.querySelector('.memory-game');
    const cards = Array.from(document.querySelectorAll('.card'));
    let flippedCards = [];
    let locked = false;
    let pairsFound = 0;
    let startTime;

    // Blanda korten
    shuffleArray(cards);

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!locked && !flippedCards.includes(card) && flippedCards.length < 2) {
                flipCard(card);
                flippedCards.push(card);

                if (flippedCards.length === 2) {
                    locked = true;
                    setTimeout(checkMatch, 1000);
                }
            }
        });

        cardsContainer.appendChild(card);
    });

    startTime = new Date();

    function flipCard(card) {
        card.classList.toggle('flipped');
    }

    function checkMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.name === card2.dataset.name) {
            // Match
            pairsFound++;
            flippedCards = [];

            if (pairsFound === cards.length / 2) {
                // Alla par hittade
                const endTime = new Date();
                const completionTime = (endTime - startTime) / 1000; // i sekunder
                alert(`Grattis! Du klarade spelet på ${completionTime} sekunder.`);
                resetGame();
            }
        } else {
            // Ingen matchning, vänd tillbaka
            flippedCards.forEach(card => flipCard(card));
            flippedCards = [];
        }

        locked = false;
    }

    function resetGame() {
        // Blanda korten för ett nytt spel
        shuffleArray(cards);

        // Återställ spelstatus
        pairsFound = 0;
        startTime = new Date();

        // Vänd tillbaka alla kort
        cards.forEach(card => {
            card.classList.remove('flipped');
        });
    }

    // Fisher-Yates blandningsalgoritm
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
