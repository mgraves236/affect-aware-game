import {Engine} from "./engineCore/core.js";
import {Paddle} from "./paddle.js";
import {Vector} from "./lib/vector.js";
import {screen} from "./engineCore/screen.js";

export class Computer extends Paddle{
    constructor(position) {
        super(position);
        this.additionalInfo = "computer";
        this.computerLevel = 0.1;
        this.speed = 1.05;
    }

    update() {
        let yChange = (Engine.Ball.massCenter.y - this.massCenter.y + this.height / 2) * this.computerLevel;
        if (!(this.massCenter.y + yChange > screen.mCanvas.height - this.height / 2)
            && !(this.massCenter.y + yChange < this.height / 2))
        this.move(new Vector(0, yChange));
    }
}