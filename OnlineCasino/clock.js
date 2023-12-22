// Uppdatera klockan och casinostatusen
function updateClock() {
    const now = new Date();

    // Datum
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: 'Europe/Helsinki' };
    const formattedDate = now.toLocaleDateString('fi-FI', options);
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);

    const clockElement = document.getElementById('clock');
    clockElement.textContent = `Today is ${dayName}, ${formattedDate}`;
    const casinoStatus = document.getElementById('casinoStatus');

    // öppningstiden
    const openingTime = new Date(now);
    openingTime.setUTCHours(9, 0, 0); 

    // Stängt på veckoslut
    if (now.getDay() === 6 || now.getDay() === 0) {
        casinoStatus.textContent = 'The Casino is closed on the weekends.';
    } else if (isCasinoOpen) {
        casinoStatus.textContent = 'The Casino is open!';
    } else {
        // räkna tiden till öppning
        const timeLeft = getTimeUntilOpening(openingTime);
        casinoStatus.textContent = `The Casino opens in ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
    }
}

// räkna tiden kvar till öppning
function getTimeUntilOpening(openingTime) {
    const now = new Date();
    let timeLeft = openingTime - now;

    // redan öppet = tid kvar 0
    if (timeLeft < 0) {
        timeLeft = 0;
    }

    // Beräkna timmar, minuter och sekunder kvar
    const hours = Math.floor(timeLeft / (1000 * 60 * 60));
    timeLeft %= 1000 * 60 * 60;
    const minutes = Math.floor(timeLeft / (1000 * 60));
    timeLeft %= 1000 * 60;
    const seconds = Math.floor(timeLeft / 1000);

    // Returnera tiden kvar som ett objekt
    return { hours, minutes, seconds };
}

// Uppdatera klockan varje sekund
setInterval(updateClock, 1000);

// Uppdatera klockan vid sidans laddning
updateClock();
