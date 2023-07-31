import {screen} from "./engineCore/screen.js";
import {Vector} from "./lib/vector.js";
import data from './engineCore/config.json' assert {type: 'json'};
import {Rectangle} from "./rigidBody/rectangle.js";

export class Player extends Rectangle {
    constructor(position) {
        super(0, position, 100, 100, 0, 0, 1, false);
    }

}