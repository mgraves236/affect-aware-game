import {screen} from "./engineCore/screen.js";
import {Vector} from "./lib/vector.js";
import {Circle} from "./rigidBody/circle.js";
import {Engine} from "./engineCore/core.js";

export class Ball extends Circle {
    constructor(position) {
        super(1, position, 10, 0, 0, 1, false);
        this.velocity = new Vector(450 * (Math.random()*0.5 + 0.5), 0);
        this.additionalInfo = "ball";
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
        // TODO change fill style based on emotion
        ctx.fillStyle = 'white';
        ctx.fill();
        ctx.restore();
    }

    reset() {
        if (Engine.Score.player >= Engine.Score.computer) {
            this.velocity = new Vector(450*(Math.random()*0.5 + 0.5), 0);
        } else {
            this.velocity = new Vector(-450*(Math.random()*0.5 + 0.5), 0);

        }
        this.massCenter = new Vector(screen.mCanvas.width / 2,screen.mCanvas.height / 2);
        setTimeout('', 3000);
    }

}