import {screen} from "./engineCore/screen.js";
import {Vector} from "./lib/vector.js";
import {Circle} from "./rigidBody/circle.js";

export class Ball extends Circle {
    constructor(position) {
        super(1, position, 20, 0.25, 0, 0.8);
        this.velocity = new Vector(-100, 0);
    }

}