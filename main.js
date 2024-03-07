const availableColors = ['#e7d44b', '#774be7', '#b41818', '#22e01f', '#1a7ec1', '#261b76'];
const btnToggle = document.querySelector('.btnToggle');
const scoreHtml = document.querySelector('.scorePanel > span');
const scoreboard = document.getElementById('scoreboard');

let currentBgColorIndex = 0; 
let currentBtnColorIndex = 0;

// Variable pour indiquer si le jeu est en cours.
let isRunning = true;
let colorChangeInterval = setInterval(changeBgColor, 1500);
let score = 0;
let diffStep = 10;
let scores = [];

// Pop une alerte pour acceuillir le joueur. 
document.addEventListener('DOMContentLoaded', function() {
    alert('Score as many points as you can!');
});

function changeBgColor() {
    currentBgColorIndex++;
    if (currentBgColorIndex >= availableColors.length) {
        currentBgColorIndex = 0;
    }
    document.body.style.backgroundColor = availableColors[currentBgColorIndex];
}

function changeBtnColor() {
    currentBtnColorIndex = Math.floor(Math.random() * availableColors.length);
    btnToggle.style.backgroundColor = availableColors[currentBtnColorIndex];
    btnToggle.classList.add('pulsate');

    setTimeout(() => {
        btnToggle.classList.remove('pulsate');
    }, 1000);
}

function changeBtnPosition() {
    const bodyWidth = document.body.clientWidth;
    const bodyHeight = document.body.clientHeight;
    const buttonWidth = btnToggle.clientWidth;
    const buttonHeight = btnToggle.clientHeight;

    const randomTop = Math.floor(Math.random() * (bodyHeight - buttonHeight));
    const randomLeft = Math.floor(Math.random() * (bodyWidth - buttonWidth));

// Met les coordonnées au bouton.
    btnToggle.style.position = 'absolute';
    btnToggle.style.top = `${randomTop}px`;
    btnToggle.style.left = `${randomLeft}px`;
}

// Démarrer le jeu
function start() {
    changeBtnColor();
    changeBtnPosition();
    colorChangeInterval = setInterval(changeBgColor, 1000 - score * diffStep);
    btnToggle.innerHTML = 'stop';
    isRunning = true;
}

// Fonction pour arrêter le jeu.
function stop() {
    clearInterval(colorChangeInterval);
    btnToggle.innerHTML = 'start';

    if (currentBgColorIndex === currentBtnColorIndex) {
        score++;
        scoreHtml.innerHTML = score;
    } else {
        const userName = prompt('Enter your name:');// Si les couleurs sont différentes, demande le nom du joueur.
        if (userName !== null && userName.trim() !== '') {
            scores.push({ name: userName, score: score });// Ajoute le score et le nom au tableau des scores.
        }
        score = 0;// Réinitialise le score.
        scoreHtml.innerHTML = score;// Affiche le score mis à jour.
    }

    isRunning = false;
    updateScoreboard();// Met à jour le tableau de scores.
}

btnToggle.addEventListener('click', () => {
    if (isRunning === true) {
        stop();
    } else {
        start();
    }
});

changeBtnColor();

function updateScoreboard() {
    scoreboard.innerHTML = '';
    scores.forEach(score => {
        const div = document.createElement('div');
        div.textContent = `${score.name}: ${score.score}`;
        scoreboard.appendChild(div);
    });
}