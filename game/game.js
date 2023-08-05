import {Engine} from './engineCore/core.js';
import {Vector} from './lib/vector.js';
import {Player} from "./player.js";
import {Ball} from "./ball.js";
import {Computer} from "./computer.js";
import {screen, setBoundaries} from "./engineCore/screen.js";
import {drawPlayButton, clickBtn} from "./play-button.js";
import {handleMouseInput, handleTouchInput} from "./user-control.js";
import {attr} from "../utils/language.js";
import data from '../utils/content.json' assert { type: 'json' };

export let enableEmotion = true;

window.addEventListener('load', () => {
    let checkbox = document.getElementById("enable-emotion");

    document.getElementById("enable-emotion-component").addEventListener('click', () => {
        enableEmotion = checkbox.checked === true;
    });
    screen.mContext.fillRect(0,0, screen.mWidth, screen.mHeight);
    setUp();
});

export function startGame() {
    screen.mCanvas.addEventListener('mousemove', handleMouseInput);
    screen.mCanvas.addEventListener('touchmove', handleTouchInput);
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
    screen.mContext.font="70px Lucida Console";
    screen.mContext.fillText(Engine.Score.computer + '\t\t\t\t\t' + Engine.Score.player, screen.mCanvas.width / 2 - 146, 80);
}

export function drawWinner(x) {
    screen.mContext.fillStyle="white"
    screen.mContext.font="70px Lucida Console";
    if (attr === "english") {
        screen.mContext.fillText(data.english["winner"], x, 400);
    } else {
        screen.mContext.fillText(data.polish["winner"], x - 70, 400);
    }
}

export function setUp() {
    screen.mCanvas.addEventListener('click', clickBtn);
    if (attr === "english") {
        drawPlayButton();
    } else {
        drawPlayButton(data.polish["play"]);
    }
}