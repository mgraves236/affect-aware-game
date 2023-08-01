import {screen} from "./engineCore/screen.js";
import {Vector} from "./lib/vector.js";
import data from './engineCore/config.json' assert {type: 'json'};
import {Rectangle} from "./rigidBody/rectangle.js";
import {Paddle} from "./paddle.js";

export class Player extends Paddle {
    constructor(position) {
        super(position);
        this.additionalInfo = "player";
        this.speed = 1.05;
    }

    // set(a) {
    //     for (let i = 0; i < this.vertex.length; i++) {
    //         this.vertex[i] = this.vertex[i].add(a);
    //     }
    //     this.massCenter = a;
    // }

}