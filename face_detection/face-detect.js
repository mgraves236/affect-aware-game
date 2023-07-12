let model;
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d");

// resize the html5 video element
video.addEventListener(
    "resize",
    (ev) => {
        let w = video.videoWidth;
        let h = video.videoHeight;

        if (w && h) {
            video.style.width = w;
            video.style.height = h;
        }

        canvas.style.height =  h + "px";
        canvas.style.width =  w + "px";
    },
    false,
);

const detectFaces = async () => {
    const prediction = await model.estimateFaces(video, false);

    // console.log(prediction);

    // draw the video first
    console.log(canvas.width,  canvas.height)
    ctx.drawImage(video, 0, 0, canvas.width,  canvas.height);

    prediction.forEach((pred) => {
        console.log(pred)
        // draw the rectangle enclosing the face
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "blue";
        ctx.rect(195,100,100,100);

        // the last two arguments are width and height
        // since blazeface returned only the coordinates,
        // we can find the width and height by subtracting them.
        ctx.rect(
            pred.topLeft[0],
            canvas.height - pred.topLeft[1],
            pred.bottomRight[0] - pred.topLeft[0],
            pred.bottomRight[1] - pred.topLeft[1]
        );
        ctx.stroke();

        // drawing small rectangles for the face landmarks
        ctx.fillStyle = "red";
        pred.landmarks.forEach((landmark) => {
            ctx.fillRect(landmark[0], landmark[1], 5, 5);
        });

    });
    // ctx.clearRect(0, 0, canvas.width, canvas.height);

};

video.addEventListener("loadeddata", async () => {
    model = await blazeface.load();
    setInterval(detectFaces, 100);
});

// visualize results
