import { getInputDirection } from './input.js';

let score = 0;
let point = document.querySelector('span');

export const snakeSpeed = 6;
const snakeBody = [{ x: 11, y: 11 }];
let newSegments = 0;


export const update = () => {
    addSegements();
    const inputDirection = getInputDirection();
    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    };

    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
};


export const draw = (gameCanvas) => {
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add('snake');
        gameCanvas.appendChild(snakeElement);
    });
};


export const expandSnake = (amount) => {
    newSegments += amount;
    score++;
    point.innerHTML = score;
};


export const onSnake = (position, { ignoreHead = false } = {}) => {
    return snakeBody.some((segment, index) => {
        if (ignoreHead && index === 0) return false
        return equalPositions(segment, position)
    })
};


export const getSnakeHead = () => {
    return snakeBody[0]
};


export const snakeIntersection = () => {
    return onSnake(snakeBody[0], { ignoreHead: true })
}

const equalPositions = (pos1, pos2) => {
    return (pos1.x === pos2.x && pos1.y === pos2.y)
};


const addSegements = () => {
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ...snakeBody[snakeBody.length - 1] })
    }
    newSegments = 0;
};