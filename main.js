const availableColors = ['#1d056b', '#0ad115', '#13e720', '#384fcc', '#2f39c1', '#261b76'];
const btnToggle = document.querySelector('.btnToggle');
const scoreHtml = document.querySelector('.scorePanel > span');

let currentBgColorIndex = 0;
let currentBtnColorIndex = 0;
let isRunning = true;
let colorChangeInterval = setInterval(changeBgColor, 1500);
let score = 0;
let diffStep = 10;

document.addEventListener('DOMContentLoaded', function() {
    alert('Score 5 points to win!');
});

function changeBgColor() {
    currentBgColorIndex++;
    if (currentBgColorIndex >= availableColors.length) {
        currentBgColorIndex = 0;
    }
    document.body.style.backgroundColor = availableColors[currentBgColorIndex];
}

function changeBtnColor() {
    currentBtnColorIndex = Math.round(Math.random() * (availableColors.length - 1));
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

    btnToggle.style.top = `${randomTop}px`;
    btnToggle.style.left = `${randomLeft}px`;
}
function start() {
    changeBtnColor();
    changeBtnPosition();
    colorChangeInterval = setInterval(changeBgColor, 1000 - score * diffStep);
    btnToggle.innerHTML = 'stop';
    isRunning = true;
}

function stop() {
    clearInterval(colorChangeInterval);
    btnToggle.innerHTML = 'start';

    if (currentBgColorIndex === currentBtnColorIndex) {
        score++;
        scoreHtml.innerHTML = score;
    } else {
        score = 0;
        scoreHtml.innerHTML = score;
    }
    isRunning = false;
}

btnToggle.addEventListener('click', () => {
    if (isRunning === true) {
        stop();
    } else {
        start();
    }
});

changeBtnColor();


function win() {
    alert('Congratulations! You won!');
    score = 0;
    scoreHtml.innerHTML = score;
}

function stop() {
    clearInterval(colorChangeInterval);
    btnToggle.innerHTML = 'start';

    if (currentBgColorIndex === currentBtnColorIndex) {
        score++;
        scoreHtml.innerHTML = score;
        if (score === 5) {
            win();
        }
    } else {
        score = 0;
        scoreHtml.innerHTML = score;
    }
    isRunning = false;
}