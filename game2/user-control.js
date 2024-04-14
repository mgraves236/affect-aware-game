import {canvas, ctx} from "./canvas.js";
import {playerPaddle} from "./game-main.js";

export function handleMouseInput(event) {
    let mousePos = getMousePos(event);
    let yChange =  - playerPaddle.y + mousePos.y
    if (!(playerPaddle.y + yChange > canvas.height - playerPaddle.height / 2)
    && !(playerPaddle.y + yChange < playerPaddle.height / 2)) {
        playerPaddle.y = playerPaddle.y + yChange;
    }
}

export function getMousePos(event) {
    let rect = canvas.getBoundingClientRect();
    let scaleX = canvas.width / rect.width;
    let scaleY = canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

export function handleTouchInput(event){
    event.preventDefault();
    let touch = event.changedTouches[0];
    let y = touch.screenY;
    if (!(y > canvas.height - playerPaddle.height / 2)
        && !(y < playerPaddle.height / 2)) {
        playerPaddle.y = y;
    }
}