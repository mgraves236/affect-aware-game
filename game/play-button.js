import {screen} from "./engineCore/screen.js";
import {getMousePos} from "./user-control.js";
import {startGame} from "./game.js";

let playButton = {
    x: screen.mCanvas.width / 2 - 150,
    y: screen.mCanvas.height / 2 - 80,
    width: 250,
    height: 90
}


export function drawPlayButton(text = "Play") {
    screen.mContext.strokeStyle = "rgba(255,255,255,0.80)";
    screen.mContext.lineWidth = 8;
    screen.mContext.strokeRect(playButton.x, playButton.y, playButton.width, playButton.height);
    screen.mContext.fillStyle="black"
    screen.mContext.fillRect(playButton.x, playButton.y, playButton.width, playButton.height);
    screen.mContext.fillStyle="white"
    screen.mContext.font="70px Source Code Pro";
    screen.mContext.fillText(text, playButton.x + 40, playButton.y + 70);
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
