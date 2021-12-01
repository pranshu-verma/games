import { getInput } from "./input.js";

const snake = [{ x: 25, y: 25 }];
const score = document.getElementById("score");
let newAmount = 0;

export let updateSnake = () => {
    addNewAmount();
    const direction = getInput();
    for (let i = snake.length - 2; i >= 0; i--) {
        snake[i + 1] = { ...snake[i] };
    }

    snake[0].x += direction.x;
    snake[0].y += direction.y;

}

export let drawSnake = (board) => {
    snake.forEach(coord => {
        const element = document.createElement("div");
        element.style.gridRowStart = coord.y;
        element.style.gridColumnStart = coord.x;
        element.classList.add("snake");
        board.appendChild(element);
    })
    score.innerHTML = snake.length;
    if (snake.length > localStorage.getItem("best-snake-score")) {
        localStorage.setItem("best-snake-score", snake.length);
    }
}

export let expandSnake = (amount) =>  {
    newAmount += amount;
}

export let onSnake = (position, { ignoreHead = false } = {}) => {
    return snake.some((segment, index) => {
        if (ignoreHead && index === 0) return false;
        return onPosition(segment, position);
    })
}

let onPosition = (pos1, pos2) => {
    return pos1.x == pos2.x && pos1.y == pos2.y;
}

let addNewAmount = () => {
    for (let i = 0; i < newAmount; i++) {
        snake.push( { ...snake[snake.length - 1]});
    }

    newAmount = 0;
}

export let getSnakeHead = () => {
    return snake[0];
}

export let snakeIntersected = () => {
    return onSnake(snake[0], { ignoreHead: true });
}