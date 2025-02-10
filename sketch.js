let username = '';
let bankBalance = 0;
let hunger = 100;
let sleepiness = 100;
let startTime = null;
let timerInterval, hungerInterval, sleepInterval;

function setup() {
  createCanvas(windowWidth, windowHeight);
}

// Start the background music when the page is loaded
window.onload = function () {
    const bgm = document.getElementById('bgm');
    bgm.play(); // Play the music immediately after loading
}

// Pause the music when the game is saved and exited
function saveAndExitGame() {
    const bgm = document.getElementById('bgm');
    bgm.pause(); // Pause the music when saving and exiting
    // Your existing save game logic
}



// Function to toggle background music play/pause
function toggleMusic() {
    const bgm = document.getElementById('bgm');
    const musicButton = document.getElementById('music-toggle-button');
    
    if (bgm.paused) {
        bgm.play(); // Play music if it's paused
        musicButton.textContent = '🔊'; // Change button to show "sound on"
    } else {
        bgm.pause(); // Pause the music if it's playing
        musicButton.textContent = '🔇'; // Change button to show "mute"
    }
}

function startGame() {

    username = document.getElementById('username').value || 'Player';
    document.getElementById('welcome-heading').style.display = 'none';
    document.getElementById('user-input').style.display = 'none';
    document.getElementById('game-controls').style.display = 'block';

    // Display the username
    document.getElementById('welcome-message').innerText = `Welcome, ${username}!`;

    startTime = new Date().getTime();
    timerInterval = setInterval(updateTimer, 1000);
    hungerInterval = setInterval(decreaseHunger, 300000); // Decrease hunger every 5 minutes
    sleepInterval = setInterval(decreaseSleepiness, 600000); // Decrease sleep every 10 minutes
}

function updateTimer() {
    const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
    const dollarsEarned = Math.floor(elapsedTime / 60);
    bankBalance = dollarsEarned;
    document.getElementById('bank-balance').innerText = bankBalance;
    document.getElementById('next-dollar').innerText = 60 - (elapsedTime % 60);
}

function decreaseHunger() {
    hunger = Math.max(hunger - 1, 0);
    updateBars();
}

function decreaseSleepiness() {
    sleepiness = Math.max(sleepiness - 1, 0);
    updateBars();
}

function updateBars() {
    document.getElementById('hunger-bar').style.width = `${hunger}%`;
    document.getElementById('hunger-bar').innerText = `Hunger: ${hunger}%`;

    document.getElementById('sleep-bar').style.width = `${sleepiness}%`;
    document.getElementById('sleep-bar').innerText = `Sleep: ${sleepiness}%`;

    if (hunger === 0 || sleepiness === 0) {
        alert('You need to eat or sleep to continue!');
        clearInterval(timerInterval);
        clearInterval(hungerInterval);
        clearInterval(sleepInterval);
    }
}

function openShop() {
    document.getElementById('shop').style.display = 'block';
}

function closeShop() {
    document.getElementById('shop').style.display = 'none';
}

function buyFood(item, cost, hungerIncrease) {
    if (bankBalance >= cost) {
        bankBalance -= cost;
        hunger = Math.min(hunger + hungerIncrease, 100);
        document.getElementById('bank-balance').innerText = bankBalance;
        updateBars();
        alert(`You bought ${item}!`);
    } else {
        alert('Not enough money!');
    }
}

function sleep() {
    document.getElementById('blackout').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('blackout').style.display = 'none';
        sleepiness = 100;
        updateBars();
    }, 7500);
}

function saveAndExitGame() {
    const gameState = {
        username: username,
        bankBalance: bankBalance,
        hunger: hunger,
        sleepiness: sleepiness,
        startTime: startTime,
    };
  
  // Pausing music when save&exiting
  bgm.pause();

    // Convert game state to JSON
    const gameStateJSON = JSON.stringify(gameState);

    // Create a Blob from the JSON string
    const blob = new Blob([gameStateJSON], { type: 'application/json' });

    // Create a link to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${username}_savegame.json`; // Filename for download
    link.click();

    alert('Game saved!');
    clearInterval(timerInterval);
    clearInterval(hungerInterval);
    clearInterval(sleepInterval);
    location.reload();
}


function loadGame() {
    document.getElementById('welcome-heading').style.display = 'none';
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const saveData = JSON.parse(event.target.result);
            username = saveData.username;
            bankBalance = saveData.bankBalance;
            hunger = saveData.hunger !== undefined ? saveData.hunger : 100;
            sleepiness = saveData.sleepiness !== undefined ? saveData.sleepiness : 100;
            startTime = saveData.startTime;

            document.getElementById('welcome-message').innerText = `Welcome back, ${username}!`;
            document.getElementById('user-input').style.display = 'none';
            document.getElementById('game-controls').style.display = 'block';
            updateBars();

            timerInterval = setInterval(updateTimer, 1000);
            hungerInterval = setInterval(decreaseHunger, 300000);
            sleepInterval = setInterval(decreaseSleepiness, 600000);
        };
        reader.readAsText(file);
    };
    input.click();
}


function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}
