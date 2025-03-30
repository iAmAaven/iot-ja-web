const gameContainer = document.getElementById('game-container');
const startMenu = document.getElementById('start-menu');
const endScreen = document.getElementById('end-screen');
const reactionTimeDisplay = document.getElementById('reaction-time');
const startButton = document.getElementById('start-button');
const againButton = document.getElementById('again-button');
let startTime;

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createRandomShape() {
    const shape = document.createElement('div');
    const size = getRandomInt(30, 100);
    const isCircle = Math.random() > 0.5;

    shape.classList.add('shape');
    shape.style.width = `${size}px`;
    shape.style.height = `${size}px`;
    shape.style.top = `${getRandomInt(0, gameContainer.clientHeight - size)}px`;
    shape.style.left = `${getRandomInt(0, gameContainer.clientWidth - size)}px`;

    shape.style.backgroundColor = `rgb(255, 73, 73)`;

    if (isCircle) {
        shape.style.borderRadius = '50%';
    }

    shape.addEventListener('click', () => {
        const endTime = new Date().getTime();
        reactionTimeDisplay.textContent = `Reaction time: ${(endTime - startTime) / 1000} seconds`;
        gameContainer.removeChild(shape);
        gameContainer.style.display = 'none';
        endScreen.style.display = 'flex';
    });

    gameContainer.appendChild(shape);
    startTime = new Date().getTime();
}

startButton.addEventListener('click', () => {
    startMenu.style.display = 'none';
    gameContainer.style.display = 'block';
    setTimeout(createRandomShape, getRandomInt(500, 2000));
});

againButton.addEventListener('click', () => {
    endScreen.style.display = 'none';
    gameContainer.style.display = 'block';
    setTimeout(createRandomShape, getRandomInt(500, 2000));
});
