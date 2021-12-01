import { updateSnake, drawSnake, getSnakeHead, snakeIntersected } from "./snake.js";
import { updateFood, drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";


let lastRenderTime = 0;
let gameOver = false;
let SNAKE_SPEED = 0;
let MIN_SNAKE_SPEED = 1;
let MAX_SNAKE_SPEED = 10;
const board = document.getElementById("board");
const btnPlay = document.getElementById("play");
const bestScore = document.getElementById("best-score");
bestScore.innerHTML = localStorage.getItem("best-snake-score");

const snake_speed_select = document.getElementById("snake-speed");
for (let i = MIN_SNAKE_SPEED; i <= MAX_SNAKE_SPEED; i++) {
    snake_speed_select.innerHTML += `
        <option value="${i}">${i}</option>
    `;
}

let main = (currentTime) => {
    if (gameOver) {
        if (confirm("Game over, Press OK to restart.")) {
            window.location = "./index.html";
        }
        return;
    }
    window.requestAnimationFrame(main);
    const seconds = (currentTime - lastRenderTime) / 1000;
    if (seconds < 1 / SNAKE_SPEED) return;

    lastRenderTime = currentTime;
    
    // Update
    updateSnake();
    updateFood();
    isGameOver();

    // Draw
    board.innerHTML = "";
    drawSnake(board);
    drawFood(board);
}

btnPlay.addEventListener("click", () => {
    let snake_speed = document.getElementById("snake-speed").value;
    if (!validateInput(snake_speed, MIN_SNAKE_SPEED, MAX_SNAKE_SPEED)) return;

    SNAKE_SPEED = snake_speed * 5;
    window.requestAnimationFrame(main);
    btnPlay.disabled = true;
})

let isGameOver = () => {
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersected();
}

let validateInput = (input, min, max) => {
    if (input < min || input > max) {
        alert(`Value should be between ${min} and ${max}.`);
        return false;
    }
    return true;
}
