import {setUp} from "./fer/face-detect.js";

export const pred = {
    value: "none",
    get label() {
        return this.value;
    },
    set label(val) {
        this.value = val;
        this.predListener(val);
    },
    predListener: function (val) {},
    registerNewListener: function (externalListenerFunction) {
        this.predListener = externalListenerFunction;
    },
};

// listen for new predictions
pred.registerNewListener((val) => console.log(`New value: ${val}`));

// first frame has been loaded
video.addEventListener("loadeddata", setUp);
