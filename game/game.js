import {pred} from "../main.js";
import {Engine} from './engineCore/core.js';
import {Vector} from './lib/vector.js';
import {Circle} from './rigidBody/circle.js';
import {Player} from "./player.js";
import {Ball} from "./ball.js";

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
    function animate() {
        window.requestAnimationFrame(Engine.Core.initializeEngineCore);
        // let circle = new Circle(5, new Vector(0, 0),100, 0,0.1, 0.2);
        let mPlayer = new Player(new Vector(150, 500));
        mPlayer.additionalInfo = "player";
        Engine.Player = mPlayer;
        let ball = new Ball(new Vector(500,450));
        // Engine.Core.mAllObjects.forEach(object => object.display())
    }
    animate();


});



