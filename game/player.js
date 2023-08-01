import {Paddle} from "./paddle.js";

export class Player extends Paddle {
    constructor(position) {
        super(position);
        this.additionalInfo = "player";
        this.speed = 1.05;
    }
}