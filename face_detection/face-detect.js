let w, h;
let model;
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");

tf.setBackend('webgl');
console.log(tf.getBackend());

// resize the html5 video element
video.addEventListener(
    "resize",
    videoSize,
    false,
);

const detectFaces = async () => {
    const prediction = await model.estimateFaces({
        input: video,
        returnTensors: false,
        flipHorizontal: false,
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    prediction.forEach((pred) => {
        // console.log(pred)
        // draw a bounding box
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 255, 0.25)";
        ctx.rect(
            pred.boundingBox.topLeft[0],
            pred.boundingBox.topLeft[1],
            pred.boundingBox.bottomRight[0] - pred.boundingBox.topLeft[0],
            pred.boundingBox.bottomRight[1] - pred.boundingBox.topLeft[1]
        );
        ctx.fill();

        // drawing face landmarks
        const features = ["leftEyeUpper1",  "leftEyeLower1", "rightEyeUpper1", "rightEyeLower1",
                            "leftEyebrowUpper", "rightEyebrowUpper", "lipsUpperInner", "lipsLowerInner",
                            "noseTip", "leftCheek", "rightCheek"]
        ctx.fillStyle = "red";
        features.forEach((feature) => {
            pred.annotations[feature].forEach(x => {
                ctx.beginPath();
                ctx.arc(x[0], x[1], 3, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
            })
        })
    });
};

video.addEventListener("loadeddata", async () => {
    model = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
    console.log("loaded")
    setInterval(detectFaces, 100);
});


function videoSize(ev) {
    w = video.videoWidth;
    h = video.videoHeight;

    if (w && h) {
        video.style.width = w;
        video.style.height = h;
    }
    console.log(h)
    canvas.height = h;
    canvas.width = w;
}