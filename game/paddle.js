import {screen} from "./engineCore/screen.js";
import {Vector} from "./lib/vector.js";
import data from './engineCore/config.json' assert {type: 'json'};
import {Rectangle} from "./rigidBody/rectangle.js";

export class Paddle extends Rectangle {
    constructor(position) {
        super(0, position, 20, 100, 0, 0, 1, false);
        this.pos = position;
        this.massCenter = this.pos;
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = 'white';
        ctx.fillRect(this.vertex[2].x, this.vertex[2].y, this.vertex[0].x - this.vertex[1].x,
            -this.vertex[3].y + this.vertex[0].y);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

}