let w, h;
let model;
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");

// resize the html5 video element
video.addEventListener(
    "resize",
    videoSize,
    false,
);


const detectFaces = async () => {
    const prediction = await model.estimateFaces(video, false);

    console.log(canvas.width,  canvas.height)
    ctx.clearRect(0, 0, canvas.width,  canvas.height);


    prediction.forEach((pred) => {
        console.log(pred)
        // draw the rectangle enclosing the face
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.fillStyle = "rgba(0, 0, 255, 0.25)";
        // the last two arguments are width and height
        // since blazeface returned only the coordinates,
        // we can find the width and height by subtracting them.
        ctx.rect(
            pred.topLeft[0],
            pred.topLeft[1],
            pred.bottomRight[0] - pred.topLeft[0],
            pred.bottomRight[1] - pred.topLeft[1]
        );
        ctx.fill();

        // drawing small rectangles for the face landmarks
        ctx.fillStyle = "red";
        pred.landmarks.forEach((landmark) => {
            ctx.fillRect(landmark[0], landmark[1], 5, 5);
        });

    });

};

video.addEventListener("loadeddata", async () => {
    model = await blazeface.load();
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