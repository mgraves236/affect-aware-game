import {Engine} from "./core.js";
import {screen} from "./screen.js";
import {Vector} from "../lib/vector.js";



let lastRenderTime = 0;
let FPS = 60;
let frameTime = 1 / FPS;


/**
 * Engine Loop
 * @param currentTime current time
 */
export function mainGame(currentTime) {

    window.requestAnimationFrame(mainGame);
    const secondsSinceLastRender = (currentTime - lastRenderTime);
    if (secondsSinceLastRender < frameTime) return;
    lastRenderTime = currentTime;
    screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    screen.mContext.fillStyle = "rgba(0,0,0,1)";
    screen.mContext.fillRect(0,0, screen.mWidth, screen.mHeight);
    // draw net
    screen.mContext.fillStyle = "rgba(255,255,255,0.65)";
    for(let i = 0; i < 12; i++)
    screen.mContext.fillRect(screen.mCanvas.height / 2 - 5, 87 * i, 10, 30);

    if (Engine.Core.mAllObjects !== null) {
        // update and display or delete object
        let start = new Date().getTime();
        let i = 0;

        while (i < Engine.Core.mAllObjects.length) {
            Engine.Core.mAllObjects[i].update();
            Engine.Core.mAllObjects[i].display();

            i++;
        }
        let end = new Date().getTime();

    }
    if (Engine.Core.mDragAreas !== null) {
        for (let i = 0; i < Engine.Core.mDragAreas.length; i++) {
            Engine.Core.mDragAreas[i].update();
        }
    }
    // run collision module
    Engine.Physics.collision();
    Engine.Physics.drag();
}

Engine.Core.initializeEngineCore = mainGame;
Engine.Core.frameTime = frameTime;