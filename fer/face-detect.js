import {pred} from "../main.js";
import {labels} from "../main.js";

let model_fer;
let model;
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d", { willReadFrequently: true });
let iter = 0;
let prediction;
let textLabel = document.getElementById("predict")


tf.setBackend('webgl');

// detect all faces in the frame and recognize emotions
async function detectFaces() {
    prediction = await model.estimateFaces({
        input: video,
        returnTensors: false,
        flipHorizontal: false,
    });
    // console.log(prediction)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        video,
        0, 0, canvas.width, canvas.height,
        0, 0, canvas.width, canvas.height
    );
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
        if (iter%25 === 0) {
            const imgData = ctx.getImageData(pred.boundingBox.topLeft[0],
                pred.boundingBox.topLeft[1],
                pred.boundingBox.bottomRight[0] - pred.boundingBox.topLeft[0],
                pred.boundingBox.bottomRight[1] - pred.boundingBox.topLeft[1]);
            predictEmotion(imgData);
        }
    });
    requestAnimationFrame(detectFaces);
    iter = iter + 1;
}


export async function setUp() {
    model = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
    model_fer = await load();
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Loading the model...", canvas.width / 2 - 150, canvas.height / 2 + 50);

   await detectFaces();
}

async function load() {
    return await tf.loadLayersModel("../model/JSON/model.json");
}

async function processImage(img) {
    let tensor = await tf.browser.fromPixels(img)
    tensor = tf.image.resizeBilinear(tensor, [229, 229]).mean(2).toFloat().div(tf.scalar(255));
    return tensor.expandDims(0).expandDims(-1);
}

async function predictEmotion(img) {
    pred.remove();
    let tensor = await processImage(img)
    const res =  await model_fer.predict(tensor);
    let predictedValue = res.arraySync();
    const max = Math.max(...predictedValue[0])
    // only get predictions that are almost certain
    if (max >= 0.85) {
        const index = predictedValue[0].indexOf(max)
        const res_label = labels[index]
        textLabel.innerText = "Prediction: " + res_label;
        pred.label = res_label;
    }
}