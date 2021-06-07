import { onSnake, expandSnake } from './snake.js';
import { randomGridPosition } from './grid.js'

// const randomColor = () => Math.floor(Math.random() * 275);

const getRandomSquarePosition = () => {
    let newSquarePosition;
    while (newSquarePosition == null || onSnake(newSquarePosition)) {
        newSquarePosition = randomGridPosition();
    }
    return newSquarePosition;
}


let squares = getRandomSquarePosition();
const expansion_snake = 1;


export const update = () => {
    if (onSnake(squares)) {
        expandSnake(expansion_snake);
        squares = getRandomSquarePosition();
    }
};


export const draw = (gameCanvas) => {
    const squaresElement = document.createElement('div');
    squaresElement.style.gridRowStart = squares.y;
    squaresElement.style.gridColumnStart = squares.x;
    squaresElement.classList.add('squares');
    // squaresElement.style.backgroundColor = `rgb(${randomColor()},${randomColor()},${randomColor()})`;
    gameCanvas.appendChild(squaresElement);
};

