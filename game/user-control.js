import {Vector} from "./lib/vector.js";
import {Engine} from "./engineCore/core.js";
import {screen} from "./engineCore/screen.js";
import {Player} from "./player.js";

screen.mCanvas.addEventListener('mousemove', handleMouseInput);
// document.getElementById("game-canvas").addEventListener('click', event => console.log("hello"));


function handleMouseInput(event) {
    let mousePos = getMousePos(event);
    let yChange =  -Engine.Player.massCenter.y + mousePos.y
    if (!(Engine.Player.massCenter.y + yChange > screen.mCanvas.height - Engine.Player.height / 2)
    && !(Engine.Player.massCenter.y + yChange < Engine.Player.height / 2)) {
        Engine.Player.move(new Vector(0, yChange))
    }
}

function getMousePos(event) {
    let rect = screen.mCanvas.getBoundingClientRect();
    let scaleX = screen.mCanvas.width / rect.width;
    let scaleY = screen.mCanvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}