import {pred} from "../main.js";
import {Engine} from './engineCore/core.js';
import {Vector} from './lib/vector.js';
import {Circle} from './rigidBody/circle.js';
import {Player} from "./player.js";
import {Ball} from "./ball.js";
import {Paddle} from "./paddle.js";
import {Computer} from "./computer.js";
import {screen} from "./engineCore/screen.js";

// export const labels = ["Angry", "Fearful", "Happy", "Neutral", "Sad"]


window.addEventListener('load', () => {
    let canvas_game = document.getElementById("game-canvas");
    let ctx_game = canvas_game.getContext("2d");
    let checkbox = document.getElementById("enable-emotion");
    let enableEmotion = true;

    document.getElementById("enable-emotion-component").addEventListener('click', () => {
        enableEmotion = checkbox.checked === true;
    });

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
    function startGame() {
        window.requestAnimationFrame(Engine.Core.initializeEngineCore);
        // let circle = new Circle(5, new Vector(0, 0),100, 0,0.1, 0.2);
        Engine.Score = {
            player: 0,
            computer: 0
        }
        let mPlayer = new Player(new Vector(canvas_game.width - 15, canvas_game.height / 2 ));
        Engine.Player = mPlayer;
        Engine.ComPlayer = new Computer(new Vector(15, canvas_game.height / 2 ));
        Engine.Ball = new Ball(new Vector(canvas_game.width / 2,canvas_game.height / 2));

    }
    startGame();

});

export function drawScore() {
    screen.mContext.fillStyle="white"
    screen.mContext.font="70px Arial";
    screen.mContext.fillText(Engine.Score.computer + '\t\t\t\t\t\t' + Engine.Score.player, screen.mCanvas.width / 2 - 96, 90);
}


