import {setUp} from "./fer/face-detect.js";
import {displayEmotion} from "./fer/face-detect.js";

export const labels = ["Angry", "Fearful", "Happy", "Neutral", "Sad"]
export const labelsPl = ["Złość", "Strach", "Szczęście", "Neutralność", "Smutek"]

export const pred = {
    valueArr: [],
    get label() {
        return this.valueArr;
    },
    set label(val) {
        this.valueArr.push(val);
        this.predListener(val);
    },
    remove() {
        this.valueArr = [];
    },
    predListener: function (val) {},
    registerNewListener: function (externalListenerFunction) {
        this.predListener = externalListenerFunction;
    },
};

// listen for new predictions
pred.registerNewListener((val) => displayEmotion(pred.label));

// first frame has been loaded
video.addEventListener("loadeddata", setUp);
