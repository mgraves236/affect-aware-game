import {pred} from "../main.js";

window.addEventListener('load', () => {
    let canvas_game = document.getElementById("game-canvas");
    let ctx_game = canvas_game.getContext("2d");
    let checkbox = document.getElementById("enable-emotion");
    let enableEmotion = true;

    document.getElementById("enable-emotion-component").addEventListener('click', () => {
        enableEmotion = checkbox.checked === true;
    });


    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
        }
        update() {

        }
        draw(context) {
            context.clearRect(0, 0, this.width, this.height);
            console.log(enableEmotion)
            if (enableEmotion) {
                context.beginPath();
                context.fillStyle = 'pink';
                context.fillRect(0,0, 100, 100);
                context.closePath();
            } else {
                context.beginPath();
                context.fillStyle = 'black';
                context.fillRect(0, 0, 100, 100);
                context.closePath();
            }
        }
    }

    const game = new Game(canvas_game.width, canvas_game.height);

    function animate() {
        game.draw(ctx_game);
        requestAnimationFrame(animate);
    }
    animate();
});



