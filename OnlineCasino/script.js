function registerUser() {
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    if (!firstName || !lastName) {
        alert('Both first name and last name are required.');
        return;
    }

    const username = generateUsername(firstName, lastName);
    alert(`Welcome ${firstName}, your username is ${username}`);

    // Hämta åldern och pengar från användare
    const ageInput = document.getElementById('age');
    const moneyInput = document.getElementById('money');

    const age = parseFloat(ageInput.value);
    const money = parseFloat(moneyInput.value.replace(',', '.')); // hantera olika decimaltecken

    // Kontrollera ålder
    if (isNaN(age) || age < 18) {
        alert('You are not allowed to play if you are under 18 years old.');
    } else {
        // Fortsätt med användare som är 18 år eller äldre
        alert(`You are registered. Age: ${age}, Money to play: ${money}`);
    }
}

function generateUsername(firstName, lastName) {
    const username = lastName.toLowerCase() + firstName.toLowerCase().charAt(0);
    return username;
}

function changeTheme() {
    const themeSelector = document.getElementById('themeSelector');
    const selectedTheme = themeSelector.value;
    const textColorValue = document.getElementById('textColor').value;
    setTheme(selectedTheme, textColorValue);
    localStorage.setItem('theme', selectedTheme);
}

function setTheme(theme, textColorValue) {
    const body = document.body;
    switch (theme) {
        case 'default':
            body.style.backgroundColor = '#fff';
            break;
        case 'blue':
            body.style.backgroundColor = '#3498db';
            break;
        case 'green':
            body.style.backgroundColor = '#2ecc71';
            break;
        case 'red':
            body.style.backgroundColor = '#e74c3c';
            break;
        default:
            body.style.backgroundColor = '#fff';
    }
    body.style.color = `rgb(${textColorValue}, ${textColorValue}, ${textColorValue})`;
}

function changeTextColor() {
    const textColorValue = document.getElementById('textColor').value;
    setTheme(localStorage.getItem('theme'), textColorValue);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    const textColorValue = document.getElementById('textColor').value;
    setTheme(savedTheme, textColorValue);
}

// Information i konsolen på sidan
function trackUser() {

    console.log(`Operating System: ${getOperatingSystem(navigator.userAgent)}`);
    console.log(`Browser: ${navigator.userAgent}`);
    console.log(`Language: ${navigator.language}`);
    console.log(`Resolution: ${window.screen.width}x${window.screen.height}`);
    console.log(`Window Size: ${window.innerWidth}x${window.innerHeight}`);

    // få koordinaterna
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                console.log(`Latitude: ${latitude}`);
                console.log(`Longitude: ${longitude}`);
            },
            () => console.log('Geolocation permission denied.')
        );
    } else {
        console.log('Geolocation is not supported by this browser.');
    }

    // Spelgångerna i localstorage
    let playCount = parseInt(localStorage.getItem('playCount')) || 0;
    playCount++;
    localStorage.setItem('playCount', playCount);
    console.log(`You have played ${playCount} times.`);
}

// Få operativsysemet av besökaren
function getOperatingSystem(userAgent) {
    const platformMatch = /(win|mac|linux|android|ios|iphone)/i.exec(userAgent);
    return platformMatch ? platformMatch[0] : 'Unknown';
}

trackUser();

