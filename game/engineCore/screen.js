import data from "./config.json" assert {type: "json"};
import {Rectangle} from "../rigidBody/rectangle.js";
import {Vector} from "../lib/vector.js";

/**
 * Component to store canvas data
 * @type {{mHeight: *, mWidth: *, mCanvas: HTMLElement, mContext: *}}
 */
let screen = (function () {
    let mCanvas = document.getElementById('game-canvas');
    let mContext = mCanvas.getContext('2d');
    // console.log(mCanvas.height)
    mCanvas.height = 450;
    mCanvas.width = 900;

    /**
     * Canvas boundaries
     */
    let x = mCanvas.width;
    let y = mCanvas.height;
    // infinite mass -- mass = 0
    let top = new Rectangle(0, new Vector(x / 2, -5), x, 10, 0, 0, 1, false, "border");
    let bottom = new Rectangle(0, new Vector(x / 2, y + 5), x, 10, 0, 0, 1, false, "border");
    let left = new Rectangle(0, new Vector(-5, y / 2), 10, y, 0, 0, 1, false, "border-left");
    let right = new Rectangle(0, new Vector(x + 5, y / 2), 10, y, 0, 0, 1, false, "border-right");

    return {
        mWidth: mCanvas.width,
        mHeight: mCanvas.height,
        mContext: mContext,
        mCanvas: mCanvas
    };
}());

export {screen};

