import {canvas, ctx} from "./canvas.js";
import {getMousePos} from "./user-control.js";
import {startGame} from "./game-main.js";
// import {attr} from "../utils/language.js";

let attr = "polish";

let playButton = {
    x: canvas.width / 2 - 150,
    y: canvas.height / 2 - 80,
    width: 250,
    height: 90
}


export function drawPlayButton(text = "Play") {
    ctx.strokeStyle = "rgba(255,255,255,0.80)";
    ctx.lineWidth = 8;
    ctx.strokeRect(playButton.x, playButton.y, playButton.width, playButton.height);
    ctx.fillStyle="black"
    ctx.fillRect(playButton.x, playButton.y, playButton.width, playButton.height);
    ctx.fillStyle="white"
    ctx.font="70px Lucida Console";
    if (attr === "english") {
        ctx.fillText(text, playButton.x + 40, playButton.y + 70);
    } else {
        ctx.fillText(text, playButton.x + 5, playButton.y + 70);
    }
}

export function clickBtn(e) {
    let mousePos = getMousePos(e);
    if (isInside(mousePos, playButton)) {

        startGame();
    }
}

function isInside(pos, button) {
    return pos.x > button.x && pos.x < button.x + button.width
        && pos.y < button.y + button.height && pos.y > button.y;
}
