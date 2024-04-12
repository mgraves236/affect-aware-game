import {pred, labels, labelsPl} from "../main.js";
import {attr} from "../utils/language.js";


tf.setBackend('webgl');
class Preprocess extends tf.layers.Layer {
    constructor(config) {
        super(config);
    }
    preprocess_input(inputs, kwargs) {
        return inputs;
    }

    computeOutputShape(inputShape) {
        return inputShape;
    }

    static get className() {
        return 'Preprocess';
    }
}

tf.serialization.registerClass(Preprocess);



let model_fer;
let model;
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d", {willReadFrequently: true});
let prediction;
let textLabel = document.getElementById("predict")

// variables to measure time between predictions
let start = 0;
let end = 0;

let timeSelect = document.getElementById("time")

window.addEventListener('load', () => {
    timeSelect.addEventListener('click', changeTime);
});
function changeTime(event) {
    let e = document.getElementById("time");
    let value = e.value;
     time_skip = parseInt(e.value) * 1000;
}

let time_skip = 2 * 1000; // s
let time = time_skip;


// detect all faces in the frame and recognize emotions
async function detectFaces() {
    start = performance.now();
    prediction = await model.estimateFaces({
        input: video,
        returnTensors: false,
        flipHorizontal: false,
    });
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
        video,
        0, 0, canvas.width, canvas.height,
        0, 0, canvas.width, canvas.height
    );

    // remove previous predictions
    if (time >= time_skip) pred.remove();
    prediction.forEach((pred_face) => {
        // draw a bounding box
        ctx.beginPath();
        ctx.fillStyle = "rgba(0, 0, 255, 0.25)";
        ctx.rect(
            pred_face.boundingBox.topLeft[0],
            pred_face.boundingBox.topLeft[1],
            pred_face.boundingBox.bottomRight[0] - pred_face.boundingBox.topLeft[0],
            pred_face.boundingBox.bottomRight[1] - pred_face.boundingBox.topLeft[1]
        );
        ctx.fill();

        // drawing face landmarks
        const features = ["leftEyeUpper1", "leftEyeLower1", "rightEyeUpper1", "rightEyeLower1",
            "leftEyebrowUpper", "rightEyebrowUpper", "lipsUpperInner", "lipsLowerInner",
            "noseTip", "leftCheek", "rightCheek"]
        ctx.fillStyle = "red";
        features.forEach((feature) => {
            pred_face.annotations[feature].forEach(x => {
                ctx.beginPath();
                ctx.arc(x[0], x[1], 3, 0, 2 * Math.PI);
                ctx.closePath();
                ctx.fill();
            })
        })
        // predict emotion every time_skip milliseconds
        if (time >= time_skip) {
            const imgData = ctx.getImageData(pred_face.boundingBox.topLeft[0],
                pred_face.boundingBox.topLeft[1],
                pred_face.boundingBox.bottomRight[0] - pred_face.boundingBox.topLeft[0],
                pred_face.boundingBox.bottomRight[1] - pred_face.boundingBox.topLeft[1]);

            const emoRes = async () => {
                const a = await predictEmotion(imgData);
                if (a !== 0) {
                    pred.label = a
                }
            };
            emoRes();
        }
    });
    requestAnimationFrame(detectFaces);
    end = performance.now();
    if (time >= time_skip) {
        time = 0;
    }
    time = time + end - start;
}


export async function setUp() {

    if (attr === "english") {
        textLabel.innerText = "Loading the model...";
    } else if (attr === "polish") {
        textLabel.innerText = "Wczytywanie modelu...";
    }
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    model = await faceLandmarksDetection.load(faceLandmarksDetection.SupportedPackages.mediapipeFacemesh);
    console.log('1', model)
    model_fer = await load();
    console.log(model_fer)
    ctx.beginPath();
    ctx.fillStyle = "rgba(0, 0, 0, 0.8)";
    ctx.rect(0, 0, canvas.width, canvas.height);
    ctx.fill();

    await detectFaces();
}

async function load() {
    return await tf.loadLayersModel("fer/model/JSON/model.json");
}

async function processImage(img) {
    let tensor = await tf.browser.fromPixels(img)
    // tensor = tf.image.resizeBilinear(tensor, [224, 224]).mean(2).toFloat().div(tf.scalar(255))
    // tensor.expandDims(0).expandDims(-1)
    // tf.scalar(255) -- scale the input by 1./255
    tensor = tf.image.resizeBilinear(tensor, [224, 224]).toFloat().div(tf.scalar(255));
    return tensor.expandDims(0);
}

async function predictEmotion(img) {
    let res_label = 0;
    let tensor = await processImage(img)
    const res = await model_fer.predict(tensor);
    let predictedValue = res.arraySync();
    console.log(predictedValue)
    const max = Math.max(...predictedValue[0])
    // only get predictions that are almost certain
    // if (max >= 0.50) {
        const index = predictedValue[0].indexOf(max)
        res_label = index;
        console.log(res_label)
    // }
    return res_label;
}

export function displayEmotion(arr) {
    let iter = 1;
    let string;
    if (attr === "english") {
        string = "Prediction:\n"
        arr.forEach((emotion) => {
            string = string + "Face #" + iter + ": " + labels[emotion] + "\n";
            iter = iter + 1;
        });
    } else if (attr === "polish") {
        string = "Emocja:\n"
        arr.forEach((emotion) => {
            string = string + "Twarz #" + iter + ": " + labelsPl[emotion] + "\n";
            iter = iter + 1;
        });
    }
    textLabel.innerText = string;
}

