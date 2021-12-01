import { randomGridPosition } from "./grid.js";
import { expandSnake, onSnake } from "./snake.js";

let food = randomGridPosition();

export let updateFood = () => {
    if (onSnake(food)) {
        expandSnake(1);
        food = getNewFoodPosition();
    }
}

export let drawFood = (board) => {
    const element = document.createElement("div");
    element.classList.add("food");
    element.style.gridRowStart = food.y;
    element.style.gridColumnStart = food.x;
    board.appendChild(element);
}

let getNewFoodPosition = () => {
    let newFoodPosition;

    while (newFoodPosition == null || onSnake(newFoodPosition)) {
        newFoodPosition = randomGridPosition();
    }

    return newFoodPosition;
}