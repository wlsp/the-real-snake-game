// Imports from others JS-Files
import { update as updateSnake, draw as drawSnake, snakeSpeed, getSnakeHead, snakeIntersection } from './snake.js';
import { update as updateSquares, draw as drawSquares } from './squares.js';
import { outsideGrid } from './grid.js'
// Variables needed for the game
let lastRenderTime = 0;
let gameOver = false;

// Defining the main element from HTML to using inside my JS
const content = document.getElementById('content');

// Creating the needed elements
const gameCanvas = document.createElement('div');
let header = document.createElement('h1'); 
let headerText = document.createTextNode('Sneaky snake');



// ID's needed for the CSS
gameCanvas.id = 'gameCanvas';
header.id = 'header';



// Putting all together
content.appendChild(header);
header.appendChild(headerText);
content.appendChild(gameCanvas);





// Game function
const gameOn = (currentTime) => {
    if (gameOver) {
       if (confirm('You lost. Press ok to restart.')) {
           window.location = '/'
       }
       return 
    }

    window.requestAnimationFrame(gameOn);
    const secondsLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsLastRender < 1 / snakeSpeed) return;

    lastRenderTime = currentTime;

    update();
    draw();
};


window.requestAnimationFrame(gameOn);

const update = () => {
    updateSnake();
    updateSquares();
    checkGame();
};


const draw = () => {
    gameCanvas.innerHTML = '';
    drawSnake(gameCanvas);
    drawSquares(gameCanvas);
};


const checkGame = () => {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection()
}

let counting = 5;

const countdown = setInterval(() => {
    counting--;
    if (counting < 0) {
        clearInterval(countdown);
        document.getElementById('message').style.opacity = '0';
    } else {
        document.getElementById('count').innerHTML = counting;
    }
}, 1000);

window.onload = countdown;