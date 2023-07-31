import {screen} from "./engineCore/screen.js";
import {Vector} from "./lib/vector.js";
import data from './engineCore/config.json' assert {type: 'json'};
import {Rectangle} from "./rigidBody/rectangle.js";
import {Paddle} from "./paddle.js";

export class Player extends Paddle {
    constructor(position) {
        super(position);
        this.additionalInfo = "player";
    }
}