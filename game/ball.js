import {screen} from "./engineCore/screen.js";
import {Vector} from "./lib/vector.js";
import {Circle} from "./rigidBody/circle.js";

export class Ball extends Circle {
    constructor(position) {
        super(1, position, 10, 0, 0, 1, false);
        this.velocity = new Vector(250, 0);
    }

    display() {
        let ctx = screen.mContext;
        ctx.save();
        ctx.beginPath();
        ctx.arc( this.massCenter.x, this.massCenter.y,
            this.height, 0, Math.PI * 2, true);
        // draw a line from start point toward center
        ctx.moveTo(this.startpoint.x, this.startpoint.y);
        ctx.lineTo(this.massCenter.x, this.massCenter.y);
        ctx.closePath();
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.restore();
    }

}