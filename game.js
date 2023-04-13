import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
} from "./snake.js";

import {update as updateFood, draw as drawFood} from"./food.js"
import { getSnakeHead, snakeIntersection } from "./snake.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById("game-board");

function main(currentTime) {

  if(gameOver){

    if(confirm('You lost. Press OK to restart')){
      window.location='/' //refresh page
    }
    return //if x cliked, we don't refresh
  }
  window.requestAnimationFrame(main);
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}

window.requestAnimationFrame(main);

function update() {
  updateSnake();
  updateFood();
  checkForGameOver()
}
function draw() {
  gameBoard.innerHTML = ""; //clear the board before moving the snake
  drawSnake(gameBoard);
  drawFood(gameBoard)
}

function checkForGameOver(){
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection() 
}

