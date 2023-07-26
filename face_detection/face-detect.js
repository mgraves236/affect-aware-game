let model;
let model_fer;
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");
let iter = 0;

tf.setBackend('webgl');
console.log(tf.getBackend());

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
    iter = iter + 1;
};

// first frame has been loaded
video.addEventListener("loadeddata", async () => {
    model = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
    model_fer = await load();
    console.log(model_fer)
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Loading the model...", canvas.width / 2 - 150, canvas.height / 2 + 50);
    setInterval(detectFaces, 100);
});


async function load() {
    return await tf.loadLayersModel("../model/JSON/model.json");
}
