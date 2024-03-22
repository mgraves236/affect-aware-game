import {handleMouseInput, handleTouchInput} from "./user-control.js";
import {clickBtn, drawPlayButton} from "./play-button.js";
import {attr} from "../utils/language.js";
import data from "../utils/content.json" assert {type: 'json'};
import {canvas, ctx} from "./canvas.js";
import {pred} from "../main.js";

let enableEmotion = false;
let endGame = false;

window.addEventListener('load', () => {
    // let checkbox = document.getElementById("enable-emotion");
    //
    // document.getElementById("enable-emotion-component").addEventListener('click', () => {
    //     enableEmotion = checkbox.checked === true;
    // });
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setUp();
});

function setUp() {
    canvas.addEventListener('click', clickBtn);
    if (attr === "english") {
        drawPlayButton(data.english["play"]);
    } else {
        drawPlayButton(data.polish["play"]);
    }
}

export function startGame() {
    canvas.addEventListener('mousemove', handleMouseInput);
    canvas.addEventListener('touchmove', handleTouchInput);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    endGame = false;
    resetGame();
    window.requestAnimationFrame(loop);

}
let lastRenderTime = 0;

function loop(currentTime) {
    requestAnimationFrame(loop);
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / 70) return;
    lastRenderTime = currentTime;


    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(0,0,0,1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // draw net
    ctx.fillStyle = "rgba(255,255,255,0.65)";
    for (let i = 0; i < 12; i++)
        ctx.fillRect(canvas.width / 2 - 5, 50 * i, 10, 30);

    // check if game is finished
    if (score.player === score.maxScore || score.computer === score.maxScore) {
        endGame = true;
        if (score.computer ===  score.maxScore) {
            drawWinner(100);
        } else {
            drawWinner(100 + canvas.width / 2)
        }
        // canvas.addEventListener('click', clickBtn);
        canvas.removeEventListener('mousemove', handleMouseInput);
        canvas.removeEventListener('touchmove', handleTouchInput);
        setUp();
        enableEmotion = true;
        return;
    }

    adjustDifficulty();
    // update computer paddle
    computerPaddle.y = computerPaddle.y + computerPaddle.v_y
    let yChange = (ball.y - computerPaddle.y) * computerPaddle.level;
    if (!(computerPaddle.y + yChange > canvas.height - computerPaddle.height / 2)
        && !(computerPaddle.y + yChange < computerPaddle.height / 2)) {
        computerPaddle.y += yChange;
    } else {
        if (computerPaddle.y < computerPaddle.height / 2) {
            computerPaddle.y = computerPaddle.height / 2;
        } else if (computerPaddle.y > canvas.height - computerPaddle.height / 2) {
            computerPaddle.y = canvas.height - computerPaddle.height / 2;
        }
    }

    // update ball
    ball.x += ball.v_x;
    ball.y += ball.v_y;

    // prevent ball from going through top and bottom wall
    if (ball.y - ball.r <= 0) {
        ball.y = ball.r
        ball.v_y = -ball.v_y
    }

    if (ball.y - ball.r >= canvas.height) {
        ball.y = -ball.r + canvas.height
        ball.v_y = -ball.v_y
    }

    // ball collides with a paddle
    if (collisionTest(ball, playerPaddle)) {
        // change v_y if the ball hit the paddle at its ends
        if (ball.y > playerPaddle.y + playerPaddle.height / 4) { // bottom of the paddle
            ball.v_x = -Math.sqrt(ball.v_y * ball.v_y + ball.v_x * ball.v_x) * playerPaddle.speed * Math.sin(Math.PI / 4);
            if (ball.v_x < -20) ball.v_x = -15;
            ball.v_y = Math.sqrt(ball.v_y * ball.v_y + ball.v_x * ball.v_x) * playerPaddle.speed * Math.cos(Math.PI / 4);
        } else if (ball.y < playerPaddle.y - playerPaddle.height / 4) { // top of the paddle
            ball.v_x = -Math.sqrt(ball.v_y * ball.v_y + ball.v_x * ball.v_x) * playerPaddle.speed * Math.sin(Math.PI / 4);
            if (ball.v_x < -20) ball.v_x = -15;
            ball.v_y = -Math.sqrt(ball.v_y * ball.v_y + ball.v_x * ball.v_x) * playerPaddle.speed * Math.cos(Math.PI / 4);
        } else {
            ball.v_x *= -1 * playerPaddle.speed;
            if (ball.v_x < -20) ball.v_x = -15;
        }
        // move the ball away
        ball.x = playerPaddle.x - playerPaddle.width / 2 - ball.r;
        ball.paddlePlayer = true;
    }

    if (collisionTest(ball, computerPaddle)) {
        // change v_y if the ball hits the paddle at its ends
        if (ball.y > computerPaddle.y + computerPaddle.height / 4) { // bottom of the paddle
            ball.v_x = Math.sqrt(ball.v_y * ball.v_y + ball.v_x * ball.v_x) * computerPaddle.speed * Math.sin(Math.PI / 4);
            if (ball.v_x < -20) ball.v_x = -15;
            ball.v_y = Math.sqrt(ball.v_y * ball.v_y + ball.v_x * ball.v_x) * computerPaddle.speed * Math.cos(Math.PI / 4);
        } else if (ball.y < computerPaddle.y - computerPaddle.height / 4) { // top of the paddle
            ball.v_x = Math.sqrt(ball.v_y * ball.v_y + ball.v_x * ball.v_x) * computerPaddle.speed * Math.sin(Math.PI / 4);
            if (ball.v_x < -20) ball.v_x = -15;
            ball.v_y = -Math.sqrt(ball.v_y * ball.v_y + ball.v_x * ball.v_x) * computerPaddle.speed * Math.cos(Math.PI / 4);
        } else {
            ball.v_x *= -1 * computerPaddle.speed;
            if (ball.v_x < -20) ball.v_x = -15;
        }
        // move the ball away
        ball.x = computerPaddle.x + computerPaddle.width / 2 + ball.r;
        ball.paddleComputer = true;
    }

    // check if ball went past paddle and reset
    if ((ball.x + ball.r <= 0 || ball.x + ball.r >= canvas.width) && !ball.reset) {
        ball.reset = true;
        // update score
        if (ball.x + ball.r <= 0) score.player += 1;
        if (ball.x + ball.r >= canvas.width) score.computer += 1;

        setTimeout(reset, 500);
    }

    // update UI and GUI
    drawScore();
    drawPaddles();
    drawBall();
    ball.paddleComputer = false;
    ball.paddlePlayer = false;
}

function drawScore() {
    ctx.fillStyle = "white"
    ctx.font = "70px Lucida Console";
    ctx.fillText(score.computer + '\t\t\t\t\t\t\t' + score.player, canvas.width / 2 - 170, 80);
}

function drawWinner(x) {
    ctx.fillStyle = "white"
    ctx.font = "70px Lucida Console";
    if (attr === "english") {
        ctx.fillText(data.english["winner"], x, 400);
    } else {
        ctx.fillText(data.polish["winner"], x - 70, 400);
    }
}

function drawPaddles() {
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(computerPaddle.x - computerPaddle.width / 2, computerPaddle.y - computerPaddle.height / 2, computerPaddle.width,
        computerPaddle.height);
    ctx.closePath();
    ctx.beginPath();
    ctx.fillStyle = 'white';
    ctx.fillRect(playerPaddle.x - playerPaddle.width / 2, playerPaddle.y - playerPaddle.height / 2, playerPaddle.width,
        playerPaddle.height);
    ctx.closePath();
    ctx.restore();
}

function drawBall() {
    ctx.save();
    ctx.beginPath();
    ctx.arc(ball.x, ball.y,
        ball.r, 0, Math.PI * 2, true);
    ctx.closePath();
    // if (enableEmotion) {
    //     switch (pred.label[0]) {
    //         case 0:
    //             ctx.fillStyle = 'red';
    //             break;
    //         case 1:
    //             ctx.fillStyle = 'yellow';
    //             break;
    //         case 2:
    //             ctx.fillStyle = 'rgb(255,2,197)';
    //             break;
    //         case 3:
    //             ctx.fillStyle = 'white';
    //             break;
    //         case 4:
    //             ctx.fillStyle = 'blue';
    //             break;
    //     }
    //
    // } else {
    //     ctx.fillStyle = 'white';
    // }
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.restore();
}

function reset() {
    if (score.player >= score.computer) {
        ball.v_x = 10;
        ball.v_y = 0;
    } else {
        ball.v_x = -10;
         ball.v_y = 0;
    }
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
    computerPaddle.y = canvas.height / 2;
    computerPaddle.v_y = 0;
    ball.reset = false;
}

function adjustDifficulty() {
    if (enableEmotion) {
        switch (pred.label[0]) {
            case 0: // angry
                // computerPaddle.speed = 1.05;
                // computerPaddle.level = 0.05;
                if (computerPaddle.speed > 0.9) computerPaddle.speed = computerPaddle.speed - 0.05;
                if (computerPaddle.level > 0.1) computerPaddle.level = computerPaddle.level - 0.05;
                break;
            case 1: // fearful
                // computerPaddle.speed = 1.05;
                // computerPaddle.level = 0.05;
                if (computerPaddle.speed > 0.9) computerPaddle.speed = computerPaddle.speed - 0.05;
                if (computerPaddle.level > 0.1) computerPaddle.level = computerPaddle.level - 0.05;
                break;
            case 2: // happy
                // computerPaddle.speed = 1.3;
                // computerPaddle.level = 0.3;
                if (computerPaddle.speed < 1.1) computerPaddle.speed = computerPaddle.speed + 0.05;
                if (computerPaddle.level < 0.3) computerPaddle.level = computerPaddle.level + 0.05;
                break;
            case 3: // neutral
                // computerPaddle.speed = 1.2;
                // computerPaddle.level = 0.2;
                break;
            case 4: // sad
                // computerPaddle.speed = 1.0;
                // computerPaddle.level = 0.03;
                if (computerPaddle.speed > 0.9) computerPaddle.speed = computerPaddle.speed - 0.05;
                if (computerPaddle.level > 0.1) computerPaddle.level = computerPaddle.level - 0.05;
                break;
        }
    } else { // set default
        computerPaddle.speed = 1.05;
        computerPaddle.level = 0.15;
    }
}

function collisionTest(obj1, obj2) {
    return obj1.y + obj1.height / 2 > obj2.y - obj2.height / 2 &&
        obj1.y - obj1.height / 2 < obj2.y + obj2.height / 2 &&
        obj1.x < obj2.x + obj2.width / 2 &&
        obj1.x + obj1.width / 2 > obj2.x;
}


let score = {}

let paddle = {
    height: 100,
    width: 20
}

export let computerPaddle = {}

export let playerPaddle = {}

let ball = {}

function resetGame() {
    score = {
        player: 0,
        computer: 0,
        maxScore: 11
    }

    computerPaddle = {
        x: paddle.width / 2,
        y: canvas.height / 2,
        v_y: 0,
        height: paddle.height,
        width: paddle.width,
        speed: 1.0,
        level: 0.2
    }

    playerPaddle = {
        x: canvas.width - paddle.width / 2,
        y: canvas.height / 2,
        v_y: 0,
        height: paddle.height,
        width: paddle.width,
        speed: 1.05
    }

     ball = {
        x: canvas.width / 2,
        y: canvas.height / 2,
        r: 10,
        width: 20,
        height: 20,
        v_x: 10,
        v_y: 0,
        reset: false,
    }
}
