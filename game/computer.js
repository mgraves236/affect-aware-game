import {Engine} from "./engineCore/core.js";
import {Paddle} from "./paddle.js";
import {Vector} from "./lib/vector.js";
import {screen} from "./engineCore/screen.js";
import {enableEmotion} from "./game.js";
import {pred} from "../main.js";

export class Computer extends Paddle{
    constructor(position) {
        super(position);
        this.additionalInfo = "computer";
        this.computerLevel = 0.1;
        this.speed = 1.2;
    }

    update() {
        let yChange = (Engine.Ball.massCenter.y - this.massCenter.y + this.height / 2) * this.computerLevel;
        if (!(this.massCenter.y + yChange > screen.mCanvas.height - this.height / 2)
            && !(this.massCenter.y + yChange < this.height / 2))
        this.move(new Vector(0, yChange));
    }

    adjustDifficulty() {
        if (enableEmotion) {
            switch (pred.label[0]) {
                case 0: // angry
                    this.speed = 1.05;
                    this.computerLevel = 0.07;
                    break;
                case 1: // fearful
                    this.speed = 1.05;
                    this.computerLevel = 0.07;
                    break;
                case 2: // happy
                    this.speed = 1.11;
                    this.computerLevel = 0.1;
                    break;
                case 3: // neutral
                    this.speed = 1.11;
                    break;
                case 4: // sad
                    this.speed = 1.0;
                    this.computerLevel = 0.05;
                    break;
            }
        } else { // set default
            this.speed = 1.11;
            this.computerLevel = 0.1;
        }
    }

}