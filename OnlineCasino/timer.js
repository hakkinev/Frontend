let isCasinoOpen = true;

function startGameTimer() {
    const selectedTime = document.getElementById('gameTime').value;
    const endTime = new Date();
    endTime.setSeconds(endTime.getSeconds() + parseInt(selectedTime));

    function updateTimer() {
        const now = new Date();
        const casinoStatus = document.getElementById('casinoStatus');
        let timeLeft;

        if (isCasinoOpen) {
            timeLeft = endTime - now;
        } else {
            const openingTime = new Date(now);
            openingTime.setHours(9, 0, 0); // Casino opens every day at 09:00:00

            if (now.getDay() === 5) {
                // fredag +3 till måndag
                openingTime.setDate(openingTime.getDate() + 3);
            } else {
                // nästa dag 
                openingTime.setDate(openingTime.getDate() + 1);
            }

            timeLeft = openingTime - now;
        }

        const hours = Math.floor(timeLeft / (1000 * 60 * 60));
        timeLeft %= 1000 * 60 * 60;
        const minutes = Math.floor(timeLeft / (1000 * 60));
        timeLeft %= 1000 * 60;
        const seconds = Math.floor(timeLeft / 1000);

        const timerElement = document.getElementById('gameTimer');

        if (isCasinoOpen && now.getHours() >= 9 && now.getHours() < 21) {
            timerElement.textContent = `Game session ends at ${endTime.toLocaleTimeString()}. Time left: ${hours}h ${minutes}m ${seconds}s`;
        } else {
            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                endGameSession();
            } else {
                timerElement.textContent = `The Casino opens in ${hours}h ${minutes}m ${seconds}s`;
            }
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

function endGameSession() {
    alert('The Casino is now closed.');
    isCasinoOpen = false;
}
