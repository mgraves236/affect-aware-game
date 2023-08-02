import {pred} from "../main.js";
import {Engine} from './engineCore/core.js';
import {Vector} from './lib/vector.js';
import {Player} from "./player.js";
import {Ball} from "./ball.js";
import {Computer} from "./computer.js";
import {screen, setBoundaries} from "./engineCore/screen.js";
import {drawPlayButton, clickBtn} from "./play-button.js";
import {handleMouseInput} from "./user-control.js";

// export const labels = ["Angry", "Fearful", "Happy", "Neutral", "Sad"]


window.addEventListener('load', () => {
    let checkbox = document.getElementById("enable-emotion");
    let enableEmotion = true;

    document.getElementById("enable-emotion-component").addEventListener('click', () => {
        enableEmotion = checkbox.checked === true;
    });
    screen.mContext.fillRect(0,0, screen.mWidth, screen.mHeight);
    setUp();
    drawWinner(100)
    // class Game {
    //     constructor(width, height) {
    //         this.width = width;
    //         this.height = height;
    //     }
    //     update() {
    //
    //     }
    //     draw(context) {
    //         context.clearRect(0, 0, this.width, this.height);
    //         console.log(enableEmotion)
    //         if (enableEmotion) {
    //
    //             context.beginPath();
    //             context.fillStyle = 'pink';
    //             context.fillRect(0,0, 100, 100);
    //             context.closePath();
    //         } else {
    //             context.beginPath();
    //             context.fillStyle = 'black';
    //             context.fillRect(0, 0, 100, 100);
    //             context.closePath();
    //         }
    //     }
    // }

    // const game = new Game(canvas_game.width, canvas_game.height);

    // function animate() {
    //     game.draw(ctx_game);
    //     requestAnimationFrame(animate);
    // }
    // animate();


});

export function startGame() {
    screen.mCanvas.addEventListener('mousemove', handleMouseInput);
    screen.mContext.clearRect(0, 0, screen.mWidth, screen.mHeight);
    Engine.Core.mAllObjects = [];
    setBoundaries();
    Engine.Score = {
        player: 0,
        computer: 0
    }
    Engine.EndGame = false;
    let mPlayer = new Player(new Vector(screen.mWidth - 15, screen.mHeight / 2 ));
    Engine.Player = mPlayer;
    Engine.ComPlayer = new Computer(new Vector(15, screen.mHeight / 2 ));
    Engine.Ball = new Ball(new Vector(screen.mWidth / 2,screen.mHeight / 2));
    window.requestAnimationFrame(Engine.Core.initializeEngineCore);

}

export function drawScore() {
    screen.mContext.fillStyle="white"
    screen.mContext.font="70px Source Code Pro";
    screen.mContext.fillText(Engine.Score.computer + '\t\t\t\t\t' + Engine.Score.player, screen.mCanvas.width / 2 - 146, 80);
}

export function drawWinner(x) {
    screen.mContext.fillStyle="white"
    screen.mContext.font="70px Source Code Pro";
    screen.mContext.fillText("Winner", x, 400);
}

export function setUp() {
    screen.mCanvas.addEventListener('click', clickBtn);
    drawPlayButton();
}